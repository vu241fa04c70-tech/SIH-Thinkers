import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  Leaf, 
  Gauge, 
  ShieldCheck, 
  CheckCircle2, 
  Fuel, 
  Truck, 
  Route, 
  ArrowRight
} from 'lucide-react';
import { TripInput, calculateTripPassport, DynamicTripPassport } from './carbonCalculator';

interface NewTripSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrip: (newTrip: DynamicTripPassport) => void;
}

export const NewTripSimulatorModal: React.FC<NewTripSimulatorModalProps> = ({
  isOpen,
  onClose,
  onAddTrip
}) => {
  if (!isOpen) return null;

  const [tripNumber, setTripNumber] = useState('Trip #108');
  const [origin, setOrigin] = useState('Guntur Autonagar Terminal');
  const [destination, setDestination] = useState('Perecherla Outer Logistics Hub');
  const [distanceKm, setDistanceKm] = useState(26.5);
  const [durationMins, setDurationMins] = useState(36);
  const [fuelUsedLiters, setFuelUsedLiters] = useState(11.2);
  const [fuelType, setFuelType] = useState<'diesel' | 'cng' | 'electric' | 'hydrogen'>('diesel');
  const [cargoWeightKg, setCargoWeightKg] = useState(16500);
  const [truckNumber, setTruckNumber] = useState('AP 07 TJ 4821');
  const [vehicleName, setVehicleName] = useState('Eicher Pro 3019 Heavy Hauler');
  const [driverName, setDriverName] = useState('Ramesh Reddy');
  const [deliveryStatus, setDeliveryStatus] = useState('Delivered & Verified');

  // Real-time dynamic calculation as inputs change
  const liveCalculatedPassport = useMemo(() => {
    return calculateTripPassport({
      trip_number: tripNumber,
      vehicle_name: vehicleName,
      origin,
      destination,
      distance_km: Number(distanceKm) || 1,
      duration_mins: Number(durationMins) || 1,
      fuel_used_liters: Number(fuelUsedLiters) || 0,
      fuel_type: fuelType,
      cargo_weight_kg: Number(cargoWeightKg) || 1000,
      truck_number: truckNumber,
      driver_name: driverName,
      date: 'Today, Sep 9, 2026',
      completed_at: 'Just now (Simulated)',
      delivery_status: deliveryStatus
    });
  }, [
    tripNumber,
    vehicleName,
    origin,
    destination,
    distanceKm,
    durationMins,
    fuelUsedLiters,
    fuelType,
    cargoWeightKg,
    truckNumber,
    driverName,
    deliveryStatus
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTrip(liveCalculatedPassport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-emerald-500/50 p-6 sm:p-8 shadow-2xl shadow-emerald-950 space-y-6 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Dynamic Trip Passport Simulator</h3>
              <p className="text-xs text-slate-400">
                Input any trip parameters to dynamically compute Eco Grade, Fuel Score & CO₂ Score
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Dynamic Score Preview Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 grid grid-cols-3 gap-3 text-center">
          <div className="p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Eco Grade</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {liveCalculatedPassport.eco_grade}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel Score</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">
              {liveCalculatedPassport.fuel_score} <span className="text-xs text-slate-400 font-sans">/100</span>
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">CO₂ Score</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {liveCalculatedPassport.co2_score} <span className="text-xs text-slate-400 font-sans">/100</span>
            </span>
          </div>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Trip ID */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Trip ID / Number</label>
              <input
                type="text"
                value={tripNumber}
                onChange={(e) => setTripNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Vehicle Powertrain</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-medium focus:border-emerald-500 focus:outline-none"
              >
                <option value="diesel">Diesel (Commercial Heavy Haul)</option>
                <option value="cng">Clean CNG (Alternative Fuel)</option>
                <option value="electric">Electric (Zero Direct Emissions)</option>
                <option value="hydrogen">Hydrogen Fuel Cell (Clean Concept)</option>
              </select>
            </div>

            {/* Distance */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Fuel Consumed */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {fuelType === 'electric' ? 'Energy Consumed (kWh)' : 'Fuel Consumed (Liters)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={fuelUsedLiters}
                onChange={(e) => setFuelUsedLiters(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Cargo Weight */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Cargo Weight (kg)</label>
              <input
                type="number"
                step="100"
                value={cargoWeightKg}
                onChange={(e) => setCargoWeightKg(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={durationMins}
                onChange={(e) => setDurationMins(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Origin */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Origin Location</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Destination Location</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Vehicle Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Vehicle Name / Model</label>
              <input
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Delivery Status */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Delivery Status</label>
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Delivered & Verified">Delivered & Verified</option>
                <option value="On-Time Delivery">On-Time Delivery</option>
                <option value="Completed">Completed</option>
                <option value="In-Transit Verified">In-Transit Verified</option>
              </select>
            </div>
          </div>

          {/* Dynamic Summary pill */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>Estimated Baseline Fuel: <strong className="font-mono text-white">{liveCalculatedPassport.baseline_fuel_liters} L</strong></span>
            <span>Fuel Saved: <strong className="font-mono text-emerald-400">+{liveCalculatedPassport.fuel_saved_liters} L</strong></span>
            <span>CO₂ Avoided: <strong className="font-mono text-cyan-400">+{liveCalculatedPassport.co2_saved_kg} kg</strong></span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Generate & Save Carbon Passport</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
