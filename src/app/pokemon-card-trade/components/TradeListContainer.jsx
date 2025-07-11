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
import { RiArrowLeftDoubleLine, RiArrowLeftRightFill, RiArrowUpDoubleLine, RiArrowUpDownFill } from "react-icons/ri";
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
import { toast } from "sonner";


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
  const pageSize = 10;

  const [tradeCardListFilter, setTradeCardListFilter] = useState({ ...defaultFilter });
  const [tradeCardListPage, setTradeCardListPage] = useState(1);
  
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
  const lastApiParamsRef = useRef(null);
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
      page: Math.max(1, Number(params.page) || 1),
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
      page: Math.min(Math.max(1, Number(filterParams.page) || 1)),
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
  const updateURL = (apiParams, options = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(apiParams).forEach(([key, value]) => {
      if (key !== "size" && 
          (key !== "page" || value !== 1) &&
          value !== null && 
          value !== undefined && 
          value !== "" && 
          value !== 99 && 
          value !== defaultSort) {
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
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const wantCard = getWantCardDefault();
    const wantCardCode = params.wantCardCode?.split(",").filter(code => code?.trim());

    wantCardCode?.forEach((code, index) => {
      if(index < wantCard.length) {
        wantCard[index].code = code;
      }
    });

    const newFilterParams = {
      myCard: params.myCardCode ? { ...getMyCardDefault(), code: params.myCardCode } : getMyCardDefault(),
      wantCard,
      status: Number(params.status) || 99,
      page: Math.max(1, Number(params.page) || 1),
      sort: params.sort || defaultSort,
      isMy: params.isMy === 'true' ? true : false,
    };

    setFilterParams(newFilterParams);
    
    debounce(() => {
      fetchData(newFilterParams);
    });
    
    return () => {
      // debounce timeout 정리
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchParams.toString(), isLogin]);

  // 데이터 로딩
  const fetchData = async (customFilterParams = null) => {
    const targetParams = customFilterParams || filterParams;
    const apiParams = getActiveFilterParams(createApiParams(targetParams));

    if (areParamsEqual(apiParams, lastApiParamsRef.current)) {
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
        lastApiParamsRef.current = apiParams;
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
        page: Math.min(Math.max(1, newPage), totalPage)
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
        page: 1
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
        page: 1,
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

  const checkRarity = (selectedCard) => {
    // 내 카드와의 레어도 비교
    if (filterParams.myCard?.code &&
      filterParams.myCard.code.length > 0 &&
      filterParams.myCard.rarity !== selectedCard.rarity
    ) {
      return;
    }
    // 원하는 카드와 레어도 비교
    if (filterParams.wantCard.some(
      card =>
        card?.code &&
        card.code.length > 0 &&
        card?.rarity !== selectedCard.rarity
    )
    ) {
      return false;
    }
    return true;
  }

  const checkCardCode = (selectedCard) => {
    if (filterParams.myCard?.code &&
      filterParams.myCard.code.length > 0 &&
      filterParams.myCard.code === selectedCard.code
    ) {
      return false;
    }

    if (filterParams.wantCard.some(
      card =>
        card?.code &&
        card.code.length > 0 &&
        card?.code === selectedCard.code
    )
    ) {
      return false;
    }
    return true;
  }


  // 카드 선택 핸들러들
  const onFilterCardButton = useCallback((cardData) => {
    console.log("onFilterCardButton", cardData);
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

    if (!checkRarity(cardData)) {
      toast.error("레어도가 다른 카드는 선택할 수 없습니다.");
      return;
    }

    if (!checkCardCode(cardData)) {
      toast.error("이미 선택한 카드는 선택할 수 없습니다.");
      return;
    }

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
          initPage={tradeCardListPage}
          setInitPage={setTradeCardListPage}
          placeholder={"포켓몬 이름 검색"}
          onSelect={onCardClick}
        />
      )}

      <SearchContainer
        filterCardComponent={(props) => (
          <FilterCardBox {...props}>
            {/* 내 카드 (my) 섹션 */}
            <div className="flex flex-col items-center space-y-3 lg:self-start">
              {filterParams.myCard && (
                <FilterCard
                  key={filterParams.myCard.code}
                  data={filterParams.myCard}
                  type={filterParams.myCard.filterCardType}
                  onCardClick={onFilterCardButton}
                  onCancelClick={onFilterCardCancel}
                />
              )}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">교환 카드</h3>
                <p className="text-xs text-gray-500">검색할 카드를 선택하세요</p>
              </div>
            </div>

            {/* 중앙 교환 표시 - 반응형 */}
            <div className="flex items-center justify-center relative lg:top-[-25px]">
              {/* 교환 아이콘 */}
              <RiArrowUpDoubleLine className="text-purple-600 text-2xl md:text-3xl block lg:hidden" />
              <RiArrowLeftDoubleLine className="text-purple-600 text-2xl md:text-3xl hidden lg:block" />
            </div>

            {/* 원하는 카드들 (want) 섹션 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-full" style={{ maxWidth: '600px' }}>
                <div className="flex justify-center items-center gap-3 flex-wrap min-h-[180px]">
                  {filterParams.wantCard.filter(card => card.code).map((card, index) => (
                    <FilterCard
                      key={card.code + index}
                      data={card}
                      type={card.filterCardType}
                      onCardClick={onFilterCardButton}
                      onCancelClick={onFilterCardCancel}
                    />
                  ))}
                  {filterParams.wantCard.filter(card => card.code).length < 3 && (
                    <FilterCard
                      data={getWantCardDefault()[filterParams.wantCard.filter(card => card.code).length]}
                      type={`want${filterParams.wantCard.filter(card => card.code).length + 1}`}
                      onCardClick={onFilterCardButton}
                      onCancelClick={onFilterCardCancel}
                    />
                  )}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">원하는 카드</h3>
                <p className="text-xs text-gray-500">검색할 카드를 선택하세요</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        i < filterParams.wantCard.filter(card => card.code).length
                          ? 'bg-purple-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
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
