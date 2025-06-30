"use client";

import CheckBoxOption from "@/components/cardList/search/option/CheckBoxOption";
import SelectBoxOption from "@/components/cardList/search/option/SelectBoxOption";
import { element, rarity, type, subtype, packSet, pack } from "@/constants/pokemonCardFilter";

export default function FilterArea({ form, open }) {
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

  const checkOptions = [
    {
      fieldName: "rarity",
      labelValue: "희귀도",
      eachList: rarity,
      Component: CheckBoxOption,
    },
    {
      fieldName: "element",
      labelValue: "속성",
      eachList: element,
      Component: CheckBoxOption,
    },
  ];

  return (
    open && (
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

        <div className="flex flex-col gap-4 w-full">
          {checkOptions.map((opt) => (
            <opt.Component
              key={opt.fieldName}
              form={form}
              {...opt}
            />
          ))}
        </div>
      </div>
    )
  );
}