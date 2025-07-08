'use client';
import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function Security() {
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      "theme": "base",
      themeVariables: {
        primaryColor: "#1e293b",
        primaryTextColor: "#ffffff",
        lineColor: "#1e293b",
        textColor: "#1e293b",
        secondaryColor: "#334155",
        tertiaryColor: "#475569",
        noteBkgColor: "#475569",
        noteTextColor: "#ffffff",
        sequenceNumberColor: "#ffffff"
      }
    });
    mermaid.contentLoaded();
  }, []);

  return (
    <div
      className="mermaid"
      dangerouslySetInnerHTML={{
        __html: `
          sequenceDiagram
            participant Client
            participant NextJS Server
            participant SecurityFilterChain
            participant JwtAuthenticationFilter
            participant AuthenticationManager
            participant JwtTokenProvider
            participant BackendController

            Client->>NextJS Server: HTTP 요청
            NextJS Server->>SecurityFilterChain: HTTP 요청
            SecurityFilterChain->>JwtAuthenticationFilter: 인증 필터 실행
            JwtAuthenticationFilter->>JwtTokenProvider: 토큰 유효성 검증
            JwtTokenProvider-->>JwtAuthenticationFilter: 인증 성공 여부 반환
            JwtAuthenticationFilter->>AuthenticationManager: 인증 객체 생성
            AuthenticationManager-->>SecurityFilterChain: 인증 성공 처리
            SecurityFilterChain->>BackendController: 요청 전달
            BackendController-->>Client: 응답 반환
            Client-->>NextJS Server: 로그인 체크 요청
            NextJS Server-->>Client: 로그인 여부 반환
        `,
      }}
    />
  );
}