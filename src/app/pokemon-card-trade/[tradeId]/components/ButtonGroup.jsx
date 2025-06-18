"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import CancelTradeBtn from "./CancelTradeBtn";
import { cn } from "@/lib/utils";

export default function ButtonGroup() {
  return (<div className="flex justify-end gap-1 border-b-2 md:mx-3 pb-1">
    {/* constants > path에 교환 수정 페이지url 등록 후 이동 필요 */}
    <Link 
      href="/"
      className={cn(buttonVariants({ variant: "default" }), "text-xs px-3 h-[30px] font-bold bg-blue-500")}
    >
      교환 수정
    </Link>
    <CancelTradeBtn />
  </div>)
}