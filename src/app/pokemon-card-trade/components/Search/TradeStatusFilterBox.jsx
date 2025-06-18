"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TradeStatusFilterBox() {
  return (
    <div className="flex justify-end items-center px-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="my">내가 신청한 교환</SelectItem>
          <SelectItem value="my">내 진행 중인 교환</SelectItem>
          <SelectItem value="my">내 완료된 교환</SelectItem>
          <SelectItem value="my">내 교환 전체 보기</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
