export default function PokemonDetailPage({ params }) {
  const { id } = params;
  return (
    <div>
      <h1>Pokemon Detail Page!!</h1>
      <p>Pokemon ID: {id}</p>
    </div>
  );
}