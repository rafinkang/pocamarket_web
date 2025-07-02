"use client";

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
  const [page, setPage] = useState(() => Math.max(0, Number(searchParams.get("page")) || 0));
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  
  const [filterParams, setFilterParams] = useState(() => {
    if(initFilterParams) {
      return initFilterParams;
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
        value !== null && value !== undefined && value !== "" && value !== excludedValue)
      .reduce((acc, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = value.join(",");
        } else if (!Array.isArray(value)) {
          acc[key] = value;
        }
        return acc;
      }, {});

    apiParams.page = Math.min(Math.max(0, Number(apiParams.page) || 0));
    apiParams.size = pageSize;

    return apiParams;
  };

  // 파라미터 비교 함수
  const areParamsEqual = (params1, params2) => {
    if (!params1 || !params2) return false;
    return JSON.stringify(params1) === JSON.stringify(params2);
  };

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
        setInitFilterParams({...defaultFilter, ...apiParams});
      }
    } catch (error) {
      console.error("데이터 로딩 에러:", error);
      setItems([]);
      setTotalPage(1);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    debounce(() => {
      fetchData({...filterParams, page});
    });
    
    return () => {
      // debounce timeout 정리
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

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
        page: Math.min(Math.max(0, newPage), totalPage)
      };
      
      setFilterParams(newParams);
      setPage(newPage);
      fetchData(newParams);
    });
  };

  // 리셋 핸들러
  const handleReset = () => {
    debounce(() => {
      form.reset(defaultFilter);
      setFilterParams(defaultFilter);
      fetchData(defaultFilter);
    });
  };

  return (
    <section className="w-full min-w-[300px] flex flex-col gap-4">
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
            },
          }] : []),
        ]}
        onSubmit={handleSubmit}
      />

    {isLoading ? (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner color="#3b82f6" size="lg" />
      </div>
    ) : (
      <CardList items={items} ItemComponent={cardElement} testMode={testMode} />
    )}

      <CommonPagination
        page={page}
        totalPage={totalPage}
        itemSize={pageSize}
        mobileItemSize={mobilePageSize}
        onPageChange={handlePageChange}
      />
    </section>
  );
} 