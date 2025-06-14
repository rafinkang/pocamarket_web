"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const tradeStats = [
  { label: '진행중인 교환', count: 1, variant: 'default', link: '/trade/my-trade/ongoing' },
  { label: '내가 신청한 교환', count: 9, variant: 'Secondary', link: '/trade/my-trade/requested' },
  { label: '완료된 교환', count: 99, variant: 'default', link: '/trade/my-trade/completed' },
  { label: '신고당한 횟수', count: 0, variant: 'destructive' },
  { label: '거래 점수', count: 999, variant: 'default' },
  { label: '포인트?', count: 9999, variant: 'outline' }
];

// 공통 스타일을 변수로 정의
const listItemClassName = "flex justify-center-safe items-center gap-2";
const badgeClassName = "h-5 min-w-5 rounded-full px-1 font-mono tabular-nums";

export default function MyTrade() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>나의 교환</CardTitle>
        <CardDescription>카드교환 상세정보</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tradeStats.map((stat, index) => (
            <li key={index} className={listItemClassName}>
              <Link href={stat?.link || '#'}>{stat.label}</Link>
              <Badge
                className={badgeClassName}
                variant={stat.variant}
              >
                {stat.count}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}