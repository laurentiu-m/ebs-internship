import { useContext } from 'react';

import { TokenContext } from '@src/contexts/TokenContext/TokenContext';

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('Token context should be used within TokenProvider');
  }
  return context;
};
