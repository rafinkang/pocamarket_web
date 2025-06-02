'use client'
import PropTypes from 'prop-types'; // components property 정의하기 위해 import
import { useEffect, useState } from 'react';

//api
import { postLogin } from '@/api/login';

// components
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button"

// 클라이언트 컴포넌트 작성
export default function Login ({ test = null }) {
    useEffect(() => {
        console.log('test ::: ', test)
    }, [test])

    const [msg, setMsg] = useState('')

    async function loginHandler(formData) {
        console.log('login', formData.get('id'), formData.get('pwd'))

        try {
            await postLogin({ loginId: formData.get('id'), password: formData.get('pwd') });
            setMsg('로그인 성공!')
        } catch (error) {
            console.error('Error in postTest server action:', error);
            setMsg('로그인 실패!')
        }
    }

    return (
        <div className="flex items-center justify-center flex-col w-screen h-screen">
            <form action={loginHandler} className="w-3xs">
                <Input type="text" name="id" placeholder="아이디" required />
                <Input type="password" name="pwd" placeholder="비밀번호" className="mt-1" required />
                <Button type="submit" variant="red" className="mt-1 w-full">로그인</Button>
                {msg && <p>{msg}</p>}
            </form>
        </div>
    );
};

// 타입 정의
Login.propTypes = {
    test: PropTypes.string,
};
