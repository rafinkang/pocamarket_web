"use client"

import { useMemo } from "react"
import TradeReport from "./TradeReport"
import { toast } from "sonner"
import { copyToClipboard } from "@/lib/utils"

/**
 * TraderInfo 컴포넌트
 * 부모로부터 받은 data의 userInfo 정보를 예쁘게 표시합니다.
 * @param {Object} data - 트레이더 정보 데이터
 * @param {boolean} isMy - 본인 여부
 * @param {boolean} isLogin - 로그인 여부
 */
export default function TraderInfo({ data, isMy, isLogin, openTcgCode }) {
  // 데이터에서 필요한 값 가공
  const { nickname, userInfo } = useMemo(() => {
    if (!data) return { userInfo: {} }
    return {
      nickname: data.nickname,
      userInfo: data.userInfo || {},
    }
  }, [data])

  const handleCopyTcgCode = (openTcgCode) => {
    copyToClipboard(openTcgCode, () => {
      toast.success("친구코드가 복사되었습니다.");
    }, () => {
      toast.error("친구코드 복사에 실패했습니다.");
    });
  }

  // userInfo에서 각 값 추출
  const { tradeCount = 0, reportCount = 0, exp = 0 } = userInfo || {}

  return (
    <div className="sm:items-stretch gap-3 sm:gap-6 px-4 py-3 bg-gradient-to-r from-[#5670FF] to-[#8D38FD] w-full mx-auto shadow-md">
      {/* 정보 영역 */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex justify-between sm:flex-row sm:items-center gap-1 sm:gap-3 w-full">
          {/* 닉네임 */}
          <span className="text-[1.2rem] text-white font-semibold truncate max-w-[120px] sm:max-w-[160px]">
            {nickname}
          </span>
          {/* 신고 버튼 */}
          {!isMy && isLogin && <TradeReport />}
        </div>
        {/* 유저 정보 영역 */}
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 mt-2">
          {/* 교환 횟수 */}
          <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 min-w-[80px]">
            <span className="text-white text-[1rem]">🔄</span>
            <span className="text-white text-xs">교환</span>
            <span className="text-white text-sm font-bold ml-1">{tradeCount}</span>
          </div>
          {/* 신고 횟수 */}
          <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 min-w-[80px]">
            <span className="text-white text-[1rem]">🚩</span>
            <span className="text-white text-xs">신고</span>
            <span className="text-white text-sm font-bold ml-1">{reportCount}</span>
          </div>
          {/* 유저 경험치 */}
          <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 min-w-[80px]">
            <span className="text-white text-[1rem]">⭐</span>
            <span className="text-white text-xs">경험치</span>
            <span className="text-white text-sm font-bold ml-1">{exp}</span>
          </div>
          {openTcgCode && (
            <div className="flex items-center gap-1 bg-white/10 rounded px-2 py-1 min-w-[80px] cursor-pointer" onClick={() => handleCopyTcgCode(openTcgCode)}>
              <span className="text-white text-[1rem]">🔑</span>
              <span className="text-white text-xs">친구코드</span>
              <span className="text-white text-sm font-bold ml-1">{openTcgCode}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
