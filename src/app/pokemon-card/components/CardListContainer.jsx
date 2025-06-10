"use client";

import { useState, useEffect, useRef } from "react";
import CardFilter from "./CardFilter";
import CardList from "./CardList";
import CardSort from "./CardSort";
import PokemonCard from "./PokemonCard";

import { getPokemonCardList } from "@/api/pokemon-card";
import CommonPagination from "../../../components/pagination/Pagination";
import { parseQueryString, makeQueryString } from "@/utils/queryString";

const parsingData = (res, setPage, setTotalPage, setTotalCount) => {
  const data = res.data;

  // pageable 정보 설정
  setPage(data?.number ?? 0);
  setTotalPage(data?.totalPages ?? 1);
  setTotalCount(data.totalElements ?? 0);

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

export default function CardListContainer() {
  const [cardList, setCardList] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 10;

  const [sortInfo, setSortInfo] = useState("code");
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
    setCardList([]);
    setTotalCount(0);
    setPage(0);
    setTotalPage(1);
    setSort("code");
  };

  useEffect(() => {
    // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
    const handlePopOrInit = () => {
      isPopState.current = true;
      const params = parseQueryString(window.location.search);
      const page = params.page ? Number(params.page) : 0;
      // const size = params.size ? Number(params.size) : pageSize;
      delete params.page;
      delete params.size;
      setFilterQuery(params);
      setPage(page);
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
      const params = createParams();
      try {
        const res = await getPokemonCardList(params);

        if (res && res.data.content) {
          let result = parsingData(res, setPage, setTotalPage, setTotalCount);
          // popstate로 인한 상태 변경이 아니면 pushState
          if (!isPopState.current) {
            const queryString = makeQueryString(params);
            window.history.pushState(null, "", queryString);
          }
          isPopState.current = false; // 항상 리셋
          setCardList(result);
        } else {
          throw new Error("CONTENT_UNDEFINED");
        }
      } catch (error) {
        reset();
      }
    }

    fetchCardList();
  }, [filterQuery, page, sortInfo]);

  return (
    <>
      <CardFilter
        onFilter={(query) => {
          setFilterQuery(query);
          setPage(0);
        }}
      />
      <CardSort
        totalCount={totalCount}
        sortInfo={sortInfo}
        onSortInfo={setSortInfo}
      />
      <CardList cardList={cardList} CardComponent={PokemonCard} />
      <CommonPagination
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
      />
    </>
  );
}
