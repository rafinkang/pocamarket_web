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
      <MyInfoPage className="w-full mb-4"/>

      <TcgCode  className="w-full mb-4"/>

      <MyTrade className="w-full mb-4"/>
      
      <Card className="w-full mb-4">
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

      

      <MyReport className="w-full mb-4"/>
      
    </>
  )
}
