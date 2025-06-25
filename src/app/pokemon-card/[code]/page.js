import { getPokemonCardDetail } from "@/api/pokemon-card";
import CardDetailContainer from "./CardDetailContainer";
import { notFound } from "next/navigation";
import { S3_IMAGES_BASE_URL } from "@/constants/config";
import { cache } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * 캐시된 포켓몬 카드 상세 조회 함수
 * 동일한 code로 여러 번 호출되어도 한 번만 API 요청을 보냅니다.
 */
const getCachedPokemonCardDetail = cache(async (code) => {
  console.log(`API 호출: getPokemonCardDetail(${code})`); // 실제 API 호출 시에만 로그 출력
  return await getPokemonCardDetail(code);
});

/**
 * SEO를 위한 메타데이터 생성 함수
 * @param {Object} params - 라우트 파라미터
 * @returns {Object} 메타데이터 객체
 */
export async function generateMetadata({ params }) {
  try {
    const { code } = await params;
    console.log("generateMetadata 실행 - code:", code);
    
    const res = await getCachedPokemonCardDetail(code);
    console.log("generateMetadata - 데이터 받음:", !!res?.data);

    if (!res?.data) {
      return {
        title: '카드를 찾을 수 없습니다',
        description: '요청하신 포켓몬 카드를 찾을 수 없습니다.',
      };
    }

    const cardData = res.data;
    const cardImageUrl = cardData.code ? `${S3_IMAGES_BASE_URL}/${cardData.code}.webp` : '/images/cardback.webp';

    return {
      title: `${cardData.nameKo || '포켓몬 카드'}`,
      description: `${cardData.nameKo || '포켓몬 카드'} - ${cardData.type || '카드 타입'} | ${cardData.packSet || '확장팩'} | ${cardData.rarity || '희귀도'}`,
      keywords: [
        cardData.nameKo,
        cardData.type,
        cardData.packSet,
        cardData.rarity,
        ...siteConfig.keywords
      ].filter(Boolean).join(', '),
      openGraph: {
        title: `${cardData.nameKo || '포켓몬 카드'}`,
        description: `${cardData.nameKo || '포켓몬 카드'} - ${cardData.type || '카드 타입'} | ${cardData.packSet || '확장팩'}`,
        type: 'website',
        url: `/pokemon-card/${code}`,
        images: [
          {
            url: cardImageUrl,
            width: 366,
            height: 512,
            alt: cardData.nameKo || '포켓몬 카드',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cardData.nameKo || '포켓몬 카드'}`,
        description: `${cardData.nameKo || '포켓몬 카드'} - ${cardData.type || '카드 타입'} | ${cardData.packSet || '확장팩'}`,
        image: cardImageUrl,
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);
    return {
      title: '포켓몬 카드',
      description: '포켓몬 카드 상세 정보를 확인해보세요.',
    };
  }
}

/**
 * 포켓몬 카드 상세 페이지 컴포넌트
 * @param {Object} params - 라우트 파라미터
 * @returns {JSX.Element} 카드 상세 페이지
 */
export default async function PokemonCardDetailPage({ params }) {
  try {
    const { code } = await params;
    console.log("PokemonCardDetailPage 실행 - code:", code);
    
    const res = await getCachedPokemonCardDetail(code);
    console.log("data ::: ", res.data)
    console.log("PokemonCardDetailPage - 데이터 받음:", !!res?.data, "(캐시에서 가져옴)");

    if (!res?.data) {
      console.log("카드 데이터를 찾을 수 없음 - notFound 호출");
      return notFound();
    }

    return (
      <>
        <CardDetailContainer data={res.data} />
      </>
    );
  } catch (error) {
    console.error('페이지 로딩 오류:', error);
    return notFound();
  }
}