import TradePageClient from "./components/TradePageClient";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  try {
    const { tradeId } = await params;
    console.log("generateMetadata 실행 - tradeId:", tradeId);

    return createMetadata({
      title: '포켓몬 카드 교환글 상세',
      description: '작성한 포켓몬 카드 교환글을 상세 조회합니다.',
      path: `/pokemon-card-trade/${tradeId}`,
      keywords: ["포켓몬 카드 교환", "포켓몬 카드 교환글 상세"]
    });

  } catch (error) {
    console.error("generateMetadata 오류:", error);
    return {
      title: '포켓몬 카드 교환글 상세',
      description: '작성한 포켓몬 카드 교환글을 상세 조회합니다.',
    };
  }
}

export default function PokemonCardTrade() {
  return (<TradePageClient />);
}