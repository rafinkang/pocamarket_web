"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResetButton({ onReset, className }) {
  return (
    <Button
      type="button"
      className={cn("ml-4 bg-gray-300 text-black", className)}
      onClick={onReset}
    >
      필터 초기화
    </Button>
  );
}