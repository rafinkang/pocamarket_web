"use client"

import { Button } from "@/components/ui/button"
import AlertDialog from "@/components/dialog/AlertDialog";

export default function CancelTradeBtn () {
  const tradeMsg = '진행중인 교환이 자동으로 취소됩니다.<br/>교환을 취소하시겠습니까?'
  
  const handleOk = () => {
    console.log("교환 취소 ok")
  }

  return (
    <AlertDialog handleOk={handleOk} isConfirm={true} title="교환 취소" msg={tradeMsg}>
      <Button variant="outline" className="text-xs px-3 h-[30px] font-bold">교환 취소</Button>
    </AlertDialog>
  )
}