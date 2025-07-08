"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResetButton({ onReset, className }) {
  return (
    <Button
      type="button"
      className={cn("flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 font-medium", className)}
      onClick={onReset}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      초기화
    </Button>
  );
}