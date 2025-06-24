"use client";

import { useEffect, useState } from "react";

import { getTradeRequestMapping, REQUEST } from "@/constants/tradeStatus";
import TradeListItem from "./TradeListItem";
import TradeListItemDialog from "./TradeListItemDialog";
import AlertDialog from "@/components/dialog/AlertDialog";

export default function TradeList({isMy, isLogin, requestList, onRequestAccept, onRequestCancel}) {
  const [cards, setCards] = useState([]);
  const [dialogData, setDialogData] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [openOk, onOpenOkChange] = useState(false)

  useEffect(() => {
    console.log('requestList ::: ', requestList)
    if (!requestList || requestList.length === 0) return;

    
    setCards(requestList.map(request => {
      return {
        id: request.tradeRequestId,
        code: request.requestCardCode,
        tcgCode: request.tcgCode,
        isMy: request.isMy,
        description: `${request.nickname}님이 [${request.cardNameKo}](으)로 교환 신청 하였습니다.`,
        status: getTradeRequestMapping(request.status),
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
    setActiveCard(cards.find(card => card.status.code === REQUEST))
  }, [])

  return (
    <>
      <TradeListItemDialog handleClick={setDialogData} isMy={isMy} isLogin={isLogin} dialogData={dialogData} onRequestAccept={onRequestAccept} onRequestCancel={onRequestCancel} onOpenOkChange={onOpenOkChange} />
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
