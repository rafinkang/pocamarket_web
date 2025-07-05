import { Suspense } from 'react';
import Login from './components/Login';
import GoogleLogin from './components/GoogleLoginButton';
import NaverLogin from './components/NaverLoginButton';

/**
 * 로딩 컴포넌트
 */
function LoginLoading() {
    return (
        <div className="flex flex-1 items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * 로그인 페이지
 */
export default function LoginPage() {
    return (
        <div className="flex flex-1 items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Suspense fallback={<LoginLoading />}>
                    <Login test="test!!!" />
                    <div className="flex flex-col justify-center mt-4 gap-4">
                        <GoogleLogin />
                        <NaverLogin />
                    </div>
                </Suspense>
            </div>
        </div>
    );
}
