import { ChartsComponent } from './components/';
import './index.scss';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Dashboard</h1>

      <ChartsComponent />
    </div>
  );
};
