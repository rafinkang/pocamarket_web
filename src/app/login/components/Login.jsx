'use client'
import PropTypes from 'prop-types'; // components property 정의하기 위해 import
import { useEffect, useState } from 'react';

//api
import { postLogin } from '@/api/login';

// components
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button"

// store
import useAuthStore from '@/store/authStore';

// 클라이언트 컴포넌트 작성
export default function Login ({ test = null }) {
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    // login 액션 가져오기
    const loginAction = useAuthStore((state) => state.login);
    // 로그인 후 변경된 상태를 보려면, 컴포넌트 최상위에서 구독
    const currentIsLogin = useAuthStore((state) => state.isLogin);
    const currentUser = useAuthStore((state) => state.user);

    useEffect(() => {
        console.log('test ::: ', test)

        // TODO 로그인 성공 후 프로세스 정의
        if (currentIsLogin && currentUser) {
        }
    }, [test, currentIsLogin, currentUser])

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
            console.error('Error in postTest server action:', error);
            setMsg('로그인 실패!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center flex-col w-screen h-screen">
            <form onSubmit={handleSubmit} className="w-3xs">
                <Input type="text" name="id" placeholder="아이디" required />
                <Input type="password" name="pwd" placeholder="비밀번호" className="mt-1" required />
                <Button type="submit" variant="red" className="mt-1 w-full" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>
                {msg && <p>{msg}</p>}
            </form>
            {currentIsLogin && currentUser && (
                <div className="mt-4 p-4 border rounded">
                    <p>현재 로그인된 사용자: {currentUser.nickname}</p>
                    <p>마지막 로그인 일시: {currentUser.lastLoginAt}</p>
                </div>
            )}
        </div>
    );
};

// 타입 정의
Login.propTypes = {
    test: PropTypes.string,
};
