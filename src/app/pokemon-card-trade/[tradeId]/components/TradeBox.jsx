"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RiArrowLeftRightFill } from 'react-icons/ri';

import PokemonCard from "@/components/list/PokemonCard";
import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import useAuthStore from "@/store/authStore";

export default function TradeCard({data, isMy}) {
  const [tradeCard, setTradeCard] = useState({});
  const [myCard, setMyCard] = useState({});
  const [wantCards, setWantCards] = useState([]);

  const user = useAuthStore((state) => state.user);
  
  const tradeMsg = `${user.nickname}님의 <span class="font-bold text-black">[ ${tradeCard.nameKo} ]</span>(으)로 교환 신청을 할까요?`

  const handleClick = cardData => {
    setTradeCard(cardData)
  }

  const handleOk = () => {
    console.log("handleOk ::: ", tradeCard)
  }

  const handleCancel = () => {
    console.log("handleCancel")
  }

  useEffect(() => {
    if (!data) return
    setMyCard(data.myCard)
    setWantCards(data.wantCards)
  }, [data])

  return (
    <>
      <AlertDialog handleOk={handleOk} isConfrim={false} handleCancel={handleCancel} title="카드 교환 신청" msg={tradeMsg}>
        <Card className="shadow-none">
          <CardContent
            className="flex justify-center items-center w-full gap-4 h-64"
          >
            <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
              <PokemonCard data={myCard} showInfo={false} className="relative aspect-[366/512]" />
            </div>

            <RiArrowLeftRightFill size="50px" />

            {wantCards.map(card => (
              isMy ? 
                <div key={card.code} className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
                  <PokemonCard data={card} showInfo={false} className="relative aspect-[366/512]" />
                </div>
              : 
                <FlippableCard handleClick={handleClick} key={card.code} cardKey={card.code} data={card} btnName="교환 신청" />
            ))}
          </CardContent>
        </Card>
      </AlertDialog>
    </>
  );
}