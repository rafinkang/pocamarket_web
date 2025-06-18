"use client";

import FlippableCard from "@/components/card/FlippableCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { memo } from "react";
import { RiAddLine } from "react-icons/ri";

const FilterCard = memo(function FilterCard({
  data,
  onCardClick,
  onCancelClick,
}) {
  const title =
    data.filterCardType === "my" ? "교환할 카드" : "교환 받고 싶은 카드";

  return (
    <>
      {data.code ? (
        <div className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform">
          <FlippableCard
            key={data.code}
            cardKey={data.code}
            data={data}
            handleClick={() =>
              onCancelClick({ filterCardType: data.filterCardType, code: null })
            }
            btnName="선택 취소"
            rotateY={180}
            duration={0.3}
          />
        </div>
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card
              className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              onClick={() => onCardClick(data)}
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

FilterCard.displayName = "FilterCard";

export default FilterCard;
