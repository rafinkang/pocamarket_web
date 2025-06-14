"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
/*
testMode
    ? "/images/cardback.webp"
    : `${S3_IMAGES_BASE_URL}/${
        data?.code ? data.code : "a1-001"
    }.webp`
*/

export default function TradeElement({
  tradeCode = "0",
  tradeUserNickname = "교환자 닉네임",
  myCard = {
    code: "a1-001",
    name: "테스트 마이 카드",
  },
  wantedCards = [
    {
      code: "a1-002",
      name: "테스트 원하는 카드",
    },
  ], // 원하는 카드들의 배열
}) {
  const [isError, setIsError] = useState(false);

  const imageHandleError = () => {
    setIsError(true);
  };

  return (
    <Link href={`/trade/${tradeCode}`} className="w-full h-[100%]">
      <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg w-full mx-auto h-[100%]">
        {/* 내 카드 섹션 */}
        <div className="w-[300px] shrink-0 h-[100%]">
          <div className="w-full h-full bg-[#f8f9fa] shadow-lg">
            <Card className="flex flex-row items-center rounded-[12px] p-4 h-full">
              <div className="relative w-[80px] aspect-[366/512] shrink-0">
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
                    src="/images/cardback.webp"
                    alt="My Pokemon Card"
                    fill
                    sizes="(max-width: 400px) 100vw, 400px"
                    style={{ objectFit: "contain" }}
                    priority={true}
                    onError={imageHandleError}
                  />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-lg font-semibold truncate">
                  {myCard.name}
                </h3>
                <p className="text-gray-600 truncate">
                  {tradeUserNickname}님의 카드
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* 교환 화살표 */}
        <div className="flex items-center px-2">
          <span className="text-2xl">↔</span>
        </div>

        {/* 원하는 카드들 */}
        <div className="flex-1 min-w-0 h-[100%]">
          <div className="flex flex-wrap h-full gap-4">
            {wantedCards.map((card, index) => (
              <div key={index} className="bg-[#f8f9fa] shadow-lg h-full">
                <Card className="flex flex-row items-center rounded-[12px] p-4 h-full">
                  <div className="relative w-[80px] aspect-[366/512] shrink-0">
                    <Image
                      className="rounded-[12px]"
                      src="/images/cardback.webp"
                      alt={`Wanted Pokemon Card ${index + 1}`}
                      fill
                      sizes="(max-width: 400px) 100vw, 400px"
                      style={{ objectFit: "contain" }}
                      onError={imageHandleError}
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-lg font-semibold truncate">
                      {card.name}
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* 교환 정보 */}
        <div className="flex flex-col items-center pl-2">
          <p>교환 등록 날짜</p>
          <p>교환 상태</p>
          <p>교환 요청 건수</p>
        </div>
      </div>
    </Link>
  );
}
