"use client"

import { Button } from "@/components/ui/button"
import AlertDialog from "@/components/dialog/AlertDialog";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";

export default function TradeReport({handleReport}) {
  const reportReasonList = [
    {value: 0, content: "잘못된 친구 코드로 지속적인 거래 시도"},
    {value: 1, content: "교환에 등록한 카드와 다른 카드로 거래"},
    {value: 2, content: "사기 또는 허위 정보"},
    {value: 3, content: "기타"},
  ]
  const [reportReason, setReportReason] = useState(reportReasonList[0].value);
  const [reportDetail, setReportDetail] = useState("");

  const handleOk = async () => {
    await handleReport({reportReason, reportDetail});
    resetContent();
  };

  const handleCancel = () => {
    resetContent();
  };

  const resetContent = () =>{
    setReportReason(reportReasonList[0].value);
    setReportDetail("");
  }

  const reportContent = (
    <div className="grid gap-4 py-4">
      <p className="text-sm text-muted-foreground">
        신고 이유를 선택해주세요.
      </p>
      <RadioGroup 
        defaultValue={reportReasonList[0].value} 
        className="grid gap-2"
        onValueChange={(value) => setReportReason(value)}
      >
        {reportReasonList.map(item => 
          <div key={`tr-${item.value}`} className="flex items-center space-x-2">
            <RadioGroupItem value={item.value} id={`r${item.value}`} />
            <Label htmlFor={`r${item.value}`}>{item.content}</Label>
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
      handleOk={handleOk} 
      handleCancel={handleCancel} 
      content={reportContent} 
      isConfrim={true} 
      title="신고하기"
      okBtnName="신고하기"
      cancelBtnName="취소"
    >
        <Button variant="destructive" className="text-xs px-3 h-[30px] font-bold w-[80px]">신고하기</Button>
    </AlertDialog>
  );
}