"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({ className }) {
  return (
    <Button 
      type="submit" 
      className={cn("flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg shadow-sm transition-all duration-200 font-medium", className)}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      검색
    </Button>
  );
}
