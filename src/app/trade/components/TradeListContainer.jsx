"use client";

import { useState, useEffect, useRef } from "react";

// 공용 컴포넌트
import { TradeProvider } from "./TradeProvider";

import TradeSearch from "./TradeSearch";
import TradeList from "./TradeList";

import CardList from "./CardList";

import CommonPagination from "../../../components/pagination/Pagination";
import { parseQueryString, makeQueryString } from "@/utils/queryString";

const parsingData = () => {};

export default function TradeListContainer() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 10;

  const [isCardSearch, setIsCardSearch] = useState(false);
  const [who, setWho] = useState(false);

  const [filterQuery, setFilterQuery] = useState({});
  const [placeholder, setPlaceholder] = useState("내가 원하는 카드");
  const isPopState = useRef(false);

  useEffect(() => {
    // 마운트/새로고침/뒤로가기/앞으로가기 모두 처리
    const handlePopOrInit = () => {
      isPopState.current = true;
      const params = parseQueryString(window.location.search);
      const page = params.page ? Number(params.page) : 0;
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
  }, []);

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

  // useEffect(() => {
  //   async function fetchCardList() {
  //     const params = createParams();
  //     try {
  //       const res = await getPokemonCardList(params);

  //       if (res && res.data.content) {
  //         let result = parsingData(res, setPage, setTotalPage, setTotalCount);
  //         // popstate로 인한 상태 변경이 아니면 pushState
  //         if (!isPopState.current) {
  //           const queryString = makeQueryString(params);
  //           window.history.pushState(null, "", queryString);
  //         }
  //         isPopState.current = false; // 항상 리셋
  //         setCardList(result);
  //       } else {
  //         throw new Error("CONTENT_UNDEFINED");
  //       }
  //     } catch (error) {
  //       reset();
  //     }
  //   }

  //   fetchCardList();
  // }, [page]);

  const onCardButton = (select) => {
    if (who == select) {
      setWho(null);
      setIsCardSearch(false);
    } else {
      setWho(select);
      setIsCardSearch(true);
      setPlaceholder(select == "my" ? "내가 가진 카드" : "원하는 카드");
    }
  };

  return (
    <>
      <TradeProvider>
        <TradeSearch onCardButton={onCardButton} />

        {isCardSearch && (
          <div className="cardWrap">
            <CardList placeholder={placeholder}/>
          </div>
        )}

        <TradeList />
        <CommonPagination
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
        />
      </TradeProvider>
    </>
  );
}
