"use client";

import TradeElement from "./TradeElement";

export default function TradeList({ tradeList }) {
  return (
    <>
      <section className="flex flex-col items-center w-full">
        <div className="contentList w-full px-[20px]">
          {tradeList && tradeList.length > 0 ? (
            <ul className="flex flex-col items-center justify-items-center w-full gap-4">
              {tradeList.map((card, index) => (
                <li className="w-full h-[100%]" key={card.code}>
                  <TradeElement />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <ul className="flex flex-col items-center justify-items-center w-full gap-4">
                <li className="w-full h-[100%]">
                  <TradeElement
                    myCard={{
                      code: "a1-001",
                      name: "테스트 마이 카드 나중에 코드 지워주세요",
                    }}
                    wantedCards={[
                      { code: "a1-002", name: "테스트 원하는 카드" },
                    ]}
                  />
                </li>
                <li className="w-full h-[100%]">
                  <TradeElement
                    myCard={{
                      code: "a1-001",
                      name: "테스트 마이 카드 나중에 코드 지워주세요",
                    }}
                    wantedCards={[
                      { code: "a1-002", name: "테스트 원하는 카드" },
                      { code: "a1-003", name: "테스트 원하는 카드2" },
                    ]}
                  />
                </li>
                <li className="w-full h-[100%]">
                  <TradeElement
                    myCard={{
                      code: "a1-001",
                      name: "테스트 마이 카드 나중에 코드 지워주세요",
                    }}
                    wantedCards={[
                      { code: "a1-001", name: "테스트 원하는 카드1" },
                      { code: "a1-002", name: "테스트 원하는 카드2" },
                      { code: "a1-003", name: "테스트 원하는 카드3" },
                    ]}
                  />
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
