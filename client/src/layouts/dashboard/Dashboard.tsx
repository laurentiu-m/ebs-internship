import { useAppContext } from '@src/hooks/useAppContext';
import cn from 'classnames';

import { ChartsComponent } from './components/';
import './index.scss';

export const Dashboard = () => {
  const { isSidebarClosed } = useAppContext();

  return (
    <div className={cn('dashboard', { 'dashboard--wide': isSidebarClosed })}>
      <h1 className="dashboard__header">Dashboard</h1>

      <ChartsComponent />
    </div>
  );
};
