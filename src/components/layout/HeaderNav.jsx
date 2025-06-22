"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import useAuthStore from '@/store/authStore'
import { POKEMON_CARD, POKEMON_CARD_TRADE, LOGIN, MYPAGE } from "@/constants/path"

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
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={POKEMON_CARD}>포켓몬 카드</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={POKEMON_CARD_TRADE}>카드 교환</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* 네비 우측 */}
      <div className="ml-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            {isLogin ? (
              <>
                <NavigationMenuTrigger>
                  <Link href={MYPAGE}>안녕하세요 {user.nickname}님😎</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-40 gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href={MYPAGE}>마이페이지</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <button
                          className="w-full text-left"
                          onClick={() => useAuthStore.getState().logout()}
                        >
                          로그아웃
                        </button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={LOGIN}>로그인</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
