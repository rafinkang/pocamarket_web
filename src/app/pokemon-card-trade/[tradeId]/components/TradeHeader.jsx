"use client"

import { useMemo } from "react"
import { getTradeStatusName, REQUEST, PROCESS, COMPLETE } from "@/constants/tradeStatus"
import moment from "moment"
import statusStyles from "src/styles/trade-status.module.scss"
import { cn } from "@/lib/utils"

// 상태별 색상 매핑 (HEX)
const statusColorMap = {
  [REQUEST]: "#28afa4",   // 요청(민트)
  [PROCESS]: "#267bdc",   // 진행(파랑)
  [COMPLETE]: "#4CAF50",  // 완료(초록)
}

/**
 * TradeHeader 컴포넌트
 * - 반응형 헤더: 모바일은 세로, 데스크톱은 가로 배치
 * - 좌측: 카드 교환 텍스트
 * - 우측: 보라색 그라데이션 영역(상태, 날짜, 닉네임)
 */
export default function TradeHeader({ data }) {
  // 데이터에서 필요한 값 가공
  const { nickname, status, createdAt, statusColor } = useMemo(() => {
    if (!data) return {}
    const dataStatus = [PROCESS, COMPLETE].includes(data.status) ? data.status : REQUEST
    return {
      nickname: data.nickname,
      status: getTradeStatusName(dataStatus),
      createdAt: moment(data.createdAt).format('YYYY년 MM월 DD일 HH:mm'),
      statusColor: statusColorMap[dataStatus] || "#7B6FAD",
    }
  }, [data])

  return (
    <header className="flex flex-col md:flex-row mt-4 items-center justify-between w-full">
      {/* 좌측: 카드 교환 */}
      <div className="flex items-center justify-start px-3 w-full">
        <h3 className="text-[#222] font-bold text-base">카드 교환</h3>
      </div>
      {/* 우측: 보라색 그라데이션 영역 (반응형 width) */}
      <div className="flex items-center justify-end px-4 py-1 md:rounded-l-xl bg-gradient-to-r from-[#5670FF] to-[#8D38FD] min-w-[180px] w-full md:w-3/5">
        {/* 상태(몬스터볼 아이콘 + 텍스트) */}
        <span className="flex items-center mr-4">
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm border border-white"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            {/* 몬스터볼 아이콘 */}
            <svg
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" fill={statusColor} />
              <circle cx="10" cy="10" r="3" fill={statusColor} />
            </svg>
            {status}
          </span>
        </span>
        {/* 생성 시간 */}
        <span className="mr-2 text-xs text-white whitespace-nowrap">{createdAt}</span>
        {/* 닉네임 */}
        <span className="text-xs text-white whitespace-nowrap">{nickname}</span>
      </div>
    </header>
  )
}

// 상태별 스타일 매핑 (기존 유지)
const statusClassMap = {
  [REQUEST]: statusStyles['badge-request'],
  [PROCESS]: statusStyles['badge-process'],
  [COMPLETE]: statusStyles['badge-complete'],
};