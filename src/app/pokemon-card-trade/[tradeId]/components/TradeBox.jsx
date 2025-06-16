
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import PokemonCard from "@/components/card/PokemonCard";
import { RiArrowLeftRightFill } from 'react-icons/ri';

export default function TradeCard() {
  const wantCards = ["a1-002", "a1-003", "a1-004"]

  return (
    <Card className="shadow-none">
      <CardContent className="flex justify-center items-center w-full">
        <PokemonCard maxWidth={"200px"} width={"20vw"} />
        <RiArrowLeftRightFill size="50px" />
        {wantCards.map(card => <PokemonCard key={card} maxWidth={"200px"} width={"20vw"} />)}
      </CardContent>
    </Card>
  );
}