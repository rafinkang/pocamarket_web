import { siteConfig } from "@/config/siteConfig";

/**
 * 페이지별 메타데이터를 간단하게 생성하는 유틸리티 함수
 * @param {Object} options - 메타데이터 옵션
 * @param {string} options.title - 페이지 제목 (자동으로 "제목 | 사이트명" 형태로 생성됨)
 * @param {string} options.description - 페이지 설명 (선택사항, 기본값: siteConfig.description)
 * @param {string} options.path - 페이지 경로 (선택사항, URL 생성용)
 * @param {string[]} options.keywords - 추가 키워드 (선택사항, 기본 키워드에 추가됨)
 * @param {string} options.ogImage - OG 이미지 URL (선택사항, 기본값: siteConfig.ogImage)
 * @param {Object} options.openGraph - 추가 OpenGraph 설정 (선택사항)
 * @param {Object} options.twitter - 추가 Twitter 설정 (선택사항)
 * @returns {Object} Next.js 메타데이터 객체
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = '',
  keywords = [],
  ogImage = siteConfig.ogImage,
  openGraph = {},
  twitter = {}
}) {
  // 기본 키워드와 추가 키워드 병합
  const allKeywords = [...siteConfig.keywords, ...keywords];

  // 전체 URL 생성
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [
        {
          url: ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.ogImageAlt,
        },
      ],
      type: 'website',
      ...openGraph // 추가 OpenGraph 설정 병합
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      ...twitter // 추가 Twitter 설정 병합
    },
  };
}

/**
 * 더 간단한 메타데이터 생성 함수 (제목과 설명만 제공)
 * @param {string} title - 페이지 제목
 * @param {string} description - 페이지 설명
 * @param {string} path - 페이지 경로 (선택사항)
 * @returns {Object} Next.js 메타데이터 객체
 */
export function simpleMetadata(title, description, path = '') {
  return createMetadata({ title, description, path });
}

export const defaultMetadata = {
  // title.template을 사용하면 각 페이지의 제목을 손쉽게 커스텀할 수 있습니다.
  title: {
    default: siteConfig.title, // 기본 제목 (홈페이지 등)
    template: `%s | ${siteConfig.title}`, // 각 페이지 제목 형식. %s에 페이지 제목이 들어감
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url), // 상대 경로의 기준 URL 설정
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
  },
}