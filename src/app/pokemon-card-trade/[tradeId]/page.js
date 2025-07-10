import { getTcgTradeDetail } from "@/api/tcgTrade";
import { createMetadata } from "@/lib/metadata";
import { cache } from "react";
import TradePageClient from "./components/TradePageClient";

const getCachedTcgTradeDetail = cache(async (tradeId) => {
  return await getTcgTradeDetail(tradeId);
});

export async function generateMetadata({ params }) {
  try {
    const { tradeId } = await params;
    const tradeDetail = await getCachedTcgTradeDetail(tradeId);

    return createMetadata({
      title: `${tradeDetail.data.myCard.nameKo} 카드 교환`,
      description: `포켓몬 ${tradeDetail.data.myCard.nameKo} 카드 교환 페이지입니다.`,
      path: `/pokemon-card-trade/${tradeId}`,
      keywords: ["포켓몬 카드 교환", `${tradeDetail.data.myCard.nameKo} 교환`, `${tradeDetail.data.myCard.nameKo} 교환 상세`]
    });

  } catch (error) {
    console.error("generateMetadata 오류:", error);
    return {
      title: '포켓몬 카드 교환글 상세',
      description: '작성한 포켓몬 카드 교환글을 상세 조회합니다.',
    };
  }
}

export default async function PokemonCardTrade({ params }) {
  const { tradeId } = await params;
  const tradeDetail = await getCachedTcgTradeDetail(tradeId);

  return (<TradePageClient tradeId={tradeId} tradeDetail={tradeDetail} />);
}