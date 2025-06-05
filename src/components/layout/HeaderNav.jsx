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

import useAuthStore from '@/store/authStore'


export function HeaderNav() {
    const isLogin = useAuthStore((state) => state.isLogin);
    const user = useAuthStore((state) => state.user);
  return (
    <NavigationMenu viewport={false} className="max-w-[100%]">
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
      
      {/* 네비 우측 */}
      <div className="ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          {isLogin ? (
            <>
              <NavigationMenuTrigger>안녕하세요 {user.nickname}님😎</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/mypage">마이페이지</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button className="w-full text-left" onClick={() => useAuthStore.getState().logout()}>로그아웃</button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/login">로그인</Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
      </div>
    </NavigationMenu>
  )
}

