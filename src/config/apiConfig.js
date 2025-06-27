// 환경별 API 설정
const API_CONFIG = {
  // 환경 감지
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_SERVER_SIDE: typeof window === 'undefined',

  // Docker 환경 감지 (여러 방법으로 체크)
  get IS_DOCKER_ENV() {
    // 1. 명시적 환경 변수 체크
    if (process.env.DOCKER_ENV === 'true') return true;

    // 2. Docker 컨테이너 특유의 환경 변수 체크
    if (process.env.HOSTNAME && process.env.HOSTNAME.includes('docker')) return true;

    // 3. /.dockerenv 파일 존재 체크 (서버사이드에서만)
    if (typeof window === 'undefined') {
      try {
        const fs = require('fs');
        return fs.existsSync('/.dockerenv');
      } catch (e) {
        return false;
      }
    }

    return false;
  },

  // 로컬 개발환경에서의 API 서버 주소
  LOCAL_API_URL: process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:8080',

  // Docker 내부 네트워크용 API 서버 주소 (서버사이드에서 사용)
  INTERNAL_API_URL: process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://pocamarket-api:8080',

  // 프로덕션에서의 API prefix (nginx 프록시 경로)
  PRODUCTION_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',

  // 환경에 따른 API Base URL 자동 설정
  get BASE_URL() {
    if (this.IS_PRODUCTION) {
      return this.PRODUCTION_API_URL; // 프로덕션: /api-server
    }

    // 개발 환경에서의 URL 결정
    if (this.IS_DEVELOPMENT) {
      // 서버사이드 + Docker 환경: Docker 내부 URL 사용
      if (this.IS_SERVER_SIDE && this.IS_DOCKER_ENV) {
        return this.INTERNAL_API_URL; // http://pocamarket-api:8080
      }
    }

    // 그 외의 경우: localhost 사용 (로컬 환경 또는 클라이언트사이드)
    return this.LOCAL_API_URL; // 기본값 http://localhost:8080
  },

  // API 엔드포인트 생성 헬퍼 함수
  getApiUrl(endpoint) {
    // endpoint가 '/'로 시작하지 않으면 추가
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const finalUrl = `${this.BASE_URL}${cleanEndpoint}`;

    // // 디버깅용 로그 (개발 환경에서만)
    // if (this.IS_DEVELOPMENT && this.IS_SERVER_SIDE) {
    //   console.log(`[API_CONFIG] Docker환경: ${this.IS_DOCKER_ENV}, URL: ${finalUrl}`);
    // }

    return finalUrl;
  }
};

module.exports = {
  API_CONFIG,
};