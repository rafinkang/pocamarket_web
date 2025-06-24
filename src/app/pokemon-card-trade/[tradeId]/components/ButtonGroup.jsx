"use client"

import { Button } from "@/components/ui/button";
import { POKEMON_CARD_TRADE } from "@/constants/path";
import Link from "next/link";
import CancelTradeBtn from "./CancelTradeBtn";
import TradeReport from "./TradeReport";
import { REQUEST, SELECT } from "@/constants/tradeStatus";

export default function ButtonGroup({ tradeId, data, isMy, isLogin }) {
  return (
    <div className="flex justify-end gap-1 md:mx-3">
      {/* 거래 요청 단계에서만 수정 */}
      {isMy && isLogin && [REQUEST].includes(data?.status) && (
        <Button variant="default" className="text-xs px-3 h-[30px] font-bold">
          <Link href={`${POKEMON_CARD_TRADE}/write/${tradeId}`}>교환 수정</Link>
        </Button>
      )}
      
      {/* 거래 요청, 선택 단계에서만 취소 */}
      {isMy && isLogin && [REQUEST, SELECT].includes(data?.status) && (
        <CancelTradeBtn tradeId={tradeId} />
      )}

      {/* 거래 진행, 완료 단계에서만 신고 */}
      {!isMy && isLogin && ["PROCESS", "COMPLETE"].includes(data?.status) && (
        <TradeReport className="text-xs px-3 h-[30px] font-bold" />
      )}
      
      <Button variant="outline" className="text-xs px-3 h-[30px] font-bold">
        <Link href={`${POKEMON_CARD_TRADE}`}>목록</Link>
      </Button>
    </div>
  )
}