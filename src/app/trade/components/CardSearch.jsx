"use client";

import { useEffect } from "react";
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
  packSet,
  pack,
  defaultFilter,
  formSchema,
} from "@/constants/pokemonCardFilter";

import SelectBoxOption from "../../../components/searchOption/SelectBoxOption";

export default function CardSearch({ onSearch, placeholder }) {
  useEffect(() => {
    handleReset();
  }, [placeholder]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameKo: "",
      type: excludedValue,
      subtype: excludedValue,
      packSet: excludedValue,
      pack: excludedValue,
    },
  });

  // 필터 제출
  const onSubmit = (data) => {
    if (onSearch) {
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
      onSearch(result); // 객체로 넘김
    }
  };

  // 필터 초기화
  const handleReset = () => {
    form.reset({
      nameKo: "",
      type: excludedValue,
      subtype: excludedValue,
      packSet: excludedValue,
      pack: excludedValue,
    });
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
                        placeholder={`${placeholder} 카드명`}
                        className="w-[100%] bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className={`flex flex-col filterContainer gap-6`}>
              <div className="selectBox flex flex-wrap gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  {/* {포켓몬 타입} */}
                  <SelectBoxOption
                    form={form}
                    fieldName={"type"}
                    labelValue={"카드 타입"}
                    eachList={type}
                    resetField={"subtype"}
                  />
                  {/* {포켓몬 서브타입} */}
                  <SelectBoxOption
                    form={form}
                    fieldName={"subtype"}
                    labelValue={"세부 타입"}
                    eachList={subtype}
                    parentField={"type"}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* {포켓몬 확장팩} */}
                  <SelectBoxOption
                    form={form}
                    fieldName={"packSet"}
                    labelValue={"확장팩"}
                    eachList={packSet}
                    resetField={"pack"}
                  />
                  {/* {포켓몬 팩} */}
                  <SelectBoxOption
                    form={form}
                    fieldName={"pack"}
                    labelValue={"팩"}
                    eachList={pack}
                    parentField={"packSet"}
                  />
                </div>
              </div>
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
