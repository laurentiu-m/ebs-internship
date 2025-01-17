import { createContext, Dispatch, SetStateAction } from 'react';

import { JwtPayload } from '@src/types';

type TokenContext = {
  tokenData: JwtPayload | null;
  setTokenData: Dispatch<SetStateAction<JwtPayload | null>>;
};

export const TokenContext = createContext<TokenContext | null>(null);
