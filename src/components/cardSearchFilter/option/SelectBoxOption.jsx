"use client";

import {
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

import { useWatch } from "react-hook-form";

import { excludedValue } from "@/constants/pokemonCardFilter";

export default function SelectBoxOption({
  form,
  fieldName,
  labelValue,
  eachList,

  // 부모 select
  resetField = null,

  // 자식 select
  parentField = null,
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const typeValue = parentField
          ? useWatch({
              control: form.control,
              name: parentField,
            })
          : null;
        return (
          <FormItem>
            <FormLabel className="text-[14px]">{labelValue}</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                if (resetField && form)
                  form.setValue(resetField, excludedValue);
              }}
              disabled={typeValue === excludedValue}
            >
              <SelectTrigger className="min-w-[120px]">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                {eachList.map((item) => {
                  if (parentField && typeValue) {
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
                    return null;
                  }
                  // isContentFilter가 false면 모두 출력
                  return (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
