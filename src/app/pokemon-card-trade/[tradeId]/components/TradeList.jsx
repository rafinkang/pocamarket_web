"use client";

import { useEffect, useState } from "react";

import { getTradeRequestMapping, REQUEST } from "@/constants/tradeStatus";
import TradeListItem from "./TradeListItem";
import TradeListItemDialog from "./TradeListItemDialog";

export default function TradeList({isMy, isLogin, requestList, onRequestAccept, onRequestCancel}) {
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

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
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [active]);

  useEffect(() => {
    setActiveCard(cards.find(card => card.status.code === REQUEST))
  }, [])

  return (
    <>
      <TradeListItemDialog handleClick={setActive} isMy={isMy} isLogin={isLogin} active={active} onRequestAccept={onRequestAccept} onRequestCancel={onRequestCancel} />
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map(card => 
          <TradeListItem
            handleClick={setActive}
            key={card.id}
            card={card}
            isActiveCard={activeCard && activeCard.id === card.id}
            isVisible={active === null}
            disabled={activeCard && activeCard.id !== card.id}
          />
        )}
      </ul>
    </>
  );
}
