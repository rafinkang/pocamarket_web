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
    <div className="space-y-4">
      {/* 선택 옵션 영역 */}
      {selectOptions.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            카테고리 선택
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectOptions.map((opt) => (
              <opt.Component
                key={opt.fieldName}
                form={form}
                {...opt}
              />
            ))}
          </div>
        </div>
      )}

      {/* 체크박스 옵션 영역 */}
      {checkOptions.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            다중 선택
          </h4>
          <div className="space-y-3">
            {checkOptions.map((opt) => (
              <opt.Component
                key={opt.fieldName}
                form={form}
                {...opt}
              />
            ))}
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
        <ResetButton onReset={onReset} />
        <SubmitButton />
      </div>
    </div>
  );
}