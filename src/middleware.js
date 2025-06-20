// 페이지나 api 라우트로 요청이 도달하기 전에 실행
import { NextResponse } from 'next/server';
import { LOGIN } from './constants/path';

/** @param {import('next/server').NextRequest} request */
export function middleware(request) {
  // 1. 로그인 상태 확인 (오직 쿠키에서만 토큰을 가져옴.)
  const refreshToken = request.cookies.get('refreshToken')?.value;
  console.log('미들웨어에서 확인한 refreshToken:', refreshToken);

  // 2. 로그인이 필요한 페이지에 접근하는데, 토큰이 없는 경우
  // isLogin 대신 refreshToken의 존재 여부로 판단.
  if (!refreshToken) {
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    
    console.log('로그인이 필요하여 로그인 페이지로 리디렉션합니다.');
    return NextResponse.redirect(loginUrl);
  }

  // 3. 토큰이 있는 경우, 요청을 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/mypage/:path*', // mypage와 그 하위 모든 경로에 적용
    '/pokemon-card-trade/write', // pokemon-card-trade 글 쓰기 페이지
  ],
};