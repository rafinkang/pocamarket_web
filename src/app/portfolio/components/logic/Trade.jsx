'use client';
import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function Trade() {
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
        noteBkgColor: "#facc15",
        noteTextColor: "#1e293b",
        sequenceNumberColor: "#ffffff",
        activationBkgColor: "#facc15",
        activationTextColor: "#1e293b"
      }
    });
    mermaid.contentLoaded();
  }, []);

  return (
    <>
      <div
        className="mermaid"
        dangerouslySetInnerHTML={{
          __html: `
            sequenceDiagram
                participant UserA as 게시글 등록자
                participant Server
                participant UserB as 교환 요청자

                UserA->>Server: 교환 게시글 등록
                UserB->>Server: 교환 요청 신청
                Server->>UserB: 교환 게시글 상태에 따른 응답

                alt 교환 가능
                  Server->>UserA: 교환 신청 목록 표시
                  Server->>UserB: 교환 신청 완료 안내
                else 교환 불가(교환글 수락/완료됨 등)
                  Server->>UserB: 교환 신청 불가 안내
                end

                UserA->>Server: 교환 신청 수락
                Server->>UserA: 교환 신청 수락 완료
                Server->>UserB: 교환 신청 수락 완료
                Server->>UserA: 친구 코드 공개
                Server->>UserB: 친구 코드 공개
                UserA->>Server: 교환 완료
          `,
        }}
      />
      <style>{`
        .loopText>tspan {
          fill: #000 !important;
          color: #000 !important;
          font-weight: bold;
        }
        text.loopText {
          fill: #000 !important;
          color: #000 !important;
          font-weight: bold !important;
        }
      `}</style>
    </>
  );
}