"use client";

import FlippableCard from "@/components/card/FlippableCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { memo } from "react";
import { RiAddLine } from "react-icons/ri";

const FilterCard = memo(function FilterCard({
  data,
  onCardClick,
  onCancelClick,
}) {
  return (
    <>
      {data.code ? (
        <div className="w-[60px] sm:w-[80px] md:w-[110px] lg:w-[180px] xl:w-[200px] min-w-[60px] max-w-[200px] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform">
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
            width="100%"
            maxWidth="100%"
          />
        </div>
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card
              className="w-[60px] sm:w-[80px] md:w-[110px] lg:w-[180px] xl:w-[200px] min-w-[60px] max-w-[200px] flex justify-center items-center aspect-[366/512] cursor-pointer hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              onClick={() => onCardClick(data)}
            >
              <CardContent className="flex justify-center items-center w-full h-full p-0">
                <RiAddLine size="40px" className="sm:text-[50px]" />
              </CardContent>
            </Card>
          </HoverCardTrigger>
        </HoverCard>
      )}
    </>
  );
});

FilterCard.displayName = "FilterCard";

export default FilterCard;
