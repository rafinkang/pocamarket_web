"use client";

import { useState, useEffect, useRef } from "react";
import CardFilter from "./CardFilter";
import CardList from "./CardList";
import PokemonCard from "./PokemonCard";

import { getPokemonCardList } from "@/api/pokemon-card";
import { defaultPageInfo } from "@/constants/pokemonCardFilter";
import CardPagination from "./CardPagination";

const parsingData = (res, pageInfo) => {
  // erorr 검사
  if (!res.success && res.errorCode == null && res.data == null) {
    console.error("Failed to fetch card list:", res.message);
    return [];
  }

  const data = res.data;

  // pageable 정보 설정
  pageInfo.page = data.number;
  pageInfo.size = data.size;
  pageInfo.totalPage = data.totalPages;

  // content가 없거나 배열이 아닌 경우
  if (!data.content || !Array.isArray(data.content)) {
    console.error("Invalid card list format:", data.content);
    return [];
  }

  // Content 정보 추출
  const list = [];
  data.content.forEach((card) => {
    list.push(card);
  });

  return list;
};

// 쿼리스트링을 객체로 변환하는 함수
const parseQueryString = (search) => {
  const params = {};
  if (!search) return params;
  search.replace(/^\?/, "").split("&").forEach((pair) => {
    if (!pair) return;
    const [k, v] = pair.split("=");
    params[decodeURIComponent(k)] = decodeURIComponent(v ?? "");
  });
  return params;
};

export default function CardListContainer() {
  const [cardList, setCardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({...defaultPageInfo})
  const [filterQuery, setFilterQuery] = useState({});
  const isPopState = useRef(false);

   // 쿼리스트링을 만들어주는 함수
  const makeQueryString = (params) => {
    const esc = encodeURIComponent;
    return (
      "?" +
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => esc(k) + "=" + esc(v))
        .join("&")
    );
  };

  const createParams = () => {
    let page = pageInfo.page ?? 0;
    page = Math.min(page, pageInfo.totalPage);
    return { 
      ...filterQuery,
      page,
      size: defaultPageInfo.size,
    };
  };

  useEffect(() => {
    // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
    const handlePopOrInit = () => {
      isPopState.current = true;
      const params = parseQueryString(window.location.search);
      const page = params.page ? Number(params.page) : 0;
      const size = params.size ? Number(params.size) : defaultPageInfo.size;
      delete params.page;
      delete params.size;
      setFilterQuery(params);
      setPageInfo((prev) => ({
        ...prev,
        page,
        size,
      }));
    };

    // 최초 마운트 시 실행
    handlePopOrInit();

    // popstate 이벤트 등록
    window.addEventListener("popstate", handlePopOrInit);
    return () => window.removeEventListener("popstate", handlePopOrInit);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchCardList() {
      const params = createParams()
      const res = await getPokemonCardList(params);
      if (res && res.data.content) {
        let result = parsingData(res, pageInfo);
        // popstate로 인한 상태 변경이 아니면 pushState
        if (!isPopState.current) {
          const queryString = makeQueryString(params);
          window.history.pushState(null, "", queryString);
        }
        isPopState.current = false; // 항상 리셋
        setCardList(result);
      } else {
        setCardList([]);
      }
    }

    fetchCardList();
  }, [filterQuery, pageInfo.page]);

  return (
    <>
      <CardFilter onFilter={(query) => { 
        setFilterQuery(query); 
        setPageInfo(pre => ({...pre, page: 0}))
      }} />
      <CardList cardList={cardList} CardComponent={PokemonCard} />
      <CardPagination pageInfo={pageInfo} onPageInfo={page => setPageInfo((pre) => ({...pre, page}))} />
    </>
  );
}
