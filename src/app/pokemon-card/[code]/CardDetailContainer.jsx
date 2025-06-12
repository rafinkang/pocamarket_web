"use client"

import { getPokemonCardDetail } from "@/api/pokemon-card";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/list/PokemonCard";

export default function CardDetailContainer({ code }) {
    const [cardDetail, setCardDetail] = useState(null);
    useEffect(() => {
        async function fetchCardDetail() {
            const res = await getPokemonCardDetail(code);
            if (res && res.data) {
                setCardDetail(res.data);
            }
        }
        fetchCardDetail();
    }, [code]);

    useEffect(() => {
        console.log('cardDetail22 ::: ', cardDetail);
    }, [cardDetail]);

    return (
        <div>
            <h1>Card Detail Container</h1>
            <p>Card Code: {code}</p>
            {cardDetail && (
                <div>
                    <h2>{cardDetail.nameKo}</h2>
                    <p>{cardDetail.description}</p>
                    <PokemonCard data={cardDetail} />
                </div>
            )}
        </div>
    );
}
