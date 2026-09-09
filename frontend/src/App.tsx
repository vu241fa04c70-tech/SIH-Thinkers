import React, { useState, useEffect } from 'react';
import { Layout } from './components/common/Layout';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { VehicleList } from './components/fleet/VehicleList';
import { PredictionForm } from './components/prediction/PredictionForm';
import { RouteVisualization } from './components/optimization/RouteVisualization';
import { PerformanceAnalytics } from './components/analytics/PerformanceAnalytics';
import { AboutPage } from './components/about/AboutPage';
import { OnboardingModal } from './components/common/OnboardingModal';
import { Vehicle } from './types/vehicle';

export const App: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('greenfleet_onboarding_seen');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
      localStorage.setItem('greenfleet_onboarding_seen', 'true');
    }
  }, []);

  return (
    <Layout>
      {(activeTab, setActiveTab, viewMode) => {
        return (
          <>
            <OnboardingModal
              isOpen={isOnboardingOpen}
              onClose={() => setIsOnboardingOpen(false)}
              onStartTrip={() => setActiveTab('predictions')}
            />

            {(() => {
              switch (activeTab) {
                case 'landing':
                  return (
                    <LandingPage
                      onNavigateToApp={(tab) => setActiveTab(tab || 'predictions')}
                      viewMode={viewMode}
                    />
                  );
                case 'overview':
                  return <DashboardOverview viewMode={viewMode} />;
                case 'fleet':
                  return (
                    <VehicleList
                      viewMode={viewMode}
                      onSelectVehicleForTrip={(vehicle) => {
                        setSelectedVehicle(vehicle);
                        setActiveTab('predictions');
                      }}
                    />
                  );
                case 'predictions':
                  return (
                    <PredictionForm
                      viewMode={viewMode}
                      initialVehicle={selectedVehicle}
                    />
                  );
                case 'optimization':
                  return <RouteVisualization viewMode={viewMode} />;
                case 'analytics':
                  return <PerformanceAnalytics viewMode={viewMode} />;
                case 'about':
                  return <AboutPage viewMode={viewMode} />;
                default:
                  return (
                    <LandingPage
                      onNavigateToApp={(tab) => setActiveTab(tab || 'predictions')}
                      viewMode={viewMode}
                    />
                  );
              }
            })()}
          </>
        );
      }}
    </Layout>
  );
};

export default App;
