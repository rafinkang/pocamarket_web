"use client"

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "sonner";
import { useRef, useState, useEffect } from 'react';

// store
import { postSocialLogin } from "@/api/auth";
import useAuthStore from '@/store/authStore';

const GoogleLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  
  // login 액션 가져오기
  const loginAction = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 버튼 크기 측정
  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        setButtonWidth(width);
      }
    };

    // 초기 크기 측정
    updateButtonWidth();

    // ResizeObserver로 실시간 크기 변화 감지
    const resizeObserver = new ResizeObserver(updateButtonWidth);
    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    // 윈도우 리사이즈 이벤트도 추가
    window.addEventListener('resize', updateButtonWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, []);

  const handleLoginSuccess = async (response) => {
    if (!response?.credential) {
      console.error("Google 인증 토큰을 받지 못했습니다.");
      return;
    }
    // Google의 ID 토큰 추출
    const idToken = response.credential;

    try {
      // 백엔드 서버로 ID 토큰 전송
      await postSocialLogin('google', {
        code: idToken,
        provider: 'google',
        redirectUri: '/auth/social/login/google'
      }).then(res => {
        console.log(res);
        loginAction(res.data);
        toast.success('로그인 성공! 환영합니다! 🎉');
        setTimeout(() => {
          const redirectTo = searchParams.get('redirect') || '/';
          router.push(redirectTo);
        }, 1500);
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Google 로그인 실패:", error);
  };

  return (
    <>
      {clientId && (
        <button 
          ref={buttonRef}
          className="w-full py-2 rounded flex items-center h-[40px] border border-gray-300 hover:bg-gray-50"
        >
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              size="large"
              logo_alignment="center"
              width={buttonWidth > 0 ? `${buttonWidth}px` : '100%'}
            />
          </GoogleOAuthProvider>
        </button>
      )}
    </>
  );
};

export default GoogleLoginButton;