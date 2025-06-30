"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getPokemonCardList } from "@/api/pokemon-card";
import SearchList from "@/components/cardList/search/SearchList";
import { defaultFilter, defaultSort, excludedValue, formSchema } from "@/constants/pokemonCardFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CardList from "@/components/cardList/list/CardList";
import CommonPagination from "@/components/pagination/Pagination";
import CardElement from "./CardElement";
import ButtonArea from "./filterArea/ButtonArea";
import FilterArea from "./filterArea/FilterArea";
import SearchArea from "./filterArea/SearchArea";
import SortArea from "./filterArea/SortArea";


const debounceTime = 500;

export default function CardListContainer() {
  // Next.js 라우팅 훅들
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(() => Math.max(0, Number(searchParams.get("page")) || 0));
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  const [openDetail, setOpenDetail] = useState(false);
  
  const [filterParams, setFilterParams] = useState(() => {
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

  // URL 업데이트 함수
  const createURL = (params, options = {}) => {
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (key !== "size" && value !== null && value !== undefined && value !== "" && value !== excludedValue && 
        value !== defaultFilter[key] && value !== 0) {
        if (Array.isArray(value) && value.length > 0) {
          urlParams.set(key, value.join(","));
        } else if (!Array.isArray(value)) {
          urlParams.set(key, String(value));
        }
      }
    });

    const queryString = urlParams.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    if (options.replace) {
      router.replace(newUrl, { scroll: false });
    } else {
      router.push(newUrl, { scroll: true });
    }
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
      setItems(data.content || data.items || []);
      setTotalPage(data.totalPages || 1);
      setTotalCount(data.totalElements || data.totalCount || 0);

      setLastApiParams(apiParams);
      createURL(apiParams);
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
            },
          },
          {
            Component: FilterArea,
            props: {
              form,
              open: openDetail,
            },
          },
          {
            Component: ButtonArea,
            props: {
              form,
              onReset: handleReset,
            },
          },
        ]}
        sortComponents={[
          {
            Component: SortArea,
            props: {
              form,
              totalCount,
            },
          },
        ]}
        onSubmit={handleSubmit}
      />

    {isLoading ? (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    ) : (
      <CardList items={items} ItemComponent={CardElement} />
    )}

      <CommonPagination
        page={page}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
} 