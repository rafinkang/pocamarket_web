"use client"

import PokemonCard from "@/components/list/PokemonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import TradeReportDialog from "./TradeReportDialog";

import { REQUEST_DELETED, REQUEST_SUBMITTED, REQUEST_PROCESS, REQUEST_COMPLETE, getTradeRequestStatusName } from "@/constants/tradeRequestStatus";
import { useState } from "react";

import { postUserReport } from "@/api/usersReport";

export default function TradeListItemDialog({handleClick, dialogData, id, isMy, isLogin, onRequestAccept, onRequestCancel, onOpenOkChange}) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const handleReport = async ({reportReason, reportDetail}) => {
      const requestData = {
        refId: dialogData.id,
        refType: "TRADE_REQUEST",
        refStatus: dialogData.status,
        link: window.location.href,
        content: `${reportReason}:${reportDetail}`,
      };

      await postUserReport(requestData);
      handleClick(null);
      onOpenOkChange(true);
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
        {dialogData && typeof dialogData === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-[100]" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dialogData && typeof dialogData === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[101]">
            {/* 모바일용 닫기 버튼 */}
            <motion.button
              {...closeButtonProps}
              key={`button-mobile-${dialogData.id}-${id}`}
              className="flex absolute top-4 right-4 md:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-[105]"
            >
              <CloseIcon />
            </motion.button>

            {/* 모달 body */}
            <motion.div
              layoutId={`card-${dialogData.id}-${id}`}
              style={{ zIndex: 102 }}
              className="relative w-full md:max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden px-8 py-8">
              {/* 데스크탑용 닫기 버튼 */}
              <motion.button
                {...closeButtonProps}
                key={`button-desktop-${dialogData.id}-${id}`}
                className="hidden absolute top-4 right-4 md:flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full h-8 w-8 z-[105]"
              >
                <CloseIcon />
              </motion.button>

              {/* 카드 */}
              <motion.div 
                layoutId={`image-${dialogData.code}-${dialogData.id}-${id}`}
                style={{ zIndex: 103 }}
              >
                <div className="flex justify-center items-center w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg">
                  <div className="relative aspect-[366/512]" style={{ width: "20vw", maxWidth: "200px" }}>
                    <PokemonCard data={{code : dialogData.code}} showInfo={false} className="relative aspect-[366/512]" />
                  </div>
                </div>
              </motion.div>

              {/* 내용 */}
              <div className="relative z-[104]">
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.span 
                      layoutId={`code-${dialogData.id}-${id}`}
                      style={{ zIndex: 104 }}
                    >
                      <Badge variant="secondary">{getTradeRequestStatusName(dialogData.status)}</Badge>
                    </motion.span>
                    <motion.p
                      layoutId={`description-${dialogData.description}-${dialogData.id}-${id}`}
                      style={{ zIndex: 104 }}
                      className="text-neutral-600 dark:text-neutral-400">
                        {dialogData.description}
                    </motion.p>
                  </div>

                  {dialogData.ctaText && <motion.a
                      layoutId={`button-${dialogData.code}-${dialogData.id}-${id}`}
                      style={{ zIndex: 104 }}
                      href={dialogData.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                      {dialogData.ctaText}
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
                    {typeof dialogData.content === "function"
                      ? dialogData.content()
                      : dialogData.content}
                  </motion.div>
                </div>
              </div>
              {/* TODO 교환 취소인 경우 버튼 숨기기 */}
              {isLogin && (
                <div className="relative z-[104] flex justify-end items-center gap-2">
                  {!isMy && dialogData.isMy && (dialogData.status !== REQUEST_COMPLETE || dialogData.status !== REQUEST_DELETED) && (
                    <Button variant="outline" className="mr-auto" onClick={() => { 
                      onRequestCancel(dialogData.id);
                      handleClick(null);
                    }}>
                      교환 취소
                    </Button>
                  )}
                  {/* {isMy &&  */}
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" onClick={() => setIsReportOpen(true)}>
                        신고하기
                      </Button>
                      {(dialogData.status === REQUEST_SUBMITTED || dialogData.status === REQUEST_PROCESS) && (
                        <Button onClick={() => {
                          onRequestAccept(dialogData.id, dialogData.status);
                          handleClick(null);
                        }}>
                          {dialogData.status === REQUEST_SUBMITTED ? "교환 수락" : "교환 완료"}
                        </Button>
                      )}
                    </div>
                  {/* } */}
                </div>
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