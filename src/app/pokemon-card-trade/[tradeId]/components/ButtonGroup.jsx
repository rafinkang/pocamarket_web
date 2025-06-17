"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import CancelTradeBtn from "./CancelTradeBtn";

export default function ButtonGroup() {
  return (<div className="flex justify-end gap-1">
    {/* constants > path에 교환 수정 페이지url 등록 후 이동 필요 */}
    <Link 
      href="/"
      className={buttonVariants({ variant: "default" })}
    >
      교환 수정(등록자만)
    </Link>
    <CancelTradeBtn />
  </div>)
}