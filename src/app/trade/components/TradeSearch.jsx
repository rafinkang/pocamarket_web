"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTrade } from "./TradeProvider";
import SelectedCard from "./SelectedCard";

export default function TradeSearch({ onSearch, onCardButton }) {
  // const [isSearchList, setIsSearchList] = useState(false);
  const { handleCardClick } = useTrade();
  let myCard = "";
  let yourCard = "";

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

  // 필터 초기화
  const handleReset = () => {
    // form.reset({ ...defaultFilter });
    // arrData.forEach((v) => {
    //   form.setValue(v, []);
    // });
  };

  return (
    <section id="formBody" className="w-full">
      <div className="flex items-center gap-6">
        <div className="flex items-center flex-grow gap-2">
          <button
            className="myCardZone"
            onClick={() => {
              onCardButton("my");
              handleCardClick("my");
            }}
          >
            <SelectedCard type="my" cardName="없음" />
            <Input className="w-[100%] bg-white hidden" />
          </button>

          <button
            className="yourCardZone"
            onClick={() => {
              onCardButton("your");
              handleCardClick("your");
            }}
          >
            <SelectedCard type="your" subject="원하는 카드" cardName="없음" />
            <Input className="w-[100%] bg-white hidden" />
          </button>
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
