"use client";

import CheckBoxOption from "@/components/cardSearchFilter/option/CheckBoxOption";
import SelectBoxOption from "@/components/cardSearchFilter/option/SelectBoxOption";
import { element, rarity, type, subtype, packSet, pack } from "@/constants/pokemonCardFilter";
import ResetButton from "@/components/cardSearchFilter/button/ResetButton";
import SubmitButton from "@/components/cardSearchFilter/button/SubmitButton";

export default function FilterArea({ form, open, onReset, isCardType, isCardPackSet, isRarity, isElement }) {
  
  const selectOptions = [];
  const checkOptions = [];

  if (isCardType) {
    selectOptions.push({
      fieldName: "type",
      labelValue: "카드 타입",
      eachList: type,
      Component: SelectBoxOption,
      resetField: "subtype",
    });
    selectOptions.push({
      fieldName: "subtype",
      labelValue: "세부 타입",
      eachList: subtype,
      Component: SelectBoxOption,
      parentField: "type",
    });
  }

  if (isCardPackSet) {
    selectOptions.push({
        fieldName: "packSet",
        labelValue: "확장팩",
        eachList: packSet,
        Component: SelectBoxOption,
        resetField: "pack",
      });
    selectOptions.push({
        fieldName: "pack",
        labelValue: "팩",
        eachList: pack,
        Component: SelectBoxOption,
        parentField: "packSet",
      });
  }

  if (isRarity) {
    checkOptions.push({
      fieldName: "rarity",
      labelValue: "희귀도",
      eachList: rarity,
      Component: CheckBoxOption,
    });
  }

  if (isElement) {
    checkOptions.push({
      fieldName: "element",
      labelValue: "속성",
      eachList: element,
      Component: CheckBoxOption,
    });
  }

  return (
    open && (
      <>
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
          <div className="flex justify-end w-full">
            <SubmitButton />
            <ResetButton onReset={onReset} />
          </div>
        </div>
      </>
    )
  );
}