import React from 'react';
import { Layout } from './components/common/Layout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { RouteOptimizationPage } from './components/route-optimization/RouteOptimizationPage';
import { CarbonPassportPage } from './components/carbon-passport/CarbonPassportPage';
import { GovernmentIncentivesPage } from './components/government-incentives/GovernmentIncentivesPage';
import { RouteRiskMeterPage } from './components/route-risk-meter/RouteRiskMeterPage';
import { EcoChallengePage } from './components/eco-challenge/EcoChallengePage';
import { VehicleList } from './components/fleet/VehicleList';
import { PredictionForm } from './components/prediction/PredictionForm';
import { RouteVisualization } from './components/optimization/RouteVisualization';
import { PerformanceAnalytics } from './components/analytics/PerformanceAnalytics';
import { SettingsPage } from './components/settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <Layout>
      {(activeTab, setActiveTab) => {
        switch (activeTab) {
          case 'route-optimization':
          case 'fleet-intelligence':
            return <RouteOptimizationPage onNavigate={setActiveTab} />;
          case 'carbon-passport':
            return <CarbonPassportPage onNavigate={setActiveTab} />;
          case 'government-incentives':
            return <GovernmentIncentivesPage onNavigate={setActiveTab} />;
          case 'eco-challenge':
            return <EcoChallengePage onNavigate={setActiveTab} />;
          case 'route-risk-meter':
            return <RouteRiskMeterPage onNavigate={setActiveTab} />;
          case 'analytics':
          case 'reports':
            return <PerformanceAnalytics />;
          case 'settings':
            return <SettingsPage onNavigate={setActiveTab} />;
          case 'overview':
          case 'dashboard':
            return <DashboardOverview />;
          case 'fleet':
            return <VehicleList />;
          case 'predictions':
            return <PredictionForm />;
          case 'optimization':
            return <RouteVisualization />;
          default:
            return <RouteOptimizationPage onNavigate={setActiveTab} />;
        }
      }}
    </Layout>
  );
};

export default App;
