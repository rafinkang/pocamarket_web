"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export function HeaderLeftNav() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">홈</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger><Link href="/pokemon-card">포켓몬 카드</Link></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/pokemon-card">리스트</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/pokemon-card">리스트2</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/pokemon-card">리스트3</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/login">로그인</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      </div>
    </NavigationMenu>
  )
}

