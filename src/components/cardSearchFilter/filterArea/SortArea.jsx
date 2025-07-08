"use client";

import SelectSortOption from "@/components/cardSearchFilter/option/SelectSortOption";
import TotalCount from "@/components/cardSearchFilter/text/TotalCount";
import { defaultSort } from "@/constants/pokemonCardFilter";

export default function SortArea({ form, totalCount, onChange }) {
  const selectOptions = [
    {
      fieldName: "sort",
      labelValue: "카드 정렬",
      eachList: defaultSort,
      onChange,
      Component: SelectSortOption,
    }
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <TotalCount totalCount={totalCount} />
      <div className="flex-shrink-0">
        {selectOptions.map((opt) => (
          <opt.Component
            key={opt.fieldName}
            form={form}
            {...opt}
          />
        ))}
      </div>
    </div>
  );
}