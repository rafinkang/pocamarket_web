"use client";

import { useTrade } from "./TradeProvider";
import Image from "next/image";
import { S3_IMAGES_BASE_URL } from "@/constants/config";

export default function SelectedCard({ code = null, name = null, type }) {
  const { activeCard } = useTrade();
  const subject = type === "my" ? "내가 가진 카드" : "원하는 카드";
  const isActive = activeCard === type;

  let isError = false;

  const handleSelectCard = (type, card, index = null) => {
    // setSelectedCardInfo((prev) => {
    //   if (type === "my") {
    //     return { ...prev, my: card }
    //   } else if (type === "your" && index !== null) {
    //     const newYour = [...prev.your]
    //     newYour[index] = card
    //     return { ...prev, your: newYour }
    //   }
    //   return prev
    // })
  }

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
                src={code 
                  ? `${S3_IMAGES_BASE_URL}/${code}.webp`
                  : "/images/cardback.webp"}
                alt="Pokemon Card"
                fill
                sizes="(max-width: 400px) 100vw, 400px"
                style={{ objectFit: "contain" }}
                priority={true} // lazy 로딩중에서 빨리 로드 되게 하고 싶은 옵션 (첫 화면에 출력 되는 이미지)
                onError={() => (isError = true)}
              />
            )}
          </div>
          <p>{name || "선택된 카드 없음"}</p>
        </div>
      </div>
    </>
  );
}
