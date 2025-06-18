"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// 거래 검색 필터
import SearchContainer from "./Search/SearchContainer";

// - 카드 필터
import FilterCardBox from "./Search/FilterCardBox";
import FilterCard from "./Search/FilterCard";
import { RiArrowLeftRightFill } from "react-icons/ri";

// - 거래 글 검색 필터
import SortFilter from "./Search/SortFilter";
import TradeStatusFilter from "./Search/TradeStatusFilter";

import Buttons from "./Search/Buttons";

// - 카드 필터의 카드 검색
import ListPickerDialog from "@/components/list/ListPickerDialog";

// 거래 목록
import TradeList from "./TradeList";

// 페이지네이션
import CommonPagination from "../../../components/pagination/Pagination";

// API
import { getTcgTradeList, getMyTcgTradeList } from "@/api/tcgTrade";
import { parseQueryString } from "@/utils/queryString";

const parsingData = () => {};

export default function TradeListContainer() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState("id,desc");
  const pageSize = 10;

  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFilterCardType, setCurrentFilterCardType] = useState(null);

  const [filterQuery, setFilterQuery] = useState({});
  const isPopState = useRef(false);

  const cardInfo = { code: null, name: null, type: null };
  const [filterCardList, setFilterCardList] = useState([
    { ...cardInfo, filterCardType: "my" },
    { ...cardInfo, filterCardType: "want-0" },
    { ...cardInfo, filterCardType: "want-1" },
    { ...cardInfo, filterCardType: "want-2" },
  ]);

  const [tradeStatus, setTradeStatus] = useState("all");
  const [tradeStatusFilterList, setTradeStatusFilterList] = useState([
    { value: "all", name: "전체 보기" },

    { value: "request", name: "신청한 교환" },
    { value: "progress", name: "진행 중인 교환" },
    { value: "complete", name: "완료된 교환" },

    { value: "my-all", name: "내 교환 전체 보기" },

    { value: "my-request", name: "내가 신청한 교환" },
    { value: "my-progress", name: "내 진행 중인 교환" },
    { value: "my-complete", name: "내 완료된 교환" },
  ]);

  const [sortList, setSortList] = useState([
    { value: "id,desc", name: "최신순" },
    { value: "id,asc", name: "오래된순" },
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

  const onFilterCardButton = useCallback(
    (cardData) => {
      if (cardData.filterCardType === currentFilterCardType) return;

      setCurrentFilterCardType(cardData.filterCardType);
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

      // 상태 업데이트를 배치로 처리
      Promise.resolve().then(() => {
        setIsCardSearch(false);
        setCurrentFilterCardType(null);
      });
    },
    [currentFilterCardType]
  );

  const onTradeStatusChange = (value) => {
    setTradeStatus(value);
  };

  const onSortChange = (value) => {
    setSort(value);
  };

  const onSubmit = async () => {
    // console.log("쿼리 체크 : ", createParams());
    const response = await getTcgTradeList(createParams());

    console.log("response : ", response);
  };

  const onReset = () => {
    setFilterCardList([
      { ...cardInfo, filterCardType: "my" },
      { ...cardInfo, filterCardType: "want-0" },
      { ...cardInfo, filterCardType: "want-1" },
      { ...cardInfo, filterCardType: "want-2" },
    ]);
    setTradeStatus("all");
  };

  const createParams = () => {
    let tPage = page ?? 0;
    tPage = Math.min(page, totalPage);

    let myCardCode = null;
    let wantCardCode = [];
    filterCardList.forEach((card) => {
      if (card.filterCardType === "my") {
        myCardCode = card.code;
      } else {
        wantCardCode.push(card.code);
      }
    });
    wantCardCode = wantCardCode.join(",");

    return {
      myCardCode,
      wantCardCode,
      filterOption: tradeStatus,
      page: tPage,
      size: pageSize,
      sort: sort,
    };
  };

  return (
    <>
      {isCardSearch && (
        <ListPickerDialog
          key={`dialog-${currentFilterCardType}-${Date.now()}`}
          open={isCardSearch}
          onOpenChange={setIsCardSearch}
          placeholder={"포켓몬 이름 검색"}
          onSelect={onCardClick}
        />
      )}
      <SearchContainer
        findCardComponent={(props) => (
          <FilterCardBox {...props}>
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
        sortComponent={(props) => (
          <SortFilter
            {...props}
            sortList={sortList}
            value={sort}
            onChange={onSortChange}
          />
        )}
        filterComponent={(props) => (
          <TradeStatusFilter
            {...props}
            filterList={tradeStatusFilterList}
            value={tradeStatus}
            onChange={onTradeStatusChange}
          />
        )}
        buttonsComponent={(props) => (
          <Buttons {...props} onSumbmit={onSubmit} onReset={onReset} />
        )}
      />

      <TradeList />

      <CommonPagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
      />
    </>
  );
}
