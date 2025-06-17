"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { RiAddLine } from "react-icons/ri";

export default function PlusCard({ type = "my", onMyCardClick, onWantCardClick }) {
  const title = type === "my" ? "교환할 카드" : "교환 받고 싶은 카드";
  const onPlusCardClick = () => {
    if (type === "my") {
      onMyCardClick();
    } else {
      onWantCardClick();
    }
  }
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer" onClick={onPlusCardClick}>
          <CardContent className="flex justify-center items-center w-full h-full">
            <RiAddLine size="50px" />
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-[200px]">
        <p>{title}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
