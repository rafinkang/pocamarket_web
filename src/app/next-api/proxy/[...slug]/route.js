import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SUCCESS, UN_AUTHORIZED } from "@/constants/httpStatusCode";
import { API_CONFIG } from "@/config/apiConfig";

// 동적으로 동작함을 명시적으로 선언.
export const dynamic = 'force-dynamic';

// 토큰 재발급 작업을 공유하기 위한 Promise 변수 (모든 요청이 공유)
// 이 변수가 '잠금(Lock)' 역할.
let refreshPromise = null;

// api 요청 함수
async function apiRequest(slug, search, request, token) {
  // 최종 요청 URL에 쿼리 스트링(search)을 포함.
  const url = API_CONFIG.getApiUrl(`/${slug}${search}`);
  console.log(`Forwarding request to: ${url}`); // 디버깅을 위한 로그
  console.log("process.env.NODE_ENV >>>>>>>>>>>>>>>>>>>>>> ", process.env.NODE_ENV)
  const headers = new Headers(request.headers); // 기존 헤더
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.delete("host"); // next.js가 자동으로 추가하는 host 헤더 삭제
  headers.delete("connection"); // connection 헤더 삭제 (fetch가 자동 처리)
  headers.delete("content-type");

  const options = {
    method: request.method,
    headers: headers,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
    const bodyText = await request.text();
    if (bodyText) {
      options.body = bodyText;
      headers.set('Content-Type', 'application/json');
    }
  }

  return await fetch(url, options);
}

// 토큰을 재발급하는 로직을 별도 함수로 분리
async function refreshTokenAndCookies() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 리프레쉬 토큰이 없는 경우 401 에러 반환(로그아웃 처리, 로그인 유도)
  if (!refreshToken) throw new Error("No refresh token available for reissue.");

  // Spring Boot에 토큰 재발급 요청
  const refreshRes = await fetch(API_CONFIG.getApiUrl('/reissue'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  console.log("refreshRes >>>>>>>>>>>>>>>>>>>> ", refreshRes)

  // 재발급 실패 시 에러를 던지도록 수정
  if (refreshRes.status !== SUCCESS) {
    const errorBody = await refreshRes.json().catch(() => ({ message: "Unknown refresh error" }));
    throw new Error(errorBody.message || "Token refresh request failed.");
  }

  const refreshData = await refreshRes.json();
  const newAccessToken = refreshData.accessToken;
  const newCookies = refreshRes.headers.getSetCookie();
  
  if (!newAccessToken) {
    throw new Error("New access token was not found in the refresh response body.");
  }

  return { newAccessToken, newCookies };
}

// 모든 http 메소드 처리
async function handler(request, { params }) {
  console.log('route http 메소드 처리 시작');
  // 클라이언트가 요청한 경로 조합 (ex: /api/proxy/tcg-trade/1 -> /api/tcg-trade/1)
  const tempParams = await params;
  const slug = await tempParams.slug.join("/");
  const cookieStore = await cookies(); // HttpOnly 쿠키 읽어옴
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const isRefreshTokenOnly = !accessToken && refreshToken
  const queryString = request.nextUrl.search;
  let initialRes = null
  
  console.log('refreshToken >>>>>>>>>>>>>>>>>>>>>> ', refreshToken);
  console.log("accessToken >>>>>>>>>>>>>>>>>>>>>> ", accessToken);

  // refreshToken만 있는 경우
  if (!isRefreshTokenOnly) {
    // 원래 요청
    initialRes = await apiRequest(slug, queryString, request, accessToken);

    // 401에러(토큰 만료)가 아닌 경우 요청 반환
    if (initialRes.status !== UN_AUTHORIZED) return initialRes;
  }

  console.log('accessToken 재발급 시작');

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
    console.log('accessToken 재발급 완료');

    // 재발급 성공 후, 원래 실패했던 API를 새로운 토큰으로 재시도.
    console.log("Token refreshed. Retrying original request...");
    const retryResponse = await apiRequest(slug, queryString, request, newAccessToken);

    // 최종 응답에 새로운 쿠키를 담아 클라이언트에게 전달.
    const finalHeaders = new Headers(retryResponse.headers);
    newCookies.forEach(cookie => finalHeaders.append('Set-Cookie', cookie));
    console.log("새로운 쿠키 셋팅 >>>>>>>>>>> ", newCookies)

    return new NextResponse(retryResponse.body, {
      status: retryResponse.status,
      statusText: retryResponse.statusText,
      headers: finalHeaders,
    });
  } catch (error) {
    // 재발급 자체가 실패한 경우 (예: 리프레시 토큰 만료)
    console.error("Could not refresh token:", error.message);
    const response = NextResponse.json({ message: "Session expired. Please log in again." }, { status: UN_AUTHORIZED });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
