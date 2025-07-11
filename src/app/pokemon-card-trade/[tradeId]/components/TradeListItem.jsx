"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import TradeReportDialog from "./TradeReportDialog"
import PokemonCard from "@/components/card/PokemonCard"
import { useState, useEffect } from "react"
import { REQUEST_DELETED, REQUEST_SUBMITTED, REQUEST_COMPLETE, getTradeRequestStatusName, REQUEST_PROCESS } from "@/constants/tradeRequestStatus"
import { cn } from "@/lib/utils"
import { postUserReport } from "@/api/usersReport"
import { toast } from "sonner"
import { copyToClipboard } from "@/lib/utils"

const testMode = process.env.NODE_ENV === "development"

/**
 * TradeListItem 컴포넌트
 * - 교환 요청 카드 리스트의 각 아이템
 */
export default function TradeItem({ isLogin, isMy, id, card, onRequestCancel, onRequestAccept, onOpenOkChange }) {
  const activeClass = "bg-blue-500 text-white"
  const [isReportOpen, setIsReportOpen] = useState(false)


  /**
   * 신고 처리 함수
   * @param {Object} param0 - 신고 사유 및 상세 내용
   */
  const handleReport = async ({ reportReason, reportDetail }) => {
    const requestData = {
      refId: card.id,
      refType: "TRADE_REQUEST",
      refStatus: card.status,
      link: window.location.href,
      content: `${reportReason}:${reportDetail}`,
    }
    await postUserReport(requestData)
    onOpenOkChange(true)
  }

  const handleCopyTcgCode = (openTcgCode) => {
    copyToClipboard(openTcgCode, () => {
      toast.success("친구코드가 복사되었습니다.");
    }, () => {
      toast.error("친구코드 복사에 실패했습니다.");
    });
  }

  /**
   * 교환 취소 버튼 변수
   */
  const cancelButton = 
  !isMy && card.isMy && (card.status !== REQUEST_COMPLETE || card.status !== REQUEST_DELETED) && (
    <Button
      variant="outline"
      onClick={() => onRequestCancel(card.id)}
      className="text-xs px-3 h-[30px] font-bold"
    >
      교환 취소
    </Button>
  )

  /**
   * 신고 버튼 변수
   */
  const reportButton = (
    <Button variant="errorText" onClick={() => setIsReportOpen(true)} className="text-xs px-3 h-[30px] font-bold">
      신고하기
    </Button>
  )

  /**
   * 내 카드일 때의 액션 버튼 변수
   */
  const myActionButtons = isMy && (
    <>
      {card.status == REQUEST_SUBMITTED && (
        <Button onClick={() => onRequestAccept(card.id, card.status)} className="text-xs px-3 h-[30px] font-bold">
          교환 수락
        </Button>
      )}
      {card.status == REQUEST_PROCESS && (
        <Button onClick={() => onRequestAccept(card.id, card.status)} className="text-xs px-3 h-[30px] font-bold">
          교환 완료
        </Button>
      )}
      {card.status == REQUEST_COMPLETE && (
        <span className="text-gray-500 text-sx">교환 완료</span>
      )}
    </>
  )

  /**
   * 유저 정보(닉네임, 교환/신고/경험치) 블록 변수
   */
  const userInfoBlock = (
    <div className="flex items-start flex-wrap min-w-[90px] mr-4 gap-2">
      {/* 닉네임 */}
      <span className="text-[1rem] text-black font-semibold truncate max-w-[120px]">{card.nickname}</span>
      {/* 교환 횟수 */}
      <div className="flex items-center gap-1">
        <span className="text-[1rem]">🔄</span>
        <span className="text-xs text-black">교환</span>
        <span className="text-sm font-bold ml-1 text-black">{card.tradeCount}</span>
      </div>
      {/* 신고 횟수 */}
      <div className="flex items-center gap-1">
        <span className="text-[1rem]">🚩</span>
        <span className="text-xs text-black">신고</span>
        <span className="text-sm font-bold ml-1 text-black">{card.reportCount}</span>
      </div>
      {/* 경험치 */}
      <div className="flex items-center gap-1">
        <span className="text-[1rem]">⭐</span>
        <span className="text-xs text-black">경험치</span>
        <span className="text-sm font-bold ml-1 text-black">{card.exp}</span>
      </div>
      {/* 친구코드 */}
      {card.tcgCode && card.tcgCode !== '' && (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleCopyTcgCode(card.tcgCode)}>
          <span className="text-[1rem]">🔑</span>
          <span className="text-xs text-black">친구코드</span>
          <span className="text-sm font-bold ml-1 text-blue-600">{card.tcgCode}</span>
        </div>
      )}
    </div>
  )

  return (
    <div
      key={`card-${card.id}-${id}`}
      className="my-2 p-4 flex flex-row gap-4 hover:bg-neutral-50 border-1 border-solid border-[#c6c9db] rounded-xl min-h-[150px]"
    >
      {/* 데스크탑인 경우 카드 이미지 노출 */}
      <div className="relative hidden sm:block" style={{ width: "20vw", maxWidth: "80px", aspectRatio: "366/512" }}>
        <PokemonCard data={{ code: card.code }} showInfo={false} className="relative w-full h-full" testMode={testMode} />
      </div>
      <div className="w-full h-full">
        <div className="flex gap-2">
          {/* 모바일인 경우 카드 이미지 노출 */}
          <div className="relative block sm:hidden" style={{ width: "20vw", maxWidth: "80px", aspectRatio: "366/512" }}>
            <PokemonCard data={{ code: card.code }} showInfo={false} className="relative w-full h-full" testMode={testMode} />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <Badge variant="secondary" className={cn(card.status >= REQUEST_PROCESS && activeClass)}>
                {getTradeRequestStatusName(card.status)}
              </Badge>
              {reportButton}
            </div>
            <p className="text-neutral-600 font-medium mt-1 text-[0.95rem]">
              {card.description}
            </p>
          </div>
        </div>
        {isLogin && (
          <>
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center border-t mt-4 w-full pt-3">
              {userInfoBlock}
              {/* 여기에 유저정보 */}
              {/* 버튼 영역 */}
              <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
                {cancelButton}
                {myActionButtons}
              </div>
            </div>
          </>
        )}
      </div>
      <TradeReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        handleReport={handleReport}
      />
    </div>
  )
}