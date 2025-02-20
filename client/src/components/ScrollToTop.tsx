import { useEffect } from 'react';

import { PaginationState } from '@tanstack/react-table';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ pagination }: { pagination?: PaginationState }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, pagination]);

  return null;
};
