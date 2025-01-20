import { createContext, Dispatch, SetStateAction } from 'react';

import { JwtPayload } from '@src/types';

type AppContext = {
  tokenData: JwtPayload | null;
  setTokenData: Dispatch<SetStateAction<JwtPayload | null>>;
  isSidebarClosed: boolean;
  onToggleSidebar: () => void;
};

export const AppContext = createContext<AppContext | null>(null);
