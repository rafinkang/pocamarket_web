"use client";

import DetailToggleButton from "@/components/cardList/search/button/DetailToggleButton";
import SearchBar from "@/components/cardList/search/option/SearchBar";

export default function SearchArea({
  form,
  setOpenDetail,
}) {
  return (
    <div className="flex items-center gap-2 searchbarContainer justify-between">
      <SearchBar form={form} placeholder="포켓몬 이름 검색" />
      <DetailToggleButton setOpen={setOpenDetail} />
    </div>
  );
}
