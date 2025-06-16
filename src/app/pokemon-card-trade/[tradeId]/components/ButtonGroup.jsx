import { Button } from "@/components/ui/button"

export default function ButtonGroup() {
  return (<div className="flex justify-end gap-1">
    <Button>교환 신청(다른 유저)</Button>
    <Button>교환 수정(등록자만)</Button>
    <Button>교환 취소(등록자만)</Button>
  </div>)
}