import { useAppContext } from '@src/hooks/useAppContext';
import cn from 'classnames';

import { ChartsComponent } from './components/';
import './index.scss';

export const Dashboard = () => {
  const { isSidebarClosed } = useAppContext();

  return (
    <div className={cn('dashboard', { 'dashboard--wide': isSidebarClosed })}>
      <h3 className="dashboard__header">Dashboard</h3>

      <ChartsComponent />
    </div>
  );
};
