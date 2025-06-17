"use client";

import { getPokemonCardList } from "@/api/pokemon-card";
import {
  formSchema,
  defaultFilter,
  type,
  subtype,
  packSet,
  pack,
} from "@/constants/pokemonCardFilter";

import CardListContainer from "@/components/list/CardListContainer";
import CardSearch from "@/components/search/CardSearch";
import CardList from "@/components/list/CardList";
import CardElement from "./CardElement";
import CommonPagination from "@/components/pagination/Pagination";
import SelectBoxOption from "@/components/search/option/SelectBoxOption";

const parsingData = (res, setPage, setTotalPage, setTotalCount) => {
  const data = res.data;
  setPage(data?.number ?? 0);
  setTotalPage(data?.totalPages ?? 1);
  setTotalCount(data.totalElements ?? 0);
  if (!data.content || !Array.isArray(data.content)) {
    console.error("Invalid card list format:", data.content);
    return [];
  }
  return data.content;
};

export default function PokemonCardList({
  placeholder = "내가 가진 카드",
  itemComponent = CardElement,
  onCardClick,
}) {
  return (
    <CardListContainer
      fetchList={getPokemonCardList}
      parseData={parsingData}
      SearchComponent={(props) => (
        <CardSearch
          {...props}
          formSchema={formSchema}
          defaultValues={defaultFilter}
          isDefaulFilter={false}
          placeholder={placeholder}
          selectOptions={[
            {
              fieldName: "type",
              labelValue: "카드 타입",
              eachList: type,
              Component: SelectBoxOption,
              resetField: "subtype",
            },
            {
              fieldName: "subtype",
              labelValue: "세부 타입",
              eachList: subtype,
              Component: SelectBoxOption,
              parentField: "type",
            },
            {
              fieldName: "packSet",
              labelValue: "확장팩",
              eachList: packSet,
              Component: SelectBoxOption,
              resetField: "pack",
            },
            {
              fieldName: "pack",
              labelValue: "팩",
              eachList: pack,
              Component: SelectBoxOption,
              parentField: "packSet",
            },
          ]}
        />
      )}
      ListComponent={(props) => (
        <CardList
          {...props}
          ItemComponent={itemComponent}
          onItemClick={onCardClick}
        />
      )}
      PaginationComponent={CommonPagination}
      pageSize={10}
    />
  );
}
