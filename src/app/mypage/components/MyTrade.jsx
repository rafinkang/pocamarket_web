"use client"

import { getMyTcgTradeInfo } from "@/api/tcgTrade";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  Coins,
  ArrowRight
} from "lucide-react";
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
    dataKey: 'tradingCount',
    icon: Activity,
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-600'
  },
  {
    label: '내가 신청중',
    count: 0,
    variant: 'outline',
    link: '/trade/my-trade/requested',
    dataKey: 'requestCount',
    icon: Clock,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-600'
  },
  {
    label: '완료된 교환',
    count: 0,
    variant: 'outline',
    link: '/trade/my-trade/completed',
    dataKey: 'tradeCount',
    icon: CheckCircle,
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-600'
  },
  {
    label: '신고당한 횟수',
    count: 0,
    variant: 'destructive',
    dataKey: 'reportCount',
    icon: AlertTriangle,
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    iconColor: 'text-red-600'
  },
  {
    label: '거래 점수',
    count: 0,
    variant: 'default',
    dataKey: 'exp',
    icon: Star,
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    iconColor: 'text-purple-600'
  },
  {
    label: '포인트',
    count: 0,
    variant: 'default',
    dataKey: 'point',
    icon: Coins,
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    iconColor: 'text-orange-600'
  }
];

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
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">나의 교환</CardTitle>
            <CardDescription className="text-gray-600">
              카드 교환 활동 현황을 확인하세요
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 상위 3개 주요 통계 */}
        <div className="grid grid-cols-1 gap-3">
          {tradeStats.slice(0, 3).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link 
                key={index} 
                href={stat?.link || '#'}
                className="group block"
              >
                <div className={`${stat.bgColor} rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-md border border-transparent hover:border-${stat.color}-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                        <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${stat.textColor}`}>
                          {stat.label}
                        </p>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {isLoading ? '...' : stat.count}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 ${stat.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 하위 통계들 */}
        <div className="grid grid-cols-1 gap-3 pt-2 border-t border-gray-100">
          {tradeStats.slice(3).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index + 3} className={`${stat.bgColor} rounded-lg p-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                    <span className={`text-sm font-medium ${stat.textColor}`}>
                      {stat.label}
                    </span>
                  </div>
                  <Badge
                    className={`${stat.textColor} bg-white border-0 font-bold`}
                    variant="outline"
                  >
                    {isLoading ? '...' : stat.count}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}