"use client"

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

export default function TradeItem ({id, card, isActiveCard, disabled, handleClick}) {
  const activeClass = "bg-blue-500 text-white dark:bg-blue-600"

  return (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={() => isActiveCard && handleClick(card)}
      className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl"
      style={{cursor : isActiveCard && 'pointer'}}  
    >
      <div className="flex gap-4 flex-col md:flex-row">
        <motion.div layoutId={`image-${card.title}-${id}`} className="flex justify-center items-center">
          <img
            src="/images/cardback.webp"
            width={100}
            height={100}
            alt="Pokemon Card"
            style={{ objectFit: "contain" }} 
          />
        </motion.div>
        <div className="">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left">
            {card.title}
            <Badge variant="secondary" className={cn(isActiveCard && activeClass)}>{card.status.text}</Badge>
          </motion.h3>
          <motion.p
            layoutId={`description-${card.description}-${id}`}
            className="text-neutral-600 dark:text-neutral-400 text-center md:text-left">
            {card.description}
          </motion.p>
        </div>
      </div>
      {card.ctaText &&
        <motion.button
          layoutId={`button-${card.title}-${id}`}
          className="px-4 py-2 text-sm rounded-full font-bold mt-4 md:mt-0" 
          style={{backgroundColor: '#f1f3f3', color: isActiveCard ? '#000' : '#a3a5ac' }}
          whileHover={() => (isActiveCard ? {backgroundColor: "#1e73be", color: "#fff", cursor: 'pointer'} : {})}
          disabled={disabled}
        >
          {card.ctaText}
        </motion.button>
      }
    </motion.div>
    )
}