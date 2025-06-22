"use client"

import { deleteMyInfo, getMyInfo } from "@/api/users"
import AlertDialog from "@/components/dialog/AlertDialog"
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import useAuthStore from "@/store/authStore"
import { useEffect, useState } from "react"
import PasswordChangeDialog from "./PasswordChangeDialog"

export default function MyInfoPage({ className }) {
  const [myInfo, setMyInfo] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    async function fetchMyInfo() {
      const res = await getMyInfo();
      console.log('res ::: ', res);
      if (res && res.data) {
        setMyInfo(res.data);
      }
    }
    fetchMyInfo();
  }, [])

  const withdrawUser = async () => {
    const res = await deleteMyInfo().then((result) => {
      console.log('result ::: ', result);
      if (result && result.success == true) {
        // 탍퇴처리 완료 후 로그아웃
        useAuthStore.getState().logout();
      }
    }).catch((err) => {
      console.log('err ::: ', err);
    });
  }

  const updateUserInfo = () => {
    console.log('회원 정보 변경');
  }

  return (
    <>
      <Card className={`${className}`}>
        {!myInfo ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="mx-10 h-[125px] rounded-xl" />
            <div className="space-y-2 space-x-3.5">
              <Skeleton className="mx-10 h-4 w-2/3" />
              <Skeleton className="mx-10 h-4 w-1/3" />
            </div>
          </div>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{myInfo.nickname}님의 정보</CardTitle>
              <CardDescription>현재 등급은 {myInfo.gradeDesc} 입니다.</CardDescription>
            </CardHeader>
            {isUpdate ? (
              <>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">아이디</p>
                    <Input type="text" placeholder="아이디" defaultValue={myInfo.loginId} disabled />

                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">닉네임</p>
                    <Input type="text" placeholder="닉네임" defaultValue={myInfo.nickname} disabled />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">이메일</p>
                    <Input type="text" placeholder="이메일" defaultValue={myInfo.email} />
                    <div className="flex flex-row gap-2 justify-end">
                      <Button variant="outline" onClick={() => alert("준비중입니다.")}>인증</Button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="min-w-20">전화번호</p>
                    <Input type="text" placeholder="전화번호" defaultValue={myInfo.phone} />
                    <div className="flex flex-row gap-2 justify-end">
                      <Button variant="outline" onClick={() => alert("준비중입니다.")}>인증</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <AlertDialog handleOk={updateUserInfo} isConfrim={true} title="회원 정보 변경" msg="입력하신 내용으로 회원정보가 변경됩니다.">
                    <Button variant="outline">저장</Button>
                  </AlertDialog>
                  <Button variant="outline" onClick={() => setIsUpdate(false)}>취소</Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardContent className="grid grid-cols-1 items-start md:grid-cols-2 gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/images/profile_default.png" alt="프로필이미지" />
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">{myInfo.nickname}</h3>
                      <p className="text-sm text-gray-500">{myInfo.gradeDesc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <span>이름</span>
                    <p>{myInfo.name}</p>
                    <span>이메일</span>
                    <p>{myInfo.email}</p>
                    <span>전화번호</span>
                    <p>{myInfo.phone}</p>
                    <span>회원가입일</span>
                    <p>{myInfo.createdAt.split('T')[0]}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUpdate(true)}>회원 정보 변경</Button>
                  <PasswordChangeDialog>
                    <Button variant="outline">비밀번호 변경</Button>
                  </PasswordChangeDialog>
                  <AlertDialog handleOk={withdrawUser} isConfrim={true} title="회원 탈퇴" msg="정말로 포카마켓을 탈퇴하시겠습니까ㅠㅠ?">
                    <Button variant="destructive">회원 탈퇴</Button>
                  </AlertDialog>
                </CardFooter>
              </>
            )}
          </>
        )}
      </Card>
    </>
  )
}