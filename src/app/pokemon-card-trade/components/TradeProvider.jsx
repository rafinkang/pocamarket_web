"use client";

import { createContext, useContext, useState } from "react";

// const TradeContext = createContext();

export function TradeProvider({ children, setIsCardSearch }) {
  const cardInfo = { code: null, name: null, type: null };
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCardList, setSelectedCardList] = useState([
    { ...cardInfo, type: "my" },
    { ...cardInfo, type: "your-0" },
    { ...cardInfo, type: "your-1" },
    { ...cardInfo, type: "your-2" },
  ]);

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
    setIsCardSearch,
    setSelectedCardList,
    setActiveCard,
    // handleCardClick,
    updateSelectCardInfo,
    // addYourCard,
    resetSelectCard,
  };

  // return (
  //   <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  // );
}

// export const useTrade = () => {
//   const context = useContext(TradeContext);
//   if (context === undefined) {
//     throw new Error("useTrade must be used within a TradeProvider");
//   }
//   return context;
// };
