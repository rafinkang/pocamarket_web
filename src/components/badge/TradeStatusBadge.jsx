import { getTradeStatusName, REQUEST, PROCESS, COMPLETE, DELETED, statusColorMap } from "@/constants/tradeStatus"
import { useMemo } from "react"

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
    <div className={`flex items-center ${className ? className : ""}`}>
      <span
        className={`flex items-center justify-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold shadow-sm bg-[#fff]`}
        style={{
          minWidth: '92px',
          color: statusColor,
          border: `2px solid ${statusColor}`,
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
    </div>
  )
}