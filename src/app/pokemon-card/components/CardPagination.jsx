"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CardPagination({ pageInfo, onPageInfo }) {
  // pageInfo.page는 0부터 시작, 프론트에서는 1부터 보여줌
  const currentPage = (pageInfo?.page ?? 0) + 1;
  const totalPages = pageInfo?.totalPage ?? 1;
  const maxVisible = 9;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page, e) => {
    e.preventDefault();
    // 1보다 작거나, totalPages보다 크면 무시
    if (page < 1 || page > totalPages) return;
    // onPageInfo에 0부터 시작하는 값으로 전달
    onPageInfo && onPageInfo(page - 1);
  };

  return (
    <div id="cardListPagination">
      <Pagination>
        <PaginationContent>
          {/* 이전 페이지 */}
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/pokemon-card?page=${
                  currentPage - maxVisible > 1 ? currentPage - maxVisible : 1
                }`}
                onClick={(e) =>
                  handlePageChange(
                    currentPage - maxVisible > 1 ? currentPage - maxVisible : 1,
                    e
                  )
                }
              />
            </PaginationItem>
          )}

          {/* 페이지 번호 */}
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#" //{`/pokemon-card?page=${page}`}
                onClick={(e) => handlePageChange(page, e)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* 다음 페이지 */}
          {currentPage !== totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/pokemon-card?page=${
                  currentPage + maxVisible < totalPages
                    ? currentPage + maxVisible
                    : totalPages
                }`}
                onClick={(e) =>
                  handlePageChange(
                    currentPage + maxVisible < totalPages
                      ? currentPage + maxVisible
                      : totalPages,
                    e
                  )
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
