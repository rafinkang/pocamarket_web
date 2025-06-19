import apiClient from '@/lib/axiosInstance'; // 기존 Axios 인스턴스
import { UN_AUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR, BAD_GATEWAY, SERVICE_UNAVAILABLE, GATEWAY_TIMEOUT } from '@/constants/httpStatusCode';
import { LOGIN } from '@/constants/path';

/**
 * 범용 API 호출 함수
 * @param {object} options - API 호출 옵션
 * @param {string} options.method - HTTP 메서드 (예: 'get', 'post', 'put', 'delete')
 * @param {string} options.url - API 엔드포인트 URL
 * @param {object} [options.params] - URL 쿼리 파라미터 (주로 GET 요청에 사용)
 * @param {object} [options.data] - 요청 본문 데이터 (주로 POST, PUT, PATCH 요청에 사용)
 * @param {object} [options.headers] - 이 특정 요청에 대한 커스텀 헤더
 * @returns {Promise<any>} API 응답 데이터
 */
export default async function callApi({ method, url, params, data, headers }) {
  try {
    const response = await apiClient.request({
      method,
      url,
      params, // GET 요청의 경우 URL 쿼리스트링으로 변환됨
      data,   // POST, PUT 등의 경우 요청 본문으로 전송됨
      headers, // 추가적인 헤더 설정
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    // ★★★ 1. 실행 환경 확인 ★★★
    const isBrowser = typeof window !== 'undefined';
    const ERROR_CODE = error.response ? error.response.status : null;

    // ★★★ 2. 환경에 따른 에러 처리 분기 ★★★
    if (isBrowser) {
      // --- 클라이언트(브라우저) 환경일 때만 실행 ---
      switch (ERROR_CODE) {
        case UN_AUTHORIZED:
          console.log('로그인 후 사용 가능합니다.');
          // window.location.href 대신 Next.js의 router를 사용하는 것이 더 좋습니다.
          // 하지만 공통 모듈에서는 window 객체를 직접 사용할 수밖에 없는 경우가 있습니다.
          window.location.href = LOGIN_URL;
          break;
        case FORBIDDEN:
          console.log('권한이 없습니다.');
          // 사용자를 이전 페이지로 보내는 것은 클라이언트에서만 의미가 있습니다.
          window.history.back();
          break;
        case INTERNAL_SERVER_ERROR:
          // ... 기타 서버 에러 케이스
          alert(`서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (코드: ${ERROR_CODE})`);
          break;
      }
    } else {
      // --- 서버 환경일 때 실행 ---
      // 서버에서는 페이지 리다이렉션이나 history 조작을 할 수 없습니다.
      // 에러를 로깅하고, 호출한 쪽(getServerSideProps 등)에서 처리하도록 에러를 그대로 throw 합니다.
      console.log(`[Server-side Error] Code: ${ERROR_CODE}, URL: ${url}`);
    }

    // 공통 에러 로깅 (서버/클라이언트 모두에서 실행)
    console.error(`API Error: ${method.toUpperCase()} ${url}`, {
      // ... 기존 로깅 내용
      errorResponse: error.response?.data,
      errorStatus: error.response?.status,
    });

    // ★★★ 3. 에러를 다시 throw하여 호출한 쪽에서 후속 처리 ★★★
    // 이 부분이 매우 중요합니다. 특히 서버 사이드에서는 이 throw된 에러를 받아서
    // redirect나 notFound 처리를 해주어야 합니다.
    throw error;
  }
};