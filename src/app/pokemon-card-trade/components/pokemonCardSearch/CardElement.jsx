"use client";

import PokemonCard from "@/components/list/PokemonCard";

export default function CardElement({
  data,
  priority = false,
  testMode = true,
  onCLick,
}) {
  const onClickHandler = () => {
    if (onCLick) {
      onCLick(data);
    }
  };

  return (
    <button
      className="no-underline block max-w-[300px] w-full my-2 shadow-lg"
      onClick={onClickHandler}
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </button>
  );
}
