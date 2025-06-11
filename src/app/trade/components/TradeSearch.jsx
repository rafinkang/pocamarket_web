"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTrade } from "./TradeProvider";
import SelectedCard from "./SelectedCard";

const selectCardInfo = {
  code: null,
  name: null,
};

export default function TradeSearch({ onSearch, onCardButton }) {
  // const [isSearchList, setIsSearchList] = useState(false);
  const { selectedCard, handleCardClick, addYourCard, resetSelectCard } =
    useTrade();

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

  const onAddYourCard = () => {
    addYourCard({ ...selectCardInfo });
  };

  // 필터 초기화
  const handleReset = () => {
    resetSelectCard();
  };

  return (
    <section id="formBody" className="w-full">
      <div className="flex items-center gap-6">
        <div className="flex items-center flex-grow gap-2">
          <button
            className="myCardBtn"
            onClick={() => {
              onCardButton("my");
              handleCardClick("my");
            }}
          >
            <SelectedCard type="my" cardName="없음" />
            <Input className="w-[100%] bg-white hidden" />
          </button>

          {selectedCard.your.map((card, index) => (
            <button
              key={`your-${index}`}
              className="yourCardBtn"
              onClick={() => {
                onCardButton(`your-${index}`);
                handleCardClick(`your-${index}`);
              }}
            >
              <SelectedCard
                type={`your-${index}`}
                subject="원하는 카드"
                cardName="없음"
              />
              <Input className="w-[100%] bg-white hidden" />
            </button>
          ))}

          {selectedCard.your.length < 5 && (
            <button onClick={onAddYourCard}>카드 추가</button>
          )}
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
          <Button type="button" className="ml-2">
            교환 등록
          </Button>
        </div>
      </div>
    </section>
  );
}
