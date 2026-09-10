import React, { useState } from 'react';
import { FleetHeader } from './FleetHeader';
import { FleetMapSection } from './FleetMapSection';
import { AICopilotCard } from './AICopilotCard';
import { CarbonPassportCard } from './CarbonPassportCard';
import { 
  DUMMY_VEHICLES, 
  DUMMY_HUBS, 
  INITIAL_COPILOT_RECOMMENDATIONS, 
  INITIAL_CHAT_MESSAGES,
  FleetVehicle,
  CopilotRecommendation,
  ChatMessage
} from './dummyData';

export const FleetIntelligenceDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>(DUMMY_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [recommendations, setRecommendations] = useState<CopilotRecommendation[]>(INITIAL_COPILOT_RECOMMENDATIONS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter vehicles based on search and status
  const filteredVehicles = vehicles.filter((v) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      v.truck_number.toLowerCase().includes(query) ||
      v.vehicle_id.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query) ||
      v.driver.name.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle recommendation action
  const handleApplyRecommendation = (recId: string) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === recId ? { ...r, applied: true } : r))
    );

    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    // Apply state change to vehicle if applicable
    if (rec.targetVehicleId === 'AP 07 TA 1155' || rec.targetVehicleId.includes('1155')) {
      setVehicles(prev =>
        prev.map(v => {
          if (v.truck_number === 'AP 07 TA 1155' || v.vehicle_id === 'TRK-05') {
            return {
              ...v,
              status: 'en_route',
              status_display: 'En Route (Optimized Green Bypass)',
              speed: 56,
              alerts: [],
              current_location: {
                lat: 16.3620,
                lng: 80.4150,
                address: 'Guntur Outer Ring Expressway North (Flowing 56 km/h)'
              },
              destination: {
                ...v.destination,
                eta: '16 mins (14:38) - On Schedule'
              },
              fuel_used: '36.1 L (Saved 15.7 L)',
              total_co2_saved_kg: v.total_co2_saved_kg + 42.0
            };
          }
          return v;
        })
      );
    } else if (rec.targetVehicleId === 'AP 16 TH 3314' || rec.targetVehicleId.includes('3314')) {
      setVehicles(prev =>
        prev.map(v => {
          if (v.truck_number === 'AP 16 TH 3314' || v.vehicle_id === 'TRK-03') {
            return {
              ...v,
              status: 'en_route',
              status_display: 'En Route (Green Bypass Dispatch)',
              speed: 48,
              current_location: {
                lat: 16.3400,
                lng: 80.4700,
                address: 'NH16 Bypass Expressway'
              },
              destination: {
                name: 'Perecherla Industrial Freight Hub',
                lat: 16.3350,
                lng: 80.3720,
                eta: '24 mins (14:46)',
                distance_remaining_km: 18.2
              }
            };
          }
          return v;
        })
      );
    }

    // Append Copilot confirmation message
    const confirmMsg: ChatMessage = {
      id: `ai-conf-${Date.now()}`,
      sender: 'ai',
      text: `Action applied successfully for ${rec.targetVehicleId}: ${rec.title}. Optimization solver verified ${rec.carbon_savings} reduction and ${rec.time_savings} recovery. Telemetry and route paths updated.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metrics: [
        { label: 'Saved Carbon', val: rec.carbon_savings },
        { label: 'Time Delta', val: rec.time_savings },
        { label: 'Status', val: 'Active' }
      ]
    };
    setChatMessages(prev => [...prev, confirmMsg]);
  };

  // Handle user chat message to AI Copilot
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Generate intelligent simulated AI response
    setTimeout(() => {
      let aiResponseText = '';
      let metrics: { label: string; val: string }[] | undefined = undefined;
      const lower = text.toLowerCase();

      if (lower.includes('idle') || lower.includes('3314') || lower.includes('trk-03')) {
        aiResponseText = "Truck AP 16 TH 3314 (Ashok Leyland 4220 HG) is currently idle at Guntur Autonagar Terminal Bay 4 with 22,100 kg cargo. Ready for dispatch along the Green Optimized Route to avoid central traffic.";
        metrics = [
          { label: 'Candidate', val: 'AP 16 TH 3314' },
          { label: 'Location', val: 'Autonagar Bay 4' },
          { label: 'Cargo Load', val: '22,100 kg' }
        ];
      } else if (lower.includes('reroute') || lower.includes('1155') || lower.includes('original') || lower.includes('optimized') || lower.includes('congestion')) {
        aiResponseText = "Guntur Route Analysis: The Red 'Original Route' through inner city takes 68 mins and consumes 48.5 L fuel due to market gridlock. The Green 'Optimized Route' takes the North Outer Ring Bypass, taking only 38 mins and consuming 32.8 L fuel (-32% fuel saved, saving 15.7 L and 42 kg CO₂).";
        metrics = [
          { label: 'Original Fuel', val: '48.5 L (68m)' },
          { label: 'Optimized Fuel', val: '32.8 L (38m)' },
          { label: 'Fuel Saved', val: '-15.7 L (-32%)' }
        ];
      } else if (lower.includes('scope 1') || lower.includes('carbon') || lower.includes('emission')) {
        aiResponseText = "Guntur Fleet emissions have dropped 34% this cycle due to clean route enforcement on NH16 and deployment of electric delivery truck AP 07 EV 9012.";
        metrics = [
          { label: 'Scope 1 Red.', val: '-34%' },
          { label: 'Eco-Score Avg', val: '95.2' },
          { label: 'Clean Electric', val: '54 kWh' }
        ];
      } else if (lower.includes('charging') || lower.includes('mangalagiri') || lower.includes('battery')) {
        aiResponseText = "Mangalagiri Mega EV Station (350kW MCS) is operational on 100% solar PPA along NH16 corridor. Truck AP 07 EV 9012 can charge at peak green efficiency.";
        metrics = [
          { label: 'Power Available', val: '350 kW' },
          { label: 'Corridor', val: 'NH16 Mangalagiri' },
          { label: 'Tariff State', val: 'Off-Peak Solar' }
        ];
      } else {
        aiResponseText = `Analysis complete for "${text}". All 5 trucks in Guntur are tracked in real-time. The Green 'Optimized Route' bypasses inner city gridlock for optimal fuel efficiency.`;
        metrics = [
          { label: 'Guntur Fleet', val: '5 Trucks Active' },
          { label: 'Map Center', val: 'Guntur, AP' },
          { label: 'Avg Speed', val: '44.8 km/h' }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metrics: metrics
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  // Inspect vehicle in Copilot
  const handleAskCopilotAboutVehicle = (v: FleetVehicle) => {
    handleSendMessage(`Provide full telematics audit for Truck ${v.truck_number} (${v.vehicle_id}) - Speed: ${v.speed} km/h, Fuel used: ${v.fuel_used}, Cargo: ${v.cargo_weight}, Status: ${v.status_display}`);
  };

  // Simulate an incident
  const handleSimulateEvent = () => {
    const truck5 = vehicles.find(v => v.truck_number.includes('1155') || v.vehicle_id === 'TRK-05');
    if (truck5) setSelectedVehicle(truck5);
    handleSendMessage("Alert: Truck AP 07 TA 1155 is stuck in Old Bus Stand inner-city gridlock on the Original Route. Reroute via the Green Optimized Route!");
  };

  // Telemetry refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setVehicles(prev =>
        prev.map(v => ({
          ...v,
          speed: v.status === 'en_route' ? Math.max(30, Math.min(75, v.speed + Math.floor(Math.random() * 7) - 3)) : v.speed,
          total_co2_saved_kg: Number((v.total_co2_saved_kg + 0.4).toFixed(1))
        }))
      );
    }, 500);
  };

  return (
    <div className="space-y-6 w-full pb-10">
      {/* Top Header */}
      <FleetHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onSimulateEvent={handleSimulateEvent}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Grid: Large Map on Left, Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Large Map Section (~65% width on desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <FleetMapSection
            vehicles={filteredVehicles}
            hubs={DUMMY_HUBS}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            onAskCopilotAboutVehicle={handleAskCopilotAboutVehicle}
          />
        </div>

        {/* Right Sidebar: AI Copilot & Carbon Passport Cards (~35% width on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <AICopilotCard
            recommendations={recommendations}
            onApplyRecommendation={handleApplyRecommendation}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
          />

          <CarbonPassportCard />
        </div>
      </div>
    </div>
  );
};

export default FleetIntelligenceDashboard;
