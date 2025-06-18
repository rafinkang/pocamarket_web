"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// 거래 검색 필터
import SearchContainer from "./Search/SearchContainer";

// - 카드 필터
import FilterCardBox from "./Search/FilterCardBox";
import FilterCard from "./Search/FilterCard";
import { RiArrowLeftRightFill } from "react-icons/ri";

// - 거래 글 검색 필터
import TradeStatusFilterBox from "./Search/TradeStatusFilterBox";

import Buttons from "./Search/Buttons";

// - 카드 필터의 카드 검색
import TradeDialog from "./TradeDialog";
import PokemonCardList from "./pokemonCardSearch/PokemonCardList";

// 거래 목록
import TradeList from "./TradeList";

// 페이지네이션
import CommonPagination from "../../../components/pagination/Pagination";

import { parseQueryString } from "@/utils/queryString";

const parsingData = () => {};

export default function TradeListContainer() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 10;

  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFilterCardType, setCurrentFilterCardType] = useState(null);

  const [filterQuery, setFilterQuery] = useState({});
  const [placeholder, setPlaceholder] = useState("내가 원하는 카드");
  const isPopState = useRef(false);

  const cardInfo = { code: null, name: null, type: null };
  const [filterCardList, setFilterCardList] = useState([
    { ...cardInfo, filterCardType: "my" },
    { ...cardInfo, filterCardType: "want-0" },
    { ...cardInfo, filterCardType: "want-1" },
    { ...cardInfo, filterCardType: "want-2" },
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

  const isExistingCard = (cardData) => {
    const existingCard = filterCardList.find(
      (card) => card.filterCardType === currentFilterCardType
    );
    return existingCard && existingCard.code === cardData.code;
  };

  const filterCardUpdate = (cardData) => {
    setFilterCardList((prev) => {
      if (isExistingCard(cardData)) {
        return prev;
      }

      const newList = prev.map((findCard) =>
        findCard.filterCardType === currentFilterCardType
          ? { ...findCard, ...cardData }
          : findCard
      );
      return newList;
    });
  };

  const onFilterCardButton = useCallback(
    (card) => {
      if (card.filterCardType === currentFilterCardType) return;

      setCurrentFilterCardType(card.filterCardType);
      setIsCardSearch(true);
    },
    [currentFilterCardType]
  );

  const onFilterCardCancel = (cardData) => {
    setFilterCardList((prev) => {
      return prev.map((findCard) =>
        findCard.filterCardType === cardData.filterCardType
          ? { ...cardData }
          : findCard
      );
    });

    setCurrentFilterCardType(null);
  };

  const onCardClick = useCallback(
    (cardData) => {
      if (!currentFilterCardType || !cardData) return;

      filterCardUpdate(cardData);

      // 상태 업데이트를 배치로 처리
      Promise.resolve().then(() => {
        setIsCardSearch(false);
        setCurrentFilterCardType(null);
      });
    },
    [currentFilterCardType]
  );

  return (
    <>
      <SearchContainer
        findCardComponent={(props) => (
          <FilterCardBox>
            {filterCardList.map((card) => (
              <React.Fragment key={card.filterCardType}>
                <FilterCard
                  data={card}
                  type={card.filterCardType}
                  onCardClick={onFilterCardButton}
                  onCancelClick={onFilterCardCancel}
                />
                {card.filterCardType === "my" && (
                  <RiArrowLeftRightFill size="50px" />
                )}
              </React.Fragment>
            ))}
          </FilterCardBox>
        )}
        filterComponent={TradeStatusFilterBox}
        buttonsComponent={Buttons}
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
