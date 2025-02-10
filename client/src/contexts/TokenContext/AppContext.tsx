import { createContext, Dispatch, SetStateAction } from 'react';

import { JwtPayload, ModalMode } from '@src/types';

type AppContext = {
  tokenData: JwtPayload | null;
  setTokenData: Dispatch<SetStateAction<JwtPayload | null>>;
  isSidebarClosed: boolean;
  onToggleSidebar: () => void;
  isModalOpen: boolean;
  selectedCell: number | null;
  onOpenModal: (mode?: ModalMode, id?: number) => void;
  onCloseModal: () => void;
  modalMode: ModalMode;
};

export const AppContext = createContext<AppContext | null>(null);
