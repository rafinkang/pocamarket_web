"use client";

import { useState, useCallback, useMemo } from "react";
import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import PokemonCard from "@/components/card/PokemonCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuthStore from "@/store/authStore";
import PokemonCardDetail from "@/components/pokemon/PokemonCardDetail";

/**
 * 포켓몬 카드 트레이드 관련 상수
 */
const TRADE_CONSTANTS = {
  Z_INDEX: {
    DIALOG: "z-[151]"
  }
}

/**
 * 스타일 객체
 */
const styles = {
  // 교환 희망 카드 목록
  tradeSection: "mt-8",
  tradeTitle: "mb-4 text-[1.1rem] font-semibold text-gray-700",
  tradeCardContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",

  // 교환 신청 다이얼로그
  dialogContent: "flex flex-col gap-4 items-center justify-center",
  dialogCardImage: "w-[280px] sm:w-[320px] flex justify-center items-center aspect-[366/512]",
  dialogSelect: "w-[300px]"
}

/**
 * 트레이드 카드 아이템을 렌더링하는 컴포넌트
 */
const TradeCardItem = ({ card, isMy, handleClick }) => (
  isMy ? (
    <div>
      <PokemonCard data={card} showInfo={false} className="w-full h-full" />
    </div>
  ) : (
    <FlippableCard 
      handleClick={handleClick} 
      cardKey={card.code} 
      data={card} 
      btnName="교환 신청"
    />
  )
)

/**
 * 트레이드 박스 컴포넌트
 */
export default function TradeBox({checkLogin, data, isMy, tcgCodeList, onTradeRequest}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [tradeCard, setTradeCard] = useState({})
  const [selectedTcgCode, setSelectedTcgCode] = useState("")
  const user = useAuthStore((state) => state.user)

  const { myCard, wantCards = [] } = data || {}

  /**
   * 교환 신청 처리 함수
   */
  const handleTradeRequest = useCallback(async () => {
    try {
      if (!selectedTcgCode) {
        alert("TCG 코드를 선택해주세요.")
        return
      }

      await onTradeRequest({
        tcgCode: selectedTcgCode,
        targetCardId: tradeCard.id
      })

      setOpenDialog(false)
      setSelectedTcgCode("")
    } catch (error) {
      console.error("교환 신청 중 오류 발생:", error)
      alert("교환 신청 중 오류가 발생했습니다.")
    }
  }, [selectedTcgCode, tradeCard, onTradeRequest])

  /**
   * 카드 클릭 핸들러
   */
  const handleClick = useCallback((cardData) => {
    if (!checkLogin()) return
    setTradeCard(cardData)
    setOpenDialog(true)
  }, [checkLogin])

  const tradeMsg = useMemo(() => (
    `${user?.nickname || "NONE"}님의 <span class="font-bold text-black">[ ${tradeCard.nameKo} ]</span>(으)로 교환 신청을 할까요?`
  ), [user, tradeCard])

  const tradeRequestContent = (
    <div className={styles.dialogContent}>
      <div className={styles.dialogCardImage}>
        <PokemonCard data={tradeCard} showInfo={false} />
      </div>
      <Select value={selectedTcgCode} onValueChange={setSelectedTcgCode}>
        <SelectTrigger className={styles.dialogSelect}>
          <SelectValue placeholder="TCG 코드 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>TCG 코드 선택</SelectLabel>
            {tcgCodeList.map((tcgCode) => (
              <SelectItem key={tcgCode.tcgCodeId} value={tcgCode.tcgCode}>
                {tcgCode.memo} - {tcgCode.tcgCode}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleTradeRequest}>교환 신청</Button>
    </div>
  )

  if (!data || !myCard) return null

  return (
    <>
      {!isMy && 
        <AlertDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          msg={tradeMsg}
          content={tradeRequestContent}
          contentClassName={TRADE_CONSTANTS.Z_INDEX.DIALOG}
        />
      }
      
      {/* 포켓몬 정보 영역 */}
      <PokemonCardDetail
        data={myCard}
        className="transition-all duration-300 backdrop-blur-sm bg-opacity-95"
      />

      {/* 교환 희망 카드 목록 */}
      <div className={styles.tradeSection}>
        <h3 className={styles.tradeTitle}>교환 희망 카드</h3>
        <div className={styles.tradeCardContainer}>
          {wantCards.map(card => (
            <TradeCardItem
              key={card.code}
              card={card}
              isMy={isMy}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  )
}
