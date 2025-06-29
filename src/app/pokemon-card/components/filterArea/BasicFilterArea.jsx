"use client";

import SelectBoxOption from "@/components/cardList/search/option/SelectBoxOption";
import { pack, packSet, subtype, type } from "@/constants/pokemonCardFilter";

export default function BasicFilterArea({ form }) {

  const selectOptions = [
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
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6">
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