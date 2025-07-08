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
                participant UserB as 교환 요청자
                participant Front as NextJS
                participant API as BackendServer
                participant DB as Database

                UserA->>Front: 교환 게시글 등록
                Front->>API: 게시글 등록 요청
                API->>DB: 게시글 저장
                DB-->>API: 저장 완료
                API-->>Front: 등록 결과 응답
                Front-->>UserA: 등록 완료

                UserB->>Front: 교환 신청
                Front->>API: 교환 신청 요청
                API->>DB: 게시글 상태 확인
                DB-->>API: 상태 정보 반환
                alt 교환 가능
                  API-->>Front: 신청 결과 응답(성공)
                  Front-->>UserB: 신청 완료 안내
                else 교환 불가(수락/완료됨 등)
                  API-->>Front: 신청 결과 응답(불가)
                  Front-->>UserB: 신청 불가 안내
                end

                UserA->>Front: 교환 신청 목록 확인
                Front->>API: 신청 목록 요청
                API->>DB: 신청 목록 조회
                DB-->>API: 신청 목록 반환
                API-->>Front: 신청 목록 응답
                Front-->>UserA: 신청 목록 표시

                UserA->>Front: 특정 신청 수락
                Front->>API: 교환 수락 요청
                API->>DB: 상태 변경(수락/친구코드 공개)
                DB-->>API: 변경 완료
                API-->>Front: 수락 결과 응답
                Front-->>UserA: 수락 완료 안내
                UserA-->>UserB: 친구코드 공개
                UserB-->>UserA: 친구코드 공개

                alt UserA가 신고
                    UserA->>Front: 교환 요청자(UserB) 신고
                    Front->>API: 신고 요청(신청자)
                    API->>DB: 신고 DB 추가
                    DB-->>API: 신고 처리 완료
                    API-->>Front: 신고 처리 응답
                    Front-->>UserA: 신고 처리 안내
                else UserB가 신고
                    UserB->>Front: 게시글 등록자(UserA) 신고
                    Front->>API: 신고 요청(게시글)
                    API->>DB: 신고 DB 추가
                    DB-->>API: 신고 처리 완료
                    API-->>Front: 신고 처리 응답
                    Front-->>UserB: 신고 처리 안내
                end
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