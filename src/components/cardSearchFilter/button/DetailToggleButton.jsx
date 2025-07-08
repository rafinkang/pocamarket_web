"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DetailToggleButton({
  setOpen,
  closeText = "상세 필터",
  openText = "상세 필터",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg shadow-sm transition-all duration-200 font-medium text-sm"
        onClick={() => {
          setIsOpen(!isOpen);
          setOpen((is) => !is);
        }}
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
          />
        </svg>
        <span className="hidden sm:inline">{isOpen ? openText : closeText}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </Button>
    </div>
  );
}
