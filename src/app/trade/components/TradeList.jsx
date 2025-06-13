"use client";

import TradeElement from "./TradeElement";

export default function TradeList({ tradeList }) {
  return (
    <>
      <section className="flex flex-col items-center w-full">
        <div className="contentList w-full px-[20px]">
          {tradeList && tradeList.length > 0 ? (
              <ul className="flex flex-col items-center justify-items-center w-full">
              {tradeList.map((card, index) => (
                <li
                  className="flex items-center justify-center w-full max-w-[300px]"
                  key={card.code}
                >
                  <TradeElement />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <ul className="flex flex-col items-center justify-items-center w-full">
                <li className="flex items-center justify-center w-full min-w-[300px]">
                  <TradeElement myCard={{code: "a1-001", name: "테스트 마이 카드 나중에 코드 지워주세요"}} wantedCards={[{code: "a1-002", name: "테스트 원하는 카드"}]} />
                </li>
                <li className="flex items-center justify-center w-full min-w-[300px]">
                  <TradeElement myCard={{code: "a1-001", name: "테스트 마이 카드 나중에 코드 지워주세요"}} 
                  wantedCards={[{code: "a1-002", name: "테스트 원하는 카드"}, {code: "a1-003", name: "테스트 원하는 카드2"}]} />
                </li>
                <li className="flex items-center justify-center w-full min-w-[300px]">
                  <TradeElement myCard={{code: "a1-001", name: "테스트 마이 카드 나중에 코드 지워주세요"}} 
                  wantedCards={[
                      {code: "a1-001", name: "테스트 원하는 카드1"}, 
                      {code: "a1-002", name: "테스트 원하는 카드2"},
                      {code: "a1-003", name: "테스트 원하는 카드3"},
                      {code: "a1-004", name: "테스트 원하는 카드4"},
                      {code: "a1-005", name: "테스트 원하는 카드5"},
                    ]} />
                </li>
              </ul>
              <div className="py-10 text-gray-400 text-lg text-center">
                검색 결과가 없습니다.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
