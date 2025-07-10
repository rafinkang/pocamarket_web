import CardListPage from "./components/CardListPage"
import { siteConfig } from "@/config/siteConfig";
import { Suspense } from 'react'

export const metadata = {
  title: '포켓몬 카드 목록',
  description: '포켓몬 카드를 검색 할 수 있습니다.',
  keywords: ["포켓몬 목록", "포켓몬 검색", ...siteConfig.keywords],
  openGraph: {
    title: '포켓몬 카드 목록',
    description: '포켓몬 카드를 검색 할 수 있습니다.',
    url: siteConfig.url + '/pokemon-card',
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.ogImageAlt,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '포켓몬 카드 목록',
    description: '포켓몬 카드를 검색 할 수 있습니다.',
    images: [siteConfig.ogImage],
  },
}

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
