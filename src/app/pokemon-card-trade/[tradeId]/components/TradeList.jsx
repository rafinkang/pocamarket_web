"use client";

import { useEffect, useId, useState } from "react";

import { getTradeRequestMapping, REQUEST } from "@/constants/tradeStatus";
import TradeListItem from "./TradeListItem";
import TradeListItemDialog from "./TradeListItemDialog";

export default function TradeList({isMy, isLogin, requestList}) {
  const cards = requestList ? 
  requestList.map(request => {
    return {
      description: `${request.nickname}님이 [${request.cardNameKo}](으)로 교환 신청 하였습니다.`,
      tcgCode: request.tcgCode,
      code: request.requestCardCode,
      status: getTradeRequestMapping(request.status),
      content: () => {
        return (
          <>
            <p>교환 성공 횟수 : {request.tradeCount ?? 0}</p>
            <p>신고 횟수 : {request.reportCount ?? 0}</p>
          </>
        );
      },
    }
  }) : [
    {
      description: "XXX님이 [캐터피](으)로 교환 신청 하였습니다.",
      code: "a1-001",
      status: {
        text: "교환 취소",
        code: "CANCEL"
      },
      content: () => {
        return (
          <>
            <p>교환 성공 횟수 : 13</p>
            <p>신고 횟수 : 2</p>
          </>
        );
      },
    },
    {
      description: "XXX님이 [개무소](으)로 교환 신청 하였습니다.",
      code: "a1-002",
      status: {
        text: "교환중",
        code: "TRADE"
      },
      content: () => {
        return (
          <>
            <p>교환 성공 횟수 : 13</p>
            <p>신고 횟수 : 2</p>
          </>
        );
      },
    },
    {
      description: "XXX님이 [뿔충이](으)로 교환 신청 하였습니다.",
      code: "a1-003",
      status: {
        text: "교환 신청",
        code: "REQUEST"
      },
      content: () => {
        return (
          <>
            <p>교환 성공 횟수 : 13</p>
            <p>신고 횟수 : 2</p>
          </>
        );
      },
    },
  ];
  const [active, setActive] = useState(null);
  const id = useId();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    setActiveCard(cards.find(card => card.status.code === REQUEST))
  }, [])

  return (
    <>
      <TradeListItemDialog handleClick={setActive} id={id} isMy={isMy} isLogin={isLogin} active={active} />
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map(card => 
        <TradeListItem
          handleClick={setActive}
          id={id}
          key={card.code}
          card={card}
          isActiveCard={activeCard && activeCard.code === card.code}
          disabled={activeCard && activeCard.code !== card.code}
        />
        )}
      </ul>
    </>
  );
}
