"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchProvider, useSearch } from "./SearchProvider";
import { excludedValue } from "@/constants/pokemonCardFilter";

/**
 * 공통 검색/필터 컴포넌트
 * - formSchema: zod 스키마
 * - defaultValues: 폼 기본값
 * - selectOptions: 셀렉트 옵션 정보 { fieldName, labelValue, eachList, ... }
 * - checkOptions: 체크박스 옵션 정보 { fieldName, labelValue, eachList }
 * - onSearch: 검색/필터 함수
 * - children: 추가 필터 요소(옵션)
 */
export default function CardSearch({
  formSchema,
  defaultValues,
  selectOptions = [],
  checkOptions = [],
  isDefaulFilter = true,
  onSearch,
  placeholder = "포켓몬 이름 검색"
}) {
  return (
    <SearchProvider
      formSchema={formSchema}
      defaultValues={defaultValues}
      checkOptions={checkOptions}
    >
      <CardSearchContent
        selectOptions={selectOptions}
        checkOptions={checkOptions}
        isDefaulFilter={isDefaulFilter}
        onSearch={onSearch}
        placeholder={placeholder}
      />
    </SearchProvider>
  );
}

function CardSearchContent({
  selectOptions,
  checkOptions,
  isDefaulFilter,
  onSearch,
  placeholder,
}) {
  const { form, isDetailFilter, setIsDetailFilter, handleReset } = useSearch();

  // 필터 제출
  const onSubmit = (data) => {
    if (onSearch) {
      const result = { ...data };
      checkOptions.forEach((field) => {
        let d = result[field.fieldName];
        if (d && Array.isArray(d)) {
          d = d.join(",").trim();
        } else {
          d = null;
        }
        result[field.fieldName] = d;
      });
      Object.keys(result).forEach((key) => {
        if (result[key] === excludedValue || result[key] === "" || result[key] == null) {
          delete result[key];
        }
      });
      onSearch(result);
    }
  };

  return (
    <section id="formBody" className="w-full">
      <Form {...form}>
        <form
          method="GET"
          autoComplete="off"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className={`bg-[#f7f7f7] p-4 rounded min-w-[300px]`}
        >
          <div className="flex flex-col gap-6 optionContainer">
            <div className="flex items-center gap-2 searchbarContainer justify-between">
              <FormField
                control={form.control}
                name="nameKo"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={placeholder}
                        className="w-[100%] bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isDefaulFilter && (
              <div className="buttonBox flex gap-2">
                <Button
                  type="button"
                  className="px-3 py-1 bg-gray-300 text-black"
                  onClick={() => {
                    setIsDetailFilter((is) => !is);
                  }}
                >
                  상세 필터 ▼
                </Button>
              </div>
              )}
            </div>
            <div className="flex flex-col filterContainer gap-6">
              <div className="selectBox flex flex-wrap gap-6">
                {selectOptions.map((opt) => (
                  <opt.Component
                    key={opt.fieldName}
                    form={form}
                    {...opt}
                  />
                ))}
              </div>
              {isDetailFilter && (
                <div className="checkBox flex">
                  <div className="flex flex-col gap-4 w-full">
                    {checkOptions.map((opt) => (
                      <opt.Component
                        key={opt.fieldName}
                        control={form.control}
                        {...opt}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="buttonContainer flex items-right gap-4 justify-end">
              <Button
                type="button"
                className="ml-4 bg-gray-300 text-black"
                onClick={handleReset}
              >
                필터 초기화
              </Button>
              <Button type="submit" className="ml-2">
                검색
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
} 