"use client";

import Link from "next/link";
import PokemonCard from "@/components/card/PokemonCard";

export default function CardElement({
  data,
  priority = false,
  testMode = true,
}) {
  const cardCode = data?.code ? data.code : "a1-001";

  return (
    <Link
      href={`/pokemon-card/${cardCode}`}
      className="no-underline w-full h-full block"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </Link>
  );
}
