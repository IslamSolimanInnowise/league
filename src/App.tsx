import CardsContainer from "./components/CardsContainer";
import { useCachedFetch } from "./hooks/useCachedFetch";
import { type CardInterface } from "./types";

const App: React.FC = () => {
  const { data, error, loading } = useCachedFetch<CardInterface[]>(
    `https://jsonplaceholder.typicode.com/albums/1/photos`
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main>
      <h1>Image Gallery</h1>
      <CardsContainer cards={data!} />
    </main>
  );
};
export default App;
