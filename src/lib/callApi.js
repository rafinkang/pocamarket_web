import apiClient from '@/lib/axiosInstance'; // 기존 Axios 인스턴스
import { BAD_REQUEST, UN_AUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR, BAD_GATEWAY, SERVICE_UNAVAILABLE, GATEWAY_TIMEOUT } from '@/constants/httpStatusCode';
import { LOGIN } from '@/constants/path';
import useAuthStore from '@/store/authStore'

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
    // 1. 실행 환경 확인 
    const isBrowser = typeof window !== 'undefined';
    const ERROR_CODE = error.response ? error.response.status : null;
    const alertMessage = (defaultMessage) => {
      let message = error.response?.data?.message;
      if (!message) {
        message = defaultMessage;
      }
      alert(message);
    }

    // 2. 환경에 따른 에러 처리 분기 
    if (isBrowser) {
      switch (ERROR_CODE) {
        case UN_AUTHORIZED:
          // 이미 리다이렉트 중이면 아무것도 하지 않음
          if (!window.isRedirecting) {
            window.isRedirecting = true
            alertMessage('로그인 후 이용 가능합니다.')
            useAuthStore.getState().clear()
            window.location.href = LOGIN
          }
          break;
        case FORBIDDEN:
          alertMessage('권한이 없습니다.')
          window.history.back();
          break;
        case INTERNAL_SERVER_ERROR:
          // ... 기타 서버 에러 케이스
          alertMessage(`서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (코드: ${ERROR_CODE})`);
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

    // 3. 에러를 다시 throw하여 호출한 쪽에서 후속 처리 
    // 이 부분이 매우 중요합니다. 특히 서버 사이드에서는 이 throw된 에러를 받아서
    // redirect나 notFound 처리를 해주어야 합니다.
    throw error;
  }
};