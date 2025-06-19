"use client";

import TradeElement from "./TradeElement";
import { convertStatus } from "@/constants/tradeFilter";
import { getTimeDifference } from "@/utils/dateUtils";

export default function TradeList({ tradeList }) {
  return (
    <>
      <section className="flex flex-col items-center w-full">
        <div className="contentList w-full px-[20px]">
          {tradeList && tradeList.length > 0 ? (
            <ul className="flex flex-col items-center justify-items-center w-full gap-4">
              {tradeList.map((trade, index) => (
                <li className="w-full h-[100%]" key={trade.tradeId}>
                  <TradeElement
                    tradeCode={trade.tradeId}
                    tradeUserNickname={trade.nickname}
                    myCard={trade.myCardInfo}
                    wantedCards={trade.wantCardInfo}
                    createAt={getTimeDifference(trade.created_at)}
                    status={convertStatus(trade.status)}
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
