import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

export default function TcgCodeDialog({
  isOpen,
  onOpenChange,
  editingRow = null,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    tcgCodeId: editingRow?.tcgCodeId || "",
    tcgCode: editingRow?.tcgCode || "",
    memo: editingRow?.memo || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 디바운스된 제출 함수
  const debouncedSubmit = useCallback(
    debounce(async (data) => {
      setIsSubmitting(true);
      try {
        const success = await onSubmit(data);
        if (success) {
          // 폼 초기화
          setFormData({ tcgCodeId: "", tcgCode: "", memo: "" });
        }
      } catch (error) {
        console.error("폼 제출 오류:", error);
      } finally {
        setIsSubmitting(false);
      }
    }, 300),
    [onSubmit]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // 이미 제출 중인 경우 무시
    
    // 폼 유효성 검사
    if (!formData.tcgCode.trim()) {
      alert("친구코드를 입력해주세요.");
      return;
    }
    
    if (formData.tcgCode.length !== 16) {
      alert("친구코드는 16자리여야 합니다.");
      return;
    }

    debouncedSubmit(formData);
  };

  useEffect(() => {
    setFormData({
      tcgCodeId: editingRow?.tcgCodeId || "",
      tcgCode: editingRow?.tcgCode || "",
      memo: editingRow?.memo || "",
    });
  }, [editingRow]);

  // 컴포넌트 언마운트 시 디바운스 정리
  useEffect(() => {
    return () => {
      debouncedSubmit.cancel();
    };
  }, [debouncedSubmit]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {editingRow ? "TCG Code 수정" : "TCG Code 추가"}
            </DialogTitle>
            <DialogDescription>
              {editingRow
                ? "친구코드를 수정해주세요."
                : "인게임 친구코드를 추가해주세요."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="tcgCode">친구코드</Label>
              <Input
                id="tcgCode"
                name="tcgCode"
                value={formData.tcgCode}
                maxLength={16}
                minLength={16}
                onChange={handleChange}
                required
                placeholder="16자리 친구코드를 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="memo">메모</Label>
              <Input
                id="memo"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                placeholder="메모를 입력하세요 (선택사항)"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                취소
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
