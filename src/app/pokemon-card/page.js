import CardContainer from "./components/CardListContainer"

export default function PokemonCardPage() {
  return (
    <>
      <div id="pokemonCardList" className="w-[100%] flex flex-col gap-6">
        <CardContainer />
      </div>
    </>
  );
}
