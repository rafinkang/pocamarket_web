"use client";

import { patchTcgTradeRefresh } from "@/api/tcgTrade";
import PokemonCardImage from "@/components/list/PokemonCardImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { POKEMON_CARD_TRADE } from "@/constants/path";
import { convertStatus } from "@/constants/tradeFilter";
import { getPackSetNameByText } from "@/utils/convertUtils";
import { getTimeDifference } from "@/utils/dateUtils";
import Link from "next/link";

/*
testMode
    ? "/images/cardback.webp"
    : `${S3_IMAGES_BASE_URL}/${
        data?.code ? data.code : "a1-001"
    }.webp`
*/

export default function TradeElement({
  tradeCode = "0",
  tradeUserNickname = "교환자 닉네임",
  myCard = {
    cardCode: "a1-001",
    cardName: "테스트 마이 카드",
    cardPackSet: "최강의 유전자",
  },
  wantedCards = [
    {
      cardCode: "a1-002",
      cardName: "테스트 원하는 카드",
      cardPackSet: "최강의 유전자",
    },
  ], // 원하는 카드들의 배열
  updatedAt = "오래 전",
  status = 1,
  isMyList = false,
  requestCount = "0(보류)",
  testMode = false,
}) {

  const handleRefresh = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const res = await patchTcgTradeRefresh(tradeCode, { status, updatedAt });
      if(res.data && res.success) {
        alert("교환글 갱신 되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link
      href={`${POKEMON_CARD_TRADE}/${tradeCode}`}
      className="w-full"
    >
      <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-full mx-auto">
        <div>
          <p className="text-black-800 truncate font-bold">
                {tradeUserNickname}님의 교환 신청
          </p>
        </div>
        <div className="w-full grid grid-cols-1 grid-rows-[1fr_auto_auto_auto] justify-center items-start gap-4 lg:grid-cols-[2fr_auto_6fr_1fr] lg:grid-rows-1 lg:justify-start lg:items-center">
          {/* 내 카드 섹션 */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="bg-[#f8f9fa] shadow-lg">
              <Card className="flex flex-col items-center rounded-[12px] p-4 w-[200px] gap-2">
                <div className="relative w-[120px] aspect-[366/512]">
                  <PokemonCardImage data={{code: myCard.cardCode}} testMode={testMode} />
                </div>
                <div className="flex flex-col min-w-0 justify-center items-center">
                  <h3 className="text-lg font-semibold truncate">
                    {myCard.cardName}
                  </h3>
                  <p>{getPackSetNameByText(myCard.cardPackSet)}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* 교환 화살표 */}
          <div className="flex items-center px-2">
            <span className="text-2xl mx-auto lg:mx-0 lg:rotate-0 rotate-90 transition-transform duration-300">↔</span>
          </div>

          {/* 원하는 카드들 */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {wantedCards.map((card, index) => (
              <div key={index} className="bg-[#f8f9fa] shadow-lg">
                <Card className="flex flex-col items-center rounded-[12px] p-4 min-w-[200px] gap-2">
                  <div className="relative w-[120px] aspect-[366/512]">
                    <PokemonCardImage data={{code: card.cardCode}} testMode={testMode} />
                  </div>
                  <div className="flex flex-col min-w-0 justify-center items-center">
                    <h3 className="text-lg font-semibold truncate">
                      {card.cardName}
                    </h3>
                    <p>{getPackSetNameByText(card.cardPackSet)}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* 교환 정보 */}
          <div className="flex flex-col items-center pl-2 self-center w-full min-w-[100px] gap-2">
            <p>{getTimeDifference(updatedAt)}</p>
            <p>{convertStatus(status)}</p>
            {isMyList && (
              <Button variant="outline" onClick={handleRefresh}>
                끌어올리기
              </Button>
            )}
            {/* <p>{requestCount}</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
