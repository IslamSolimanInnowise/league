import { useEffect, useState } from "react";
import { useCachedFetch } from "../../hooks/useCachedFetch";
import type { CardInterface } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import { filterArr } from "../../utils/filterArr";
import CardsContainer from "../CardsContainer";
import * as Styled from "./gallery-view-styles";

interface GalleryViewProps {
  inputVal: string;
}

const GalleryView: React.FC<GalleryViewProps> = ({ inputVal }) => {
  const {
    data: originalData,
    error,
    loading,
  } = useCachedFetch<CardInterface[]>(
    // `https://jsonplaceholder.typicode.com/albums/1/photos`
    `https://picsum.photos/images`
  );

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

  if (loading) return <Styled.LoadingH2>Loading...</Styled.LoadingH2>;
  if (error) return <Styled.ErrorH2>Error: {error}</Styled.ErrorH2>;

  return filteredData.length ? (
    <CardsContainer cards={filteredData} />
  ) : (
    <Styled.ErrorP>Seems like nothing matches your search!</Styled.ErrorP>
  );
};
export default GalleryView;
