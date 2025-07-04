"use client";

import CardListContainer from "@/components/cardListContainer/CardListContainer";
import { defaultFilter, excludedValue } from "@/constants/pokemonCardFilter";
import { usePathname, useRouter } from "next/navigation";
import CardElement from "./CardElement";

export default function CardListPage() {
  const router = useRouter();
  const pathname = usePathname();

  // URL 업데이트 함수
  const updateURL = (params, options = {}) => {
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (key !== "size" && 
        (key === "page" && value !== 1) &&
        value !== null && 
        value !== undefined && 
        value !== "" && 
        value !== excludedValue && 
        value !== defaultFilter[key]
      ) {
        if (Array.isArray(value) && value.length > 0) {
          urlParams.set(key, value.join(","));
        } else if (!Array.isArray(value)) {
          urlParams.set(key, String(value));
        }
      }
    });

    const queryString = urlParams.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    if (options.replace) {
      router.replace(newUrl, { scroll: false });
    } else {
      router.push(newUrl, { scroll: true });
    }
  };

  return (
    <CardListContainer
      updateURL={updateURL}
      cardElement={(itemProps) => (
        <CardElement 
          {...itemProps}
        />
      )}
      isDetail={true}
      isSort={true}
    />
  );
} 