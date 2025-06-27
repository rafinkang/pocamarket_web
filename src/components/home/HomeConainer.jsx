"use client"
// components
import Image from "next/image";
import ImageCarousel from "@/components/carousel/ImageCarousel.jsx";
import { PokemonThreeDMarquee } from "@/components/ui/pokemon-3d-marquee.jsx";
import { useEffect, useState } from "react";

/**
 * EXcards 폴더의 모든 이미지 파일명을 동적으로 생성하는 함수
 * @returns {string[]} 이미지 경로 배열
 */
const generateEXCardImages = () => {
  const imageFiles = [
    `a1-251`,
    `a1-252`,
    `a1-253`,
    `a1-254`,
    `a1-255`,
    `a1-256`,
    `a1-257`,
    `a1-258`,
    `a1-259`,
    `a1-260`,
    `a1-261`,
    `a1-262`,
    `a1-263`,
    `a1-264`,
    `a1-265`,
    `a1-274`,
    `a1-275`,
    `a1-284`,
    `a1-285`,
    `a1-286`,
    `a1-276`,
    `a1-277`,
    `a1-278`,
    `a1-279`,
    `a1-280`,
    `a1-281`,
    `a1-282`,
    `a1-283`,
    `a1a-075`,
    `a1a-076`,
    `a1a-077`,
    `a1a-078`,
    `a1a-079`,
    `a1a-083`,
    `a1a-084`,
    `a1a-085`,
    `a1a-086`,
    `a2-180`,
    `a2-181`,
    `a2-182`,
    `a2-183`,
    `a2-184`,
    `a2-185`,
    `a2-186`,
    `a2-187`,
    `a2-188`,
    `a2-189`,
    `a2-198`,
    `a2-199`,
    `a2-200`,
    `a2-201`,
    `a2-202`,
    `a2-203`,
    `a2-204`,
    `a2-205`,
    `a2-206`,
    `a2-207`,
  ];;
  
  return imageFiles.map(fileName => `${fileName}`);
};

/**
 * 배열을 랜덤하게 셔플하는 함수 (Fisher-Yates 알고리즘)
 * @param {Array} array 셔플할 배열
 * @returns {Array} 셔플된 새로운 배열
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
};

export default function HomeContainer() {
  const [isClient, setIsClient] = useState(false);
  const [randomizedImages, setRandomizedImages] = useState([]);
  
  const images = ["/next.svg", "/next.svg", "/next.svg", "/next.svg", "/next.svg"];

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 이미지를 랜덤하게 정렬
    const exImages = generateEXCardImages();
    const shuffledImages = shuffleArray(exImages);
    setRandomizedImages(shuffledImages);
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="w-full">
        {isClient && <PokemonThreeDMarquee images={randomizedImages} />}
        
        <ImageCarousel images={images} className="w-full max-h-[220px]" />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
    </>
  )
}