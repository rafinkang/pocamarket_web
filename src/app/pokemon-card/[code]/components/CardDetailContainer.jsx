"use client";

import CardInfo from "./CardInfo";
import CardTradeList from "./CardTradeList";

export default function CardDetailContainer({ data, tradeList }) {
  return (
    <>
      <CardInfo data={data} />
      <CardTradeList tradeList={tradeList} innerClassName="mt-8" />
    </>
  );
}
