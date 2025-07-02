"use client";

import { cn } from "@/lib/utils";

export default function TotalCount({ totalCount, className }) {
  return (
    <div className={cn("totalCount mb-10px", className)}>
      <p>
        총 {totalCount ? totalCount : 0}개의 항목이 검색되었습니다.
      </p>
    </div>
  );
}