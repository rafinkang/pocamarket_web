"use client";

import PokemonCardImage from "./PokemonCardImage";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function PokemonCard({
  data,
  priority = false,
  testMode = false,
}) {
  return (
    <div className="min-w-[200px] max-w-[400px] w-full h-[100%] my-2 bg-[#f8f9fa] shadow-lg">
      <Card className="flex flex-col items-center rounded-[12px] py-0 gap-0">
        <CardHeader className="p-0 w-full">
          <PokemonCardImage
            data={data}
            priority={priority}
            testMode={testMode}
          />
        </CardHeader>
        <CardContent className="w-full flex-1 flex flex-col justify-between">
          <CardTitle>{data?.nameKo ? data.nameKo : "포켓몬 이름"}</CardTitle>
          <CardDescription>
            <p>{data?.type ? data.type : "포켓몬 타입"}</p>
            <p>{data?.packSet ? data.packSet : "확장팩 이름"}</p>
            <p>{data?.rarity ? data.rarity : "희귀도"}</p>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
