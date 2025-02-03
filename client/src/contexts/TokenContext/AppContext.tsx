import { createContext, Dispatch, SetStateAction } from 'react';

import { JwtPayload } from '@src/types';

type ModalMode = 'create' | 'edit' | 'delete' | null;

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
