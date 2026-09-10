import React, { useState } from 'react';
import { DynamicTripPassport, INITIAL_COMPLETED_TRIPS } from './carbonCalculator';
import { CarbonPassportPhotoView } from './CarbonPassportPhotoView';
import { NewTripSimulatorModal } from './NewTripSimulatorModal';

interface CarbonPassportPageProps {
  onNavigate?: (tab: string) => void;
}

export const CarbonPassportPage: React.FC<CarbonPassportPageProps> = ({ onNavigate }) => {
  const [trips, setTrips] = useState<DynamicTripPassport[]>(INITIAL_COMPLETED_TRIPS);
  const [selectedTripId, setSelectedTripId] = useState<string>(INITIAL_COMPLETED_TRIPS[0].id);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleAddTrip = (newTrip: DynamicTripPassport) => {
    setTrips(prev => [newTrip, ...prev]);
    setSelectedTripId(newTrip.id);
  };

  return (
    <>
      <CarbonPassportPhotoView
        onNavigate={onNavigate}
        trips={trips}
        activeTripId={selectedTripId}
        onSelectTrip={(t) => setSelectedTripId(t.id)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Dynamic Trip Simulator Modal */}
      <NewTripSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onAddTrip={handleAddTrip}
      />
    </>
  );
};

export default CarbonPassportPage;
