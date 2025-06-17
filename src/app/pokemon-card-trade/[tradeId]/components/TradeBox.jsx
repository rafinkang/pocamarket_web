"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RiArrowLeftRightFill } from 'react-icons/ri';

import PokemonCard from "@/components/list/PokemonCard";
import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import { useRef, useState } from "react";

export default function TradeCard({}) {
  const [tradeCard, setTradeCard] = useState({});
  const userName = "유저 이름"
  const offerCard = { code: "a1-001", nameKo: "이상해씨" };
  const wantCards = [{ code: "a1-002", nameKo: "이상해풀" }, { code: "a1-003", nameKo: "이상해꽃" }, { code: "a1-004", nameKo: "이상해꽃" }];

  const handleClick = cardData => {
    setTradeCard(cardData)
  }

  const handleOk = () => {
    console.log("handleOk")
  }

  const handleCancel = () => {
    console.log("handleCancel")
  }

  return (
    <>
      <AlertDialog handleOk={handleOk} isConfrim={false} handleCancel={handleCancel} title="카드 교환 신청" msg={`${userName}님의 ${tradeCard.nameKo}(으)로 ${offerCard.nameKo}(과)와 교환 신청을 할까요?`}>
        <Card className="shadow-none">
          <CardContent
            className="flex justify-center items-center w-full gap-4 h-64"
            style={{ perspective: "1200px" }}
          >
            <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
              <PokemonCard data={offerCard} showInfo={false} className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }} />
            </div>

            <RiArrowLeftRightFill size="50px" />

            {wantCards.map(card => (
              <FlippableCard handleClick={handleClick} key={card.code} cardKey={card.code} data={card} btnName="교환 신청" />
            ))}
          </CardContent>
        </Card>
      </AlertDialog>
    </>
  );
}