"use client"

import { getMyTcgTradeInfo } from "@/api/tcgTrade";
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
import { useEffect, useState } from "react";

/**
 * 기본 거래 통계 템플릿 정의
 */
const DEFAULT_TRADE_STATS = [
  {
    label: '진행중인 교환',
    count: 0,
    variant: 'outline',
    link: '/trade/my-trade/ongoing',
    dataKey: 'tradingCount' // API 응답의 어떤 키와 매칭될지 정의
  },
  {
    label: '내가 신청중인 교환',
    count: 0,
    variant: 'outline',
    link: '/trade/my-trade/requested',
    dataKey: 'requestCount'
  },
  {
    label: '완료된 교환',
    count: 0,
    variant: 'outline',
    link: '/trade/my-trade/completed',
    dataKey: 'tradeCount'
  },
  {
    label: '신고당한 횟수',
    count: 0,
    variant: 'destructive',
    dataKey: 'reportCount'
  },
  {
    label: '거래 점수',
    count: 0,
    variant: 'default',
    dataKey: 'exp'
  },
  {
    label: '포인트',
    count: 0,
    variant: 'default',
    dataKey: 'point'
  }
];

// 공통 스타일을 변수로 정의
const listItemClassName = "flex justify-center-safe items-center gap-2";
const badgeClassName = "h-5 min-w-5 rounded-full px-1 font-mono tabular-nums";

export default function MyTrade({ className }) {
  const [tradeStats, setTradeStats] = useState(DEFAULT_TRADE_STATS);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * API 응답 데이터를 tradeStats에 매핑하는 함수
   * @param {Object} apiData API에서 받은 데이터
   * @returns {Array} 업데이트된 tradeStats 배열
   */
  const mapApiDataToTradeStats = (apiData) => {
    return DEFAULT_TRADE_STATS.map(stat => ({
      ...stat,
      count: apiData[stat.dataKey] !== undefined ? apiData[stat.dataKey] : stat.count
    }));
  };

  useEffect(() => {
    const fetchTradeInfo = async () => {
      try {
        setIsLoading(true);
        const res = await getMyTcgTradeInfo();
        console.log('API 응답:', res);

        // API 응답에서 data 부분 추출
        const apiData = res?.data || {};

        // API 데이터를 tradeStats에 매핑
        const updatedStats = mapApiDataToTradeStats(apiData);
        setTradeStats(updatedStats);

      } catch (error) {
        console.error('거래 정보 조회 실패:', error);
        // 에러 발생 시 기본값 유지
      } finally {
        setIsLoading(false);
      }
    };

    fetchTradeInfo();
  }, []);

  return (
    <Card className={`${className}`}>
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
                {isLoading ? '...' : stat.count}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}