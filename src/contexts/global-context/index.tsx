import { FC, PropsWithChildren, useState } from 'react';
import { GlobalContext } from './global-context';

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return <GlobalContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</GlobalContext.Provider>;
};

export default AppContext;
