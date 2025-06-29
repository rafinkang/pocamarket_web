// import CardListPage from "./components/CardListPage"
import CardListContainer from "./components/CardListContainer"
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: '포켓몬 카드 목록',
  description: '포켓몬 카드를 검색 할 수 있습니다.',
  keywords: ["포켓몬 목록", "포켓몬 검색", ...siteConfig.keywords],
}

export default function PokemonCardPage() {
  return (
    <>
      <div id="pokemonCardList" className="w-[100%] flex flex-col gap-6">
        <CardListContainer />
        {/* <CardListPage /> */}
      </div>
    </>
  );
}
