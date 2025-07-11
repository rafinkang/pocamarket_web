"use client"

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "sonner";

// store
import { postSocialLogin } from "@/api/auth";
import useAuthStore from '@/store/authStore';

const GoogleLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  // login 액션 가져오기
  const loginAction = useAuthStore((state) => state.login);
  const router = useRouter();
  const searchParams = useSearchParams();

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
      <p>clientId: {clientId}</p>
      {clientId && (
        <GoogleOAuthProvider clientId={clientId} onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')} onScriptLoadError={(err) => console.error('Google OAuth script failed to load', err)}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};

export default GoogleLoginButton;