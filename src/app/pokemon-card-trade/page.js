import { Suspense } from 'react';
import TradeListContainer from "./components/TradeListContainer"
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: '포켓몬 카드 교환',
  description: '포켓몬 카드를 교환 할 수 있습니다.',
  keywords: ["포켓몬 카드 교환", "포켓몬 카드 거래", ...siteConfig.keywords],
}

/**
 * 거래 목록 로딩 컴포넌트
 */
function TradeListLoading() {
  return (
    <div className="w-[100%] flex flex-col gap-6">
      <div className="animate-pulse">
        {/* 검색 필터 영역 */}
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-32 h-20 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded mt-6"></div>
              <div className="w-32 h-20 bg-gray-200 rounded"></div>
              <div className="w-32 h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* 거래 목록 영역 */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 border rounded-lg">
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 포켓몬 카드 교환 페이지
 */
export default function TradePage() {
  return (
    <>
      <div id="TradeList" className="w-[100%] flex flex-col gap-6">
        <Suspense fallback={<TradeListLoading />}>
          <TradeListContainer />
        </Suspense>
      </div>
    </>
  );
}
