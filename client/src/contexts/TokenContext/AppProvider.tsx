import { ReactNode, useState } from 'react';

import { JwtPayload } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const onToggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  return (
    <AppContext.Provider value={{ tokenData, setTokenData, isSidebarClosed, onToggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
