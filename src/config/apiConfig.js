// 환경별 API 설정
const API_CONFIG = {
  // 환경 감지
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_SERVER_SIDE: typeof window === 'undefined',

  // 로컬 개발환경에서의 API 서버 주소
  LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:8080',

  // Docker 내부 네트워크용 API 서버 주소 (서버사이드에서 사용)
  INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://pocamarket-api:8080',

  // 프로덕션에서의 API prefix (nginx 프록시 경로)
  PRODUCTION_API_PREFIX: process.env.NEXT_PUBLIC_API_URL + '/api-server',

  // 환경에 따른 API Base URL 자동 설정
  get BASE_URL() {
    if (this.IS_PRODUCTION) {
      return this.PRODUCTION_API_PREFIX; // 프로덕션: /api-server
    }

    // 개발 환경에서 서버사이드 vs 클라이언트사이드 구분
    if (this.IS_DEVELOPMENT) {
      return this.IS_SERVER_SIDE ? this.INTERNAL_API_URL : this.LOCAL_API_URL;
    }

    return this.LOCAL_API_URL; // 기본값
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