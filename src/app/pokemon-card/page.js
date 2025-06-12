import CardListPage from "./components/CardListPage"

export default function PokemonCardPage() {
  return (
    <>
      <div id="pokemonCardList" className="w-[100%] flex flex-col gap-6">
        <CardListPage />
      </div>
    </>
  );
}
