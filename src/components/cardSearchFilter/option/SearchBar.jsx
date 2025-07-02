"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SearchBar({
  form,
  placeholder = "포켓몬 이름 검색",
}) {
  return (
    <FormField
      control={form.control}
      name="nameKo"
      render={({ field }) => (
        <FormItem className="flex-grow">
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="w-[100%] bg-white pr-[50px] h-[40px]"
            />
          </FormControl>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}