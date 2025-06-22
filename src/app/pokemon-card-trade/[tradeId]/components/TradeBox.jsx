"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { RiArrowLeftRightFill } from 'react-icons/ri';

import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import PokemonCard from "@/components/list/PokemonCard";
import useAuthStore from "@/store/authStore";

import PokemonCardImage from "@/components/list/PokemonCardImage";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MYPAGE } from "@/constants/path";
import Link from "next/link";


export default function TradeCard({data, isMy, tcgCodeList, onTradeRequest}) {
  const [tradeCard, setTradeCard] = useState({});
  const [myCard, setMyCard] = useState({});
  const [wantCards, setWantCards] = useState([]);
  const [isDialog, setIsDialog] = useState(false);
  const [tcgCode, setTcgCode] = useState(null);

  const user = useAuthStore((state) => state.user);
  
  const tradeMsg = `${user.nickname}님의 <span class="font-bold text-black">[ ${tradeCard.nameKo} ]</span>(으)로 교환 신청을 할까요?`

  const handleClick = cardData => {
    setTradeCard(cardData)
    setIsDialog(true)
  }

  const handleOk = () => {
    onTradeRequest(tradeCard, tcgCode);
    setIsDialog(false)
  }

  const handleCancel = () => {
    console.log("handleCancel")
    setIsDialog(false)
  }

  const onTcgCodeChange = (value) => {
    setTcgCode(value);
  }

  useEffect(() => {
    if (!data) return
    setMyCard(data.myCard)
    setWantCards(data.wantCards)
  }, [data])

  const cardContent = (
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
  );

  const tradeRequestContent = (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-[130px] sm:w-[130px] md:w-[110px] lg:w-[180px] xl:w-[200px] min-w-[100px] max-w-[200px] flex justify-center items-center aspect-[366/512]">
        <PokemonCardImage  data={tradeCard} />
      </div>

      <Select onValueChange={onTcgCodeChange} value={tcgCode}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="TCG 코드 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>TCG 코드 선택</SelectLabel>
            {tcgCodeList.map((tcgCode) => (
              <SelectItem key={tcgCode.tcgCodeId} value={tcgCode.tcgCode}>{tcgCode.memo} - {tcgCode.tcgCode}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="outline" asChild>
        <Link href={MYPAGE}>코드 등록하러가기</Link>
      </Button>
    </div>
  );

  return (
    <>
      {isMy ? (
        cardContent
      ) : (
        <>
          {cardContent}
          <AlertDialog 
            open={isDialog} 
            onOpenChange={setIsDialog}
            handleOk={handleOk} 
            isConfrim={false} 
            handleCancel={handleCancel} 
            title="카드 교환 신청" 
            msg={tradeMsg}
            content={tradeRequestContent}
          />
        </>
      )}
    </>
  );
}