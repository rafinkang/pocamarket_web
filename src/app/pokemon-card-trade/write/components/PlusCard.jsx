"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RiAddLine, RiImage2Line, RiSearchLine } from "react-icons/ri";

export default function PlusCard({ type = "my", onMyCardClick, onWantCardClick }) {
  const onPlusCardClick = () => {
    if (type === "my") {
      onMyCardClick();
    } else {
      onWantCardClick();
    }
  }

  const getCardContent = () => {
    if (type === "my") {
      return {
        icon: <RiImage2Line className="text-blue-500" size={24} />,
        title: "내 카드",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverBg: "hover:bg-blue-100",
        hoverBorder: "hover:border-blue-300"
      };
    } else {
      return {
        icon: <RiSearchLine className="text-purple-500" size={24} />,
        title: "원하는 카드",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        hoverBg: "hover:bg-purple-100",
        hoverBorder: "hover:border-purple-300"
      };
    }
  };

  const cardContent = getCardContent();

  return (
    <Card
      className={`
        w-full h-full cursor-pointer
        ${cardContent.bgColor} ${cardContent.borderColor} ${cardContent.hoverBg} ${cardContent.hoverBorder}
        border-2 border-dashed transition-all duration-300 ease-in-out
        hover:shadow-lg hover:scale-105 active:scale-95
        flex flex-col items-center justify-center
        rounded-lg
      `}
      onClick={onPlusCardClick}
    >
      <CardContent className="p-2 flex flex-col items-center justify-center h-full text-center space-y-5">
        {/* 메인 아이콘 */}
        <div className="relative">
          {cardContent.icon}
        </div>

        {/* 텍스트 */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {cardContent.title}
          </p>
        </div>

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
  );
}
