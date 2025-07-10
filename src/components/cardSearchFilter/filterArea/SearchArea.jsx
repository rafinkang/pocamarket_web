"use client";

import SearchBar from "@/components/cardSearchFilter/option/SearchBar";
import DetailToggleButton from "@/components/cardSearchFilter/button/DetailToggleButton";
import SearchSubmitButton from "@/components/cardSearchFilter/button/SearchSubmitButton";

export default function SearchArea({
  form,
  setOpenDetail,  
  isDetail,
}) {
  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex items-center relative flex-1 min-h-[42px]">
        <SearchBar form={form} placeholder="포켓몬 이름 검색" />
        <SearchSubmitButton className="absolute right-2 top-1/2 transform -translate-y-1/2" />
      </div>
      {isDetail && (
        <div className="flex-shrink-0">
          <DetailToggleButton setOpen={setOpenDetail} />
        </div>
      )}
    </div>
  );
}
