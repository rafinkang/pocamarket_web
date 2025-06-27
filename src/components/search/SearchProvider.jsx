"use client";

import { createContext, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SearchContext = createContext();

/**
 * 검색 관련 상태와 로직을 관리하는 Provider
 * - formSchema: zod 스키마
 * - defaultValues: 폼 기본값
 * - checkOptions: 체크박스 옵션 정보
 */
export function SearchProvider({ children, formSchema, defaultValues, checkOptions = [] }) {
  const [isDetailFilter, setIsDetailFilter] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 필터 초기화
  const handleReset = () => {
    form.reset({ ...defaultValues });
    checkOptions.forEach((v) => {
      form.setValue(v.fieldName, []);
    });
  };

  const value = {
    form,
    isDetailFilter,
    setIsDetailFilter,
    handleReset,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}; 