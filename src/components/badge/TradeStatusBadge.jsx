import { getTradeStatusName, REQUEST, PROCESS, COMPLETE } from "@/constants/tradeStatus"
import { useMemo } from "react"

// 상태별 색상 매핑 (HEX)
const statusColorMap = {
  [REQUEST]: "#28afa4",   // 요청(민트)
  [PROCESS]: "#267bdc",   // 진행(파랑)
  [COMPLETE]: "#4CAF50",  // 완료(초록)
}

export default function TradeStatusBadge({ status, className }) {
  // 데이터에서 필요한 값 가공
  const { statusName, statusColor } = useMemo(() => {
    if (!status) return {}
    const tempStatus = [PROCESS, COMPLETE].includes(status) ? status : REQUEST
    return {
      statusName: getTradeStatusName(tempStatus),
      statusColor: statusColorMap[tempStatus] || "#7B6FAD",
    }
  }, [status])

  return (
    <span className={`flex items-center ${className}`}>
      <span
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm border border-[${statusColor}] bg-[#fff]`}
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
        {statusName}
      </span>
    </span>
  )
}