"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import PokemonCard from "@/components/card/PokemonCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { MYPAGE } from "@/constants/path"

const testMode = process.env.NODE_ENV === "development";

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
  tradeCardContainer: "flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8",

  // 교환 신청 다이얼로그
  dialogContent: "flex flex-col gap-4 items-center justify-center",
  dialogCardImage: "w-[280px] sm:w-[320px] flex justify-center items-center aspect-[366/512]",
  dialogSelect: "w-[300px]"
}

const CARD_BACK_IMAGE = '/images/cardback.webp'

// element별 색상 매핑 함수
const elementColorMap = {
  WATER: '80,180,255',
  FIRE: '255,100,80',
  GRASS: '80,220,120',
  LIGHTNING: '255,220,80',
  PSYCHIC: '180,80,255',
  COLORLESS: '180,180,180',
  DARKNESS: '80,80,80',
  METAL: '160,160,160',
  DRAGON: '120,120,255',
  FAIRY: '255,120,255',
  FIGHTING: '220,120,80',
}
const getElementRGB = (element) => elementColorMap[element?.toUpperCase()] || '80,180,255'

/**
 * 트레이드 카드 아이템을 렌더링하는 컴포넌트
 */
const TradeCardItem = ({ card, isMy, handleClick, isAnyHover, setIsAnyHover, element }) => {
  const ROTATE_DURATION = 8 // 초
  const [isRestarting, setIsRestarting] = useState(false)
  const restartTimeout = useRef(null)

  // 모든 카드가 동일한 타이밍으로 회전하도록 현재 시간 기준 animationDelay 계산
  const now = Date.now()
  const elapsed = (now / 1000) % ROTATE_DURATION
  const animationDelay = `-${elapsed}s`

  const elementRGB = getElementRGB(element)

  const handleMouseEnter = () => setIsAnyHover(true)
  const handleMouseLeave = () => {
    setIsRestarting(true)
    setIsAnyHover(false)
    restartTimeout.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsRestarting(false)
      })
    }, 0)
  }
  useEffect(() => () => clearTimeout(restartTimeout.current), [])

  const style = isRestarting
    ? {
        transform: 'rotateY(0deg)',
        transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
        transformStyle: 'preserve-3d',
      }
    : {
        animation: !isAnyHover ? `cardRotate ${ROTATE_DURATION}s linear infinite` : undefined,
        animationPlayState: !isAnyHover ? 'running' : 'paused',
        animationDelay: !isAnyHover ? animationDelay : '0s',
        transform: isAnyHover ? 'rotateY(0deg)' : undefined,
        transition: isAnyHover ? 'transform 0.2s cubic-bezier(0.4,0,0.2,1)' : undefined,
        transformStyle: 'preserve-3d',
      }

  return (
    <div 
      className="relative flex flex-col items-center group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 입체감 있는 바닥 그림자 - 모바일에서 숨김 */}
      <div
        className="absolute left-1/2 top-[97%] -translate-x-1/2 mt-6 w-[70%] h-8 z-0 pointer-events-none animate-blue-shadow hidden sm:block"
        style={{
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, rgba(${elementRGB},0.6) 0%, rgba(${elementRGB},0.25) 50%, transparent 100%)`,
          boxShadow: `0 8px 24px 0 rgba(${elementRGB},0.6), 0 2px 6px 0 rgba(${elementRGB},0.25)`,
          filter: 'blur(1px)',
          opacity: 0.9,
        }}
      />

      {/* 카드와 그림자 등 기존 내용 */}
      <div className="relative z-10 w-[80vw] sm:w-full sm:max-w-[320px] md:max-w-[366px] mx-auto aspect-[366/512] min-h-[200px] min-w-[100px]"
        style={{ perspective: '1000px' }}
      >
        <div
          className="animate-card-rotate"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...style,
          }}
        >
          {/* 카드 앞면 */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              zIndex: 10,
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {isMy ? (
              <PokemonCard data={card} showInfo={false} className="w-full h-full !max-w-none !p-0 sm:w-full sm:max-w-[320px] md:max-w-[366px]" testMode={testMode} />
            ) : (
              <FlippableCard
                handleClick={handleClick}
                cardKey={card.code}
                data={card}
                btnName="교환 신청"
              />
            )}
          </div>
          {/* 카드 뒷면 */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: 9,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={CARD_BACK_IMAGE}
              alt="카드 뒷면"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 트레이드 박스 컴포넌트
 */
export default function TradeBox({checkLogin, data, isMy, tcgCodeList, onTradeRequest}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [tradeCard, setTradeCard] = useState({})
  const [isAnyHover, setIsAnyHover] = useState(false)
  const user = useAuthStore((state) => state.user)
  const [tcgCode, setTcgCode] = useState(null);

  const { wantCards = [] } = data || {}

  useEffect(() => {
    if (tcgCodeList && tcgCodeList.length > 0) {
      setTcgCode(tcgCodeList[0].tcgCode)
    }
  }, [tcgCodeList])

  /**
   * 교환 신청 처리 함수
   */
  const handleOk = useCallback(async () => {
    try {
      if (!tcgCode) {
        alert("TCG 코드를 선택해주세요.")
        return
      }

      await onTradeRequest(tradeCard, tcgCode);

      setOpenDialog(false)
      setTcgCode("")
    } catch (error) {
      console.error("교환 신청 중 오류 발생:", error)
      alert("교환 신청 중 오류가 발생했습니다.")
    }
  }, [tcgCode, tradeCard, onTradeRequest])

  // const handleOk = () => {
  //   onTradeRequest(tradeCard, tcgCode);
  //   setOpenDialog(false)
  // }

  const handleCancel = () => {
    console.log("handleCancel")
    setOpenDialog(false)
  }

  const onTcgCodeChange = (value) => {
    setTcgCode(value);
  }

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
        <PokemonCard data={tradeCard} showInfo={false} testMode={testMode} />
      </div>
      <Select onValueChange={onTcgCodeChange} value={tcgCode}>
        <SelectTrigger className={styles.dialogSelect}>
          <SelectValue placeholder="TCG 코드 선택" />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
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
      <Button variant="outline" asChild>
        <Link href={MYPAGE}>코드 등록하러가기</Link>
      </Button>
    </div>
  )

  if (!data) return null

  return (
    <>
      {!isMy && 
        <AlertDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          msg={tradeMsg}
          content={tradeRequestContent}
          contentClassName={TRADE_CONSTANTS.Z_INDEX.DIALOG}
          handleOk={handleOk}
          handleCancel={handleCancel} 
          isConfirm={true}
          title="카드 교환 신청"
        />
      }

      {/* 원하는 카드 목록 */}
      <div className={styles.tradeSection}>
        <h3 className={styles.tradeTitle}>이런 카드를 원해요!</h3>
        <div className={styles.tradeCardContainer}>
          {wantCards.map((card, idx) => (
            <TradeCardItem
              key={card.id || idx}
              card={card}
              isMy={isMy}
              handleClick={handleClick}
              isAnyHover={isAnyHover}
              setIsAnyHover={setIsAnyHover}
              element={card.element}
            />
          ))}
        </div>
      </div>
    </>
  )
}
