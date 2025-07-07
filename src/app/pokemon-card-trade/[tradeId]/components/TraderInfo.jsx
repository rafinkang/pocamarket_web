"use client"

import { useMemo } from "react"

export default function TraderInfo({ data, tradeId, isMy, isLogin }) {
  // 데이터에서 필요한 값 가공
  const { nickname } = useMemo(() => {
    if (!data) return {}
    return {
      nickname: data.nickname,
    }
  }, [data])

  return (
    <div className="sm:items-stretch gap-3 sm:gap-6 px-4 py-3 bg-gradient-to-r from-[#5670FF] to-[#8D38FD] w-full mx-auto shadow-md">
      {/* 정보 영역 */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 w-full">
          {/* 닉네임 */}
          <span className="text-[0.9rem] text-white font-semibold truncate max-w-[120px] sm:max-w-[160px]">{nickname}</span>
        </div>
      </div>
    </div>
  )
}
