"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({ className }) {
  return (
    <Button type="submit" className={cn("ml-2 max-w-[150px] w-full", className)}>
      검색
    </Button>
  );
}
