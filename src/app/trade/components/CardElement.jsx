"use client";

import { useState } from "react";

import PokemonCard from "@/components/list/PokemonCard";

export default function CardElement({
  data,
  priority = false,
  testMode = true,
}) {
  const [isError, setIsErorr] = useState(false);

  const imageHandleError = () => {
    setIsErorr(true);
  };

  const onClickHandler = () => {
    // 누르면 카드 선택 카드 반영
    console.log("카드 버튼 눌림");
    console.log(data);
  };

  return (
    <button
      onClick={onClickHandler}
      className="no-underline block min-w-[200px] max-w-[400px] w-full h-[100%] my-2 bg-[#f8f9fa] shadow-lg"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </button>
  );
}
