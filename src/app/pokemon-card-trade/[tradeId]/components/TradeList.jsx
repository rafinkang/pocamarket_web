"use client";

import React, { useEffect, useId, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import TradeItem from "./TradeItem";
import TradeItemDialog from "./TradeItemDialog";

export default function TradeList() {
  const cards = [
    {
      title: "교환 취소",
      description: "XXX님이 [캐터피](으)로 교환 신청 하였습니다.",
      code: "a1-001",
      ctaText: "",
      status: {
        text: "교환 취소",
        code: "CANCEL"
      },
      content: () => {
        return (
          <p>어쩌고 저쩌고 이랬다 저랬다</p>
        );
      },
    },
    {
      title: "교환중",
      description: "XXX님이 [개무소](으)로 교환 신청 하였습니다.",
      code: "a1-002",
      ctaText: "교환 취소",
      status: {
        text: "교환중",
        code: "TRADE"
      },
      content: () => {
        return (
          <p>어쩌고 저쩌고 이랬다 저랬다</p>
        );
      },
    },
    {
      title: "교환 신청",
      description: "XXX님이 [뿔충이](으)로 교환 신청 하였습니다.",
      code: "a1-003",
      ctaText: "교환",
      status: {
        text: "교환 신청",
        code: "REQUEST"
      },
      content: () => {
        return (
          <p>어쩌고 저쩌고 이랬다 저랬다</p>
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
    setActiveCard(cards.find(card => card.status.code === "TRADE"))
  }, [])

  return (
    <>
      <TradeItemDialog handleClick={setActive} id={id} active={active} />
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map(card => 
        <TradeItem
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
