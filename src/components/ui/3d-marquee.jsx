"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
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
    // 이미지 높이는 aspect-ratio [366/512]를 기준으로 계산
    // 실제 렌더링 시 width가 약 200px 정도로 설정되므로 높이는 약 280px
    const imageHeight = 280; // 실제 렌더링되는 이미지 높이
    const gap = 32; // gap-8 = 32px
    
    return (imageHeight + gap) * imageCount - gap; // 마지막 gap 제외
  };

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className
      )}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d">
            {chunks.map((subarray, colIndex) => {
              // 각 컬럼의 전체 높이 계산
              const columnHeight = calculateColumnHeight(subarray.length);
              // 애니메이션 범위: 컬럼 높이의 절반 정도로 설정하여 모든 이미지가 보이도록 함
              const animationRange = columnHeight * 0.25;
              
              return (
                <motion.div
                  animate={{ 
                    y: colIndex % 2 === 0 ? animationRange : -animationRange 
                  }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 
                      12 + (subarray.length * 0.5) : // 이미지 개수에 따라 duration 조정
                      15 + (subarray.length * 0.5),
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear", // 일정한 속도로 움직이도록 변경
                  }}
                  key={colIndex + "marquee"}
                  className="flex flex-col items-start gap-8">
                  <GridLineVertical className="-left-4" offset="80px" />
                  {subarray.map((image, imageIndex) => (
                    <div className="relative" key={imageIndex + image}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <motion.img
                        whileHover={{
                          y: -10,
                          scale: 1.05, // 호버 시 약간 확대
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        key={imageIndex + image}
                        src={image}
                        alt={`Image ${imageIndex + 1}`}
                        className="aspect-[366/512] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                        width={366}
                        height={512} />
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
