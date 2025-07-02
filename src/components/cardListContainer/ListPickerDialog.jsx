"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialogFull";
import { useEffect } from "react";

import CardListContainer from "@/components/cardListContainer/CardListContainer";
import ListPickerCardElement from "@/components/card/ListPickerCardElement";

export default function ListPickerDialog({ open, onOpenChange, placeholder, onSelect }) {
  // 다이얼로그가 닫힐 때 브라우저 히스토리 정리
  useEffect(() => {
    if (!open) {
      // 다이얼로그가 닫힐 때 URL에서 쿼리 파라미터 제거
      const currentUrl = new URL(window.location);
      if (currentUrl.search) {
        window.history.replaceState({}, '', currentUrl.pathname);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-[1200px] h-[90vh] max-h-[90vh] flex flex-col overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle>카드 검색</DialogTitle>
          <DialogDescription>카드 리스트를 검색합니다.</DialogDescription>
        </DialogHeader>

        <CardListContainer
          cardElement={(itemProps) => (
            <ListPickerCardElement 
              {...itemProps} 
              onSelect={onSelect}
              onOpenChange={onOpenChange}
            />
          )}
        />
      </DialogContent>
    </Dialog>
  );
}