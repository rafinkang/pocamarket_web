{/* <h1 className="text-2xl font-bold text-gray-800 mb-4 ">카드 정보</h1> */}
import TradeList from "@/app/pokemon-card-trade/components/TradeList";
import { cn } from "@/lib/utils";

export default function CardTradeList({ tradeList, innerClassName }) {
  return (
    <>
      <h1 className={cn("text-2xl font-bold text-gray-800 mb-4", innerClassName)}>관련된 교환 정보</h1>
      <TradeList tradeList={tradeList} />
    </>
  )
}