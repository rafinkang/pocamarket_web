"use client";

import { createContext, useContext, useState } from "react";

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const cardInfo = { code: null, name: null, type: null };
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCardList, setSelectedCardList] = useState([
    { ...cardInfo, type: "my" },
    { ...cardInfo, type: "your-0" },
    { ...cardInfo, type: "your-1" },
    { ...cardInfo, type: "your-2" },
  ]);

  // const addYourCard = (card = {code: null, name: null}) => {
  //   setSelectedCardList((prev) => {

  //     const yourCardList = prev.filter(card => card.type !== "my");
  //     // 최대 5개까지만 추가 가능
  //     if (yourCardList.length <= 5) {
  //       prev.push(card);
  //     }
  //     return prev;
  //   });
  // };

  const resetSelectCard = () => {
    setSelectedCardList([
      { ...cardInfo, type: "my" },
      { ...cardInfo, type: "your-0" },
      { ...cardInfo, type: "your-1" },
      { ...cardInfo, type: "your-2" },
    ]);
  };

  // const handleCardClick = (type) => {
  //   setActiveCard(type);
  // };

  const updateSelectCardInfo = ({ code, name, type }) => {
    setSelectedCardList((prev) =>
      prev.map((card) => (card.type === type ? { ...card, code, name } : card))
    );
  };

  const value = {
    activeCard,
    selectedCardList,
    setSelectedCardList,
    setActiveCard,
    // handleCardClick,
    updateSelectCardInfo,
    // addYourCard,
    resetSelectCard,
  };

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
}

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error("useTrade must be used within a TradeProvider");
  }
  return context;
};
