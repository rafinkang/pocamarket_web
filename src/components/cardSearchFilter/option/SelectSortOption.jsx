"use client";

import { FormItem, FormField, FormMessage, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectSortOption({ form, fieldName, labelValue, eachList, onChange }) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
      <FormItem>
        <FormLabel className="hidden">{labelValue}</FormLabel>
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
            onChange?.(value);
          }}
        >
          <SelectTrigger className="w-[125px] bg-white">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            {eachList && eachList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem> 
      )}
    />
  );
} 