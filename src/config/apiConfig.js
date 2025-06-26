// 환경별 API 설정
const API_CONFIG = {
  // 환경 감지
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // 로컬 개발환경에서의 API 서버 주소
  LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:8080',

  // 프로덕션에서의 API prefix (nginx 프록시 경로)
  PRODUCTION_API_PREFIX: process.env.NEXT_PUBLIC_API_URL + '/api-server',

  // 환경에 따른 API Base URL 자동 설정
  get BASE_URL() {
    if (this.IS_PRODUCTION) {
      return this.PRODUCTION_API_PREFIX; // 프로덕션: /api-server
    }
    return this.LOCAL_API_URL; // 로컬: http://localhost:8080
  },

  // API 엔드포인트 생성 헬퍼 함수
  getApiUrl(endpoint) {
    // endpoint가 '/'로 시작하지 않으면 추가
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.BASE_URL}${cleanEndpoint}`;
  }
};

module.exports = {
  API_CONFIG,
};