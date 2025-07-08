"use client";

import { cn } from "@/lib/utils";

export default function TotalCount({ totalCount, className }) {
  return (
    <div className={cn("flex-shrink-0", className)}>
      <p className="text-sm text-gray-600 font-medium">
        총 {totalCount ? totalCount.toLocaleString() : 0}개의 항목이 검색되었습니다.
      </p>
    </div>
  );
}