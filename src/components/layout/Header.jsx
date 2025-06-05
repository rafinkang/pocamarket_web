"use client"

import { HeaderLeftNav } from "./HeaderLeftNav"
import useAuthStore from '@/store/authStore'
import { HeaderLogin } from "./HeaderLogin";

export function Header() {
    const isLogin = useAuthStore((state) => state.isLogin);
    const user = useAuthStore((state) => state.user);
  return (
    <header className="border-grid sticky top-0 z-50 w-full">
      <div className="container-wrapper flex justify-center">
        <div className="container flex h-14 items-center gap-2">
          <HeaderLeftNav />
          {/* <div className="ml-auto flex items-center gap-2">
            <HeaderLogin />
          {isLogin ? (
            <div>
              <p>현재 로그인된 사용자: {user.nickname}</p>
              <p>마지막 로그인 일시: {user.lastLoginAt}</p>
            </div>
          ) : (
            <div>
              <p>로그인되지 않았습니다.{user.nickname}</p>
            </div>
          )}
          </div> */}
        </div>
      </div>
    </header>
  )
}