"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { POKEMON_CARD } from "@/constants/path";
import { S3_IMAGES_BASE_URL } from "@/constants/config"; // @/는 절대경로 설정 시 사용
import { useState } from "react";

export default function PokemonCard({
  showInfo,
  data,
  priority = false,
  testMode = true,
  maxWidth,
  width
}) {
  const [isError, setIsErorr] = useState(false);
  const linkStyle = {
    ...(width && { width: width }),
    ...(maxWidth && { maxWidth: maxWidth }),
  }

  const imageHandleError = () => {
    setIsErorr(true);
  };

  return (
    <a
      href={`${POKEMON_CARD}/${data?.code ? data.code : "a1-001"}`}
      className="no-underline"
      style={linkStyle}
    >
      <Card className="py-1 px-1 border-none shadow-none">
        <div className="relative w-full aspect-[366/512]">
          {isError ? (
            <div className="errorBox">
              <img
                src="/images/cardback.webp"
                alt="errorImg"
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <Image
              src={
                testMode
                  ? "/images/cardback.webp"
                  : `${S3_IMAGES_BASE_URL}/${
                      data?.code ? data.code : "a1-001"
                    }.webp`
              }
              alt="Pokemon Card"
              fill
              style={{ objectFit: "contain" }}
              priority={priority} // lazy 로딩중에서 빨리 로드 되게 하고 싶은 옵션 (첫 화면에 출력 되는 이미지)
              {...(!priority && { loading: "lazy" })}
              onError={imageHandleError}
            />
          )}
        </div>
        {showInfo &&
          <>
            <CardTitle>{data?.nameKo ? data.nameKo : "포켓몬 이름"}</CardTitle>
            <CardContent className="py-0 px-0">
              <CardDescription>
                <p>{data?.type ? data.type : "포켓몬 타입"}</p>
                <p>{data?.packSet ? data.packSet : "확장팩 이름"}</p>
                <p>{data?.rarity ? data.rarity : "희귀도"}</p>
              </CardDescription>
            </CardContent>
          </>
        }
      </Card>
    </a>
  );
}
