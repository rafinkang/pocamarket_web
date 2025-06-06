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

export default function MyInfoPage() {
  const [myInfo, setMyInfo] = useState(null);

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
        {!myInfo && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="mx-10 h-[125px] rounded-xl" />
            <div className="space-y-2 space-x-3.5">
              <Skeleton className="mx-10 h-4 w-2/3" />
              <Skeleton className="mx-10 h-4 w-1/3" />
            </div>
          </div>
        )}
        {myInfo && (
          <>
          <CardHeader>
            <CardTitle>{myInfo.nickname}님의 정보</CardTitle>
            <CardDescription>{myInfo.grade} 등급입니다.</CardDescription>
            <CardAction>
              <Button variant="ghost">수정</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>이름: {myInfo.name}</p>
            <p>아이디: {myInfo.loginId}</p>
            <p>이메일: {myInfo.email}</p>
            <p>전화번호: {myInfo.phone}</p>
          </CardContent>
          </>
        )}
      </Card>
    </>
  )
}