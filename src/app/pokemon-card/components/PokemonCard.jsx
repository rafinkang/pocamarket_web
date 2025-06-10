"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { S3_IMAGES_BASE_URL } from "@/constants/config"; // @/는 절대경로 설정 시 사용
import { useState } from "react";

export default function PokemonCard({
  data,
  priority = false,
  testMode = true,
}) {
  const [isError, setIsErorr] = useState(false);

  const imageHandleError = () => {
    setIsErorr(true);
  };

  return (
    <a
      href={`/pokemon-card/${data?.code ? data.code : "a1-001"}`}
      className="no-underline block min-w-[200px] max-w-[400px] w-full h-[100%] my-2 bg-[#f8f9fa] shadow-lg"
    >
      <Card className="flex flex-col items-center rounded-[12px] py-0 gap-0">
        <CardHeader className="p-0 w-full">
          <div className="relative w-full aspect-[366/512]">
            {isError ? (
              <div className="errorBox">
                <img
                  className="rounded-[12px]"
                  src="/images/cardback.webp"
                  alt="errorImg"
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 400px) 100vw, 400px"
                />
              </div>
            ) : (
              <Image
                className="rounded-[12px]"
                src={
                  testMode
                    ? "/images/cardback.webp"
                    : `${S3_IMAGES_BASE_URL}/${
                        data?.code ? data.code : "a1-001"
                      }.webp`
                }
                alt="Pokemon Card"
                fill
                sizes="(max-width: 400px) 100vw, 400px"
                style={{ objectFit: "contain" }}
                priority={priority} // lazy 로딩중에서 빨리 로드 되게 하고 싶은 옵션 (첫 화면에 출력 되는 이미지)
                {...(!priority && { loading: "lazy" })}
                onError={imageHandleError}
              />
            )}
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
