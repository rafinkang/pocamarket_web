'use client'
import { useState } from 'react';
import Link from 'next/link';
import { LOGIN } from '@/constants/path';

// api
import { postRegister } from '@/api/register';

// utils
import { validateLoginId, validatePassword, validateName, validateNickname } from '@/utils/validation';
import { useFormValidation } from '@/hooks/useFormValidation';

// components
import { ValidationInput } from '@/components/input/ValidationInput';
import {Button} from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const initialFormValues = {
    id: '',
    name: '',
    nickname: '',
    pwd: '',
};
const rules = {
    id: validateLoginId,
    name: validateName,
    nickname: validateNickname,
    pwd: validatePassword,
};
const requiredFields = ['id', 'name', 'nickname', 'pwd'];

export default function Login () {
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const {
        values,
        errors,
        isFormValid,
        handleChange,
        triggerFullValidation,
        resetForm
    } = useFormValidation(initialFormValues, rules, requiredFields);

    async function handleSubmit(event) {
        event.preventDefault();
        
        // 제출 시 전체 유효성 검사 실행
        const isCurrentlyValid = triggerFullValidation();

        if (!isCurrentlyValid || !isFormValid) { // isFormValid도 함께 체크
            setFormMsg('입력값을 다시 확인해주세요.');
            return;
        }

        setIsLoading(true);
        setMsg('')

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name'),
            nickname: formData.get('nickname'),
            loginId: formData.get('id'),
            password: formData.get('pwd')
        }

        try {
            await postRegister(data)
            setMsg('회원가입 완료!')
            resetForm(); // 폼 초기화
        } catch (error) {
            setMsg('회원가입 실패! ::: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>회원가입</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="id">* 아이디</Label>
                            <ValidationInput
                                id="id"
                                type="id"
                                name="id"
                                // validation={validateLoginId}
                                value={values.id}
                                onChange={handleChange}
                                errorMessage={errors.id}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name">* 이름</Label>
                            <ValidationInput
                                id="name"
                                type="name"
                                name="name"
                                // validation={validateName}
                                value={values.name}
                                onChange={handleChange}
                                errorMessage={errors.name}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="nickname">* 닉네임</Label>
                            <ValidationInput
                                id="nickname"
                                type="nickname"
                                name="nickname"
                                // validation={validateNickname}
                                value={values.nickname}
                                onChange={handleChange}
                                errorMessage={errors.nickname}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                            <Label htmlFor="pwd">* 비밀번호</Label>
                            </div>
                            <ValidationInput
                                id="pwd"
                                type="password"
                                name="pwd"
                                // validation={validatePassword}
                                value={values.pwd}
                                onChange={handleChange}
                                errorMessage={errors.pwd}
                                required 
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            { msg }
                            <Button type="submit" variant="red"  className="w-full" disabled={!isFormValid || isLoading}>
                                {isLoading ? '회원가입 중...' : '회원가입'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        <Link href={LOGIN} className="underline underline-offset-4">로그인하기</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};