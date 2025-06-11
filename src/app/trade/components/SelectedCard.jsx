"use client";

import { useTrade } from "./TradeProvider";
import Image from "next/image";

/*
testMode
    ? "/images/cardback.webp"
    : `${S3_IMAGES_BASE_URL}/${
        data?.code ? data.code : "a1-001"
    }.webp`
*/

export default function SelectedCard({
  type,
  subject = "내가 가진 카드",
  imgSrc = "/images/cardback.webp",
  cardName = "선택된 카드 없음",
}) {
  const { activeCard } = useTrade();
  const isActive = activeCard === type;

  let isError = false;
  return (
    <>
      <div
        className={`flex flex-col w-full ${
          isActive ? "border-2 border-red-500" : ""
        }`}
      >
        <p>{subject}</p>
        <div className="flex">
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
                src={imgSrc}
                alt="Pokemon Card"
                fill
                sizes="(max-width: 400px) 100vw, 400px"
                style={{ objectFit: "contain" }}
                priority={true} // lazy 로딩중에서 빨리 로드 되게 하고 싶은 옵션 (첫 화면에 출력 되는 이미지)
                onError={() => (isError = true)}
              />
            )}
          </div>
          <p>{cardName}</p>
        </div>
      </div>
    </>
  );
}
