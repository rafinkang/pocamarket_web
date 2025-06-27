"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * 교환 상태 필터 박스 컴포넌트
 * 사용자가 교환 목록을 상태별로 필터링할 수 있는 드롭다운 메뉴를 제공합니다.
 * @param {function} onChange - 선택된 값이 변경될 때 호출되는 콜백 함수
 * @param {string} value - 현재 선택된 필터 값
 */
export default function TradeStatusFilter({
  filterList,
  onChange,
  value = 99,
}) {
  return (
    <div className="flex justify-end items-center px-2 lg:px-4">
      <Select
        value={String(value)}
        onValueChange={(value) => {
          onChange?.(Number(value));
        }}
      >
        <SelectTrigger className="w-[120px] lg:w-[180px]">
          <SelectValue placeholder="전체 보기" />
        </SelectTrigger>
        <SelectContent side="bottom" align="end" sideOffset={4}>
          {filterList &&
            filterList.map((filter) => {
              return (
                <SelectItem key={filter.value} value={String(filter.value)}>
                  {filter.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
}
