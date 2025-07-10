import axios from 'axios';

// 서버사이드와 클라이언트사이드를 구분하여 baseURL 설정
const getBaseURL = () => {
  // 서버사이드에서 실행될 때
  if (typeof window === 'undefined') {
    // 서버사이드에서는 완전한 URL 필요
    // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const url = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';
    // return `${protocol}://${host}/next-api/proxy`;
    return `${url}/next-api/proxy`;
  }
  // 클라이언트사이드에서는 상대 경로 사용
  return '/next-api/proxy';
};

const baseURL = getBaseURL();
console.log('axiosInstance baseURL:', baseURL); // 디버깅용 로그

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer YOUR_ACCESS_TOKEN` // 필요하다면 기본 인증 헤더 설정
  },
  withCredentials: true // 쿠키 전송 허용
});

// 요청 인터셉터: 모든 요청 전에 특정 작업 수행
axiosInstance.interceptors.request.use(
  async (config) => {
    // 서버 사이드에서 실행될 때 쿠키에서 토큰 가져오기
    if (typeof window === 'undefined') {
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error('서버 사이드에서 쿠키 가져오기 실패:', error);
      }
    }

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
    return Promise.reject(error);
  }
);

export default axiosInstance;