import { ReactNode, useState } from 'react';

import { JwtPayload } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);

  return <AppContext.Provider value={{ tokenData, setTokenData }}>{children}</AppContext.Provider>;
};
