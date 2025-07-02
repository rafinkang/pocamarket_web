"use client";

import { patchTcgTradeRefresh } from "@/api/tcgTrade";
import PokemonCardImage from "@/components/cardImage/PokemonCardImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { POKEMON_CARD_TRADE } from "@/constants/path";
import { getPackSetNameByText } from "@/utils/convertUtils";
import { getTimeDifference } from "@/utils/dateUtils";
import Link from "next/link";

import { getTradeStatusName, DELETED, REQUEST, SELECT, PROCESS, COMPLETE } from "@/constants/tradeStatus";
import { cn } from "@/lib/utils";
import styles from "@/styles/tradeStatus.module.scss";

const statusClassMap = {
  [DELETED]: styles['badge-deleted'],
  [SELECT]: styles['badge-select'],
  [REQUEST]: styles['badge-request'],
  [PROCESS]: styles['badge-process'],
  [COMPLETE]: styles['badge-complete'],
};

export default function TradeElement({
  tradeCode = "0",
  tradeUserNickname = "",
  myCard = null,
  wantedCards = [], // 원하는 카드들의 배열
  updatedAt = "오래 전",
  status = 1,
  isMyList = false,
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

        {/* 헤드 영역, 교환 상태, 누가, 시간 */}
        <div className="flex items-center justify-between gap-2 w-full">
          <p>
            <span className={cn(statusClassMap[status], "px-2 py-1 rounded-full text-[11px] whitespace-nowrap")}>
              {getTradeStatusName(status)}
            </span>
          </p>
          <p className="text-black-800 truncate font-bold">
                {tradeUserNickname}님의 교환 신청
          </p>
          <p>{getTimeDifference(updatedAt)}</p>
        </div>


        <div className="flex flex-col items-center justify-center flex-wrap gap-4 w-full md:flex-row ">
          {/* 카드 영역 */}
          <div className="flex-1 flex items-stretch justify-start gap-4">
            {/* 내 카드 섹션 */}
            <div className="flex items-center">
              <Card className="flex flex-col items-center rounded-[12px] p-2 gap-2 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[180px] xl:w-[200px]">
                <div className="relative w-full aspect-[366/512]">
                  <PokemonCardImage data={{code: myCard?.cardCode}} testMode={testMode} />
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                  <h3 className="text-sm lg:text-lg font-semibold truncate w-full text-center">
                    {myCard?.cardName ?? "카드 없음"}
                  </h3>
                  <p className="text-xs lg:text-sm text-center truncate w-full">{getPackSetNameByText(myCard?.cardPackSet ?? "카드 없음")}</p>
                </div>
              </Card>
            </div>

            {/* 교환 구분선 */}
            <div className="flex items-center justify-center self-stretch w-[2px] md:w-[40px]">
              <div className="w-[2px] h-[60%] bg-gray-400 lg:hidden"></div>
              <div className="text-2xl hidden lg:block">↔</div>
            </div>

            {/* 원하는 카드들 */}
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              {wantedCards.map((card, index) => (
                <div key={index} className="flex-shrink-0">
                  <Card className="flex flex-col items-center rounded-[12px] p-2 gap-2 w-[80px] sm:w-[100px] md:w-[120px] lg:w-[180px] xl:w-[200px]">
                    <div className="relative w-full aspect-[366/512]">
                      <PokemonCardImage data={{code: card.cardCode}} testMode={testMode} />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">
                      <h3 className="text-sm lg:text-lg font-semibold truncate w-full text-center">
                        {card.cardName}
                      </h3>
                      <p className="text-xs lg:text-sm text-center truncate w-full">{getPackSetNameByText(card.cardPackSet)}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col items-center justify-center w-[100px] md:w-[150px]">
            {isMyList && (DELETED < status && status < PROCESS) && (
              <Button variant="outline" onClick={handleRefresh}>
                끌어올리기
              </Button>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
