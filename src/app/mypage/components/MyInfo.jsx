"use client"

import { useEffect, useState } from "react"
import { getMyInfo } from "@/api/users"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MyInfoPage() {
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

  return (
    <>
      <Card className="w-full">
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
              <CardTitle>{myInfo.name}님의 정보</CardTitle>
              <CardDescription>{myInfo.grade} 등급입니다.</CardDescription>
              <CardAction>
                {isUpdate ? (
                  <Button variant="ghost" onClick={() => setIsUpdate(false)}>취소</Button>
                ) : (
                  <Button variant="ghost" onClick={() => setIsUpdate(true)}>수정</Button>
                )}
              </CardAction>
            </CardHeader>
            {isUpdate ? (
              <>
                <CardContent className="flex flex-col gap-2">
                  <Input type="text" placeholder="아이디" defaultValue={myInfo.loginId}  />
                  <Input type="password" placeholder="비밀번호" defaultValue={myInfo.password} />
                  <Input type="text" placeholder="닉네임" defaultValue={myInfo.nickname} />
                  <Input type="text" placeholder="이메일" defaultValue={myInfo.email} />
                  <Input type="text" placeholder="전화번호" defaultValue={myInfo.phone} />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" onClick={() => setIsUpdate(false)}>수정</Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardContent className="flex flex-col gap-2">
                  <p>아이디: {myInfo.loginId}</p>
                  <p>닉네임: {myInfo.nickname}</p>
                  <p>이메일: {myInfo.email}</p>
                  <p>전화번호: {myInfo.phone}</p>
                </CardContent>
              </>
            )}
          </>
        )}
      </Card>
    </>
  )
}