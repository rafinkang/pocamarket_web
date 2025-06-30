"use client";

import CheckBoxOption from "@/components/cardList/search/option/CheckBoxOption";
import SelectBoxOption from "@/components/cardList/search/option/SelectBoxOption";
import { element, rarity, type, subtype, packSet, pack } from "@/constants/pokemonCardFilter";
import ResetButton from "@/components/cardList/search/button/ResetButton";
import SubmitButton from "../search/button/SubmitButton";

export default function FilterArea({ form, open, onReset, isCardType, isCardPackSet, isRarity, isElement }) {
  const selectOptions = [
    ...(isCardType ? [
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
    ] : []),
    ...(isCardPackSet ? [
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
    ] : []),
  ];

  const checkOptions = [
    ...(isRarity ? [{
      fieldName: "rarity",
      labelValue: "희귀도",
      eachList: rarity,
      Component: CheckBoxOption,
    }] : []),
    ...(isElement ? [{
      fieldName: "element",
      labelValue: "속성",
      eachList: element,
      Component: CheckBoxOption,
    }] : []),
  ];

  return (
    open && (
      <>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-6">
            {selectOptions.filter(Boolean).map((opt) => (
              <opt.Component
                key={opt.fieldName}
                form={form}
                {...opt}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full">
            {checkOptions.filter(Boolean).map((opt) => (
              <opt.Component
                key={opt.fieldName}
                form={form}
                {...opt}
              />
            ))}
          </div>
          <div className="flex justify-end w-full">
            <SubmitButton />
            <ResetButton onReset={onReset} />
          </div>
        </div>
    </>
    )
  );
}