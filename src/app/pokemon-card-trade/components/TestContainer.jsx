"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// 거래 필터
import {
  defaultFilterCardList,
  defaultFilterOptionList,
  defaultSort,
  defaultSortList,
} from "@/constants/tradeFilter";

// 거래 검색 필터
import SearchContainer from "./Search/SearchContainer";

// - 카드 필터
import { RiArrowLeftRightFill } from "react-icons/ri";
import FilterCard from "./Search/FilterCard";
import FilterCardBox from "./Search/FilterCardBox";

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
import { getMyTcgTradeList, getTcgTradeList } from "@/api/tcgTrade";

// 로그인 상태 체크
import useAuthStore from "@/store/authStore";

export default function TradeListContainer() {
  // Next.js 라우팅 훅들
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 로그인 상태 체크
  const isLogin = useAuthStore((state) => state.isLogin);

  // UI 상태
  const [isCardSearch, setIsCardSearch] = useState(false);
  const [currentFilterCardType, setCurrentFilterCardType] = useState(null);
  const [contentList, setContentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지네이션 상태
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 3;

  // URL에서 확정된 검색 조건 파싱 (API 호출용)
  const confirmedParams = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      myCardCode: params.myCardCode || null,
      wantCardCode: params.wantCardCode?.split(",").filter(code => code?.trim()) || [],
      filterOption: params.filterOption || "all",
      page: Math.max(0, Number(params.page) || 0),
      sort: params.sort || defaultSort,
    };
  }, [searchParams]);

  // 로컬 필터 상태 (임시 검색 조건, UI 표시용)
  const [localFilterState, setLocalFilterState] = useState(() => ({
    filterCardList: [...defaultFilterCardList],
    filterOption: confirmedParams.filterOption,
    sort: confirmedParams.sort,
  }));

  // 초기 로드 시 URL 기반으로 로컬 필터 상태 동기화
  useEffect(() => {
    let wantCardIndex = 0;
    const syncedFilterCardList = defaultFilterCardList.map((card) => {
      if (card.filterCardType === "my") {
        return { ...card, code: confirmedParams.myCardCode };
      } else {
        const currentWantCode = confirmedParams.wantCardCode[wantCardIndex] || null;
        wantCardIndex++;
        return {
          ...card,
          code: currentWantCode && currentWantCode.length > 0 ? currentWantCode : null,
        };
      }
    });

    setLocalFilterState({
      filterCardList: syncedFilterCardList,
      filterOption: confirmedParams.filterOption,
      sort: confirmedParams.sort,
    });
  }, [confirmedParams.myCardCode, confirmedParams.wantCardCode, confirmedParams.filterOption, confirmedParams.sort]);

  // API 요청 파라미터 생성 (확정된 검색 조건 기반)
  const apiParams = useMemo(() => {
    const adjustedPage = Math.min(confirmedParams.page, Math.max(0, totalPage - 1));
    
    let myCardCode = null;
    let wantCardCode = [];
    
    // 확정된 파라미터에서 직접 추출
    myCardCode = confirmedParams.myCardCode;
    wantCardCode = confirmedParams.wantCardCode;

    return {
      myCardCode,
      wantCardCode: wantCardCode.length > 0 ? wantCardCode.join(",") : null,
      filterOption: confirmedParams.filterOption,
      page: adjustedPage,
      size: pageSize,
      sort: confirmedParams.sort,
    };
  }, [confirmedParams, totalPage]);

  // URL 업데이트 함수
  const updateURL = useCallback((newParams, options = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "" && value !== "all") {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    if (options.replace) {
      router.replace(newUrl, { scroll: false });
    } else {
      router.push(newUrl, { scroll: false });
    }
  }, [router, pathname]);

  // 내 교환 체크
  const isMy = useMemo(() => {
    return defaultFilterOptionList.find(option => option.value === confirmedParams.filterOption)?.type === "my";
  }, [confirmedParams.filterOption]);

  // 데이터 로딩
  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      if (!searchParams.toString() && confirmedParams.filterOption === "all") {
        // 초기 로드 시 기본 파라미터로 URL 설정
        updateURL(apiParams, { replace: true });
        return;
      }

      setIsLoading(true);

      try {
        const callApi = isMy ? getMyTcgTradeList : getTcgTradeList;

        if (isMy && !isLogin) {
          throw new Error("로그인이 필요한 서비스입니다.");
        }

        const res = await callApi(apiParams);

        if (isCancelled) return;

        if (res?.data) {
          const data = res.data;
          setTotalPage(data.totalPages ?? 1);
          setTotalCount(data.totalElements ?? 0);
          setContentList(data.content ?? []);
        } else {
          throw new Error("데이터를 불러올 수 없습니다.");
        }
      } catch (error) {
        if (isCancelled) return;
        
        console.error("데이터 로딩 에러:", error);
        alert(`${error.response?.data?.message || error.message} errorCode : ${error.response?.data?.errorCode || "UNKNOWN"}`);
        handleReset();
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [apiParams, isMy, isLogin, updateURL, searchParams]);

  // 페이지 변경 핸들러 (즉시 URL 업데이트)
  const handlePageChange = useCallback((newPage) => {
    updateURL({ ...confirmedParams, page: newPage });
  }, [confirmedParams, updateURL]);

  // 필터 옵션 변경 핸들러 (로컬 상태만 변경)
  const handleFilterOptionChange = useCallback((value) => {
    setLocalFilterState(prev => ({
      ...prev,
      filterOption: value
    }));
  }, []);

  // 정렬 변경 핸들러 (로컬 상태만 변경)
  const handleSortChange = useCallback((value) => {
    setLocalFilterState(prev => ({
      ...prev,
      sort: value
    }));
  }, []);

  // 필터 적용 핸들러 (로컬 상태를 URL에 반영)
  const handleSubmit = useCallback(() => {
    // 로컬 필터 카드 리스트에서 파라미터 추출
    let myCardCode = null;
    const wantCardCode = [];
    
    localFilterState.filterCardList.forEach((card) => {
      if (card.filterCardType === "my") {
        myCardCode = card.code;
      } else if (card.code && card.code.length > 0) {
        wantCardCode.push(card.code);
      }
    });

    // 로컬 상태를 URL에 반영
    const newParams = {
      myCardCode,
      wantCardCode: wantCardCode.join(","),
      filterOption: localFilterState.filterOption,
      sort: localFilterState.sort,
      page: 0 // 필터 변경 시 첫 페이지로
    };

    updateURL(newParams);
  }, [localFilterState, updateURL]);

  // 리셋 핸들러 (로컬 상태와 URL 모두 초기화)
  const handleReset = useCallback(() => {
    // 로컬 상태 초기화
    setLocalFilterState({
      filterCardList: [...defaultFilterCardList],
      filterOption: "all",
      sort: defaultSort,
    });

    // URL 초기화
    updateURL({
      filterOption: "all",
      sort: defaultSort,
      page: 0
    });
  }, [updateURL]);

  // 카드 선택 핸들러들
  const onFilterCardButton = useCallback((cardData) => {
    if (cardData.filterCardType === currentFilterCardType) return;
    setCurrentFilterCardType(cardData.filterCardType);
    setIsCardSearch(true);
  }, [currentFilterCardType]);

  const onFilterCardCancel = useCallback((cardData) => {
    // 로컬 필터 카드 리스트에서 해당 카드 초기화
    setLocalFilterState(prev => ({
      ...prev,
      filterCardList: prev.filterCardList.map((findCard) =>
        findCard.filterCardType === cardData.filterCardType
          ? { ...findCard, code: null } // 카드 코드 초기화
          : findCard
      )
    }));
    
    setCurrentFilterCardType(null);
  }, []);

  const onCardClick = useCallback((cardData) => {
    if (!currentFilterCardType || !cardData) return;

    // 로컬 필터 카드 리스트 업데이트
    setLocalFilterState(prev => ({
      ...prev,
      filterCardList: prev.filterCardList.map((findCard) =>
        findCard.filterCardType === currentFilterCardType
          ? { ...findCard, ...cardData } // 선택한 카드로 업데이트
          : findCard
      )
    }));
    
    setIsCardSearch(false);
    setCurrentFilterCardType(null);
  }, [currentFilterCardType]);

  return (
    <>
      {isCardSearch && (
        <ListPickerDialog
          key={`dialog-${currentFilterCardType}`}
          open={isCardSearch}
          onOpenChange={(open) => {
            setIsCardSearch(open);
            if (!open) setCurrentFilterCardType(null);
          }}
          placeholder={"포켓몬 이름 검색"}
          onSelect={onCardClick}
        />
      )}

      <SearchContainer
        filterCardComponent={(props) => (
          <FilterCardBox {...props}>
            {/* 내 카드 (my) 섹션 */}
            <div className="flex items-center justify-center w-full">
              {localFilterState.filterCardList
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
              {localFilterState.filterCardList
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
            sortList={defaultSortList}
            value={localFilterState.sort}
            onChange={handleSortChange}
          />
        )}
        filterComponent={(props) => (
          <TradeStatusFilter
            {...props}
            filterList={defaultFilterOptionList}
            value={localFilterState.filterOption}
            isLogin={isLogin}
            onChange={handleFilterOptionChange}
          />
        )}
        buttonsComponent={(props) => (
          <Buttons {...props} onSumbmit={handleSubmit} onReset={handleReset} />
        )}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : (
        <TradeList tradeList={contentList} />
      )}

      <CommonPagination
        page={confirmedParams.page}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
