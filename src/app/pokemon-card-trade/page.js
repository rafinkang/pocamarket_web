import TrradeContainer from "./components/TradeListContainer"
import TestContainer from "./components/TestContainer"

export default function TradePage() {
  return (
    <>
      <div id="TradeList" className="w-[100%] flex flex-col gap-6">
        <TestContainer />
      </div>
    </>
  );
}
