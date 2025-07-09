'use client'
import { SIGNUP } from '@/constants/path';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types'; // components property 정의하기 위해 import
import { useEffect, useState } from 'react';
import { toast } from "sonner";

//api
import { postLogin } from '@/api/login';

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

// store
import useAuthStore from '@/store/authStore';

// 클라이언트 컴포넌트 작성
export default function Login({ test = null }) {
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // login 액션 가져오기
  const loginAction = useAuthStore((state) => state.login);
  // 로그인 후 변경된 상태를 보려면, 컴포넌트 최상위에서 구독
  const currentIsLogin = useAuthStore((state) => state.isLogin);
  const currentUser = useAuthStore((state) => state.user);
  const router = useRouter()
  const searchParams = useSearchParams();

  const handleLoginSuccess = async (userData) => {
    try {
      // 1. 로그인 상태 업데이트
      loginAction(userData);

      // 2. 성공 메시지 표시
      toast.success('로그인 성공! 환영합니다! 🎉');

      // 3. 로그인 시도 횟수 초기화
      setLoginAttempts(0);

      // 4. 잠시 후 리다이렉트 (사용자가 메시지를 볼 수 있도록)
      setTimeout(() => {
        const redirectTo = searchParams.get('redirect') || '/';
        router.push(redirectTo);
      }, 1500);

    } catch (error) {
      console.error('Login success handling error:', error);
      setMsg('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleLoginError = (error) => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= 5) {
      setMsg('로그인 시도 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요.');
      // 5분 후 재시도 가능하도록 설정
      setTimeout(() => setLoginAttempts(0), 5 * 60 * 1000);
    } else {
      setMsg(`로그인 실패! (${newAttempts}/5) 아이디와 비밀번호를 확인해주세요.`);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    setIsLoading(true);
    setMsg('')

    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await postLogin({ loginId: formData.get('id'), password: formData.get('pwd') })
      await handleLoginSuccess(data);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // 미들웨어에서 리디렉션된 경우 로그인 상태 초기화
    const reason = searchParams.get('reason');
    if (reason === 'auth_required') {
      console.log('미들웨어에서 리디렉션: 로그인 상태 초기화');
      useAuthStore.getState().clear();
      setMsg('로그인이 필요합니다. 다시 로그인해주세요.');
    }
  }, []);

  useEffect(() => {
    // TODO 로그인 성공 후 프로세스 정의
    if (currentIsLogin && currentUser) {
      // 이전 페이지로 리다이렉트하거나 기본값으로 마이페이지
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }
  }, [test, currentIsLogin, currentUser, searchParams, router])


  return (
    <div className="flex flex-col gap-6">
      {currentIsLogin && currentUser && (
        <div className="mt-4 p-4 border rounded bg-green-50">
          <p className="text-green-800">현재 로그인된 사용자: {currentUser.nickname}</p>
          <p className="text-green-600 text-sm">마지막 로그인 일시: {currentUser.lastLoginAt}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>POCAMARKET</CardTitle>
          <CardDescription>
            로그인하고 다양한 서비스를 이용해보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="id">아이디</Label>
              <Input
                id="id"
                type="id"
                name="id"
                placeholder="아이디"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="pwd">비밀번호</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  비밀번호 찾기
                </a> */}
              </div>
              <Input
                id="pwd"
                type="password"
                name="pwd"
                required
                disabled={isLoading}
              />
            </div>

            {/* 메시지 표시 영역 */}
            {msg && (
              <div className={`p-3 rounded text-sm ${msg.includes('성공')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}>
                {msg}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                variant="red"
                className="w-full"
                disabled={isLoading || loginAttempts >= 5}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            아직 회원이 아니신가요?
            <Link href={SIGNUP} className="underline underline-offset-4">회원가입</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 타입 정의
Login.propTypes = {
  test: PropTypes.string,
};