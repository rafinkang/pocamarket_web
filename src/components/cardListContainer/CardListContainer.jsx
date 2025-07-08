"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getPokemonCardList } from "@/api/pokemon-card";
import { defaultFilter, defaultSort, excludedValue, formSchema } from "@/constants/pokemonCardFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SearchList from "@/components/cardSearchFilter/SearchList";
import FilterArea from "@/components/cardSearchFilter/filterArea/FilterArea";
import SearchArea from "@/components/cardSearchFilter/filterArea/SearchArea";
import SortArea from "@/components/cardSearchFilter/filterArea/SortArea";
import CardList from "@/components/cardList/CardList";
import CommonPagination from "@/components/pagination/Pagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


const testMode = process.env.NODE_ENV === "development";
const debounceTime = 500;

export default function CardListContainer({ 
  updateURL = null,
  initFilterParams = null,
  setInitFilterParams = null,
  initPage = 1,
  setInitPage = null,
  pageSize = 10, 
  mobilePageSize = 5,
  isDetail = true,
  isSort = true,
  isCardType = true, 
  isCardPackSet = true, 
  isRarity = true, 
  isElement = true,
  cardElement, 
}) {
  // Next.js 라우팅 훅들
  const searchParams = useSearchParams();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(() => { 
    if(initPage) {
      return initPage;
    }
    return Math.max(1, Number(searchParams.get("page")) || 1)
  });
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  
  const [filterParams, setFilterParams] = useState(() => {
    if(initFilterParams) {
      return { ...initFilterParams };
    }
    const params = Object.fromEntries(searchParams.entries());

    const element = params.element?.split(",").filter(code => code?.trim());
    const rarity = params.rarity?.split(",").filter(code => code?.trim());
    const sort = defaultSort.find(item => item.value === params.sort)?.value || defaultSort[0].value;

    return {
      nameKo: params.nameKo || "",
      type: params.type || excludedValue,
      subtype: params.subtype || excludedValue,
      packSet: params.packSet || excludedValue,
      pack: params.pack || excludedValue,
      element: element || [],
      rarity: rarity || [],
      sort: sort,
    };
  });
  const [lastApiParams, setLastApiParams] = useState(null);

  // debounce를 위한 단일 ref
  const debounceRef = useRef(null);
  
  // 공통 debounce 함수
  const debounce = (callback, delay = debounceTime) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(callback, delay);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { ...filterParams },
  });

  // API 파라미터 생성
  const createApiParams = (params) => {
    const apiParams = Object.entries(params)
      .filter(([key, value]) => 
        value !== null && 
        value !== undefined && 
        value !== "" && 
        value !== excludedValue &&
        value !== defaultSort[0].value
      )
      .reduce((acc, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value.join(",");
        } else if (!Array.isArray(value)) {
          acc[key] = value;
        }
        return acc;
      }, {});

    apiParams.page = Math.min(Math.max(1, Number(apiParams.page) || 1));
    apiParams.size = pageSize;

    return apiParams;
  };

  // 파라미터 비교 함수
  const areParamsEqual = (params1, params2) => {
    if (!params1 || !params2) return false;
    return JSON.stringify(params1) === JSON.stringify(params2);
  };

  const returnInitFilterParams = (params) => {
    const newFilterParams = {...defaultFilter, ...params};
    delete newFilterParams.page;
    delete newFilterParams.size;
    newFilterParams.element = typeof newFilterParams.element === "string" ? newFilterParams.element.split(",") : [];
    newFilterParams.rarity = typeof newFilterParams.rarity === "string" ? newFilterParams.rarity.split(",") : [];
    setInitFilterParams(newFilterParams);
  }

  // 데이터 로딩
  const fetchData = async (customFilterParams = null) => {
    const targetParams = customFilterParams || filterParams;
    const apiParams = createApiParams(targetParams);

    // 중복 API 호출 방지
    if (areParamsEqual(apiParams, lastApiParams)) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await getPokemonCardList(apiParams);
      
      // 기본 파싱
      const data = res?.data || res;
      setItems(data.content || []);
      setTotalPage(data.totalPages || 1);
      setTotalCount(data.totalElements || 0);

      setLastApiParams(apiParams);
      if(updateURL) {
        updateURL(apiParams);
      }
      if(setInitFilterParams) {
        returnInitFilterParams(apiParams);
      }
      if(setInitPage) {
        setInitPage(apiParams.page || 1);
      }

      setPage(apiParams.page || 1);
      const tempFilter = {...defaultFilter, ...apiParams};
      delete tempFilter.page;
      delete tempFilter.size;
      setFilterParams(tempFilter);

    } catch (error) {
      console.error("데이터 로딩 에러:", error);
      setItems([]);
      setTotalPage(1);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initFilterParams) { // URL 파라미터 기반 동작
      const params = Object.fromEntries(searchParams.entries());
      
      const element = params.element?.split(",").filter(code => code?.trim());
      const rarity = params.rarity?.split(",").filter(code => code?.trim());
      const sort = defaultSort.find(item => item.value === params.sort)?.value || defaultSort[0].value;
      const newPage = Math.max(1, Number(params.page) || 1);

      const newFilterParams = {
        nameKo: params.nameKo || "",
        type: params.type || excludedValue,
        subtype: params.subtype || excludedValue,
        packSet: params.packSet || excludedValue,
        pack: params.pack || excludedValue,
        element: element || [],
        rarity: rarity || [],
        sort: sort,
      };

      setPage(newPage);
      setFilterParams(newFilterParams);
      form.reset(newFilterParams);
      
      debounce(() => {
        fetchData({...newFilterParams, page: newPage});
      });
    } else {
      debounce(() => {
        fetchData({...filterParams, page});
      });
    }
    
    return () => {
      // debounce timeout 정리
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchParams.toString()]);

  // 폼 제출 핸들러
  const handleSubmit = (data) => {
    debounce(() => {
      fetchData({...data});
    });
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    debounce(() => {
      const newParams = {
        ...filterParams,
        page: Math.min(Math.max(1, newPage), totalPage)
      };
      setPage(newParams.page);
      fetchData(newParams);
    });
  };

  // 리셋 핸들러
  const handleReset = () => {
    debounce(() => {
      form.reset({...defaultFilter});
      setFilterParams({...defaultFilter});
      fetchData({...defaultFilter});
    });
  };

  // 정렬 핸들러
  const handleSortChange = (value) => {
    debounce(() => {
      const newParams = {
        ...filterParams,
        sort: value
      };
      setFilterParams(newParams);
      fetchData(newParams);
    });
  };

  return (
    <div className="w-full min-w-[300px]">
      {/* 통합 컨테이너 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 검색 및 필터 영역 */}
        <div className="p-4 border-b border-gray-100">
          <SearchList
            form={form}
            filterComponents={[
              {
                Component: SearchArea,
                props: {
                  form,
                  setOpenDetail: setOpenDetail,
                  isDetail,
                },
              },
              ...(isDetail ? [{
                Component: FilterArea,
                props: {
                  form,
                  open: openDetail,
                  onReset: handleReset,
                  isCardType,
                  isCardPackSet,
                  isRarity,
                  isElement,
                },
              }] : []),
            ]}
            sortComponents={[
              ...(isSort ? [{
                Component: SortArea,
                props: {
                  form,
                  totalCount,
                  onChange: handleSortChange,
                },
              }] : []),
            ]}
            onSubmit={handleSubmit}
          />
        </div>

        {/* 카드 리스트 영역 */}
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-12">
              <LoadingSpinner color="#3b82f6" size="lg" />
              <p className="mt-3 text-gray-500 text-sm">카드를 불러오는 중...</p>
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {items.map((item, index) => (
                <div
                  key={item.code || index}
                  className="group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {cardElement && React.createElement(cardElement, {
                    data: item,
                    priority: index < 15,
                    testMode: testMode,
                    showInfo: true
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-3">
                <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-500 text-sm">
                다른 검색 조건을 시도해보세요
              </p>
            </div>
          )}
        </div>

        {/* 페이지네이션 영역 */}
        {totalPage > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <CommonPagination
              page={page}
              totalPage={totalPage}
              itemSize={pageSize}
              mobileItemSize={mobilePageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
} 