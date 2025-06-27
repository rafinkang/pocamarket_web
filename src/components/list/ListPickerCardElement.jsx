"use client";

import PokemonCard from "@/components/list/PokemonCard";

export default function CardElement({
  data,
  priority = false,
  testMode = true,
  onSelect,
  onOpenChange,
}) {

  const onClickHandler = () => {
    // 카드 선택 시 상위 컴포넌트로 데이터 전달
    if (onSelect) {
      onSelect(data);
    }
    // 다이얼로그 닫기
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <button
      onClick={onClickHandler}
      className="no-underline block min-w-[200px] max-w-[300px] w-full my-2 bg-[#f8f9fa] shadow-lg hover:bg-[#e9ecef] transition-colors"
    >
      <PokemonCard data={data} priority={priority} testMode={testMode} />
    </button>
  );
}
