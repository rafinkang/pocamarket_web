"use client";

import CheckBoxOption from "@/components/cardList/search/option/CheckBoxOption";
import { element, rarity } from "@/constants/pokemonCardFilter";

export default function DefailFilterArea({ form, open }) {
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
      <div className="flex">
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