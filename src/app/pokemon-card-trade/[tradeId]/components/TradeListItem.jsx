"use client"

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import PokemonCard from "@/components/list/PokemonCard";
import { getTradeRequestStatusName } from "@/constants/tradeRequestStatus";

export default function TradeItem ({id, card, isActiveCard, disabled, handleClick}) {
  const activeClass = "bg-blue-500 text-white dark:bg-blue-600"

  return (
    <motion.div
      layoutId={`card-${card.id}-${id}`}
      key={`card-${card.id}-${id}`}
      onClick={() => handleClick(card)}
      style={{ zIndex: 1 }}
      className="p-4 flex flex-col md:flex-row justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer border-b"
    >
      <div className="flex gap-4 flex-col md:flex-row">
        <motion.div 
          layoutId={`image-${card.code}-${card.id}-${id}`} 
          className="flex justify-center items-center"
        >
          <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "80px" }}>
            <PokemonCard data={{code : card.code}} showInfo={false} className="relative aspect-[366/512]" />
          </div>
        </motion.div>
        <div className="">
          <motion.h3
            layoutId={`code-${card.id}-${id}`}
            style={{ zIndex: 1 }}
            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
            {/* {card.title} */}
            <Badge variant="secondary" className={cn(isActiveCard && activeClass)}>{getTradeRequestStatusName(card.status)}</Badge>
          </motion.h3>
          <motion.p
            layoutId={`description-${card.description}-${card.id}-${id}`}
            style={{ zIndex: 1 }}
            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
              {card.description}
          </motion.p>
        </div>
      </div>
      {/* <motion.button
        layoutId={`button-${card.id}-${id}`}
        className="mt-1 px-3 text-xs rounded-full font-bold h-[24px]" 
        style={{backgroundColor: '#f1f3f3', color: '#404949'}}
        whileHover={{backgroundColor: "#e8ecec", color: "#253131", cursor: 'pointer'}}
        disabled={disabled}
      >
        자세히 보기
      </motion.button> */}
    </motion.div>
    )
}