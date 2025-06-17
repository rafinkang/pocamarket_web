"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PokemonCard from "@/components/list/PokemonCard";
import { RiAddLine } from "react-icons/ri";
import { useCallback, memo } from "react";

const FindCard = memo(function FindCard({ data, onCardClick }) {
  const title =
    data.findCardTtpe === "my" ? "교환할 카드" : "교환 받고 싶은 카드";

  const handleClick = useCallback(
    (e) => {
      if (e.defaultPrevented) return;
      e.preventDefault();
      e.stopPropagation();
      onCardClick(data.findCardTtpe);
    },
    [data.findCardTtpe, onCardClick]
  );

  return (
    <>
      {data.code ? (
        <div
          className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform"
          onClick={handleClick}
        >
          <PokemonCard
            data={data}
            priority={false}
            testMode={false}
            showInfo={false}
            className="w-full h-full shadow-lg hover:shadow-xl transition-shadow"
          />
        </div>
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card
              className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              onClick={handleClick}
            >
              <CardContent className="flex justify-center items-center w-full h-full p-0">
                <RiAddLine size="50px" />
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-[200px]">
            <p>{title}</p>
          </HoverCardContent>
        </HoverCard>
      )}
    </>
  );
});

FindCard.displayName = "FindCard";

export default FindCard;
