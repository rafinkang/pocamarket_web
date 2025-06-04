import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_LOCAL_API_URL

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer YOUR_ACCESS_TOKEN` // 필요하다면 기본 인증 헤더 설정
  },
  withCredentials: true // 쿠키 전송 허용
});

// 요청 인터셉터: 모든 요청 전에 특정 작업 수행
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 모든 응답 후에 특정 작업 수행
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 예: 특정 에러 코드(401 Unauthorized 등)에 대한 전역 처리
    // if (error.response && error.response.status === 401) {
    //   // 로그아웃 처리 또는 토큰 갱신 로직
    //   console.error('인증 오류:', error.response.data);
    //   // window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;