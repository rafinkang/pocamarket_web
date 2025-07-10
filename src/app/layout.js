import { Noto_Sans_KR } from 'next/font/google';

import AuthProvider from '@/components/providers/AuthProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { defaultMetadata } from '@/lib/metadata';

// 폰트 설정
const notoSansKr = Noto_Sans_KR({
  // preload: true, // (선택) 미리 로드할지 여부
  subsets: ['latin'], // 또는 'korean' (보통 Next.js가 알아서 최적화해줌)
  weight: ['100', '400', '700'], // 사용할 폰트 두께
  variable: '--font-noto-sans-kr', // CSS 변수 이름 지정
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// export const metadata = { ... } 형태로 기본 메타데이터를 정의합니다.
export const metadata = defaultMetadata;


export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="light layout-full">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "antialiased font-sans",
          geistSans.variable, 
          geistMono.variable, 
          notoSansKr.variable
        )}
      >
        <AuthProvider>
          <Header />
          <div className="max-w-[1024px] mx-auto">
            <main className="min-h-[calc(100vh_-_112px)] w-full flex flex-col">
              {children}
            </main>
            <Toaster />
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
