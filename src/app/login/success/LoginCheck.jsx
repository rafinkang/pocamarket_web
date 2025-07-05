"use client"

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "sonner";

// store
import useAuthStore from '@/store/authStore';

const LoginCheck = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginAction = useAuthStore((state) => state.login);

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        // URL 파라미터에서 사용자 데이터 받기
        const userParam = searchParams.get('user');

        if (!userParam) {
          throw new Error('사용자 데이터를 받지 못했습니다.');
        }

        const userData = JSON.parse(userParam);

        // 필수 필드 검증
        const requiredFields = ['nickname', 'status', 'grade', 'gradeDesc', 'profileImageUrl', 'lastLoginAt'];
        const missingFields = requiredFields.filter(field => !userData[field]);

        if (missingFields.length > 0) {
          throw new Error(`필수 데이터가 누락되었습니다: ${missingFields.join(', ')}`);
        }

        // 로그인 상태 업데이트
        loginAction(userData);
        toast.success('로그인 성공! 환영합니다! 🎉');

        // 원래 페이지로 리디렉션
        setTimeout(() => {
          const redirectTo = searchParams.get('redirect') || '/';
          router.push(redirectTo);
        }, 500);

      } catch (error) {
        console.error('인증 콜백 처리 중 오류:', error);
        toast.error('로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => router.push('/login'), 500);
      }
    };

    processAuthCallback();
  }, [router, searchParams, loginAction]);

  // 토큰 처리 중임을 사용자에게 알려주는 UI
  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold mb-2">로그인 처리중...</h2>
        <p className="text-sm text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default LoginCheck;