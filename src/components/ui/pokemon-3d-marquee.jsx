"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { POKEMON_CARD } from "@/constants/path";
import Link from "next/link";

export const PokemonThreeDMarquee = ({
  images,
  className
}) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  /**
   * 각 컬럼의 총 높이를 계산하는 함수
   * @param {number} imageCount 이미지 개수
   * @returns {number} 총 높이 (px)
   */
  const calculateColumnHeight = (imageCount) => {
    // 원본 사이즈 기준으로 높이 계산 (366/512 비율)
    const imageHeight = 512; // 원본 높이
    const gap = 40; // gap 증가

    return (imageHeight + gap) * imageCount - gap; // 마지막 gap 제외
  };

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
        <div className="shrink-0 w-[1000px] h-[1000px]">
          <div
            style={{
              // transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative grid w-full h-full origin-top-left grid-cols-4 gap-10 transform-3d">
            {chunks.map((subarray, colIndex) => {
              // 각 컬럼의 전체 높이 계산
              const columnHeight = calculateColumnHeight(subarray.length);
              // 카드들을 복제하여 연속적으로 보이게 함
              const duplicatedCards = [...subarray, ...subarray];

              return (
                <motion.div
                  animate={{
                    y: colIndex % 2 === 0 ? [-columnHeight, 0] : [0, -columnHeight]
                  }}
                  transition={{
                    duration: 25 + (subarray.length * 10),
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  key={colIndex + "marquee"}
                  className="flex flex-col items-start gap-10">
                  {/* <GridLineVertical className="-left-4" offset="80px" /> */}
                  {duplicatedCards.map((image, imageIndex) => (
                    <div className="relative" key={imageIndex + image + colIndex}>
                      {/* <GridLineHorizontal className="-top-4" offset="20px" /> */}
                      <Link href={`${POKEMON_CARD}/${image}`}>
                        <motion.img
                          whileHover={{
                            scale: 1.15, // 호버 시 더 크게 확대
                            y: -5, // 위로 더 올리기
                            boxShadow: "0 25px 50px rgba(0,0,0,0.4)", // 강한 그림자 효과
                            zIndex: 10, // 다른 카드들 위로
                            transition: {
                              duration: 0.3,
                              ease: "easeOut",
                            }
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          key={imageIndex + image}
                          src={`/EXcards/${image}.webp`}
                          alt={`Image ${imageIndex + 1}`}
                          className="aspect-[366/512] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl w-[366px]"
                          width={366}
                          height={512} />
                      </Link>

                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
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
