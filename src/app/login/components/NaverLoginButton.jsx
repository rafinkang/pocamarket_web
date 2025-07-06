"use client"

import NaverIcon from "@/components/icon/NaverIcon";

const NaverLoginButton = ({theme = 'white'}) => {
  const handleNaverLogin = async () => {
    const successRedirectUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'}/login/success`;
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/oauth2/authorization/naver?redirect_uri=${encodeURIComponent(successRedirectUrl)}`;

    window.location.href = backendUrl;
  };
  
  return (
      <button 
        onClick={handleNaverLogin}
        className="w-full py-2 rounded flex items-center h-[40px] border border-gray-300 hover:bg-gray-50"
      >
        <NaverIcon theme={theme} size={38} />
        <span className="flex-1 text-center text-gray-800 text-sm font-medium truncate">네이버 계정으로 로그인</span>
      </button>
  );
}

export default NaverLoginButton;