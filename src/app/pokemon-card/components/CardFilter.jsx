"use client";

import { useMemo } from "react";
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameKo: "",
      type: excludedValue,
      subtype: excludedValue,
      element: excludedValue,
      packSet: excludedValue,
      pack: excludedValue,
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
    [type],
  );

  const elementOptions = useMemo(
    () =>
      element.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.name}
        </SelectItem>
      )),
    [element],
  );

  const packSetOptions = useMemo(
    () =>
      packSet.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.name}
        </SelectItem>
      )),
    [packSet],
  );

  // 필터 제출
  const onSubmit = (data) => {
    if (onFilter) {
      // rarity는 배열이므로 문자열로 변환
      const result = { ...data };
      if (result.rarity && Array.isArray(result.rarity)) {
        result.rarity = result.rarity.join(",").trim();
      } else {
        result.rarity = null;
      }
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
    form.setValue("rarity", []);
  };

  return (
    <Form {...form}>
      <form
        method="GET"
        autoComplete="off"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-[#f7f7f7] p-4 rounded"
      >
        <div className="flex items-center gap-2 mb-2">
          <FormField
            control={form.control}
            name="nameKo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="카드명" className="w-60" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-3 py-1">
            🔍
          </Button>
          <Button
            type="button"
            className="px-3 py-1 bg-gray-300 text-black"
            onClick={handleReset}
          >
            상세 필터 ▼
          </Button>
        </div>
        {/* {포켓몬 타입} */}
        <div className="flex items-center gap-8 mb-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
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
                  <FormLabel>팩</FormLabel>
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
                            <SelectItem key={item.value} value={item.value}>
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

          {/* {포켓몬 속성} */}
          <FormField
            control={form.control}
            name="element"
            render={({ field }) => (
              <FormItem>
                <FormLabel>속성</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="전체" />
                  </SelectTrigger>
                  <SelectContent>{elementOptions}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {포켓몬 확장팩} */}
          <FormField
            control={form.control}
            name="packSet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>확장팩</FormLabel>
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
                  <FormLabel>팩</FormLabel>
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
                            <SelectItem key={item.value} value={item.value}>
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
          {/* {포켓몬 레어도} */}
          <FormField
            control={form.control}
            name="rarity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>희귀도</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {rarity.map((item) => {
                      const id = `rarity-${item.value}`;
                      return (
                        <div
                          key={item.value}
                          className="flex items-center gap-1"
                        >
                          <Checkbox
                            id={id}
                            checked={(field.value || []).includes(item.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  item.value,
                                ]);
                              } else {
                                field.onChange(
                                  (field.value || []).filter(
                                    (v) => v !== item.value,
                                  ),
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
          <Button
            type="button"
            className="ml-4 bg-gray-300 text-black"
            onClick={handleReset}
          >
            필터 초기화
          </Button>
          <Button type="submit" className="ml-2">
            적용
          </Button>
        </div>
      </form>
    </Form>
  );
}
