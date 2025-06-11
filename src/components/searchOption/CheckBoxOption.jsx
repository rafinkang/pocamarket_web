"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SearchCheckBoxOption({
  control,
  fieldName,
  labelValue,
  eachList,
}) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[17px]">{labelValue}</FormLabel>
          <FormControl>
            <div className="flex flex-wrap gap-4">
              {eachList.map((item) => {
                const id = `${fieldName}-${item.value}`;
                return (
                  <div key={item.value} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      checked={(field.value || []).includes(item.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), item.value]);
                        } else {
                          field.onChange(
                            (field.value || []).filter((v) => v !== item.value)
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
  );
}
