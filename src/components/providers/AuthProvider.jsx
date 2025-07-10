"use client";

import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

/**
 * 앱이 로드될 때마다 현재 인증 상태를 next.js 서버에 확인
 */
export default function AuthProvider({ children }) {
  const clearUser = useAuthStore((state) => state.clear);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // 앱 로드 시, 서버에 내 인증 상태를 물어보는 함수
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/next-api/auth/me', {
          method: 'POST',
          body: JSON.stringify({
            user: user
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }); // next.js 서버의 refreshToken 존재 여부를 확인하는 API
        const data = await res.json();
        // user정보가 없거나, 리프레쉬 토큰이 없을경우 로그아웃 처리
        if (!data.isLogin) {
          clearUser();
        }
      } catch (error) {
        console.error("인증 상태 확인 실패:", error);
        // 에러 발생 시에도 로그아웃 상태로 처리
        clearUser();
      }
    };

    checkAuthStatus();
    //컴포넌트가 처음 마운트될 때 한 번만 실행.
  }, []);

  return children;
}