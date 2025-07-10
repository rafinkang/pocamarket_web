// 페이지나 api 라우트로 요청이 도달하기 전에 실행
import { NextResponse } from 'next/server';
import { LOGIN } from './constants/path';

/** @param {import('next/server').NextRequest} request */
export function middleware(request) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const accessToken = request.cookies.get('accessToken')?.value;
  
  console.log('미들웨어에서 확인한 refreshToken:', refreshToken ? '존재' : '없음');
  console.log('미들웨어에서 확인한 accessToken:', accessToken ? '존재' : '없음');

  // 1. 토큰 유효성 기본 검사 (형태 검증)
  if (refreshToken && !isValidTokenFormat(refreshToken)) {
    console.log('미들웨어::유효하지 않은 refreshToken 형태, 쿠키 삭제');
    const response = NextResponse.redirect(new URL(LOGIN, request.url));
    response.cookies.delete('refreshToken');
    response.cookies.delete('accessToken');
    return response;
  }

  // 2. 보호된 페이지 접근 제어
  if (!refreshToken) {
    console.log('미들웨어::로그인이 필요한 페이지 접근, 로그인 페이지로 리디렉션');
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    loginUrl.searchParams.set('reason', 'auth_required'); // 클라이언트에서 로그아웃 처리 유도
    
    const response = NextResponse.redirect(loginUrl);
    // 만료된 쿠키가 있다면 정리
    response.cookies.delete('refreshToken');
    response.cookies.delete('accessToken');
    return response;
  }

  // 3. 토큰이 있는 경우, 요청을 그대로 진행
  return NextResponse.next();
}

/**
 * 토큰 형태 검증 (JWT 기본 형태 확인)
 */
function isValidTokenFormat(token) {
  if (!token || typeof token !== 'string') return false;
  
  // JWT는 base64로 인코딩된 3개 부분이 '.'으로 구분됨
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  // 각 부분이 base64로 디코딩 가능한지 확인
  try {
    parts.forEach(part => {
      if (!part) throw new Error('Empty part');
      // base64 디코딩 시도
      atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const config = {
  matcher: [
    '/mypage/:path*', // mypage와 그 하위 모든 경로에 적용
    '/pokemon-card-trade/write', // pokemon-card-trade 글 쓰기 페이지
  ],
};