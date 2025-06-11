
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

export default function TcgCodeDialog({
  open,
  onOpenChange,
  initialData = null,
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.tcg_code.value)
    console.log(e.target.memo.value)
  }

  useEffect(() => {
    console.log(initialData)
  }, [initialData])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">친구코드 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>TCG Code</DialogTitle>
            <DialogDescription>
              인게임 친구코드를 추가해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tcg_code">친구코드</Label>
              <Input id="tcg_code" name="tcg_code" defaultValue={initialData?.tcgCode} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="memo">메모</Label>
              <Input id="memo" name="memo" defaultValue={initialData?.memo} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}