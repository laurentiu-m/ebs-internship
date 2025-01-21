import { ChartsComponent } from './components/ChartsComponent';
import { StatsComponent } from './components/StatsComponent';
import './index.scss';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Dashboard</h1>

      <StatsComponent />
      <ChartsComponent />
    </div>
  );
};
