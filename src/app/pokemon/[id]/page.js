export default async function PokemonDetailPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1>Pokemon Detail Page!!</h1>
      <p>Pokemon ID: {id}</p>
    </div>
  );
}