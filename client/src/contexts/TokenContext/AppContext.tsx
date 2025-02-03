import { createContext, Dispatch, SetStateAction } from 'react';

import { JwtPayload } from '@src/types';

type AppContext = {
  tokenData: JwtPayload | null;
  setTokenData: Dispatch<SetStateAction<JwtPayload | null>>;
  isSidebarClosed: boolean;
  onToggleSidebar: () => void;
  isModalOpen: boolean;
  selectedCell: number | null;
  onOpenModal: (id?: number | null) => void;
  onCloseModal: () => void;
};

export const AppContext = createContext<AppContext | null>(null);
