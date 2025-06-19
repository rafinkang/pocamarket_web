"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// 거래 필터
import {
  defaultFilterCardList,
  defaultFilterOptionList,
  defaultSortList,
} from "@/constants/tradeFilter";

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
import { parseQueryString, makeQueryString } from "@/utils/queryString";

// 로그인 상태 체크
import useAuthStore from "@/store/authStore";

export default function TradeListContainer() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState("id,desc");
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  // 로그인 상태 체크
  const isLogin = useAuthStore((state) => state.isLogin);

  const [contentList, setContentList] = useState([]);

  // 카드 검색 상태
  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFilterCardType, setCurrentFilterCardType] = useState(null);

  const [filterQuery, setFilterQuery] = useState({});
  const isPopState = useRef(false);

  const cardInfo = { code: null, name: null, type: null };
  const [filterCardList, setFilterCardList] = useState([
    ...defaultFilterCardList,
  ]);

  const [filterOption, setFilterOption] = useState("all");
  const [filterOptionList, setFilterOptionList] = useState([
    ...defaultFilterOptionList,
  ]);

  const [sortList, setSortList] = useState([...defaultSortList]);

  // 사용하는 변수들로 API 파라미터 생성
  const createParams = () => {
    let tPage = page ?? 0;
    tPage = Math.min(page, totalPage);

    let myCardCode = null;
    let wantCardCode = [];
    filterCardList.forEach((card) => {
      if (card.filterCardType === "my") {
        myCardCode = card.code;
      } else {
        if (card.code && card.code.length > 0) {
          wantCardCode.push(card.code);
        }
      }
    });
    wantCardCode = wantCardCode.join(",");

    const params = {
      myCardCode,
      wantCardCode,
      filterOption,
      page: tPage,
      size: pageSize,
      sort: sort,
    };

    return params;
  };

  /*
    현재 쿼리스트링을 적용하는 함수
  */
  const currentQueryApply = (params) => {
    const queryString = params ?? window.location.search;
    const queryParams = parseQueryString(queryString);

    const myCardCode = queryParams?.myCardCode ?? null;
    const wantCardCode = queryParams?.wantCardCode?.split(",") ?? [];

    // 필터 카드 리스트 업데이트
    setFilterCardList((prev) => {
      return prev.map((card) => {
        if (card.filterCardType === "my") {
          return { ...card, code: myCardCode };
        } else if (wantCardCode.length > 0) {
          const temp = {
            ...card,
            code: wantCardCode[0].length > 0 ? wantCardCode.shift() : null,
          };
          return temp;
        }
        return card;
      });
    });

    // 필터 옵션 업데이트
    setFilterOption(queryParams.filterOption ?? "all");
    setPage(queryParams.page ? Number(queryParams.page) : 0);
    // size는 보류
    setSort(queryParams.sort ?? "id,desc");

    return queryString;
  };

  const parsingData = (res, setPage, setTotalPage, setTotalCount) => {
    const data = res.data;
    setPage(data?.number ?? 0);
    setTotalPage(data?.totalPages ?? 1);
    setTotalCount(data.totalElements ?? 0);
    return data.content;
  };

  const isExistingCard = (cardData) => {
    const existingCard = filterCardList.find(
      (card) => card.filterCardType === currentFilterCardType
    );
    return existingCard && existingCard.code === cardData.code;
  };

  const checkMyTrade = () => {
    return filterOption.includes("my-");
  };

  useEffect(() => {
    // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
    const handlePopOrInit = () => {
      isPopState.current = true;
      const queryString = currentQueryApply();
      setFilterQuery(queryString);
    };

    // 최초 마운트 시 실행
    handlePopOrInit();

    // popstate 이벤트 등록
    window.addEventListener("popstate", handlePopOrInit);
    return () => window.removeEventListener("popstate", handlePopOrInit);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const isMy = checkMyTrade();
        const callApi = isMy ? getMyTcgTradeList : getTcgTradeList;

        if (isMy && !isLogin) {
          throw new Error("로그인이 필요한 서비스입니다.");
        }

        const params = createParams();
        const res = await callApi(params);

        if (res) {
          const content = parsingData(
            res,
            setPage,
            setTotalPage,
            setTotalCount
          );

          // URL 업데이트 (popstate가 아닐 때만)
          if (!isPopState.current) {
            const queryString = makeQueryString(params);
            window.history.pushState(null, "", queryString);
          }
          isPopState.current = false;

          setContentList(content);
        } else {
          throw new Error("CONTENT_UNDEFINED");
        }
      } catch (error) {
        alert(error.message);
        onReset();
      }
    }
    fetchData();
  }, [filterQuery]);

  // 페이지 변경 시 새로운 쿼리 생성
  useEffect(() => {
    if (!isPopState.current) {
      const params = createParams();
      const queryString = makeQueryString(params);
      setFilterQuery(queryString);
    }
  }, [page]); // 페이지 변경 시에만 실행

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

  const onFilterOptionChange = (value) => {
    setFilterOption(value);
  };

  const onSortChange = (value) => {
    setSort(value);
  };

  const onSubmit = () => {
    const params = createParams();
    const queryString = makeQueryString(params);
    setFilterQuery(queryString);
  };

  const onReset = () => {
    setFilterCardList([...defaultFilterCardList]);
    setFilterOption("all");
    setSort("id,desc");
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
            filterList={filterOptionList}
            value={filterOption}
            onChange={onFilterOptionChange}
          />
        )}
        buttonsComponent={(props) => (
          <Buttons {...props} onSumbmit={onSubmit} onReset={onReset} />
        )}
      />

      <TradeList tradeList={contentList} />

      <CommonPagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
      />
    </>
  );
}
