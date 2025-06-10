"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { defaultSort } from "@/constants/pokemonCardFilter";

export default function CardList({ totalCount, sortInfo, onSortInfo }) {
  return (
    <>
      <div className="CardListToolbar w-full flex flex-wrap justify-between items-center p-[20px] bg-[#eaeaea] rounded-md mb-4 gap-2">
        <div className="totalCount mb-10px">
          <span>
            총 {totalCount ? totalCount : 0}개의 카드가 검색되었습니다.
          </span>
        </div>
        <div className="flex flex-end items-center gap-4">
          <Select value={sortInfo} onValueChange={(sort) => onSortInfo(sort)}>
            <SelectTrigger className="w-[125px] bg-white">
              <SelectValue placeholder="코드순" />
            </SelectTrigger>
            <SelectContent>
              {defaultSort.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>보기 형태</div>
        </div>
      </div>
    </>
  );
}
