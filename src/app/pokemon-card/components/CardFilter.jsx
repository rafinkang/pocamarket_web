"use client";

import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const typeOptions = useMemo(
    () =>
      type.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.name}
        </SelectItem>
      )),
    [type]
  );

  const packSetOptions = useMemo(
    () =>
      packSet.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.name}
        </SelectItem>
      )),
    [packSet]
  );

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
    <Form {...form}>
      <form
        method="GET"
        autoComplete="off"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={`bg-[#f7f7f7] p-4 rounded min-w-[600px]`}
      >
        <div className="flex flex-col gap-6 formContainer">
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
              <div className="flex items-center gap-4">
                {/* {포켓몬 타입} */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"text-[17px]"}>카드 타입</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent>{typeOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* {포켓몬 서브타입} */}
                <FormField
                  control={form.control}
                  name="subtype"
                  render={({ field }) => {
                    const typeValue = useWatch({
                      control: form.control,
                      name: "type",
                    });
                    return (
                      <FormItem>
                        <FormLabel className={"text-[17px]"}>
                          세부 타입
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={typeValue === excludedValue}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="전체" />
                          </SelectTrigger>
                          <SelectContent>
                            {subtype.map((item) => {
                              if (
                                item.label === typeValue ||
                                item.label === excludedValue
                              ) {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.name}
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="flex items-center gap-6">
                {/* {포켓몬 확장팩} */}
                <FormField
                  control={form.control}
                  name="packSet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={"text-[17px]"}>확장팩</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("pack", excludedValue);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent>{packSetOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* {포켓몬 팩} */}
                <FormField
                  control={form.control}
                  name="pack"
                  render={({ field }) => {
                    const packSetValue = useWatch({
                      control: form.control,
                      name: "packSet",
                    });
                    return (
                      <FormItem>
                        <FormLabel className={"text-[17px]"}>팩</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={packSetValue === excludedValue}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="전체" />
                          </SelectTrigger>
                          <SelectContent>
                            {pack.map((item) => {
                              if (
                                item.label === packSetValue ||
                                item.label === excludedValue
                              ) {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.name}
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            {isDetailFilter && (
              <div className="checkBox flex">
                <div className="flex flex-col gap-4">
                  {/* {포켓몬 레어도} */}
                  <FormField
                    control={form.control}
                    name="rarity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={"text-[17px]"}>희귀도</FormLabel>
                        <FormControl>
                          <div className="flex gap-4">
                            {rarity.map((item) => {
                              const id = `rarity-${item.value}`;
                              return (
                                <div
                                  key={item.value}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={id}
                                    checked={(field.value || []).includes(
                                      item.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          item.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v) => v !== item.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label htmlFor={id}>{item.name}</Label>
                                </div>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* {포켓몬 속성} */}
                  <FormField
                    control={form.control}
                    name="element"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={"text-[17px]"}>속성</FormLabel>
                        <FormControl>
                          <div className="flex gap-4">
                            {element.map((item) => {
                              const id = `element-${item.value}`;
                              return (
                                <div
                                  key={item.value}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={id}
                                    checked={(field.value || []).includes(
                                      item.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...(field.value || []),
                                          item.value,
                                        ]);
                                      } else {
                                        field.onChange(
                                          (field.value || []).filter(
                                            (v) => v !== item.value
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <Label htmlFor={id}>{item.name}</Label>
                                </div>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
  );
}
