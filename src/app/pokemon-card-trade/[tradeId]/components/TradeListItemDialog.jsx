"use client"

import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

import PokemonCard from "@/components/list/PokemonCard";
import { COMPLETE, DELETED, PROCESS, REQUEST } from "@/constants/tradeStatus";
import { useState } from "react";
import TradeReportDialog from "./TradeReportDialog";

export default function TradeListItemDialog({handleClick, active, id, isMy, isLogin, onRequestAccept, onRequestCancel}) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const handleReport = async ({reportReason, reportDetail}) => {
    console.log("신고 사유:", reportReason);
    console.log("상세 내용:", reportDetail);
    console.log("신고 API 호출...");
  }

  const closeButtonProps = {
    layout: true,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.05 } },
    onClick: () => handleClick(null),
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center">
            {/* 모바일용 닫기 버튼 */}
            <motion.button
              {...closeButtonProps}
              key={`button-mobile-${active.id}-${id}`}
              className="flex absolute top-15 right-2 md:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-10"
            >
              <CloseIcon />
            </motion.button>

            {/* 모달 body */}
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              className="relative w-full md:max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden px-8 py-8">
              {/* 데스크탑용 닫기 버튼 */}
              <motion.button
                {...closeButtonProps}
                key={`button-desktop-${active.id}-${id}`}
                className="hidden absolute top-4 right-4 md:flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full h-8 w-8 z-10"
              >
                <CloseIcon />
              </motion.button>

              {/* 카드 */}
              <motion.div layoutId={`image-${active.code}-${active.id}-${id}`}>
                <div className="flex justify-center items-center w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg">
                  <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
                    <PokemonCard data={{code : active.code}} showInfo={false} className="relative aspect-[366/512]" />
                  </div>
                </div>
              </motion.div>

              {/* 내용 */}
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.span layoutId={`code-${active.id}-${id}`}>
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
                  {isMy && 
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" onClick={() => setIsReportOpen(true)}>
                        신고하기
                      </Button>
                      {(active.status.code === REQUEST || active.status.code === PROCESS) && (
                        <Button onClick={() => onRequestAccept(active.id, active.status.num)}>
                          {active.status.code === REQUEST ? "교환 수락" : "교환 완료"}
                        </Button>
                      )}
                    </div>
                  }
                  {!isMy && active.isMy && (active.status.code !== COMPLETE || active.status.code !== DELETED) && (
                      <Button variant="outline" onClick={() => onRequestCancel(active.id)}>
                        교환 취소(요청한 사람)
                      </Button>
                    )}
                </>
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <TradeReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        handleReport={handleReport}
      />
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