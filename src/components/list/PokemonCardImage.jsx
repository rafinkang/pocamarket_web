"use client";

import { useState } from "react";
import Image from "next/image";
import { S3_IMAGES_BASE_URL } from "@/constants/config";

export default function PokemonCardImage({
  data,
  priority = false,
  testMode = false,
}) {
  const [isError, setIsError] = useState(false);

  const imageHandleError = () => {
    setIsError(true);
  };

  return (
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
              : data?.code ? `${S3_IMAGES_BASE_URL}/${data.code}.webp`
                : "/images/cardback.webp"
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
  );
}
