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
    <div className="flex items-center gap-4 justify-between h-[40px]">
      <div className="flex items-center relative w-full">
        <SearchBar form={form} placeholder="포켓몬 이름 검색" />
        <SearchSubmitButton className="absolute right-0 top-0" />
      </div>
      {isDetail && <DetailToggleButton setOpen={setOpenDetail} />}
    </div>
  );
}
