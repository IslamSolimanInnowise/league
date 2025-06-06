import { useEffect, useState } from "react";
import CardsContainer from "./components/CardsContainer";
import Header from "./components/Header";
import { useCachedFetch } from "./hooks/useCachedFetch";
import { type CardInterface } from "./types";
import useDebounce from "./hooks/useDebounce";
import { filterArr } from "./utils/filterArr";

const App: React.FC = () => {
  const {
    data: originalData,
    error,
    loading,
  } = useCachedFetch<CardInterface[]>(
    `https://jsonplaceholder.typicode.com/albums/1/photos`
  );
  const [inputVal, setInputVal] = useState("");
  const [filteredData, setFilteredData] = useState<CardInterface[]>([]);
  const debouncedInputVal = useDebounce(inputVal);

  useEffect(() => {
    if (!originalData) return;

    const trimmed = debouncedInputVal.trim();

    if (trimmed) {
      const filtered = filterArr(originalData, trimmed);
      setFilteredData(filtered);
    } else {
      setFilteredData(originalData);
    }
  }, [debouncedInputVal, originalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main>
      <Header onChange={handleChange} inputVal={inputVal} />
      <h1>Image Gallery</h1>
      {filteredData.length ? (
        <CardsContainer cards={filteredData} />
      ) : (
        <p>Seems like nothing matches your search!</p>
      )}
    </main>
  );
};
export default App;
