"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { memo } from "react";
import { RiArrowLeftRightFill } from "react-icons/ri";
import FindCard from "./FindCard";

const FindCardBox = memo(function FindCardBox({
  onCardButton,
  findCardList,
  FindCardComponent = FindCard,
}) {
  return (
    <div className="w-full">
      <Card>
        <CardContent className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            {findCardList.map((card) => (
              <React.Fragment key={card.findCardTtpe}>
                <FindCardComponent
                  data={card}
                  type={card.findCardTtpe}
                  onCardClick={onCardButton}
                />
                {card.findCardTtpe === "my" && (
                  <RiArrowLeftRightFill size="50px" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

FindCardBox.displayName = "FindCardBox";

export default FindCardBox;
