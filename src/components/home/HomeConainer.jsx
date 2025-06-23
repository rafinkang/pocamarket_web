"use client"
// components
import Image from "next/image";
import ImageCarousel from "@/components/carousel/ImageCarousel.jsx";
import { ThreeDMarquee } from "@/components/ui/3d-marquee.jsx";
import { useEffect, useState } from "react";

/**
 * EXcards 폴더의 모든 이미지 파일명을 동적으로 생성하는 함수
 * @returns {string[]} 이미지 경로 배열
 */
const generateEXCardImages = () => {
  const imageFiles = [
    `/Excards/a1-251.webp`,
    `/Excards/a1-252.webp`,
    `/Excards/a1-253.webp`,
    `/Excards/a1-254.webp`,
    `/Excards/a1-255.webp`,
    `/Excards/a1-256.webp`,
    `/Excards/a1-257.webp`,
    `/Excards/a1-258.webp`,
    `/Excards/a1-259.webp`,
    `/Excards/a1-260.webp`,
    `/Excards/a1-261.webp`,
    `/Excards/a1-262.webp`,
    `/Excards/a1-263.webp`,
    `/Excards/a1-264.webp`,
    `/Excards/a1-265.webp`,
    `/Excards/a1-274.webp`,
    `/Excards/a1-275.webp`,

    `/Excards/a1-284.webp`,
    `/Excards/a1-285.webp`,
    `/Excards/a1-286.webp`,

    `/Excards/a1-276.webp`,
    `/Excards/a1-277.webp`,
    `/Excards/a1-278.webp`,
    `/Excards/a1-279.webp`,
    `/Excards/a1-280.webp`,
    `/Excards/a1-281.webp`,
    `/Excards/a1-282.webp`,
    `/Excards/a1-283.webp`,
    

    `/Excards/a1a-075.webp`,
    `/Excards/a1a-076.webp`,
    `/Excards/a1a-077.webp`,
    `/Excards/a1a-078.webp`,
    `/Excards/a1a-079.webp`,
    `/Excards/a1a-083.webp`,
    `/Excards/a1a-084.webp`,
    `/Excards/a1a-085.webp`,
    `/Excards/a1a-086.webp`,

    `/Excards/a2-180.webp`,
    `/Excards/a2-181.webp`,
    `/Excards/a2-182.webp`,
    `/Excards/a2-183.webp`,
    `/Excards/a2-184.webp`,
    `/Excards/a2-185.webp`,
    `/Excards/a2-186.webp`,
    `/Excards/a2-187.webp`,
    `/Excards/a2-188.webp`,
    `/Excards/a2-189.webp`,
    `/Excards/a2-198.webp`,
    `/Excards/a2-199.webp`,
    `/Excards/a2-200.webp`,
    `/Excards/a2-201.webp`,
    `/Excards/a2-202.webp`,
    `/Excards/a2-203.webp`,
    `/Excards/a2-204.webp`,
    `/Excards/a2-205.webp`,
    `/Excards/a2-206.webp`,
    `/Excards/a2-207.webp`,
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
        {isClient && <ThreeDMarquee images={randomizedImages} />}
        
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