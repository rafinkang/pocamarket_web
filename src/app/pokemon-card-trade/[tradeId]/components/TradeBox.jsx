"use client";

import { Card, CardContent } from "@/components/ui/card";
import PokemonCard from "@/components/list/PokemonCard";
import { RiArrowLeftRightFill } from 'react-icons/ri';
import { useAnimationControls, motion } from "framer-motion";

export default function TradeCard({}) {
  const offerCard = { code: "a1-001" };
  const wantCards = [{ code: "a1-002" }, { code: "a1-003" }, { code: "a1-004" }];

  const FlippableCard = ({ data, cardKey }) => {
    const controls = useAnimationControls();

    const containerVariants = {
      initial: { rotateY: 0, scale: 1 },
      hover: { rotateY: 360, scale: 1.1 },
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
        transition: { duration: 0.2, ease: "easeOut", delay: 0.7 } 
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
          width: "20vw",
          maxWidth: "200px",
          cursor: "pointer",
        }}
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
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* 카드 앞면 (자신의 투명도만 제어) */}
          <motion.div
            className="absolute w-full h-full"
            style={{ backfaceVisibility: "hidden" }}
            animate={controls}
            variants={faceVariants}
            initial="initial"
            transition={{ duration: 0.7, ease: "easeInOut" }}
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
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <img
              src="/images/cardback.webp"
              alt="Card Back"
              className="w-full h-full object-cover rounded-xl [backface-visibility:hidden]"
            />
          </motion.div>
        </motion.div>

        {/* '교환 신청' 버튼 오버레이 */}
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transform: "translateZ(1px)" }}
          animate={controls}
          variants={buttonVariants}
          initial="hidden"
        >
          <button className="px-6 py-2 bg-sky-500 text-white font-bold rounded-full shadow-lg">
            교환 신청
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Card className="shadow-none">
      <CardContent
        className="flex justify-center items-center w-full gap-4 h-64"
        style={{ perspective: "1200px" }}
      >
        <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
          <PokemonCard data={offerCard} showInfo={false} />
        </div>

        <RiArrowLeftRightFill size="50px" />

        {wantCards.map(card => (
          <FlippableCard key={card.code} cardKey={card.code} data={card} />
        ))}
      </CardContent>
    </Card>
  );
}