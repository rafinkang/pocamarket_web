"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchIcon from "@/components/icon/SearchIcon";

export default function SearchSubmitButton({ className }) {
  return (
    <Button type="submit" className={cn("ml-2 max-w-[40px] h-[40px] w-full bg-transparent border-none shadow-none hover:bg-transparent hover:shadow-none hover:transform-none focus:outline-none focus:shadow-none active:transform-none active:shadow-none", className)}>
      <SearchIcon size={20} color="#6b7280" />
      <span className="sr-only">검색</span>
    </Button>
  );
}
