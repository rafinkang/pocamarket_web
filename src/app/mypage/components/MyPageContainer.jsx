"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MyInfoPage from "./MyInfo"
import TcgCode from "./TcgCode"
import MyReport from "./MyReport"
import MyTrade from "./MyTrade"


export default function MyPageContainer() {


  return (
    <>
      <MyInfoPage />

      <TcgCode />

      <MyTrade />
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>나의 덱</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>덱 목록 출력</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      

      <MyReport />
      
    </>
  )
}
