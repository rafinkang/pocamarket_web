"use client";

import { getTcgCodeList } from "@/api/tcgCode";
import { getTcgTradeDetail, postTcgTrade, putTcgTrade } from "@/api/tcgTrade";
import FlippableCard from "@/components/card/FlippableCard";
import ListPickerDialog from "@/components/cardListContainer/ListPickerDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { RiArrowLeftRightFill } from "react-icons/ri";
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
        <ListPickerDialog
          // key={`dialog-${searchType}-${Date.now()}`}
          open={isCardSearch}
          onOpenChange={setIsCardSearch}
          placeholder={placeholder}
          onSelect={handleCardSelect}
          initFilterParams={tradeCardListFilter}
          setInitFilterParams={setTradeCardListFilter}
        />
      )}
      <div id="WriteContainer" className="w-[100%] flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{mode === "write" ? "포켓몬카드 교환 등록" : "포켓몬카드 교환 수정"}</h1>
        <Card>
          <CardContent className="flex justify-center items-center gap-4" >
            <div className="flex flex-col items-center gap-4">
              {myCard ? (
                <FlippableCard
                  handleClick={onMyCardDeleteClick}
                  key={myCard.code}
                  cardKey={myCard.code}
                  data={myCard}
                  btnName="선택 취소"
                  rotateY={180}
                  duration={0.3}
                />
              ) : (
                <PlusCard type="my" onMyCardClick={onMyCardClick} />
              )}
              <span className="text-sm text-gray-600">내 카드</span>

            </div>

            <RiArrowLeftRightFill size="50px" />

            <div className="flex flex-col items-center gap-4">
              {wantCard.length > 0 ? (
                <div className="flex items-center gap-4">
                  {wantCard.map((card, index) => (
                    <FlippableCard
                      handleClick={() => onWantCardDeleteClick(index)}
                      key={card.code + index}
                      cardKey={card.code}
                      data={card}
                      btnName="선택 취소"
                      rotateY={180}
                      duration={0.3}
                    />
                  ))}
                  {wantCard.length < 3 && (
                    <PlusCard type="want" onWantCardClick={onWantCardClick} />
                  )}
                </div>
              ) : (
                <PlusCard type="want" onWantCardClick={onWantCardClick} />
              )}
              <span className="text-sm text-gray-600">원하는 카드 (최대 3장)</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center gap-4">
          <Select onValueChange={onTcgCodeChange} value={tcgCode}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="TCG 코드 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>TCG 코드 선택</SelectLabel>
                {tcgCodeList.map((tcgCode) => (
                  <SelectItem key={tcgCode.tcgCodeId} value={tcgCode.tcgCode}>{tcgCode.memo} - {tcgCode.tcgCode}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link href={MYPAGE}>코드 등록하러가기</Link>
          </Button>
        </div>
        <div className="flex justify-end gap-1">
          <Button onClick={onSubmitClick}>{mode === "write" ? "등록" : "수정"}</Button>
          <Button variant="outline" onClick={() => router.back()}>취소</Button>
        </div>

      </div>
    </>
  );
}
