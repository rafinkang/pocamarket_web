"use client"

import { HeaderNav } from "./HeaderNav"

export function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full">
      <div className="container-wrapper flex justify-center">
        <div className="container flex h-14 items-center gap-2">
          <HeaderNav />
        </div>
      </div>
    </header>
  )
}