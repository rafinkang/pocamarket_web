"use client";

import { patchTcgTradeRefresh } from "@/api/tcgTrade";
import PokemonCardImage from "@/components/cardImage/PokemonCardImage";
import { Button } from "@/components/ui/button";
import { POKEMON_CARD_TRADE } from "@/constants/path";
import { getPackSetNameByText } from "@/utils/convertUtils";
import { getTimeDifference } from "@/utils/dateUtils";
import Link from "next/link";
import TradeStatusBadge from "@/components/badge/TradeStatusBadge";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import '@/styles/pokemonCardTrade/trade-element.css'
import { DELETED, getStatusColor, PROCESS } from "@/constants/tradeStatus";

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
  /**
   * 교환글 끌어올리기 핸들러
   */
  const handleRefresh = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const res = await patchTcgTradeRefresh(tradeCode, { status, updatedAt });
      if (res.data && res.success) {
        alert("교환글 갱신 되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 카드 정보 공통 className 변수
  const cardContainerClass = "flex flex-col items-center gap-1 w-[70px] sm:w-[90px]"
  const cardImageClass = "relative w-full aspect-[366/512]"
  const cardNameClass = "text-sm font-semibold truncate w-full text-center"
  const cardPackSetClass = "text-xs text-center truncate w-full"

  /**
   * 카드 정보 렌더링 컴포넌트
   */
  const CardInfo = ({ card, testMode, isMine }) => (
    <div className={cardContainerClass}>
      <div className={cardImageClass}>
        <PokemonCardImage data={{ code: card?.cardCode }} testMode={testMode} />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <h3 className={cardNameClass}>{card?.cardName ?? (isMine ? "카드 없음" : "")}</h3>
        <p className={cardPackSetClass}>{getPackSetNameByText(card?.cardPackSet ?? (isMine ? "카드 없음" : ""))}</p>
      </div>
    </div>
  )

  return (
    <Link
      href={`${POKEMON_CARD_TRADE}/${tradeCode}`}
      className="w-full"
    >
      <div className="flex flex-col items-center gap-4 p-4 shadow-sm shadow-[#cfd0d8] border border-[#e6e6ff] rounded-sm w-full mx-auto bg-[#FCFCFC] tradeGradientCard">
        {/* 헤드 영역: 교환 상태, 닉네임, 시간 */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <TradeStatusBadge status={status} />
            <p className="flex items-center gap-2 text-black-800 truncate font-bold">
              {tradeUserNickname} 님의 교환
            </p>
          </div>
          {/* 버튼 영역 */}
          <div className="flex items-center justify-end">
            {isMyList && (DELETED < status && status < PROCESS) && (
              <Button variant="outline" onClick={handleRefresh} className="text-xs px-3 h-[30px] font-bold border-[#ccd0e0] !bg-[#fff] z-1">
                끌어올리기
              </Button>
            )}
            <p className="text-sm text-gray-600 ml-2">{getTimeDifference(updatedAt)}</p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 w-full">
          {/* 카드 영역 */}
          <div className="flex-1 flex items-stretch justify-start gap-4">
            {/* 내 카드 섹션 */}
            <div className="flex items-center">
              <CardInfo card={myCard} testMode={testMode} isMine={true} />
            </div>
            {/* 교환 구분선 */}
            <div className="flex items-center justify-center self-stretch">
              <RiArrowLeftDoubleLine className="relative top-[-20px] text-purple-600 text-2xl md:text-3xl" style={{ color: getStatusColor(status) }} />
            </div>
            {/* 원하는 카드들 */}
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              {wantedCards.map((card, index) => (
                <div key={index} className="flex-shrink-0">
                  <CardInfo card={card} testMode={testMode} isMine={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
