"use client"

import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"

import PokemonCard from "@/components/list/PokemonCard";

export default function TradeItemDialog({handleClick, active, id, isMy, isLogin}) {
  const ref = useOutsideClick(() => {
    handleClick(null);
  });

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-51" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => handleClick(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden  px-8 py-8">
              <motion.div layoutId={`image-${active.code}-${active.id}-${id}`}>
                <div className="flex justify-center items-center w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg">
                  <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
                    <PokemonCard data={{code : active.code}} showInfo={false} className="relative aspect-[366/512]" />
                  </div>
                </div>
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.span layoutId={`code-${active.code}-${active.id}-${id}`}>
                      <Badge variant="secondary">{active.status.text}</Badge>
                    </motion.span>
                    <motion.p
                      layoutId={`description-${active.description}-${active.id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400">
                      {active.description}
                    </motion.p>
                  </div>

                  {active.ctaText && <motion.a
                      layoutId={`button-${active.code}-${active.id}-${id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                      {active.ctaText}
                    </motion.a>
                  }
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
              {/* TODO 교환 취소인 경우 버튼 숨기기 */}
              {isLogin && (
                <>
                  {isMy && <Button>교환 수락(교환 등록한 사람)</Button>}
                  {!isMy && active.isMy &&<Button variant="outline">교환 취소(요청한 사람)</Button>}
                </>
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};