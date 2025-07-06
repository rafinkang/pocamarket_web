"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ChevronDown, Menu, User, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { ABOUT_US, LOGIN, MYPAGE, POKEMON_CARD, POKEMON_CARD_TRADE } from "@/constants/path";
import useAuthStore from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

/**
 * 네비게이션 메뉴 목록
 */
const navigationMenus = [
  { title: "홈", href: "/" },
  { title: "포켓몬 카드", href: POKEMON_CARD },
  { title: "카드 교환", href: POKEMON_CARD_TRADE },
  { title: "About Us", href: ABOUT_US },
];

export function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const mobileMenuRef = React.useRef(null);
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);

  /**
   * 모바일 메뉴 토글
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * 모바일 메뉴 닫기
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = () => {
    useAuthStore.getState().logout();
    closeMobileMenu();
  };

  /**
   * 외부 클릭 감지로 모바일 메뉴 닫기
   */
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* 네비게이션 컨텐츠 */}
      <div className="flex h-16 items-center justify-between w-full max-w-[1024px] px-4">
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <span className="font-bold text-gray-900">
            포카마켓
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationMenus.map((menu, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-100 hover:text-gray-900 text-gray-700 transition-colors`}
                >
                  <Link href={menu.href}>{menu.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* 사용자 메뉴 & 모바일 햄버거 */}
        <div className="flex items-center space-x-4">
          {/* 데스크톱 사용자 메뉴 */}
          <div className="hidden md:flex">
            {isLogin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Avatar className="h-6 w-6 ring-4 ring-white shadow-lg">
                      {user.profileImageUrl &&
                        user.profileImageUrl !== null &&
                        user.profileImageUrl !== '' &&
                        user.profileImageUrl !== 'null' && (
                          <AvatarImage src={user.profileImageUrl} alt="프로필이미지" />
                        )}
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        <User className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.nickname}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border-gray-200">
                  <DropdownMenuItem asChild>
                    <Link
                      href={MYPAGE}
                      className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                      마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="ghost"
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <Link href={LOGIN}>로그인</Link>
              </Button>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            aria-label="메뉴 열기/닫기"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* 모바일 메뉴 */}
          <div
            ref={mobileMenuRef}
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-[1280px] mx-auto py-4 px-4">
              <nav className="flex flex-col space-y-2">
                {/* 네비게이션 메뉴 */}
                {navigationMenus.map((menu, index) => (
                  <Link
                    key={index}
                    href={menu.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                  >
                    {menu.title}
                  </Link>
                ))}

                {/* 사용자 메뉴 */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {isLogin ? (
                    <>
                      <Link
                        href={MYPAGE}
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                      >
                        마이페이지 ({user.nickname}님)
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <Link
                      href={LOGIN}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
