"use client"

import { useMemo } from "react";
import ButtonGroup from "./ButtonGroup";
import TradeStatusBadge from "@/components/badge/TradeStatusBadge";
import moment from "moment"
import { getStatusColor, REQUEST, SELECT, PROCESS, COMPLETE } from "@/constants/tradeStatus"

/**
 * TradeHeader 컴포넌트
 * - 반응형 헤더: 모바일은 세로, 데스크톱은 가로 배치
 */
export default function TradeHeader({ data, tradeId, isMy, isLogin }) {
  // 데이터에서 필요한 값 가공
  const { status, statusColor, createdAt } = useMemo(() => {
    if (!data) return {}
    const dataStatus = [SELECT, PROCESS, COMPLETE].includes(data.status) ? data.status : REQUEST
    return {
      status: dataStatus,
      statusColor: getStatusColor(dataStatus) || "#7B6FAD",
      createdAt: moment(data.createdAt).format('YYYY년 MM월 DD일 HH:mm'),
    }
  }, [data])


  return (
    <header className="flex mt-4 items-start sm:items-center justify-between w-full">
      {/* 좌측: 카드 교환 */}
      <h3 className="flex items-center gap-2 text-[#222] font-bold text-base ml-3 w-full">
        카드 교환
          {/* 상태(아이콘 + 텍스트) */}
          <TradeStatusBadge status={data.status} />
      </h3>
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full justify-end mr-2">
        <span className="text-[0.9rem] opacity-80 truncate">{createdAt}</span>
        <ButtonGroup tradeId={tradeId} data={data} isMy={isMy} isLogin={isLogin}/>
      </div>
    </header>
  )
}