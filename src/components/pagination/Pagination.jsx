"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";


export default function CommonPagination({
  page = 1,
  totalPage = 1,
  itemSize = 10,
  mobileItemSize = 5,
  switchWindowWidth = 640,
  onPageChange,
}) {
  // pageInfo.page는 1부터 시작, 프론트에서도 1부터 보여줌
  const currentPage = (page ?? 1);
  const totalPages = totalPage ?? 1;
  const [visiblePageNumbers, setVisiblePageNumbers] = useState(itemSize);

  useEffect(() => {
    // 윈도우 크기에 따라 표시할 페이지 번호 개수를 업데이트하는 함수
    const updateVisiblePageNumbers = () => {
      if (window.innerWidth < switchWindowWidth) {
        // 예를 들어, 640px보다 작으면 (모바일)
        setVisiblePageNumbers(mobileItemSize);
      } else {
        // 그 외 (데스크탑)
        setVisiblePageNumbers(itemSize);
      }
    };

    // 컴포넌트 마운트 시 초기 설정
    updateVisiblePageNumbers();

    // 윈도우 리사이즈 이벤트에 리스너 추가
    window.addEventListener("resize", updateVisiblePageNumbers);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateVisiblePageNumbers);
  }, []); // 빈 의존성 배열로 한 번만 실행

  let startPage = Math.max(1, currentPage - Math.floor(visiblePageNumbers / 2));
  let endPage = startPage + visiblePageNumbers - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePageNumbers + 1);
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
    onPageChange && onPageChange(page);
  };

  return (
    <div id="cardListPagination">
      <Pagination>
        <PaginationContent>
          {/* 이전 페이지 */}
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${
                  currentPage - visiblePageNumbers > 1
                    ? currentPage - visiblePageNumbers
                    : 1
                }`}
                onClick={(e) =>
                  handlePageChange(
                    currentPage - visiblePageNumbers > 1
                      ? currentPage - visiblePageNumbers
                      : 1,
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
                href={`?page=${page}`}
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
                href={`?page=${
                  currentPage + visiblePageNumbers < totalPages
                    ? currentPage + visiblePageNumbers
                    : totalPages
                }`}
                onClick={(e) =>
                  handlePageChange(
                    currentPage + visiblePageNumbers < totalPages
                      ? currentPage + visiblePageNumbers
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
