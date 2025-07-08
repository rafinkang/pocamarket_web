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

import ElementIcon from "@/components/icon/ElementIcon";
import RarityIcon from "@/components/icon/RarityIcon";

const renderItemImages = (item) => {

  const icon = RarityIcon({ rarity: item.value, size: 25});
  if(icon) return icon;

  const elementIcon = ElementIcon({ element: item.value, size: 25 });
  if(elementIcon) return elementIcon;

  return null;
};

export default function SearchCheckBoxOption({
  form,
  fieldName,
  labelValue,
  eachList,
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[14px]">{labelValue}</FormLabel>
          <FormControl>
            <div className="flex flex-wrap gap-4">
              {eachList.map((item) => {
                const id = `${fieldName}-${item.value}`;
                return (
                  <div key={item.value} className="flex items-center gap-1">
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
                    <Label htmlFor={id} className="flex items-center gap-1 cursor-pointer">
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
