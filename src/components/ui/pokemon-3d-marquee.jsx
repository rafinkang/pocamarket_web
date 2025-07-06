"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { POKEMON_CARD } from "@/constants/path";
import Link from "next/link";

export const PokemonThreeDMarquee = ({
  images,
  className
}) => {
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
              x: [0, -2000], // 오른쪽에서 왼쪽으로 이동
            }}
            transition={{
              duration: 30, // 30초에 한 바퀴
              repeat: Infinity,
              ease: "linear", // 일정한 속도
            }}
            className="flex items-center gap-8 h-full"
            style={{
              width: 'max-content', // 콘텐츠 크기에 맞춤
            }}
          >
            {/* 카드들을 두 번 렌더링하여 무한 루프 효과 */}
            {[...images, ...images].map((image, index) => {
              return (
                <motion.div
                  key={index + image + 'marquee'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (index % images.length) * 0.1, 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="flex-shrink-0"
                >
                  <Link href={`${POKEMON_CARD}/${image}`}>
                    <motion.img
                      whileHover={{
                        scale: 1.1, // 호버 시 확대
                        y: -10, // 위로 살짝 올리기
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)", // 그림자 효과
                      }}
                      whileTap={{
                        scale: 1.05, // 클릭 시 살짝 축소
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      src={`/EXcards/${image}.webp`}
                      alt={`Image ${index + 1}`}
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
