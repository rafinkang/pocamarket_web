"use client";

import Link from "next/link";
import PokemonCard from "@/components/list/PokemonCard";

/**
 * 포켓몬 카드 요소 컴포넌트
 * @param {Object} data - 카드 데이터
 * @param {boolean} priority - 이미지 우선 로딩 여부
 * @param {boolean} testMode - 테스트 모드 여부
 * @returns {JSX.Element} 포켓몬 카드 요소 컴포넌트
 */
export default function CardElement({
  data,
  priority = false,
  testMode = true,
}) {
  const cardCode = data?.code ? data.code : "a1-001";

  return (
    <Link
      href={`/pokemon-card/${cardCode}`}
      className="no-underline w-full block hover:scale-105 transition-transform"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </Link>
  );
}
