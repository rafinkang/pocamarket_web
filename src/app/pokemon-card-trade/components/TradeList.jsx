"use client";

import TradeElement from "./TradeElement";

export default function TradeList({ tradeList, testMode }) {
  return (
    <>
      <section className="flex flex-col items-center w-full min-w-[360px]">
        <div className="w-full px-[4px]">
          {tradeList && tradeList.length > 0 ? (
            <ul className="flex flex-col items-center justify-items-center w-full gap-4">
              {tradeList.map((trade) => (
                <li className="w-full" key={trade.tradeId}>
                  <TradeElement
                    tradeCode={trade.tradeId}
                    tradeUserNickname={trade.nickname}
                    myCard={trade.myCardInfo}
                    wantedCards={trade.wantCardInfo}
                    updatedAt={trade.updated_at}
                    status={trade.status}
                    isMyList={trade.isMyList}
                    testMode={testMode}
                    // requestCount={trade.requestCount}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-gray-400 text-lg text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
