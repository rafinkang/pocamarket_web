"use client";

import { useState } from "react";
import PokemonCard from "@/components/list/PokemonCard";

export default function PokemonCardLink({
  data,
  priority = false,
  testMode = true,
}) {
  const [isError, setIsErorr] = useState(false);

  const imageHandleError = () => {
    setIsErorr(true);
  };

  return (
    <a
      href={`/pokemon-card/${data?.code ? data.code : "a1-001"}`}
      className="no-underline w-full"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </a>
  );
}
