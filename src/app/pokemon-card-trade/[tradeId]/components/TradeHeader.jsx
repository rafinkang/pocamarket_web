"use client"

import { useEffect, useState } from "react"
import { getTradeStatusName, REQUEST, PROCESS, COMPLETE } from "@/constants/tradeStatus";
import statusStyles from "src/styles/trade-status.module.scss"
import moment from "moment";
import { cn } from "@/lib/utils";

const styles = {
  pageTitle: "flex items-center text-2xl font-bold text-gray-800",
}

const statusClassMap = {
  [REQUEST]: statusStyles['badge-request'],
  [PROCESS]: statusStyles['badge-process'],
  [COMPLETE]: statusStyles['badge-complete'],
};

export default function TradeHeader ({data}) {
  const [nickname, setNickname] = useState(null);
  const [status, setStatus] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [statusStyle, setStatusStyle] = useState(null);

  useEffect(() => {
    if (!data) return;
    const dataStatus = [PROCESS, COMPLETE].includes(data.status) ? data.status : REQUEST;

    setNickname(data.nickname);
    setStatus(getTradeStatusName(dataStatus));
    setCreatedAt(moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss'));

    const styleClass = statusClassMap[dataStatus] || null;
    setStatusStyle(styleClass);
  }, [data])

  return (<>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 w-full">
      <h1 className={styles.pageTitle}>
        카드 교환
      </h1>
      <p className="text-sm sm:text-base self-end sm:self-auto">
        <span className={cn(statusStyle, "mr-1")}>{status}</span>
        {nickname} 
        <span className="text-[#838996] ml-1">{createdAt}</span>
      </p>
    </div>
  </>)
}