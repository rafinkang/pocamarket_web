'use client';
import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function Deploy() {
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
                participant Dev as 👨‍💻 Developer
                participant GitHub as 🐙 GitHub
                participant Actions as ⚙️ GitHub Actions
                participant DockerHub as 🐳 Docker Hub
                participant EC2 as ☁️ AWS EC2
                participant User as 👤 User

                Dev->>GitHub: 1. 코드 마스터 병합(pull request)
                GitHub->>Actions: 2. CI/CD 파이프라인 트리거
                Actions->>DockerHub: 3. Docker 이미지 빌드 및 푸시
                Actions->>EC2: 4. SSH 접속 및 배포 스크립트 실행
                EC2->>DockerHub: 5. 새 이미지 다운로드
                EC2->>EC2: 6. 컨테이너 재시작
                EC2-->>Actions: 7. 배포 완료 알림
                User->>EC2: 8. 업데이트된 서비스 사용
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