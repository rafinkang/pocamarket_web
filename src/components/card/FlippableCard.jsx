"use client"

import PokemonCard from "@/components/list/PokemonCard";
import { useAnimationControls, motion } from "framer-motion";

export default function FlippableCard ({ data, cardKey, rotateY = 360, duration = 0.7, hideBtn, btnName = "확인", btnColor = "#2B7FFF", btnTextColor = "#fff", width = "20vw", maxWidth = "200px", handleClick = () => {} }) {
  const controls = useAnimationControls();

  const containerVariants = {
    initial: { rotateY: 0, scale: 1 },
    hover: { rotateY: rotateY, scale: 1.1 },
  };

  const faceVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0.4 },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.15, ease: "easeOut" } 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2, ease: "easeOut", delay: duration } 
    },
  };

  const handleHoverStart = async () => {
    controls.start("hover");
    controls.start("visible");
  };

  const handleHoverEnd = async () => {
    controls.start("hidden");
    controls.start("initial");
  };

  return (
    <motion.div
      key={cardKey}
      className="relative aspect-[366/512]"
      style={{
        width: width,
        maxWidth: maxWidth,
        cursor: "pointer",
      }}
      onClick={() => handleClick(data)} 
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* 3. 회전/확대만 담당하는 컨테이너 */}
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={controls}
        variants={containerVariants}
        initial="initial"
        transition={{ duration: duration, ease: "easeInOut" }}
      >
        {/* 카드 앞면 (자신의 투명도만 제어) */}
        <motion.div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
          animate={controls}
          variants={faceVariants}
          initial="initial"
          transition={{ duration: duration, ease: "easeInOut" }}
        >
          <PokemonCard 
            data={data} 
            showInfo={false}
            className="[backface-visibility:hidden]"
          />
        </motion.div>

        {/* 카드 뒷면 (자신의 투명도만 제어) */}
        <motion.div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          animate={controls}
          variants={faceVariants}
          initial="initial"
          transition={{ duration: duration, ease: "easeInOut" }}
        >
          <img
            src="/images/cardback.webp"
            alt="Card Back"
            className="w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
          />
        </motion.div>
      </motion.div>

      {/* '교환 신청' 버튼 오버레이 */}
      {/* pointer-events-none : 모든 마우스 이벤트 무시 */}
      {/* pointer-events-auto : 일부 엘리먼트의 이벤트를 정상적으로 작동하길 원한다면 해당 엘리먼트 class에 pointer-events-auto 추가*/}
      {!hideBtn && 
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transform: "translateZ(1px)" }}
          animate={controls}
          variants={buttonVariants}
          initial="hidden"
        >
          <button className="px-6 py-2 font-bold rounded-full shadow-lg" style={{backgroundColor: btnColor, color: btnTextColor}}>
            {btnName}
          </button>
        </motion.div>
      }
    </motion.div>
  );
};