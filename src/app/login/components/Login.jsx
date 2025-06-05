'use client'
import PropTypes from 'prop-types'; // components property 정의하기 위해 import
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SIGNUP } from '@/constants/path';

//api
import { postLogin } from '@/api/login';

// components
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// store
import useAuthStore from '@/store/authStore';

// 클라이언트 컴포넌트 작성
export default function Login ({ test = null }) {
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    // login 액션 가져오기
    const loginAction = useAuthStore((state) => state.login);
    // 로그인 후 변경된 상태를 보려면, 컴포넌트 최상위에서 구독
    const currentIsLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const currentUser = useAuthStore((state) => state.user);

    useEffect(() => {
        console.log('test ::: ', test)

        // TODO 로그인 성공 후 프로세스 정의
        if (currentIsLoggedIn && currentUser) {
        }
    }, [test, currentIsLoggedIn, currentUser])

    async function handleSubmit(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        setIsLoading(true);
        setMsg('')

        const formData = new FormData(event.currentTarget);

        try {
            const { data } = await postLogin({ loginId: formData.get('id'), password: formData.get('pwd') })
            loginAction(data); 
            setMsg('로그인 성공!')
        } catch (error) {
            setMsg('로그인 실패!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {currentIsLoggedIn && currentUser && (
                <div className="mt-4 p-4 border rounded">
                    <p>현재 로그인된 사용자: {currentUser.nickname}</p>
                    <p>마지막 로그인 일시: {currentUser.lastLoginAt}</p>
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
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                            <Label htmlFor="pwd">비밀번호</Label>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                비밀번호 찾기
                            </a>
                            </div>
                            <Input id="pwd" type="password" name="pwd" required />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button type="submit" variant="red"  className="w-full" disabled={isLoading}>
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