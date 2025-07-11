"use client";

import FlippableCard from "@/components/card/FlippableCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { memo } from "react";
import { RiAddLine, RiSearchLine } from "react-icons/ri";

const FilterCard = memo(function FilterCard({
  data,
  type,
  onCardClick,
  onCancelClick,
}) {
  const cardSize = { width: '160px', aspectRatio: '366/512' };
  
  // 카드 타입에 따른 스타일 구분
  const getCardStyle = () => {
    if (type === "my") {
      return {
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverBg: "hover:bg-blue-100",
        hoverBorder: "hover:border-blue-300",
        iconColor: "text-blue-500",
        title: "내 카드"
      };
    } else {
      return {
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        hoverBg: "hover:bg-purple-100",
        hoverBorder: "hover:border-purple-300",
        iconColor: "text-purple-500",
        title: "원하는 카드"
      };
    }
  };

  const cardStyle = getCardStyle();

  return (
    <>
      {data.code ? (
        <div className="relative group" style={cardSize}>
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
            width={cardSize.width}
            maxWidth={cardSize.width}
          />
        </div>
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card
              className={`
                cursor-pointer transition-all duration-300 ease-in-out
                ${cardStyle.bgColor} ${cardStyle.borderColor} ${cardStyle.hoverBg} ${cardStyle.hoverBorder}
                border-2 border-dashed hover:shadow-lg hover:scale-105 active:scale-95
                flex flex-col items-center justify-center rounded-lg
              `}
              onClick={() => {
                console.log(data);
                onCardClick(data);
              }}
              style={cardSize}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center space-y-4">
                {/* 메인 아이콘 */}
                <div className="relative">
                  <RiSearchLine className={cardStyle.iconColor} size={24} />
                </div>

                {/* 텍스트 */}
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {cardStyle.title}
                  </p>
                </div>

                {/* 플러스 아이콘 */}
                <div className="">
                  <RiAddLine className="text-gray-600" size={12} />
                </div>

                {/* 액션 힌트 */}
                <div className="mt-auto">
                  <div className="px-2 py-1 bg-white/70 backdrop-blur-sm rounded-full border border-white/50">
                    <span className="text-xs font-medium text-gray-700">클릭하여 선택</span>
                  </div>
                </div>
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
