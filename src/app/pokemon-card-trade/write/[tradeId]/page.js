import WriteContainer from "../components/WriteContainer";
import { createMetadata } from "@/lib/metadata";


export async function generateMetadata({ params }) {
  try {
    const { tradeId } = await params;

    return createMetadata({
      title: '포켓몬 카드 교환글 수정',
      description: '작성한 포켓몬 카드 교환글을 수정합니다.',
      path: `/pokemon-card-trade/write/${tradeId}`,
      keywords: ["포켓몬 카드 교환", "포켓몬 카드 교환글 수정"]
    });

  } catch (error) {
    console.error("generateMetadata 오류:", error);
    return {
      title: '포켓몬 카드 교환글 수정',
      description: '작성한 포켓몬 카드 교환글을 수정합니다.',
    };
  }
}

export default async function TradeUpdatePage({ params }) {
  const { tradeId } = await params;

  return (
    <WriteContainer tradeId={tradeId} />
  );
}
