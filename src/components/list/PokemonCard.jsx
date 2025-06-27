"use client";

import PokemonCardImage from "./PokemonCardImage";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

/**
 * 포켓몬 카드 컴포넌트
 * @param {Object} data - 카드 데이터
 * @param {boolean} priority - 이미지 우선 로딩 여부
 * @param {boolean} testMode - 테스트 모드(카드 이미지 대신 뒷면 이미지 표시) 여부
 * @param {boolean} showInfo - 카드 정보 표시 여부
 * @returns {JSX.Element} 포켓몬 카드 컴포넌트
 */
export default function PokemonCard({
  data,
  priority = false,
  testMode = false,
  showInfo = true,
  ...props
}) {
  return (
    <Card
      className={`flex flex-col items-center py-0 gap-0 max-w-[366px] ${
        !showInfo ? "shadow-none border-none" : ""
      } ${props.className}`}
    >
      <CardHeader className="p-0 gap-0 w-full">
        <PokemonCardImage
          data={data}
          priority={priority}
          testMode={testMode}
          className="w-full h-full object-contain"
        />
      </CardHeader>
      {showInfo && (
        <CardContent className="w-full flex-1 flex flex-col justify-between mt-2">
          <CardTitle>{data?.nameKo ? data.nameKo : "포켓몬 이름"}</CardTitle>
          <CardDescription>
            <p>{data?.type ? data.type : "포켓몬 타입"}</p>
            <p>{data?.packSet ? data.packSet : "확장팩 이름"}</p>
            <p>{data?.rarity ? data.rarity : "희귀도"}</p>
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
}
