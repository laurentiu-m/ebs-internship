import { ReactNode, useState } from 'react';

import { JwtPayload } from '@src/types';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const onToggleSidebar = () => setIsSidebarClosed((prev) => !prev);

  const onOpenModal = (id: number | null = null) => {
    setSelectedCell(id);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
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
        onCloseModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
