"use client";

import { useTrade } from "./TradeProvider";
import PokemonCard from "@/components/list/PokemonCard";

export default function CardElement({
  data,
  priority = false,
  testMode = true,
}) {
  const { updateSelectCardInfo, activeCard } = useTrade();

  const onClickHandler = () => {
    // activeCard가 없으면 아무것도 하지 않음
    if (!activeCard) return;
    updateSelectCardInfo({
      code: data.code,
      name: data.nameKo,
      type: activeCard,
    });
  };

  return (
    <button
      onClick={onClickHandler}
      className="no-underline block min-w-[200px] max-w-[300px] w-full my-2 bg-[#f8f9fa] shadow-lg"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </button>
  );
}
