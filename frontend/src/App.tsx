import React from 'react';
import { Layout } from './components/common/Layout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { VehicleList } from './components/fleet/VehicleList';
import { PredictionForm } from './components/prediction/PredictionForm';
import { RouteVisualization } from './components/optimization/RouteVisualization';
import { PerformanceAnalytics } from './components/analytics/PerformanceAnalytics';

export const App: React.FC = () => {
  return (
    <Layout>
      {(activeTab) => {
        switch (activeTab) {
          case 'overview':
            return <DashboardOverview />;
          case 'fleet':
            return <VehicleList />;
          case 'predictions':
            return <PredictionForm />;
          case 'optimization':
            return <RouteVisualization />;
          case 'analytics':
            return <PerformanceAnalytics />;
          default:
            return <DashboardOverview />;
        }
      }}
    </Layout>
  );
};

export default App;
