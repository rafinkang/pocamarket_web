// import TempContainer from "./components/TempContainer"
import TradeListContainer from "./components/TradeListContainer"

export default function TradePage() {
  return (
    <>
      <div id="TradeList" className="w-[100%] flex flex-col gap-6">
        <TradeListContainer />
      </div>
    </>
  );
}
