import { useContext } from 'react';

import { AppContext } from '@src/contexts/TokenContext/AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Token context should be used within TokenProvider');
  }
  return context;
};
