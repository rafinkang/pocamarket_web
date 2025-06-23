"use client"

import TradeReportDialog from "./TradeReportDialog";

export default function TradeReport () {
  const handleReport = async ({reportReason, reportDetail}) => {
    console.log("신고 사유:", reportReason);
    console.log("상세 내용:", reportDetail);
    console.log("신고 API 호출...");
  }

  return (
    <div className="flex justify-end">
      <TradeReportDialog handleReport={handleReport} />
    </div>
  )
}