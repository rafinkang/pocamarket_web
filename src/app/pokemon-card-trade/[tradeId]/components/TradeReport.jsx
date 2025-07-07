"use client"

import AlertDialog from "@/components/dialog/AlertDialog";
import { useState } from "react";
import TradeReportDialog from "./TradeReportDialog";
import { Button } from "@/components/ui/button";

import { postUserReport } from "@/api/usersReport";

export default function TradeReport ({data}) {
  const [openOk, onOpenOkChange] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleReport = async ({reportReason, reportDetail}) => {
    const requestData = {
      refId: data.tradeId,
      refType: "TRADE",
      refStatus: data.status,
      link: window.location.href,
      content: `${reportReason}:${reportDetail}`,
    };

    await postUserReport(requestData);
    onOpenOkChange(true);
  }

  return (
    <div className="flex justify-end">
      <Button variant="destructive" className="text-xs px-3 h-[30px] font-bold" onClick={() => setIsReportOpen(true)}>
        신고하기
      </Button>
      <TradeReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        handleReport={handleReport}
      />
      <AlertDialog 
        open={openOk}
        onOpenChange={onOpenOkChange}
        isConfirm={false} 
        preventCloseOnOutsideClick={true}
        title="신고 접수 완료"
        msg="신고 접수가 완료됐습니다.<br/>자세한 내용은 마이페이지에서 확인하세요."
        okBtnName="확인"
      />
    </div>
  )
}