"use client";

import { useEffect, useState } from "react";

import AlertDialog from "@/components/dialog/AlertDialog";
import { REQUEST } from "@/constants/tradeStatus";
import TradeListItem from "./TradeListItem";
import TradeListItemDialog from "./TradeListItemDialog";

export default function TradeList({isMy, isLogin, requestList, onRequestAccept, onRequestCancel, onOpenTcgCode}) {
  const [cards, setCards] = useState([]);
  const [dialogData, setDialogData] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [openOk, onOpenOkChange] = useState(false)

  const statusDescription = (nickname, cardName, status) => {
    const statusDescriptionMap = {
      0: `${nickname}님이 ${cardName}을(를) 교환 취소 하였습니다.`,
      1: `${nickname}님이 ${cardName}을(를) 교환 신청 하였습니다.`,
      2: `${nickname}님의 ${cardName}이(가) 교환 중 입니다.`,
      3: `${nickname}님의 ${cardName}이(가) 교환 완료 되었습니다.`,
    };

    return statusDescriptionMap[status] || "";
  }

  useEffect(() => {
    if (!requestList || requestList.length === 0) return;

    setCards(requestList.map(request => {
      return {
        id: request.tradeRequestId,
        code: request.requestCardCode,
        tcgCode: request.tcgCode,
        isMy: request.isMy,
        description: statusDescription(request.nickname, request.cardNameKo, request.status),
        status: request.status,
        content: () => {
          return (
            <>
              <p>교환 성공 횟수 : {request.tradeCount}</p>
              <p>신고 횟수 : {request.reportCount}</p>
            </>
          );
        },
      }
    }))
  }, [requestList]) 

  useEffect(() => {
    if (dialogData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dialogData]);

  useEffect(() => {
    setActiveCard(cards.find(card => card.status === REQUEST))
  }, [])

  // requestList가 업데이트될 때 현재 열려있는 dialogData도 동기화
  useEffect(() => {
    if (dialogData && cards.length > 0) {
      const updatedCard = cards.find(card => card.id === dialogData.id);
      if (updatedCard) {
        setDialogData(updatedCard);
      }
    }
  }, [cards, dialogData])

  return (
    <>
      <TradeListItemDialog handleClick={setDialogData} isMy={isMy} isLogin={isLogin} 
        dialogData={dialogData} 
        onRequestAccept={onRequestAccept} 
        onRequestCancel={onRequestCancel} 
        onOpenOkChange={onOpenOkChange} 
        onOpenTcgCode={onOpenTcgCode} 
      />
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map(card => 
          <TradeListItem
            handleClick={setDialogData}
            key={card.id}
            card={card}
            isActiveCard={activeCard && activeCard.id === card.id}
            isVisible={dialogData === null}
            disabled={activeCard && activeCard.id !== card.id}
          />
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
    </>
  );
}
