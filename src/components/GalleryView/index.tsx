import { FC, useEffect, useState } from "react";
import { useCachedFetch } from "../../hooks/useCachedFetch";
import type { ICard } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import { filterArr } from "../../utils/filterArr";
import CardsContainer from "../CardsContainer";
import * as Styled from "./gallery-view-styles";

interface IGalleryViewProps {
  inputVal: string;
}

const GalleryView: FC<IGalleryViewProps> = ({ inputVal }) => {
  const {
    data: originalData,
    error,
    loading,
  } = useCachedFetch<ICard[]>(`https://picsum.photos/v2/list`);

  const [filteredData, setFilteredData] = useState<ICard[]>([]);
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
