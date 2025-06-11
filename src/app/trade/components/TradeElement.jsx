"use client";

import Image from "next/image";

/*
testMode
    ? "/images/cardback.webp"
    : `${S3_IMAGES_BASE_URL}/${
        data?.code ? data.code : "a1-001"
    }.webp`
*/

export default function TradeElement({
  myCard = {
    code: "",
    cardName: "선택된 카드 없음",
    nickname: "",
  },
  wantedCards = [], // 원하는 카드들의 배열
}) {
  let isError = false;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      {/* 내 카드 섹션 */}
      <div className="flex-1">
        <h3 className="mb-2 font-medium">{myCard.nickname}님의 카드</h3>
        <div className="flex gap-4">
          <div className="relative w-[200px] aspect-[366/512]">
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
                onError={() => (isError = true)}
              />
            )}
          </div>
          <p className="self-center">{myCard.cardName}</p>
        </div>
      </div>

      {/* 교환 화살표 */}
      <div className="flex-none">
        <span className="text-2xl">↔</span>
      </div>

      {/* 원하는 카드들 */}
      <div className="flex-1">
        <h3 className="mb-2 font-medium">원하는 카드들</h3>
        <div className="flex flex-wrap gap-4">
          {wantedCards.map((card, index) => (
            <div key={index} className="flex gap-2">
              <div className="relative w-[120px] aspect-[366/512]">
                <Image
                  className="rounded-[12px]"
                  src={card.imgSrc}
                  alt={`Wanted Pokemon Card ${index + 1}`}
                  fill
                  sizes="(max-width: 400px) 100vw, 400px"
                  style={{ objectFit: "contain" }}
                  onError={() => (isError = true)}
                />
              </div>
              <p className="self-center text-sm">{card.cardName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 교환 신청 버튼 */}
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        교환 신청
      </button>
    </div>
  );
}
