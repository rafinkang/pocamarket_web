"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TradeReportDialog from "./TradeReportDialog";
import PokemonCard from "@/components/card/PokemonCard";

import { useState } from "react";
import { REQUEST_DELETED, REQUEST_SUBMITTED, REQUEST_PROCESS, REQUEST_COMPLETE, getTradeRequestStatusName } from "@/constants/tradeRequestStatus";
import { cn } from "@/lib/utils";

import { postUserReport } from "@/api/usersReport";

const testMode = process.env.NODE_ENV === "development";

export default function TradeItem ({isLogin, isMy, id, card, isActiveCard, onRequestCancel, onRequestAccept, onOpenOkChange}) {
  const activeClass = "bg-blue-500 text-white"
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const handleReport = async ({reportReason, reportDetail}) => {
      const requestData = {
        refId: card.id,
        refType: "TRADE_REQUEST",
        refStatus: card.status,
        link: window.location.href,
        content: `${reportReason}:${reportDetail}`,
      };

      await postUserReport(requestData);
      onOpenOkChange(true);
  }

  return (
    <div
      key={`card-${card.id}-${id}`}
      className="my-2 p-4 flex flex-row gap-4 hover:bg-neutral-50 border-1 border-solid border-[#c6c9db] rounded-xl min-h-[150px]"
    >
      <div className="relative" style={{ width: "20vw", maxWidth: "80px", aspectRatio: "366/512" }}>
        <PokemonCard data={{code : card.code}} showInfo={false} className="relative w-full h-full" testMode={testMode} />
      </div>
      <div className="w-full h-full">
        <Badge variant="secondary" className={cn(isActiveCard && activeClass)}>{getTradeRequestStatusName(card.status)}</Badge>
        <p className="text-neutral-600 font-medium mt-1 text-[0.95rem]">
            {card.description}
        </p>
        <div className="text-neutral-400 font-medium mt-1 text-[0.95rem]">
          <p>교환 성공 횟수 : <span className="text-[#000]">{card.tradeCount}회</span></p>
          <p>신고 횟수 : <span className="text-[#000]">{card.reportCount}회</span></p>
        </div>
        {isLogin && (
          <div className="relative z-[104] flex justify-end items-center gap-2">
            {!isMy && card.isMy && (card.status !== REQUEST_COMPLETE || card.status !== REQUEST_DELETED) && (
              <Button variant="outline" className="mr-auto" onClick={() => { 
                onRequestCancel(card.id);
              }}>
                교환 취소
              </Button>
            )}
            <div className="flex justify-end items-center">
              <Button variant="errorText" onClick={() => setIsReportOpen(true)} className="px-2 py-0 h-4">
                신고하기
              </Button>
              {isMy && <>
                {card.status === REQUEST_SUBMITTED &&
                  <Button onClick={() => (onRequestAccept(card.id, card.status))}>
                    교환 수락
                  </Button>
                }
                {card.status === REQUEST_COMPLETE &&
                  <span className="text-gray-500 text-[0.95rem]">교환 완료</span>
                }
              </>}
            </div>
          </div>
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