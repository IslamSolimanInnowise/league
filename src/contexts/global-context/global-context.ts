import { createContext } from 'react';

type SetSearchTermCallback = (val?: string) => string;

interface IGlobalContext {
  searchTerm: string;
  setSearchTerm: (val: string | SetSearchTermCallback) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  searchTerm: '',
  setSearchTerm: () => {},
});
