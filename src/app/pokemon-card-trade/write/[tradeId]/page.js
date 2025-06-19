import WriteContainer from "../components/WriteContainer";

export default async function TradeUpdatePage({ params }) {
  const { tradeId } = await params;

  return (
    <WriteContainer tradeId={tradeId} />
  );
}
