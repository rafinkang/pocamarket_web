import { createMetadata } from "@/lib/metadata";
import { Suspense } from 'react';
import CardListPage from "./components/CardListPage";

export const metadata = createMetadata({
  title: '포켓몬 카드 목록',
  description: '포켓몬 카드를 검색 할 수 있습니다.',
  path: '/pokemon-card',
  keywords: ["포켓몬 목록", "포켓몬 검색"]
});

export default function PokemonCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="pokemonCardList" className="w-[100%] flex flex-col gap-6 p-2 md:p-4">
        <h2 className="text-lg font-semibold text-gray-800">포켓몬 카드 DB</h2>
        <CardListPage />
      </div>
    </Suspense>
  );
}
