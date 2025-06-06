"use client";
import { useState, useEffect } from "react";

import CardFilter from "./components/CardFilter";
import CardList from "./components/CardList";
import PokemonCard from "./components/PokemonCard";

import { getPokemonCardList } from "@/api/pokemon-card";
import { defaultPageable } from "@/constants/pokemonCardFilter";

const parsingData = (res, pageable) => {
  // erorr 검사
  if (!res.success && res.errorCode == null && res.data == null) {
    console.error("Failed to fetch card list:", res.message);
    return [];
  }

  const data = res.data;

  // pageable 정보 설정 
  pageable.page = data.pageable.offset;
  pageable.size = data.size;
  pageable.isLast = data.last;
  pageable.totalPage = data.totalPage;

  // content가 없거나 배열이 아닌 경우
  if (!data.content || !Array.isArray(data.content)) {
    console.error("Invalid card list format:", data.content);
    return [];
  }

  // Content 정보 추출
  const list = []
  data.content.forEach((card) => {
    list.push(card);
  });

  return list;
};

const pageable = { ...defaultPageable };

export default function PokemonCardPage() {
  const [cardList, setCardList] = useState([]);
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    async function fetchCardList() {
      const res = await getPokemonCardList(filterQuery);
      if (res && res.data.content) {
        let result = parsingData(res, pageable);
        setCardList(result);
      } else {
        setCardList([]);
      }
    }

    fetchCardList();
  }, [filterQuery]);

  return (
    <>
      <CardFilter onFilter={setFilterQuery} />
      <CardList cardList={cardList} CardComponent={PokemonCard} />
    </>
  );
}
