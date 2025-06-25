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
import Image from "next/image";

const renderItemImages = (item) => {
  // rarity 타입 (이미지와 count 속성이 있는 경우) - 먼저 확인
  if (item.image && item.count) {
    const imagePath = `/images/rarity/${item.image}.webp`;
    return (
      <div className="flex gap-1">
        {Array.from({ length: item.count }, (_, index) => (
          <Image
            key={index}
            src={imagePath}
            alt={item.name}
            width={16}
            height={16}
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  }
  
  // element 타입 (이미지 속성만 있는 경우)
  if (item.image && !item.count) {
    const imagePath = `/images/element/${item.image}.webp`;
    return (
      <Image
        src={imagePath}
        alt={item.name}
        width={20}
        height={20}
        className="w-5 h-5"
      />
    );
  }
  
  return null;
};

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
                    <Label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                      {renderItemImages(item)}
                    </Label>
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
