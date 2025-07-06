"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { POKEMON_CARD } from "@/constants/path";
import Link from "next/link";

export const PokemonThreeDMarquee = ({
  images,
  className
}) => {
  // 앞 10개 이미지만 사용
  const displayImages = images.slice(0, 10);
  
  // 카드 하나의 너비 + 간격 (250px + 32px)
  const cardWidth = 282;
  // 전체 카드들의 총 너비
  const totalWidth = displayImages.length * cardWidth;

  return (
    <div
      className={cn(
        "mx-auto block overflow-hidden rounded-2xl",
        // 뷰포트 높이에 맞춰 동적 높이 조절
        // 헤더(4rem) + 여백을 고려하여 조절
        "h-[calc(100vh-20rem)] min-h-[400px] max-h-[600px]",
        // 모바일에서는 더 작게
        "max-sm:h-[calc(100vh-16rem)] max-sm:min-h-[300px] max-sm:max-h-[400px]",
        className
      )}>
      <div className="flex size-full items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          {/* 좌우 마퀴 애니메이션 컨테이너 */}
          <motion.div
            animate={{
              x: [0, -totalWidth], // 0에서 시작해서 totalWidth만큼 이동 (끊김 없는 루프)
            }}
            transition={{
              duration: displayImages.length * 4, // 더 천천히
              repeat: Infinity,
              ease: "linear", // 일정한 속도
              repeatType: "loop", // 끝나면 즉시 처음 위치로
            }}
            className="flex items-center gap-8 h-full"
            style={{
              width: 'max-content', // 콘텐츠 크기에 맞춤
            }}
          >
            {/* 끊김 없는 루프를 위해 두 번 렌더링 */}
            {[...displayImages, ...displayImages].map((image, index) => {
              const actualIndex = index % displayImages.length;
              
              return (
                <motion.div
                  key={index + image + 'loop'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ 
                    delay: actualIndex * 0.1, 
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="flex-shrink-0"
                >
                  <Link href={`${POKEMON_CARD}/${image}`}>
                    <motion.img
                      // 부드러운 곡선 이동과 입체감 효과
                      animate={{
                        // 부드러운 사인 웨이브 곡선 이동 (더 많은 키프레임으로 부드럽게)
                        y: [0, -8, -15, -8, 0, 8, 15, 8, 0],
                        // 부드러운 스케일 변화 (중앙을 지날 때 더 크게)
                        scale: [1, 1.02, 1.04, 1.06, 1.08, 1.06, 1.04, 1.02, 1],
                      }}
                      transition={{
                        duration: 12 + (actualIndex * 0.8), // 각 카드별 다른 속도로 자연스러운 흐름
                        repeat: Infinity,
                        ease: "easeInOut", // 부드러운 가속/감속
                        delay: actualIndex * 0.4, // 카드별 지연 시간
                      }}
                      whileHover={{
                        scale: 1.15, // 호버 시 더 크게 확대
                        y: -15, // 위로 더 올리기
                        boxShadow: "0 25px 50px rgba(0,0,0,0.4)", // 강한 그림자 효과
                        zIndex: 10, // 다른 카드들 위로
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        }
                      }}
                      whileTap={{
                        scale: 1.08, // 클릭 시 살짝 축소
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        }
                      }}
                      src={`/EXcards/${image}.webp`}
                      alt={`Pokemon Card ${actualIndex + 1}`}
                      loading="lazy" // Lazy loading 적용
                      className="aspect-[366/512] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl w-[250px] 
                        transform-gpu will-change-transform cursor-pointer 
                        transition-all duration-300 ease-out"
                      width={250}
                      height={350} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "200px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};

const GridLineVertical = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "150px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};
