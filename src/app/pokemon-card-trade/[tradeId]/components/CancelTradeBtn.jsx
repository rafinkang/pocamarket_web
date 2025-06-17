"use client"

import { Button } from "@/components/ui/button"
import AlertDialog from "@/components/dialog/AlertDialog";

export default function CancelTradeBtn () {
  const tradeMsg = '진행중인 교환이 자동으로 취소됩니다.<br/>교환을 취소하시겠습니까?'
  
  const handleOk = () => {
    console.log("교환 취소 ok")
  }

  return (
    <AlertDialog handleOk={handleOk} isConfrim={true} title="교환 취소" msg={tradeMsg}>
      <Button>교환 취소(등록자만)</Button>
    </AlertDialog>
  )
}