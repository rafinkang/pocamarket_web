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
        "sticky top-0 z-40 w-full transition-shadow duration-300 bg-background text-card-foreground",
        {
          "shadow-[0_1px_1px_rgba(0,0,0,0.1)]": isScrolled,
        }
      )}
    >
      <div className="container-wrapper flex justify-center">
        <div className="container flex h-14 items-center gap-2">
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}