"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialogFull";
import { getPokemonCardList } from "@/api/pokemon-card";
import { formSchema, defaultFilter, type, subtype, packSet, pack } from "@/constants/pokemonCardFilter";
import { useEffect } from "react";

import CardListContainer from "./CardListContainer";
import CardSearch from "../search/CardSearch";
import CardList from "./CardList";
import ListPickerCardElement from "./ListPickerCardElement";
import CommonPagination from "@/components/pagination/Pagination";
import SelectBoxOption from "@/components/search/option/SelectBoxOption";

const parsingData = (res, setPage, setTotalPage, setTotalCount) => {
  const data = res.data;
  setPage(data?.number ?? 0);
  setTotalPage(data?.totalPages ?? 1);
  setTotalCount(data.totalElements ?? 0);
  if (!data.content || !Array.isArray(data.content)) {
    console.error("Invalid card list format:", data.content);
    return [];
  }
  return data.content;
};

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
      <DialogContent className="w-[90vw] max-w-[1200px] h-[90vh] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle>카드 검색</DialogTitle>
          <DialogDescription>카드 리스트를 검색합니다.</DialogDescription>
        </DialogHeader>

        <CardListContainer
          fetchList={getPokemonCardList}
          parseData={parsingData}
          disableHistory={true}
          SearchComponent={(props) => (
            <CardSearch
              {...props}
              formSchema={formSchema}
              defaultValues={defaultFilter}
              isDefaulFilter={false}
              placeholder={placeholder}
              selectOptions={[
                {
                  fieldName: "type",
                  labelValue: "카드 타입",
                  eachList: type,
                  Component: SelectBoxOption,
                  resetField: "subtype",
                },
                {
                  fieldName: "subtype",
                  labelValue: "세부 타입",
                  eachList: subtype,
                  Component: SelectBoxOption,
                  parentField: "type",
                },
                {
                  fieldName: "packSet",
                  labelValue: "확장팩",
                  eachList: packSet,
                  Component: SelectBoxOption,
                  resetField: "pack",
                },
                {
                  fieldName: "pack",
                  labelValue: "팩",
                  eachList: pack,
                  Component: SelectBoxOption,
                  parentField: "packSet",
                },
              ]}
            />
          )}
          ListComponent={(props) => (
            <CardList 
              {...props} 
              ItemComponent={(itemProps) => (
                <ListPickerCardElement 
                  {...itemProps} 
                  onSelect={onSelect}
                  onOpenChange={onOpenChange}
                />
              )} 
            />
          )}
          PaginationComponent={CommonPagination}
          pageSize={10}
        />

      </DialogContent>
    </Dialog>
  );
}