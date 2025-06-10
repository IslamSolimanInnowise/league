import { createContext, FC, PropsWithChildren, useState } from "react";

type SetInputValCallback = (val?: string) => string;

interface IGlobalContext {
  inputVal: string;
  setInputVal: (val: string | SetInputValCallback) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  inputVal: "",
  setInputVal: () => {},
});

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  const [inputVal, setInputVal] = useState("");

  return (
    <GlobalContext.Provider value={{ inputVal, setInputVal }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
