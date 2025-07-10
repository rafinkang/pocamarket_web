import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * 현재 사용자의 인증 상태를 확인하는 API
 * 클라이언트(AuthProvider)가 앱 로드 시 호출.
 */
// export async function GET() {
//   const cookieStore = await cookies();
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   if (!refreshToken) {
//     return NextResponse.json({ isLogin: false, user: null });
//   } else {
//     return NextResponse.json({ isLogin: true, user: null });
//   }
// }

export async function POST(request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  
  const body = await request.json();
  const user = body.user;
  // console.log("POST 실행", user, refreshToken);

  if (refreshToken && user !== null) {
    // 로그인 처리
    return NextResponse.json({ isLogin: true, user: user });
  } else {
    // 로그아웃 처리
    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");
    return NextResponse.json({ isLogin: false, user: null });
  }
}