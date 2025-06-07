"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { S3_IMAGES_BASE_URL } from '@/constants/config'; // @/는 절대경로 설정 시 사용


export default function PokemonCard({ data }) {
  return (
    <a
      href={`/pokemon-card/${data?.code ? data.code : "a1-001"}`}
      className="no-underline block w-[300px] h-[auto] my-2 bg-[#f8f9fa] shadow-lg"
    >
      <Card className="flex flex-col items-center rounded-[12px] py-0 gap-0 overflow-hidden">
        <CardHeader className="p-0 w-full">
          <div className="relative w-full h-[400px]">
            <Image
              className="rounded-[12px]"
              src={`${S3_IMAGES_BASE_URL}/${data?.code ? data.code : "a1-001"}.webp`}
              alt="Pokemon Card"
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
              priority
            />
          </div>
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
    </a>
  );
}
