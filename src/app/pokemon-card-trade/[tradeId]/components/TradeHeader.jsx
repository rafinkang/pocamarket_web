import { useEffect, useState } from "react"
import { getTradeStatusName, REGISTRATION, PROCESS, COMPLETE } from "@/constants/tradeStatus";
import styles from "src/styles/tradeStatus.module.scss"
import moment from "moment";
import { cn } from "@/lib/utils";

const statusClassMap = {
  [REGISTRATION]: styles['badge-registration'],
  [PROCESS]: styles['badge-process'],
  [COMPLETE]: styles['badge-complete'],
};

export default function TradeHeader ({data}) {
  const [nickname, setNickname] = useState(null);
  const [status, setStatus] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [statusStyle, setStatusStyle] = useState(null);

  useEffect(() => {
    if (!data) return;
    const dataStatus = [PROCESS, COMPLETE].includes(data.status) ? data.status : REGISTRATION;

    setNickname(data.nickname);
    setStatus(getTradeStatusName(dataStatus));
    setCreatedAt(moment(data.createdAt).format('YYYY-MM-DD HH:mm:ss'));

    const styleClass = statusClassMap[dataStatus] || null;
    setStatusStyle(styleClass);
  }, [data])

  return (<>
    <div className="flex justify-between items-center">
      <span className={cn(statusStyle)}>{status}</span>
      <p>{nickname} <span className="text-[#838996]">{createdAt}</span></p>
    </div>
  </>)
}