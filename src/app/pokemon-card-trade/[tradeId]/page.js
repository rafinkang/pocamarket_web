import TradeBox from "./components/TradeBox";
import TradeList from "./components/TradeList";
import ButtonGroup from "./components/ButtonGroup";

export default function PokemonCardTrade() {
    return (<div className="flex flex-col gap-8">
        <TradeBox />
        <ButtonGroup/>
        <TradeList />
    </div>);
}