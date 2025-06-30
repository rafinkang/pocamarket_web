"use client";

import SelectSortOption from "@/components/cardList/search/option/SelectSortOption";
import TotalCount from "@/components/cardList/search/text/TotalCount";
import { defaultSort } from "@/constants/pokemonCardFilter";

export default function SortArea({ form, totalCount }) {
  const selectOptions = [
    {
      fieldName: "sort",
      labelValue: "카드 정렬",
      eachList: defaultSort,
      Component: SelectSortOption,
    }
  ];

  return (
    <section className="w-full flex flex-wrap justify-between items-center px-4 py-2 mb-4 min-w-[300px]">
      <TotalCount totalCount={totalCount} />
      <div className="flex flex-col">
        <div className="selectBox flex flex-wrap gap-6">
          {selectOptions.map((opt) => (
            <opt.Component
              key={opt.fieldName}
              form={form}
              {...opt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}