"use client";

import { useState, useEffect } from "react";
import { HeaderNav } from "./HeaderNav";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 설정

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-shadow duration-300",
        {
          "shadow-lg": isScrolled,
        }
      )}
    >
      <div className="w-full flex justify-center">
        <HeaderNav />
      </div>
    </header>
  );
}