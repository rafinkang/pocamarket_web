import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SUCCESS, UN_AUTHORIZED } from "@/constants/httpStatusCode";

// 동적으로 동작함을 명시적으로 선언.
export const dynamic = 'force-dynamic';

// 토큰 재발급 작업을 공유하기 위한 Promise 변수 (모든 요청이 공유)
// 이 변수가 '잠금(Lock)' 역할.
let refreshPromise = null;

// api 요청 함수
async function apiRequest(slug, search, request, token) {
  // 최종 요청 URL에 쿼리 스트링(search)을 포함.
  const url = `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/${slug}${search}`;
  console.log(`Forwarding request to: ${url}`); // 디버깅을 위한 로그

  const headers = new Headers(request.headers); // 기존 헤더
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.delete("host"); // next.js가 자동으로 추가하는 host 헤더 삭제

  return await fetch(url, {
    method: request.method,
    headers: headers,
    body: request.body,
    duplex: "half",
  });
}

// 토큰을 재발급하는 로직을 별도 함수로 분리
async function refreshTokenAndCookies() {
  console.log("2222222222")
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 리프레쉬 토큰이 없는 경우 401 에러 반환(로그아웃 처리, 로그인 유도)
  if (!refreshToken) throw new Error("No refresh token available for reissue.");

  // Spring Boot에 토큰 재발급 요청
  const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/reissue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  console.log("refreshRes >>>>>>>>>>>>>>>>>>>> ", refreshRes)

  // AccessToken 재발급 실패시 로그아웃 처리
  if (!refreshRes.status !== SUCCESS) throw new Error("Token refresh request failed.");

  // AccessToken 재발급 성공 시, 새로운 쿠키와 AccessToken을 준비
  const refreshData = await refreshRes.json();
  const newAccessToken = refreshData.accessToken;
  const newCookies = refreshRes.headers.getSetCookie();

  return { newAccessToken, newCookies };
}

// 모든 http 메소드 처리
async function handler(request, { params }) {
  console.log('start!!!!!!!!!!!!!!!')
  // 클라이언트가 요청한 경로 조합 (ex: /api/proxy/tcg-trade/1 -> /api/tcg-trade/1)
  const slug = params.slug.join("/");
  const cookieStore = cookies(); // HttpOnly 쿠키 읽어옴
  const accessToken = cookieStore.get("accessToken")?.value;
  const queryString = request.nextUrl.search;

  // 원래 요청
  const initialRes = await apiRequest(slug, queryString, request, accessToken);

  // 401에러(토큰 만료)가 아닌 경우 요청 반환
  if (initialRes.status !== UN_AUTHORIZED) return initialRes;
  console.log("1111111111")

  // 현재 다른 요청이 토큰 재발급을 진행하고 있는지 확인
  if (!refreshPromise) {
    // 아무도 재발급을 진행하고 있지 않다면, 토큰 재발급을 시작하고 Promise를 공유 변수에 저장.
    refreshPromise = refreshTokenAndCookies().finally(() => {
      // 성공하든 실패하든, 작업이 끝나면 다음 요청이 재발급을 시도할 수 있도록 잠금을 해제.
      refreshPromise = null;
    });
  } else {
    console.log("Refresh already in progress. Waiting for it to complete...");
  }

  try {
    // 첫 요청이든, 기다리던 요청이든, 진행 중인 재발급 작업이 끝나기를 기다림.
    const { newAccessToken, newCookies } = await refreshPromise;

    // 재발급 성공 후, 원래 실패했던 API를 새로운 토큰으로 재시도.
    console.log("Token refreshed. Retrying original request...");
    const retryResponse = await apiRequest(slug, queryString, request, newAccessToken);
  console.log("33333333333")

    // 최종 응답에 새로운 쿠키를 담아 클라이언트에게 전달.
    const finalHeaders = new Headers(retryResponse.headers);
    newCookies.forEach(cookie => finalHeaders.append('Set-Cookie', cookie));
  console.log("44444444444")

    return new NextResponse(retryResponse.body, {
      status: retryResponse.status,
      statusText: retryResponse.statusText,
      headers: finalHeaders,
    });

  } catch (error) {
    // 재발급 자체가 실패한 경우 (예: 리프레시 토큰 만료)
    console.error("Could not refresh token:", error.message);
    const response = NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
