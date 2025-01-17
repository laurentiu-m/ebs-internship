import { ReactNode, useState } from 'react';

import { JwtPayload } from '@src/types';

import { TokenContext } from './TokenContext';

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);

  return <TokenContext.Provider value={{ tokenData, setTokenData }}>{children}</TokenContext.Provider>;
};
