"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

const ListContext = createContext();

/**
 * 리스트 관련 상태와 로직을 관리하는 Provider
 * - items: 아이템 리스트
 * - fetchList: 리스트 데이터를 가져오는 함수
 * - parseData: fetch 결과를 파싱하는 함수
 * - pageSize: 페이지당 아이템 수
 */
export function ListProvider({ children, fetchList, parseData, pageSize = 10 }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [sortInfo, setSortInfo] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [filterQuery, setFilterQuery] = useState({});
  const isPopState = useRef(false);

  const createParams = () => {
    let tPage = page ?? 0;
    tPage = Math.min(page, totalPage);
    return {
      ...filterQuery,
      page: tPage,
      size: pageSize,
      sort: sortInfo,
    };
  };

  const reset = () => {
    setItems([]);
    setTotalCount(0);
    setPage(0);
    setTotalPage(1);
    setSortInfo("");
  };

  useEffect(() => {
    const handlePopOrInit = () => {
      isPopState.current = true;
      const params = new URLSearchParams(window.location.search);
      const page = params.get("page") ? Number(params.get("page")) : 0;
      params.delete("page");
      params.delete("size");
      const filter = {};
      params.forEach((v, k) => (filter[k] = v));
      setFilterQuery(filter);
      setPage(page);
    };
    handlePopOrInit();
    window.addEventListener("popstate", handlePopOrInit);
    return () => window.removeEventListener("popstate", handlePopOrInit);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const params = createParams();
      try {
        const res = await fetchList(params);
        if (res) {
          let result = parseData(res, setPage, setTotalPage, setTotalCount);
          if (!isPopState.current) {
            const queryString =
              "?" + Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&");
            window.history.pushState(null, "", queryString);
          }
          isPopState.current = false;
          setItems(result);
        } else {
          throw new Error("CONTENT_UNDEFINED");
        }
      } catch (error) {
        reset();
      }
    }
    fetchData();
  }, [filterQuery, page, sortInfo]);

  const value = {
    items,
    page,
    totalPage,
    sortInfo,
    totalCount,
    filterQuery,
    setPage,
    setSortInfo,
    setFilterQuery,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

export const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
}; 