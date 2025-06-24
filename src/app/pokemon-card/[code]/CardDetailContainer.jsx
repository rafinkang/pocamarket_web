"use client"

import { useState, useEffect } from "react";
import PokemonCard from "@/components/list/PokemonCard";

export default function CardDetailContainer({ data }) {
  const [cardDetail, setCardDetail] = useState(null);
  useEffect(() => {
    setCardDetail(data)
  }, [data]);

  return (
    <div>
      <h1>Card Detail Container</h1>
      {cardDetail && (
        <>
          <p>Card Code: {cardDetail?.code}</p>
          <div>
            <h2>{cardDetail.nameKo}</h2>
            <p>{cardDetail.description}</p>
            <PokemonCard data={cardDetail} />
          </div>
        </>
      )}
    </div>
  );
}
