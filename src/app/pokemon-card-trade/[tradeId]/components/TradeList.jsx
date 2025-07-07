"use client";

import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import { REQUEST } from "@/constants/tradeStatus";
import TradeListItem from "./TradeListItem";

/**
 * TradeList 컴포넌트
 * - 요청 목록을 보여줌
 */
export default function TradeList({ isMy, isLogin, requestList, onRequestAccept, onRequestCancel, onOpenTcgCode }) {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [openOk, onOpenOkChange] = useState(false);

  // 상태별 설명 반환 함수
  const statusDescription = (nickname, cardName, status) => {
    const statusDescriptionMap = {
      0: `${nickname}님이 ${cardName}을(를) 교환 취소 하였습니다.`,
      1: `${nickname}님이 ${cardName}을(를) 교환 신청 하였습니다.`,
      2: `${nickname}님의 ${cardName}이(가) 교환 중 입니다.`,
      3: `${nickname}님의 ${cardName}이(가) 교환 완료 되었습니다.`,
    };

    return statusDescriptionMap[status] || "";
  };

  useEffect(() => {
    if (!requestList || requestList.length === 0) return;
    setCards(requestList.map(request => ({
      id: request.tradeRequestId,
      code: request.requestCardCode,
      tcgCode: request.tcgCode,
      isMy: request.isMy,
      description: statusDescription(request.nickname, request.cardNameKo, request.status),
      status: request.status,
      tradeCount: request.tradeCount,
      reportCount: request.reportCount,
    })));
  }, [requestList]);

  useEffect(() => {
    setActiveCard(cards.find(card => card.status === REQUEST));
  }, [cards]);

  return (
    <div className="">
      <h3 className="text-[1.1rem] font-semibold text-gray-700">요청 목록</h3>
      <ul className="w-full gap-4">
        {cards.map(card => (
          <TradeListItem
            onRequestAccept={onRequestAccept}
            onRequestCancel={onRequestCancel}
            onOpenOkChange={onOpenOkChange}
            isMy={isMy}
            isLogin={isLogin}
            key={card.id}
            card={card}
            isActiveCard={activeCard && activeCard.id === card.id}
            disabled={activeCard && activeCard.id !== card.id}
          />
        ))}
        {cards.length === 0 && (
          <div className="flex items-center justify-center w-full h-full py-20">
            <p className="text-gray-500">요청 목록이 없습니다.</p>
          </div>
        )}
      </ul>
      <AlertDialog 
        open={openOk}
        onOpenChange={onOpenOkChange}
        isConfirm={false} 
        preventCloseOnOutsideClick={true}
        title="신고 접수 완료"
        msg="신고 접수가 완료됐습니다.<br/>자세한 내용은 마이페이지에서 확인하세요."
        okBtnName="확인"
      />
    </div>
  );
}
