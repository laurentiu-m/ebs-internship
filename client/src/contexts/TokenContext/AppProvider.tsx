import { ReactNode, useMemo, useState } from 'react';

import { JwtPayload } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const onToggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  const contextValue = useMemo(
    () => ({
      tokenData,
      setTokenData,
      isSidebarClosed,
      onToggleSidebar
    }),
    [tokenData, isSidebarClosed]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
