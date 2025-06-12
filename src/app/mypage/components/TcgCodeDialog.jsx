
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
import { useEffect, useState } from "react"

export default function TcgCodeDialog({
  open,
  onOpenChange,
  initialData = null,
  onSubmit
}) {
  const [formData, setFormData] = useState({
    tcgCodeId: initialData?.tcgCodeId || '',
    tcgCode: initialData?.tcgCode || '',
    memo: initialData?.memo || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(formData);
      // 폼 초기화
      setFormData({ tcgCodeId: '', tcgCode: '', memo: '' });
    } catch (error) {
      console.error('폼 제출 오류:', error);
    }
  }

  useEffect(() => {
    setFormData({
      tcgCodeId: initialData?.tcgCodeId || '',
      tcgCode: initialData?.tcgCode || '',
      memo: initialData?.memo || '',
    });
  }, [initialData])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">친구코드 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {initialData ? 'TCG Code 수정' : 'TCG Code 추가'}
            </DialogTitle>
            <DialogDescription>
              {initialData ? '친구코드를 수정해주세요.' : '인게임 친구코드를 추가해주세요.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tcgCode">친구코드</Label>
              <Input
                id="tcgCode"
                name="tcgCode"
                value={formData.tcgCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="memo">메모</Label>
              <Input
                id="memo"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
              />
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