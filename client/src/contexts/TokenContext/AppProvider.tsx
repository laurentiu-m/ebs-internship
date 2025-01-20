import { ReactNode, useState } from 'react';

import { JwtPayload } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => setIsSidebarClosed(!isSidebarClosed);

  return (
    <AppContext.Provider value={{ tokenData, setTokenData, isSidebarClosed, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
