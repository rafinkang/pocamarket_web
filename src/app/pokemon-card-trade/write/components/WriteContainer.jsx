"use client";

import { getTcgCodeList } from "@/api/tcgCode";
import { getTcgTradeDetail, postTcgTrade, putTcgTrade } from "@/api/tcgTrade";
import FlippableCard from "@/components/card/FlippableCard";
import ListPickerDialog from "@/components/cardListContainer/ListPickerDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MYPAGE, POKEMON_CARD_TRADE } from "@/constants/path";
import { defaultFilter } from "@/constants/pokemonCardFilter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowLeftRightFill, RiArrowUpDoubleLine, RiArrowUpDownFill, RiSettings3Line } from "react-icons/ri";
import { toast } from "sonner";
import PlusCard from "./PlusCard";

export default function WriteContainer({ tradeId }) {
  const router = useRouter();
  const [mode, setMode] = useState("write");
  const [myCard, setMyCard] = useState(null);
  const [wantCard, setWantCard] = useState([]);
  const [isCardSearch, setIsCardSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState("내가 원하는 카드");
  const [searchType, setSearchType] = useState(""); // 'my' 또는 'want' 구분용
  const [tcgCodeList, setTcgCodeList] = useState([]);
  const [tcgCode, setTcgCode] = useState("");

  const [tradeCardListFilter, setTradeCardListFilter] = useState({ ...defaultFilter });

  const cardSize = { width: '160px', aspectRatio: '366/512' };
  const onMyCardClick = () => {
    setIsCardSearch(true);
    setSearchType("my");
    setPlaceholder("내가 교환할 카드");
  }

  const onWantCardClick = () => {
    setIsCardSearch(true);
    setSearchType("want");
    setPlaceholder("내가 원하는 카드");
  }

  // 카드 선택 시 호출되는 함수
  const handleCardSelect = (selectedCard) => {

    // 내 카드와의 레어도 비교
    if (myCard?.code &&
      myCard.code.length > 0 &&
      myCard.rarity !== selectedCard.rarity
    ) {
      // wantCard의 모든 카드의 레어도가 선택한 카드와 다를 때
      toast.error("레어도가 다른 카드는 선택할 수 없습니다.");
      return;
    }
    // 원하는 카드와 레어도 비교
    if (wantCard.some(
      card =>
        card?.code &&
        card.code.length > 0 &&
        card?.rarity !== selectedCard.rarity
    )
    ) {
      // wantCard의 모든 카드의 레어도가 선택한 카드와 다를 때
      toast.error("레어도가 다른 카드는 선택할 수 없습니다.");
      return;
    }

    if (searchType === "my") {
      setMyCard(selectedCard);
    } else if (searchType === "want") {
      // 원하는 카드는 최대 3장까지만 선택 가능
      if (wantCard.length < 3) {
        setWantCard(prev => [...prev, selectedCard]);
      } else {
        toast.error("원하는 카드는 최대 3장까지만 선택 가능합니다.");
      }
    }

    // 검색 상태 초기화
    setIsCardSearch(false);
    setSearchType("");
  };

  const onMyCardDeleteClick = (card) => {
    setMyCard(null);
  }

  const onWantCardDeleteClick = (index) => {
    setWantCard(wantCard.filter((_, i) => i !== index));
  }

  const onSubmitClick = () => {
    // console.log("교환 등록", myCard, wantCard, tcgCode);
    if (myCard == null) { alert("내 카드를 선택해주세요"); return; }
    if (wantCard.length == 0) { alert("원하는 카드를 선택해주세요"); return; }
    if (tcgCode == "") { alert("TCG 코드를 선택해주세요"); return; }

    let data = {
      myCardCode: myCard.code,
      wantCardCode: wantCard.map(card => card.code),
      tcgCode: tcgCode,
    }

    if (mode === "write") {
      postTcgTrade(data).then(res => {
        if (res.success) {
          toast.success("교환이 등록되었습니다.");
          router.push(POKEMON_CARD_TRADE);
        } else {
          toast.success(res.message);
        }
      });
    } else {
      putTcgTrade(tradeId, data).then(res => {
        if (res.success) {
          toast.success("교환이 수정되었습니다.");
          router.push(POKEMON_CARD_TRADE + `/${tradeId}`);
        } else {
          toast.success(res.message);
        }
      });
    }

  }

  const onTcgCodeChange = (value) => {
    setTcgCode(value);
  }

  useEffect(() => {
    if (tradeId) {
      setMode("update");

      getTcgTradeDetail(tradeId).then(res => {
        if (!res.data.isMy) {
          toast.error("권한이 없습니다.");
          router.push(POKEMON_CARD_TRADE);
          return;
        }

        setMyCard(res.data.myCard);
        setWantCard(res.data.wantCards);
        setTcgCode(res.data.tcgCode);
      });
    }

    getTcgCodeList().then(res => {
      setTcgCodeList(res.data);
    });
  }, []);

  return (
    <>
      {isCardSearch && (
        <div className="fixed inset-0 z-50">
          <ListPickerDialog
            // key={`dialog-${searchType}-${Date.now()}`}
            open={isCardSearch}
            onOpenChange={setIsCardSearch}
            placeholder={placeholder}
            onSelect={handleCardSelect}
            initFilterParams={tradeCardListFilter}
            setInitFilterParams={setTradeCardListFilter}
          />
        </div>
      )}
      {/* <div className="container mx-auto max-w-6xl px-2 py-4 relative z-10"> */}
      <div id="pokemonCardTradeWrite" className="w-[100%] flex flex-col gap-6 p-2 md:p-4">
        {/* 헤더 */}
        <h2 className="text-lg font-semibold text-gray-800">{mode === "write" ? "포켓몬카드 교환 등록" : "포켓몬카드 교환 수정"}</h2>

        {/* 메인 교환 카드 선택 영역 */}
        <Card className="mb-6 border-2 border-gray-200 shadow-lg py-0 overflow-hidden gap-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 !py-3 gap-0">
            <CardTitle className="text-center text-base md:text-lg font-semibold text-gray-800 flex items-center justify-center gap-2 ">
              <RiArrowLeftRightFill className="text-blue-600" />
              교환 카드 선택
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12">

              {/* 내 카드 영역 */}
              <div className="flex flex-col items-center space-y-3 relative md:top-[-8px]">
                {myCard ? (
                  <div style={cardSize}>
                    <FlippableCard
                      handleClick={onMyCardDeleteClick}
                      key={myCard.code}
                      cardKey={myCard.code}
                      data={myCard}
                      btnName="선택 취소"
                      rotateY={180}
                      duration={0.3}
                      width={cardSize.width}
                      maxWidth={cardSize.width}
                    />
                  </div>
                ) : (
                  <div style={cardSize}>
                    <PlusCard type="my" onMyCardClick={onMyCardClick} />
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">내 카드</h3>
                  <p className="text-xs text-gray-500">교환할 카드를 선택하세요</p>
                </div>
              </div>

              {/* 중앙 교환 표시 - 반응형 */}
              <div className="flex items-center justify-center relative lg:top-[-25px]">
                {/* 교환 아이콘 */}
                <RiArrowUpDoubleLine className="text-purple-600 text-2xl md:text-3xl block lg:hidden" />
                <RiArrowLeftDoubleLine className="text-purple-600 text-2xl md:text-3xl hidden lg:block" />
              </div>

              {/* 원하는 카드 영역 */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full" style={{ maxWidth: '600px' }}>
                  {wantCard.length > 0 ? (
                    <div className="flex justify-center items-center gap-3 flex-wrap min-h-[180px]">
                      {wantCard.map((card, index) => (
                        <div style={cardSize} key={card.code + index}>
                          <FlippableCard
                            handleClick={() => onWantCardDeleteClick(index)}
                            cardKey={card.code}
                            data={card}
                            btnName="선택 취소"
                            rotateY={180}
                            duration={0.3}
                            width={cardSize.width}
                            maxWidth={cardSize.width}
                          />
                        </div>
                      ))}
                      {wantCard.length < 3 && (
                        <div className="flex-shrink-0" style={cardSize}>
                          <PlusCard type="want" onWantCardClick={onWantCardClick} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div style={cardSize}>
                        <PlusCard type="want" onWantCardClick={onWantCardClick} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">원하는 카드</h3>
                  <p className="text-xs text-gray-500">최대 3장까지 선택 가능</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${i < wantCard.length
                          ? 'bg-purple-500'
                          : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TCG 코드 선택 영역 */}
        <Card className="mb-6 border border-gray-200 shadow-md py-0 overflow-hidden gap-0">
          <CardHeader className="bg-gray-50 border-b border-gray-200 !py-3 gap-0">
            <CardTitle className="text-center text-base md:text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
              <RiSettings3Line className="text-blue-600" />
              TCG 코드 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex-1 max-w-md">
                <Select onValueChange={onTcgCodeChange} value={tcgCode}>
                  <SelectTrigger className="w-full h-9 border border-gray-300 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="TCG 코드를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>사용 가능한 TCG 코드</SelectLabel>
                      {tcgCodeList.map((tcgCode) => (
                        <SelectItem key={tcgCode.tcgCodeId} value={tcgCode.tcgCode}>
                          {tcgCode.memo} - {tcgCode.tcgCode}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="whitespace-nowrap" asChild>
                <Link href={MYPAGE + "#TCGCode"}>코드 등록하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 영역 */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={onSubmitClick}
            className="px-6 py-2 bg-[#5670FF] hover:bg-[#5670FF]/90 text-white font-medium"
          >
            {mode === "write" ? "교환 등록" : "수정 완료"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6 py-2 font-medium"
          >
            취소
          </Button>
        </div>
      </div>
    </>
  );
}
