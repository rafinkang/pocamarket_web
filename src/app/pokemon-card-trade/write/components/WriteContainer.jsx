"use client";

import PokemonCard from "@/components/list/PokemonCard";
import { Card, CardContent } from "@/components/ui/card";
import { RiArrowLeftRightFill, RiAddLine } from "react-icons/ri";
import PlusCard from "./PlusCard";
import { useState } from "react";
import TradeDialog from "../../components/TradeDialog";
import PokemonCardPage from "../../components/CardList";

export default function WriteContainer() {
  const [myCard, setMyCard] = useState(null);
  const [wantCard, setWantCard] = useState([]);
  const [isCardSearch, setIsCardSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState("내가 원하는 카드");

  const onMyCardClick = () => {
    console.log("myCardClick");
    setIsCardSearch(true);
    setMyCard(null);
  }

  const onWantCardClick = () => {
    console.log("wantCardClick");
    setIsCardSearch(true);
    setWantCard(null);
  }
  return (
    <>
      <div id="WriteContainer" className="w-[100%] flex flex-col gap-6">
        <h1 className="text-2xl font-bold">포켓몬카드 교환 등록</h1>
        <Card>
          <CardContent className="flex justify-center items-center gap-4">
            <PlusCard type="my" onMyCardClick={onMyCardClick} />

            <RiArrowLeftRightFill size="50px" />

            <PokemonCard showInfo={false} className="max-w-[200px] w-[20vw]" />

            <PlusCard type="want" onWantCardClick={onWantCardClick} />

          </CardContent>

        </Card>

        {isCardSearch && (
          <TradeDialog open={isCardSearch} onOpenChange={setIsCardSearch}>
            {/* <PokemonCardPage placeholder={placeholder} /> */}
          </TradeDialog>
        )}
      </div>
    </>
  );
}