"use client";

import { useState, useEffect } from "react";
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

export default function CardListContainer() {
  const [cardList, setCardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({...defaultPageInfo})
  const [filterQuery, setFilterQuery] = useState({});

  const createQuery = () => {
    let page = pageInfo.page ?? 0;
    page = Math.min(page, pageInfo.totalPage);
    return { 
      ...filterQuery,
      page,
    };
  };

  useEffect(() => {
    async function fetchCardList() {
      const res = await getPokemonCardList(createQuery());
      if (res && res.data.content) {
        let result = parsingData(res, pageInfo);
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
