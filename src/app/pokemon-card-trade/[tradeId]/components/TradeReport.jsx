"use client"

import { useState } from "react";
import TradeReportDialog from "./TradeReportDialog";
import { Button } from "@/components/ui/button";

export default function TradeReport () {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleReport = async ({reportReason, reportDetail}) => {
    console.log("신고 사유:", reportReason);
    console.log("상세 내용:", reportDetail);
    console.log("신고 API 호출...");
  }

  return (
    <div className="flex justify-end">
      <Button variant="destructive" onClick={() => setIsReportOpen(true)}>
        신고하기
      </Button>
      {/* <TradeReportDialog handleReport={handleReport} /> */}
      <TradeReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        handleReport={handleReport}
      />
    </div>
  )
}