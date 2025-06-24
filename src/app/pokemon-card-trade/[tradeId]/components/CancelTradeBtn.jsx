"use client"

import { Button } from "@/components/ui/button"
import AlertDialog from "@/components/dialog/AlertDialog";
import { deleteTcgTrade } from "@/api/tcgTrade";
import { toast } from "sonner";
import { POKEMON_CARD_TRADE } from "@/constants/path";
import { useRouter } from "next/navigation";

export default function CancelTradeBtn({ tradeId }) {
  const router = useRouter();
  const tradeMsg = '진행중인 교환이 자동으로 취소됩니다.<br/>교환을 취소하시겠습니까?'

  const handleOk = async () => {
    try {
      const response = await deleteTcgTrade(tradeId);
      if (response.data === true) {
        toast.success("게시물이 삭제되었습니다.");

        setTimeout(() => {
          router.push(POKEMON_CARD_TRADE);
        }, 1500);
      } else {
        toast.error("게시물 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("교환글 삭제 실패", error);
      toast.error("게시물 삭제에 실패했습니다.");
    }
  }

  return (
    <AlertDialog handleOk={handleOk} isConfirm={true} title="교환 취소" msg={tradeMsg}>
      <Button variant="outline" className="text-xs px-3 h-[30px] font-bold">교환 취소</Button>
    </AlertDialog>
  )
}