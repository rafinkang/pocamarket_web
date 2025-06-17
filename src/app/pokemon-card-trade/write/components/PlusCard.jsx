"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RiAddLine } from "react-icons/ri";

export default function PlusCard({ type = "my", onMyCardClick, onWantCardClick }) {
  const onPlusCardClick = () => {
    if (type === "my") {
      onMyCardClick();
    } else {
      onWantCardClick();
    }
  }
  return (
    <Card className="max-w-[200px] w-[20vw] flex justify-center items-center aspect-[366/512] cursor-pointer" onClick={onPlusCardClick}>
      <CardContent className="flex justify-center items-center w-full h-full">
        <RiAddLine size="50px" />
      </CardContent>
    </Card>
  );
}
