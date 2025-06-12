"use client";

import { ListProvider, useList } from "./ListProvider";

/**
 * 공통 리스트 컨테이너 컴포넌트
 * - fetchList: 리스트 데이터를 가져오는 함수 (params) => Promise
 * - parseData: fetch 결과를 파싱하는 함수 (res, setPage, setTotalPage, setTotalCount) => items
 * - SearchComponent: 검색 컴포넌트
 * - SortComponent: 정렬/툴바 컴포넌트
 * - ListComponent: 리스트 컴포넌트
 * - PaginationComponent: 페이지네이션 컴포넌트
 * - pageSize: 페이지당 아이템 수
 */
export default function CardListContainer({
  fetchList,
  parseData,
  SearchComponent,
  SortComponent,
  ListComponent,
  PaginationComponent,
  pageSize = 10,
}) {
  return (
    <ListProvider fetchList={fetchList} parseData={parseData} pageSize={pageSize}>
      <CardListContainerContent
        SearchComponent={SearchComponent}
        SortComponent={SortComponent}
        ListComponent={ListComponent}
        PaginationComponent={PaginationComponent}
      />
    </ListProvider>
  );
}

function CardListContainerContent({
  SearchComponent,
  SortComponent,
  ListComponent,
  PaginationComponent,
}) {
  const {
    items,
    page,
    totalPage,
    sortInfo,
    totalCount,
    setPage,
    setSortInfo,
    setFilterQuery,
  } = useList();

  return (
    <>
      {SearchComponent && (
        <SearchComponent
          onSearch={(query) => {
            setFilterQuery(query);
            setPage(0);
          }}
        />
      )}
      {SortComponent && (
        <SortComponent
          totalCount={totalCount}
          sortInfo={sortInfo}
          onSortInfo={setSortInfo}
        />
      )}
      {ListComponent && <ListComponent items={items} />}
      {PaginationComponent && (
        <PaginationComponent
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
        />
      )}
    </>
  );
} 