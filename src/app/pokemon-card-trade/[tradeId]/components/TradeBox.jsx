"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

import PokemonCardDetail from "@/components/pokemon/PokemonCardDetail";
import FlippableCard from "@/components/card/FlippableCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import PokemonCard from "@/components/card/PokemonCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { MYPAGE } from "@/constants/path"
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { getTextColorClass, TYPE_TEXT_COLORS } from "@/constants/pokemonColor"

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
  tradeTitle: "text-[0.9rem] md:text-[1rem] font-semibold text-gray-600",
  tradeCardContainer: "flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 container mx-auto rounded-lg shadow-md py-8 px-2 border-1 border-solid",

  // 교환 신청 다이얼로그
  dialogContent: "flex flex-col gap-4 items-center justify-center",
  dialogCardImage: "w-[280px] sm:w-[320px] flex justify-center items-center aspect-[366/512]",
  dialogSelect: "w-[300px]"
}

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
  const [isMobile, setIsMobile] = useState(false)
  const restartTimeout = useRef(null)

  // 모든 카드가 동일한 타이밍으로 회전하도록 현재 시간 기준 animationDelay 계산 - 메모이제이션
  const animationDelay = useMemo(() => {
    const now = Date.now()
    const elapsed = (now / 1000) % ROTATE_DURATION
    return `-${elapsed}s`
  }, [ROTATE_DURATION])

  const elementRGB = useMemo(() => getElementRGB(element), [element])

  // 화면 크기 변경 감지 및 모바일 상태 업데이트
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // 초기 상태 설정
    checkMobile()

    // resize 이벤트 리스너 추가
    window.addEventListener('resize', checkMobile)

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsAnyHover(true)
  }, [isMobile, setIsAnyHover])

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsRestarting(true)
      setIsAnyHover(false)
      restartTimeout.current = setTimeout(() => {
        requestAnimationFrame(() => {
          setIsRestarting(false)
        })
      }, 0)
    }
  }, [isMobile, setIsAnyHover])

  useEffect(() => () => clearTimeout(restartTimeout.current), [])
  
  // 스타일 객체 메모이제이션
  const style = useMemo(() => {
    if (isRestarting) {
      return {
        transform: 'rotateY(0deg)',
        transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1)',
        transformStyle: 'preserve-3d',
      }
    }
    return {
      animation: !isAnyHover ? `cardRotate ${ROTATE_DURATION}s linear infinite` : undefined,
      animationPlayState: !isAnyHover ? 'running' : 'paused',
      animationDelay: !isAnyHover ? animationDelay : '0s',
      transform: isAnyHover ? 'rotateY(0deg)' : undefined,
      transition: isAnyHover ? 'transform 0.2s cubic-bezier(0.4,0,0.2,1)' : undefined,
      transformStyle: 'preserve-3d',
    }
  }, [isRestarting, isAnyHover, ROTATE_DURATION, animationDelay]);

  // 그림자 스타일 메모이제이션
  const shadowStyle = useMemo(() => ({
    borderRadius: '50%',
    background: `radial-gradient(ellipse at center, rgba(${elementRGB},0.6) 0%, rgba(${elementRGB},0.25) 50%, transparent 100%)`,
    boxShadow: `0 8px 4px 0 rgba(${elementRGB},0.6), 0 2px 6px 0 rgba(${elementRGB},0.25)`,
    filter: 'blur(1px)',
    opacity: 1,
  }), [elementRGB])

  return (
    <div 
      className="relative flex flex-col items-center group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 카드와 그림자 등 기존 내용 */}
      <div className="relative z-10 max-w-[22vw] sm:w-full sm:max-w-[210px] mx-auto aspect-[366/512] min-w-[100px]"
        style={{ perspective: '1000px', width: "70vw" }}
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
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center" style={{ maxWidth: 'none' }}>
                  <div style={{ width: '100%', height: '100%', maxWidth: 'none' }}>
                    <PokemonCard data={card} showInfo={false} className="w-full h-full !max-w-none !p-0" testMode={testMode} />
                  </div>
                </div>
              </div>
            ) : (
              <FlippableCard
                handleClick={handleClick}
                cardKey={card.code}
                data={card}
                btnName="교환 신청"
                width="100%"
                maxWidth="100%"
              />
            )}
          </div>
        </div>
      </div>
      {/* 입체감 있는 바닥 그림자 - 모바일에서 숨김 */}
      <div
        className="mt-1 sm:mt-3 w-[70%] h-5 z-0 pointer-events-none animate-blue-shadow"
        style={shadowStyle}
      />
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
  const [isMobile, setIsMobile] = useState(false);

  const { wantCards = [] } = data || {}
  const textColorClass = getTextColorClass(data.myCard.element)

  useEffect(() => {
    if (tcgCodeList && tcgCodeList.length > 0) {
      setTcgCode(tcgCodeList[0].tcgCode)
    }
  }, [tcgCodeList])

  // 모바일 여부 감지 useEffect
  useEffect(() => {
    /**
     * 모바일 화면 여부를 판단하여 상태를 업데이트합니다.
     */
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const handleCancel = () => {
    setOpenDialog(false)
  }

  const onTcgCodeChange = useCallback((value) => {
    setTcgCode(value);
  }, [])

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

  const tradeRequestContent = useMemo(() => (
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
  ), [tradeCard, onTcgCodeChange, tcgCode, tcgCodeList, testMode])

  if (!data) return null

  return (
    <div>
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
      {/* 내 카드 상세 - 모바일일 때만 hideInfo true */}
      <PokemonCardDetail data={data.myCard} hideInfo={isMobile} />
      <div className="flex flex-col justify-center items-center w-full">
        <RiArrowUpDoubleLine className={`w-20 h-20 md:w-30 md:h-30 ${textColorClass}`} />
        <h3 className={`${styles.tradeTitle} mb-2`}>이런 카드를 원해요!</h3>
      </div>
      <div
        className={styles.tradeCardContainer}
        style={{ borderColor: getBorderColorByElement(data?.myCard?.element) }}
      >
        {useMemo(() => 
          wantCards.map((card, idx) => (
            <TradeCardItem
              key={card.id || idx}
              card={card}
              isMy={isMy}
              handleClick={handleClick}
              isAnyHover={isAnyHover}
              setIsAnyHover={setIsAnyHover}
              element={card.element}
            />
          )), [wantCards, isMy, handleClick, isAnyHover, setIsAnyHover]
        )}
      </div>
    </div>
  )
}

function getBorderColorByElement(element) {
  switch (element?.toLowerCase()) {
    case 'grass': return '#A7DB8D' // 연한 초록
    case 'fire': return '#FFD1C1' // 연한 빨강/주황
    case 'water': return '#B8E6FE' // 연한 파랑
    case 'lightning': return '#FFF6B7' // 연한 노랑
    case 'fighting': return '#FFD6A5' // 연한 주황
    case 'psychic': return '#FBC2EB' // 연한 보라/핑크
    case 'colorless': return '#E0E0E0' // 연한 회색
    case 'darkness': return '#B5B5B5' // 연한 어두운 회색
    case 'metal': return '#D3D3D3' // 연한 금속색
    case 'dragon': return '#C3B8FF' // 연한 보라
    case 'fairy': return '#FFD6F5' // 연한 핑크
    default: return '#5670FF' // 기본 파랑(화살표와 동일)
  }
}
