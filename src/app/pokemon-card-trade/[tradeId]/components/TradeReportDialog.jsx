"use client"

import AlertDialog from "@/components/dialog/AlertDialog";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";

export default function TradeReportDialog({ open, onOpenChange, handleReport }) {
  const reportReasonIdxList = [
    {idx: 0, content: "잘못된 친구 코드로 지속적인 거래 시도"},
    {idx: 1, content: "교환에 등록한 카드와 다른 카드로 거래"},
    {idx: 2, content: "사기 또는 허위 정보"},
    {idx: 3, content: "기타"},
  ]
  const [reportReasonIdx, setReportReasonIdx] = useState(reportReasonIdxList[0].idx);
  const [reportDetail, setReportDetail] = useState("");

  const handleOk = async () => {
    await handleReport({reportReason: reportReasonIdxList[reportReasonIdx].content, reportDetail});
    resetContent();
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetContent();
    onOpenChange(false);
  };

  const resetContent = () =>{
    setReportReasonIdx(reportReasonIdxList[0].idx);
    setReportDetail("");
  }

  const reportContent = (
    <div className="grid gap-4 py-4">
      <p className="text-sm text-muted-foreground">
        신고 이유를 선택해주세요.
      </p>
      <RadioGroup 
        defaultValue={reportReasonIdxList[0].idx} 
        className="grid gap-2"
        onValueChange={(idx) => setReportReasonIdx(idx)}
      >
        {reportReasonIdxList.map(item => 
          <div key={`tr-${item.idx}`} className="flex items-center space-x-2">
            <RadioGroupItem value={item.idx} id={`r${item.idx}`} />
            <Label htmlFor={`r${item.idx}`}>{item.content}</Label>
          </div>
        )}
      </RadioGroup>
      
      <Textarea 
        placeholder="상세한 신고 내용을 입력해주세요. (선택 사항)" 
        className="mt-2"
        value={reportDetail}
        onChange={(e) => setReportDetail(e.target.value)}
      />
    </div>
  );

  return (
    <AlertDialog 
      open={open}
      onOpenChange={onOpenChange}
      handleOk={handleOk} 
      handleCancel={handleCancel} 
      content={reportContent} 
      isConfirm={true} 
      preventCloseOnOutsideClick={true}
      title="신고하기"
      okBtnName="신고하기"
      cancelBtnName="취소"
      contentClassName="z-[150]"
    />
  );
}