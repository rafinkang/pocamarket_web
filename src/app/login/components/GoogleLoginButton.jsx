"use client"

import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = async (response) => {
    console.log(response);

    if (!response?.credential) {
      console.error("Google 인증 토큰을 받지 못했습니다.");
      return;
    }
    // Google의 ID 토큰 추출
    const idToken = response.credential;


// auth/social/login/google
    try {
      // 백엔드 서버로 ID 토큰 전송
      const res = await fetch('http://localhost:8080/auth/social/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: idToken,
          provider: 'google',
          redirectUri: 'http://localhost:3000'
        })
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }


      window.location.href = '/';
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Google 로그인 실패:", error);
  };

  return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
        />
      </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;