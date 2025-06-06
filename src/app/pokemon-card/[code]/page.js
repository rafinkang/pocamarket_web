import CardDetailContainer from "./CardDetailContainer";


export default async function PokemonCardDetailPage({ params }) {
  const { code } = await params;
  return (
    <>
      <CardDetailContainer code={code} />
    </>
  );
}