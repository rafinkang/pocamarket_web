"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * 공통 정렬/툴바 컴포넌트
 * - totalCount: 전체 아이템 개수
 * - sortInfo: 정렬 정보
 * - onSortInfo: 정렬 변경 함수
 * - sortOptions: 정렬 옵션 배열 [{name, value}]
 * - children: 추가 툴바 요소(옵션)
 */
export default function CardSort({ totalCount, sortInfo, onSortInfo, sortOptions, children }) {
  return (
    <section className="CardListToolbar w-full flex flex-wrap justify-between items-center p-[20px] bg-[#eaeaea] rounded-md mb-4 gap-2 min-w-[300px]">
      <div className="totalCount mb-10px">
        <span>
          총 {totalCount ? totalCount : 0}개의 항목이 검색되었습니다.
        </span>
      </div>
      <div className="flex flex-end items-center gap-4">
        <Select value={sortInfo} onValueChange={onSortInfo}>
          <SelectTrigger className="w-[125px] bg-white">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions && sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {children}
      </div>
    </section>
  );
} 