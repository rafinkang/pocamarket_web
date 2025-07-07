"use client"

import { useMemo } from "react";
import ButtonGroup from "./ButtonGroup";
import moment from "moment"
import { getTradeStatusName, REQUEST, PROCESS, COMPLETE } from "@/constants/tradeStatus"

// 상태별 색상 매핑 (HEX)
const statusColorMap = {
  [REQUEST]: "#28afa4",   // 요청(민트)
  [PROCESS]: "#267bdc",   // 진행(파랑)
  [COMPLETE]: "#4CAF50",  // 완료(초록)
}

/**
 * TradeHeader 컴포넌트
 * - 반응형 헤더: 모바일은 세로, 데스크톱은 가로 배치
 */
export default function TradeHeader({ data, tradeId, isMy, isLogin }) {
  // 데이터에서 필요한 값 가공
  const { status, statusColor, createdAt } = useMemo(() => {
    if (!data) return {}
    const dataStatus = [PROCESS, COMPLETE].includes(data.status) ? data.status : REQUEST
    return {
      status: getTradeStatusName(dataStatus),
      statusColor: statusColorMap[dataStatus] || "#7B6FAD",
      createdAt: moment(data.createdAt).format('YYYY년 MM월 DD일 HH:mm'),
    }
  }, [data])


  return (
    <header className="flex mt-4 items-start sm:items-center justify-between w-full">
      {/* 좌측: 카드 교환 */}
      <h3 className="flex items-center gap-2 text-[#222] font-bold text-base ml-3 w-full">
        카드 교환
          {/* 상태(아이콘 + 텍스트) */}
          <span className="flex items-center">
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm border border-[${statusColor}]`}
              style={{
                color: statusColor,
                textShadow: '0 1px 2px rgba(0,0,0,0.08)'
              }}
            >
              {/* 아이콘 */}
              <svg
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" fill={statusColor} />
              </svg>
              {status}
            </span>
          </span>  
      </h3>
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full justify-end mr-2">
        <span className="text-[0.9rem] opacity-80 truncate">{createdAt}</span>
        <ButtonGroup tradeId={tradeId} data={data} isMy={isMy} isLogin={isLogin}/>
      </div>
    </header>
  )
}