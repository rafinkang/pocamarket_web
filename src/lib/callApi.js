import apiClient from '@/lib/axiosInstance'; // 기존 Axios 인스턴스

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
export default async function callApi ({ method, url, params, data, headers }) {
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
    // 에러 로깅 (좀 더 상세하게 할 수 있음)
    console.error(
      `API Error: ${method.toUpperCase()} ${url}`,
      {
        params,
        data,
        errorResponse: error.response?.data,
        errorStatus: error.response?.status,
        errorMessage: error.message,
      }
    );

    // 에러를 다시 throw하여 호출한 쪽에서 처리할 수 있도록 함
    // 필요에 따라 커스텀 에러 객체를 만들어 throw 할 수도 있습니다.
    // 예: throw { message: error.response?.data?.message || error.message, status: error.response?.status };
    throw error;
  }
};