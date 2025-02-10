import { ReactNode, useState } from 'react';

import { JwtPayload, ModalMode } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const onToggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  const onOpenModal = (mode?: ModalMode, id?: number) => {
    setSelectedCell(id ?? null);
    setModalMode(mode ?? null);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setModalMode(null);
    setSelectedCell(null);
  };

  return (
    <AppContext.Provider
      value={{
        tokenData,
        setTokenData,
        isSidebarClosed,
        onToggleSidebar,
        isModalOpen,
        selectedCell,
        onOpenModal,
        onCloseModal,
        modalMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
