import TrradeContainer from "./components/TradeListContainer"

export default function TradePage() {
  return (
    <>
      <div id="TradeList" className="w-[100%] flex flex-col gap-6">
        <TrradeContainer />
      </div>
    </>
  );
}
