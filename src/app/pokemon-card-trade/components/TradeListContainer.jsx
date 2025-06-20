"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// 거래 필터
import {
  defaultFilterCardList,
  defaultFilterOptionList,
  defaultSortList,
  defaultSort,
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
  const [sort, setSort] = useState(defaultSort);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 3;

  // 로그인 상태 체크
  const isLogin = useAuthStore((state) => state.isLogin);

  const [contentList, setContentList] = useState([]);

  // 카드 검색 상태
  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFilterCardType, setCurrentFilterCardType] = useState(null);

  const [filterQuery, setFilterQuery] = useState(null);
  const isPopState = useRef(false);
  const isInitialized = useRef(false);

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

    wantCardCode = wantCardCode.length > 0 ? wantCardCode.join(",") : null;

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

  // 현재 쿼리스트링을 필터 값에 적용하는 메서드
  const currentQueryApply = (params) => {
    const queryString = params ?? window.location.search;
    const queryParams = parseQueryString(queryString);

    const myCardCode = queryParams?.myCardCode ?? null;
    const wantCardCode = queryParams?.wantCardCode?.split(",").filter(code => code && code.trim() !== "") ?? [];

    // 필터 카드 리스트 업데이트
    setFilterCardList((prev) => {
      let wantCardIndex = 0;
      return prev.map((card) => {
        if (card.filterCardType === "my") {
          return { ...card, code: myCardCode };
        } else {
          const currentWantCode = wantCardCode[wantCardIndex] || null;
          wantCardIndex++;
          return {
            ...card,
            code: currentWantCode && currentWantCode.length > 0 ? currentWantCode : null,
          };
        }
      });
    });

    // 필터 옵션 업데이트
    setFilterOption(queryParams.filterOption ?? "all");
    setPage(queryParams.page ? Number(queryParams.page) : 0);
    // size는 보류
    setSort(queryParams.sort ?? defaultSort);

    return queryString;
  };

  // API 정상 응답 데이터 파싱 메서드
  const parsingData = (res, setPage, setTotalPage, setTotalCount) => {
    const data = res.data;
    setPage(data?.number ?? 0);
    setTotalPage(data?.totalPages ?? 1);
    setTotalCount(data.totalElements ?? 0);
    return data.content;
  };

  // 카드 중복 체크 메서드
  const isExistingCard = (cardData) => {
    const existingCard = filterCardList.find(
      (card) => card.filterCardType === currentFilterCardType
    );
    return existingCard && existingCard.code === cardData.code;
  };

  // 내 교환 체크 메서드
  const checkMyTrade = () => {
    return filterOptionList.find(option => option.value === filterOption)?.type === "my";
  };

  // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
  useEffect(() => {
    const handlePopOrInit = () => {
      // React Strict Mode에서 중복 실행 방지
      if (isInitialized.current && !isPopState.current) {
        return;
      }
      
      isPopState.current = true;
      const queryString = currentQueryApply();
      if(queryString == null || queryString == ""){
        setFilterQuery(makeQueryString(createParams()));
      }else{
        setFilterQuery(queryString);
      }
      isInitialized.current = true;
    };

    // 최초 마운트 시 실행
    handlePopOrInit();

    // popstate 이벤트 등록
    const popStateHandler = () => {
      isPopState.current = true;
      handlePopOrInit();
    };
    
    window.addEventListener("popstate", popStateHandler);
    return () => window.removeEventListener("popstate", popStateHandler);
  }, []);

  // 데이터 조회 메서드
  useEffect(() => {
    async function fetchData() {

      if (!filterQuery) return;

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
        alert(`${error.response?.data?.message} errorCode : ${error.response?.data?.errorCode}`);
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
  }, [page]);

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
    setSort(defaultSort);
  };

  return (
    <>
      {isCardSearch && (
        <ListPickerDialog
          key={`dialog-${currentFilterCardType}-${Date.now()}`}
          open={isCardSearch}
          onOpenChange={
            (v) => {
              setIsCardSearch(v);
              if(!v) setCurrentFilterCardType(null);
            }
          }
          placeholder={"포켓몬 이름 검색"}
          onSelect={onCardClick}
        />
      )}
      <SearchContainer
        filterCardComponent={(props) => (
          <FilterCardBox {...props}>
            {/* 내 카드 (my) 섹션 */}
            <div className="flex items-center justify-center w-full">
              {filterCardList
                .filter((card) => card.filterCardType === "my")
                .map((card) => (
                  <FilterCard
                    key={card.filterCardType}
                    data={card}
                    type={card.filterCardType}
                    onCardClick={onFilterCardButton}
                    onCancelClick={onFilterCardCancel}
                  />
                ))}
            </div>

            {/* 교환 화살표 */}
            <div className="flex justify-center items-center">
              {/* 세로 배열일 때는 아래쪽 화살표, 가로 배열일 때는 좌우 화살표 */}
              <RiArrowLeftRightFill 
                size="40px" 
                className="sm:text-[50px]" 
              />
            </div>

            {/* 원하는 카드들 (want) 섹션 */}
            <div className="
              grid items-center justify-items-center w-full
              grid-rows-3 grid-cols-1 gap-4
              md:grid-rows-1 md:grid-cols-[1fr_1fr_1fr] md:gap-4"
            >
              {filterCardList
                .filter((card) => card.filterCardType !== "my")
                .map((card) => (
                  <FilterCard
                    key={card.filterCardType}
                    data={card}
                    type={card.filterCardType}
                    onCardClick={onFilterCardButton}
                    onCancelClick={onFilterCardCancel}
                  />
                ))}
            </div>
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
            isLogin={isLogin}
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
