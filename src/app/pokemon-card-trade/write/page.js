import WriteContainer from "./components/WriteContainer";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: '포켓몬 카드 교환글 등록',
  description: '교환하고 싶은 포켓몬 카드 글을 등록합니다.',
  path: '/pokemon-card-trade/write',
  keywords: ["포켓몬 카드 교환", "포켓몬 카드 교환글 등록"]
});

export default function TradeWritePage() {
  return (
    <WriteContainer />
  );
}
