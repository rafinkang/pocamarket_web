import { createContext, useContext, useState } from "react";

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState({
    my: null,
    your: [],
  });

  const addYourCard = (card) => {
    setSelectedCard((prev) => {
      // 최대 5개까지만 추가 가능
      if (prev.your.length >= 5) {
        return prev;
      }

      // 새 카드 추가
      return {
        ...prev,
        your: [...prev.your, card],
      };
    });
  };

  const resetSelectCard = () => {
    setSelectedCard({ my: null, your: [] });
  };

  const handleCardClick = (type) => {
    setActiveCard(activeCard === type ? null : type);
  };

  const value = {
    activeCard,
    selectedCard,
    setSelectedCard,
    handleCardClick,
    addYourCard,
    resetSelectCard,
  };

  // Provider를 통해 하위 컴포넌트들에게 상태와 핸들러 함수들을 전달
  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
}

// 커스텀 훅: 하위 컴포넌트에서 context 값을 쉽게 사용할 수 있게 함
export const useTrade = () => {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error("useTrade must be used within a TradeProvider");
  }
  return context;
};
