"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  excludedValue,
  type,
  subtype,
  element,
  packSet,
  pack,
  rarity,
  defaultFilter,
  formSchema,
} from "@/constants/pokemonCardFilter";

import SelectBoxFilter from "./filter/SelectBoxField";
import CheckBoxFilter from "./filter/CheckBoxField";

export default function CardFilter({ onFilter }) {
  const arrData = ["element", "rarity"];
  const [isDetailFilter, setIsDetailFilter] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameKo: "",
      type: excludedValue,
      subtype: excludedValue,
      packSet: excludedValue,
      pack: excludedValue,
      element: [],
      rarity: [],
    },
  });

  // 필터 제출
  const onSubmit = (data) => {
    if (onFilter) {
      const result = { ...data };

      arrData.forEach((field) => {
        let d = result[field];
        if (d && Array.isArray(d)) {
          d = d.join(",").trim();
        } else {
          d = null;
        }
        result[field] = d;
      });

      // excludedValue(전체)는 아예 파라미터에서 제외
      Object.keys(result).forEach((key) => {
        if (
          result[key] === excludedValue ||
          result[key] === "" ||
          result[key] == null
        ) {
          delete result[key];
        }
      });
      onFilter(result); // ✅ 객체로 넘김
    }
  };

  // 필터 초기화
  const handleReset = () => {
    form.reset({ ...defaultFilter });
    arrData.forEach((v) => {
      form.setValue(v, []);
    });
  };

  return (
    <div id="formBody" className="w-full">
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
                        placeholder="카드명"
                        className="w-[100%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="buttonBox flex gap-2">
                {/* <Button type="submit" className="px-3 py-1">
                🔍
              </Button> */}
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
            </div>

            <div className={`flex flex-col filterContainer gap-6`}>
              <div className="selectBox flex flex-wrap gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  {/* {포켓몬 타입} */}
                  <SelectBoxFilter
                    form={form}
                    fieldName={"type"}
                    labelValue={"카드 타입"}
                    eachList={type}
                    resetField={"subtype"}
                  />
                  {/* {포켓몬 서브타입} */}
                  <SelectBoxFilter
                    form={form}
                    fieldName={"subtype"}
                    labelValue={"세부 타입"}
                    eachList={subtype}
                    parentField={"type"}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* {포켓몬 확장팩} */}
                  <SelectBoxFilter
                    form={form}
                    fieldName={"packSet"}
                    labelValue={"확장팩"}
                    eachList={packSet}
                    resetField={"pack"}
                  />
                  {/* {포켓몬 팩} */}
                  <SelectBoxFilter
                    form={form}
                    fieldName={"pack"}
                    labelValue={"팩"}
                    eachList={pack}
                    parentField={"packSet"}
                  />
                </div>
              </div>

              {isDetailFilter && (
                <div className="checkBox flex">
                  <div className="flex flex-col gap-4 w-full">
                    {/* {포켓몬 레어도} */}
                    <CheckBoxFilter
                      control={form.control}
                      fieldName={"rarity"}
                      labelValue={"희귀도"}
                      eachList={rarity}
                    />

                    {/* {포켓몬 속성} */}
                    <CheckBoxFilter
                      control={form.control}
                      fieldName={"element"}
                      labelValue={"속성"}
                      eachList={element}
                    />
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
    </div>
  );
}
