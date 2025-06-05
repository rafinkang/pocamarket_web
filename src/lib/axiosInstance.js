import axios from 'axios';
import { NOT_FOUND, UN_AUTHORIZED, FORBIDDEN, INTERNAL_SERVER_ERROR, BAD_GATEWAY, SERVICE_UNAVAILABLE, GATEWAY_TIMEOUT } from '@/constants/httpStatusCode';
import { LOGIN } from '@/constants/path';

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
        const ERROR_CODE = error.response ? error.response.status : null;

        // TODO modal 만든 후 alert 대체
        // TODO 로그인 또는 권한 error는 지정된 페이지로 이동하도록 작업
        switch (ERROR_CODE) {
            case UN_AUTHORIZED: 
                alert('로그인 후 사용 가능합니다.');
                window.location.href = LOGIN; 
                break;
            case FORBIDDEN:
                alert('권한이 없습니다.');
                window.history.back();
                break;
            case INTERNAL_SERVER_ERROR:
            case BAD_GATEWAY:
            case SERVICE_UNAVAILABLE:
            case GATEWAY_TIMEOUT: 
                alert(`[ERROR] ${ERROR_CODE}\n잠시후 다시 시도해주세요.`); 
                break;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;