"use client";

import { Button } from "@/components/ui/button";

import { useTrade } from "./TradeProvider";
import SelectedCard from "./SelectedCard";
import Link from "next/link";
import { POKEMON_CARD_TRADE } from "@/constants/path";

export default function TradeSearch({ onSearch, onCardButton }) {
  const { selectedCardList, setActiveCard, resetSelectCard } = useTrade();

  // 필터 제출
  const onSubmit = (data) => {
    if (onSearch) {
      const result = { ...data };

      arrData.forEach((field) => {
        let d = result[field];
        if (d && Array.isArray(d)) {
          d = d.join(",").trim();
        } else {
          d = null;
        }
        result[field] = d;
      });

      // excludedValue(전체)는 아예 파라미터에서 제외
      Object.keys(result).forEach((key) => {
        if (
          result[key] === excludedValue ||
          result[key] === "" ||
          result[key] == null
        ) {
          delete result[key];
        }
      });
      onSearch(result); // 객체로 넘김
    }
  };

  // const onAddYourCard = () => {
  //   addYourCard({ ...selectCardInfo });
  // };

  // 필터 초기화
  const handleReset = () => {
    resetSelectCard();
  };

  return (
    <section id="formBody" className="w-full">
      <div className="bg-[#f7f7f7] p-4 rounded min-w-[300px]">
        <div className="flex flex-col gap-6 optionContainer">
          <div className="flex items-center gap-2 searchbarContainer justify-between">
            <div className="flex items-center flex-grow gap-2 overflow-x-auto">
              {selectedCardList.map((card) => (
                <button
                  key={card.type}
                  className="tradeCardBtn shrink-0"
                  onClick={() => {
                    onCardButton(card.type);
                    setActiveCard(card.type);
                  }}
                >
                  <SelectedCard
                    code={card.code}
                    name={card.name}
                    type={card.type}
                  />
                </button>
              ))}

              {/*           {selectedCardList.your.length < 5 && (
            <button onClick={onAddYourCard}>카드 추가</button>
          )} */}
            </div>
          </div>

          <div className="buttonContainer flex items-right gap-4 justify-end">
            <Button type="submit" className="ml-2">
              검색
            </Button>
            <Button
              type="button"
              className="ml-4 bg-gray-300 text-black"
              onClick={handleReset}
            >
              초기화
            </Button>
            <Link href={`${POKEMON_CARD_TRADE}/write`}>
              <Button type="button" className="ml-2">
                교환 등록
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
