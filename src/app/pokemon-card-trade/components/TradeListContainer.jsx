"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// 거래 필터
import {
  defaultFilterOptionList,
  defaultSort,
  defaultSortList,
  getMyCardDefault,
  getWantCardDefault
} from "@/constants/tradeFilter";

import { defaultFilter } from "@/constants/pokemonCardFilter";

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
import ListPickerDialog from "@/components/cardListContainer/ListPickerDialog";

// 거래 목록
import TradeList from "./TradeList";

// 페이지네이션
import CommonPagination from "@/components/pagination/Pagination";

// API
import { getMyTcgTradeList, getTcgTradeList } from "@/api/tcgTrade";

// 로그인 상태 체크
import useAuthStore from "@/store/authStore";
import MyCheck from "./Search/MyCheck";


// testMode 체크
const testMode = process.env.NODE_ENV === "development";
const debounceTime = 500;

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

  const [tradeCardListFilter, setTradeCardListFilter] = useState({ ...defaultFilter });
  
  // debounce를 위한 단일 ref
  const debounceRef = useRef(null);
  
  // 공통 debounce 함수
  const debounce = (callback, delay = debounceTime) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(callback, delay);
  };
  
  const [lastApiParams, setLastApiParams] = useState(null);
  const [filterParams, setFilterParams] = useState(() => {
    const params = Object.fromEntries(searchParams.entries());

    const wantCard = getWantCardDefault();
    const wantCardCode = params.wantCardCode?.split(",").filter(code => code?.trim());

    wantCardCode?.forEach((code, index) => {
      if(index < wantCard.length) {
        wantCard[index].code = code;
      }
    });

    return {
      myCard: params.myCardCode ? { ...getMyCardDefault(), code: params.myCardCode } : getMyCardDefault(),
      wantCard,
      status: Number(params.status) || 99,
      page: Math.max(0, Number(params.page) || 0),
      sort: params.sort || defaultSort,
      isMy: params.isMy === 'true' ? true : false,
    };
  }, [searchParams, isLogin]);
  
  // API 요청 파라미터 생성
  const createApiParams = (filterParams) => {
    const wantCardCode = filterParams.wantCard.filter(wantCard => wantCard?.code?.trim()).map(wantCard => wantCard.code).join(",");

    return {
      myCardCode: filterParams.myCard?.code || null,
      wantCardCode: wantCardCode.length > 0 ? wantCardCode : null,
      status: filterParams.status == 99 ? null : filterParams.status,
      page: Math.min(Math.max(0, Number(filterParams.page) || 0)),
      size: pageSize,
      sort: filterParams.sort,
      isMy: filterParams.isMy,
    };
  };
  
  // 데이터 있는 것만 골라서 객체 만들어줌
  const getActiveFilterParams = (filterParams) => {
    const tempFilter = {};

    if(filterParams?.myCardCode) {
      tempFilter.myCardCode = filterParams.myCardCode;
    }

    if(typeof filterParams?.wantCardCode === "string" && filterParams?.wantCardCode?.length > 0) {
      tempFilter.wantCardCode = filterParams.wantCardCode;
    }

    if(filterParams?.status != 99 && filterParams?.status != null) {
      tempFilter.status = filterParams.status;
    }

    if(filterParams?.page) {
      tempFilter.page = filterParams.page;
    }

    if(filterParams?.sort) {
      tempFilter.sort = filterParams.sort;
    }

    if(filterParams?.isMy) {
      tempFilter.isMy = filterParams.isMy;
    }

    if(pageSize > 0) {
      tempFilter.size = pageSize;
    } else {
      tempFilter.size = 3;
    }

    return tempFilter;
  }

  // 파라미터 비교 함수 (중복 API 호출 방지)
  const areParamsEqual = (params1, params2) => {
    if (!params1 || !params2) return false;
    return JSON.stringify(params1) === JSON.stringify(params2);
  };

  // URL 업데이트 함수
  const updateURL = useCallback((apiParams, options = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(apiParams).forEach(([key, value]) => {
      if (key !== "size" && value !== null && value !== undefined && value !== "" && value !== 99 && value !== defaultSort) {
        if (key === 'isMy' || value !== false) {
          params.set(key, String(value));
        }
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    if (options.replace) {
      router.replace(newUrl, { scroll: false });
    } else {
      router.push(newUrl, { scroll: true });
    }
  }, [router, pathname, lastApiParams]);

  // 초기 데이터 로딩 (debounce 적용)
  useEffect(() => {
    debounce(() => {
      fetchData(filterParams);
    });
    
    return () => {
      // debounce timeout 정리
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // 데이터 로딩
  const fetchData = async (customFilterParams = null) => {
    const targetParams = customFilterParams || filterParams;
    const apiParams = getActiveFilterParams(createApiParams(targetParams));

    if (areParamsEqual(apiParams, lastApiParams)) {
      return;
    }
    
    setIsLoading(true);

    try {
      const callApi = apiParams.isMy ? getMyTcgTradeList : getTcgTradeList;

      if (apiParams.isMy && !isLogin) {
        throw new Error("로그인이 필요한 서비스입니다.");
      }

      const res = await callApi({ ...apiParams });

      if (res?.data) {
        const data = res.data;
        setTotalPage(data.totalPages ?? 1);
        setTotalCount(data.totalElements ?? 0);
        setContentList(data.content ?? []);
        setLastApiParams(apiParams); // 성공한 API 파라미터 저장
        updateURL(apiParams);
      } else {
        throw new Error("데이터를 불러올 수 없습니다.");
      }
    } catch (error) {
      console.error("데이터 로딩 에러:", error);
      alert(`${error.response?.data?.message || error.message}`);
      setContentList([]);
      setTotalPage(1);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 핸들러 
  const handlePageChange = useCallback((newPage) => {
    debounce(() => {
      const newFilterParams = {
        ...filterParams,
        page: Math.min(Math.max(0, newPage), totalPage)
      };
      
      setFilterParams(newFilterParams);
      fetchData(newFilterParams);
    });
  }, [filterParams, totalPage]);

  // 필터 적용 핸들러 (debounce 적용)
  const handleSubmit = () => {
    debounce(() => {
      const newFilterParams = {
        ...filterParams,
        page: 0
      };
      
      setFilterParams(newFilterParams);
      fetchData(newFilterParams);
    });
  };

  // 리셋 핸들러 (debounce 적용)
  const handleReset = () => {
    debounce(() => {
      const resetFilterParams = {
        myCard: getMyCardDefault(),
        wantCard: getWantCardDefault(),
        status: 99,
        page: 0,
        sort: defaultSort,
        isMy: false,
      };
      
      setFilterParams(resetFilterParams);
      fetchData(resetFilterParams);
    });
  };

  const handleFilterOptionChange = (value) => {
    setFilterParams(prev => ({
      ...prev,
      status: defaultFilterOptionList.find(option => option.value === value)?.value || 99
    }));
  };

  const handleMyCheckChange = (value) => {
    setFilterParams(prev => ({
      ...prev,
      isMy: value && isLogin ? true : false
    }));
  };

  const handleSortChange = (value) => {
    setFilterParams(prev => ({
      ...prev,
      sort: defaultSortList.find(sort => sort.value === value)?.value || defaultSort
    }));
  };

  // 카드 선택 핸들러들
  const onFilterCardButton = useCallback((cardData) => {
    if (cardData.filterCardType === currentFilterCardType) return;
    setCurrentFilterCardType(cardData.filterCardType);
    setIsCardSearch(true);
  }, [currentFilterCardType]);

  const onFilterCardCancel = useCallback((cardData) => {
    if (cardData.filterCardType === "my") {
      setFilterParams(prev => ({
        ...prev,
        myCard: { ...getMyCardDefault()}
      }));
    } else {
      // want 카드의 경우 해당 인덱스를 찾아서 제거
      const wantIndex = filterParams.wantCard.findIndex(card => 
        card.filterCardType === cardData.filterCardType
      );
      
      if (wantIndex !== -1) {
        setFilterParams(prev => ({
          ...prev,
          wantCard: prev.wantCard.map((card, index) => 
            index === wantIndex ? { ...card, code: null } : card
          )
        }));
      }
    }
    
    setCurrentFilterCardType(null);
  }, [currentFilterCardType, filterParams.myCard, filterParams.wantCard]);

  const onCardClick = useCallback((cardData) => {
    if (!currentFilterCardType || !cardData) return;

    if (currentFilterCardType === "my") {
      setFilterParams(prev => ({
        ...prev,
        myCard: { ...prev.myCard, ...cardData }
      }));
    } else {
      const wantIndex = filterParams.wantCard.findIndex(card => 
        card.filterCardType === currentFilterCardType
      );
      
      if (wantIndex !== -1) {
        setFilterParams(prev => ({
          ...prev,
          wantCard: prev.wantCard.map((card, index) => 
            index === wantIndex ? { ...card, ...cardData } : card
          )
        }));
      }
    }
    
    setIsCardSearch(false);
    setCurrentFilterCardType(null);
  }, [currentFilterCardType, filterParams.myCard, filterParams.wantCard]);

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
          initFilterParams={tradeCardListFilter}
          setInitFilterParams={setTradeCardListFilter}
          placeholder={"포켓몬 이름 검색"}
          onSelect={onCardClick}
        />
      )}

      <SearchContainer
        filterCardComponent={(props) => (
          <FilterCardBox {...props}>
            {/* 내 카드 (my) 섹션 */}
            <div className="flex items-center justify-center w-full">
              {filterParams.myCard && (
                  <FilterCard
                    key={filterParams.myCard.code}
                    data={filterParams.myCard}
                    type={filterParams.myCard.filterCardType}
                    onCardClick={onFilterCardButton}
                    onCancelClick={onFilterCardCancel}
                  />
                )}
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
              {filterParams.wantCard.map((card, index) => (
                <FilterCard
                  key={index}
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
            value={filterParams.sort}
            onChange={handleSortChange}
          />
        )}
        filterComponent={(props) => (
          <TradeStatusFilter
            {...props}
            filterList={defaultFilterOptionList}
            value={filterParams.status}
            onChange={handleFilterOptionChange}
          />
        )}
        myCheckComponent={(props) => {
          if (!isLogin) return null;
          return (
          <MyCheck 
            {...props} 
            isMy={filterParams.isMy}
            onChange={handleMyCheckChange}
          />
        )}}
        buttonsComponent={(props) => (
          <Buttons {...props} onSumbmit={handleSubmit} onReset={handleReset} />
        )}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      ) : (
        <TradeList tradeList={contentList} testMode={testMode} />
      )}

      <CommonPagination
        page={filterParams.page}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
