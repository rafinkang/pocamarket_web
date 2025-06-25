// import TempContainer from "./components/TempContainer"
import TradeListContainer from "./components/TradeListContainer"
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: '포켓몬 카드 교환',
  description: '포켓몬 카드를 교환 할 수 있습니다.',
  keywords: ["포켓몬 카드 교환", "포켓몬 카드 거래", ...siteConfig.keywords],
}
export default function TradePage() {
  return (
    <>
      <div id="TradeList" className="w-[100%] flex flex-col gap-6">
        <TradeListContainer />
      </div>
    </>
  );
}
