"use client";

import PokemonCardDetail from "@/components/pokemon/PokemonCardDetail";

// 스타일 객체
const styles = {
  // 페이지 구조
  pageTitle: "mb-4 text-2xl font-bold text-gray-800",
};

/**
 * 포켓몬 카드 상세 정보 페이지의 메인 컴포넌트
 */
export default function CardInfo({ data }) {
  return (
    <>
      <h1 className={styles.pageTitle}>카드 정보</h1>
      <PokemonCardDetail
        data={data}
        showCardCode={true}
      />
    </>
  );
}
