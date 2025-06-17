"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// 공용 컴포넌트
import { TradeProvider } from "./TradeProvider";

import FindCardBox from "./Search/FindCardBox";
import TradeList from "./TradeList";

import TradeDialog from "./TradeDialog";
import PokemonCardList from "./pokemonCardSearch/PokemonCardList";

import CommonPagination from "../../../components/pagination/Pagination";
import { parseQueryString, makeQueryString } from "@/utils/queryString";
import SearchContainer from "./Search/SearchContainer";
import Buttons from "./Search/Buttons";

const parsingData = () => {};

export default function TradeListContainer() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 10;

  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFindCardType, setCurrentFindCardType] = useState(null);

  const [filterQuery, setFilterQuery] = useState({});
  const [placeholder, setPlaceholder] = useState("내가 원하는 카드");
  const isPopState = useRef(false);

  const cardInfo = { code: null, name: null, type: null };
  const [findCardList, setFindCardList] = useState([
    { ...cardInfo, findCardTtpe: "my" },
    { ...cardInfo, findCardTtpe: "want-0" },
    { ...cardInfo, findCardTtpe: "want-1" },
    { ...cardInfo, findCardTtpe: "want-2" },
  ]);

  useEffect(() => {
    // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
    const handlePopOrInit = () => {
      isPopState.current = true;
      const params = parseQueryString(window.location.search);
      const page = params.page ? Number(params.page) : 0;
      delete params.page;
      delete params.size;
      setFilterQuery(params);
      setPage(page);
    };

    // 최초 마운트 시 실행
    handlePopOrInit();

    // popstate 이벤트 등록
    window.addEventListener("popstate", handlePopOrInit);
    return () => window.removeEventListener("popstate", handlePopOrInit);
  }, []);

  const onFindCardButton = useCallback(
    (findCardTtpe) => {
      if (findCardTtpe === currentFindCardType) return;
      setCurrentFindCardType(findCardTtpe);
      setIsCardSearch(true);
    },
    [currentFindCardType]
  );

  const onCardClick = useCallback(
    (cardData) => {
      if (!currentFindCardType || !cardData) return;

      setFindCardList((prev) => {
        // 이전 상태와 동일한 경우 업데이트 하지 않음
        const existingCard = prev.find(
          (card) => card.findCardTtpe === currentFindCardType
        );
        if (
          existingCard &&
          existingCard.code === cardData.code &&
          existingCard.name === cardData.name &&
          existingCard.type === cardData.type
        ) {
          return prev;
        }

        const newList = prev.map((findCard) =>
          findCard.findCardTtpe === currentFindCardType
            ? { ...findCard, ...cardData }
            : findCard
        );
        return newList;
      });

      // 상태 업데이트를 배치로 처리
      Promise.resolve().then(() => {
        setIsCardSearch(false);
        setCurrentFindCardType(null);
      });
    },
    [currentFindCardType]
  );

  return (
    <>
      <SearchContainer
        findCardComponent={useCallback(
          (props) => (
            <FindCardBox
              {...props}
              onCardButton={onFindCardButton}
              findCardList={findCardList}
            />
          ),
          [onFindCardButton, findCardList]
        )}
        // filterComponent={Filter}
        // buttonsComponent={Buttons}
      />

      <TradeDialog open={isCardSearch} onOpenChange={setIsCardSearch}>
        <PokemonCardList placeholder={placeholder} onCardClick={onCardClick} />
      </TradeDialog>

      <TradeList />

      <CommonPagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
      />
    </>
  );
}
