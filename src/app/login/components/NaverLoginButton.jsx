"use client"

const NaverLoginButton = () => {
  const handleNaverLogin = async () => {
    const successRedirectUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'}/login/success`;
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/oauth2/authorization/naver?redirect_uri=${encodeURIComponent(successRedirectUrl)}`;

    window.location.href = backendUrl;
  };
  
  return (
    <div>
      <button 
        onClick={handleNaverLogin}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        네이버 로그인
      </button>
    </div>
  );
}

export default NaverLoginButton;