import React, { useState } from 'react';
import { Cpu, Play, Sliders, MapPin } from 'lucide-react';

interface Props {
  onRunOptimization: (params: any) => void;
  loading: boolean;
}

export const OptimizationInput: React.FC<Props> = ({ onRunOptimization, loading }) => {
  const [weights, setWeights] = useState({
    alpha_fuel: 0.4,
    beta_ghg: 0.3,
    gamma_time: 0.2,
    delta_penalty: 0.1
  });

  const sampleTasks = [
    { id: 'T-1', name: 'Thane Hub Delivery', lat: 19.2183, lng: 72.9781, demand_kg: 2400 },
    { id: 'T-2', name: 'Navi Mumbai Warehouse', lat: 19.0330, lng: 73.0297, demand_kg: 1800 },
    { id: 'T-3', name: 'Bhiwandi Logistics Park', lat: 19.2812, lng: 73.0482, demand_kg: 3200 },
    { id: 'T-4', name: 'Kalyan Distribution Depot', lat: 19.2403, lng: 73.1305, demand_kg: 1500 },
    { id: 'T-5', name: 'Panvel Freight Station', lat: 18.9894, lng: 73.1175, demand_kg: 2100 }
  ];

  const sampleVehicles = [
    { id: 'V-1', vehicle_id: 'FLEET-1001', type: 'Heavy Truck', fuel_type: 'diesel', max_payload_kg: 18000 },
    { id: 'V-2', vehicle_id: 'FLEET-1004', type: 'Electric Fleet Van', fuel_type: 'electric', max_payload_kg: 3500 },
    { id: 'V-3', vehicle_id: 'FLEET-1012', type: 'CNG Cargo Vehicle', fuel_type: 'cng', max_payload_kg: 5000 }
  ];

  const handleLaunch = () => {
    onRunOptimization({
      depot_location: { id: 'depot', name: 'Mumbai Central Depot', lat: 19.0760, lng: 72.8777 },
      tasks: sampleTasks,
      available_vehicles: sampleVehicles,
      ...weights
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          QUBO Multi-Objective Optimization Weights
        </h3>
        <span className="text-xs text-slate-400 font-mono">Min E(x) = x^T Q x</span>
      </div>

      {/* Sliders */}
      <div className="space-y-4 text-xs">
        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>α Fuel Cost Weight</span>
            <span className="text-amber-400 font-mono">{weights.alpha_fuel}</span>
          </div>
          <input
            type="range" min="0.1" max="1.0" step="0.05"
            value={weights.alpha_fuel}
            onChange={(e) => setWeights({ ...weights, alpha_fuel: Number(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>β GHG Emission Weight</span>
            <span className="text-emerald-400 font-mono">{weights.beta_ghg}</span>
          </div>
          <input
            type="range" min="0.1" max="1.0" step="0.05"
            value={weights.beta_ghg}
            onChange={(e) => setWeights({ ...weights, beta_ghg: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>γ Travel Time Weight</span>
            <span className="text-blue-400 font-mono">{weights.gamma_time}</span>
          </div>
          <input
            type="range" min="0.1" max="1.0" step="0.05"
            value={weights.gamma_time}
            onChange={(e) => setWeights({ ...weights, gamma_time: Number(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      {/* Task Summary Badge */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="font-semibold text-slate-200">Active Delivery Tasks</span>
          <span className="text-emerald-400 font-mono font-bold">{sampleTasks.length} Locations</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sampleTasks.map(t => (
            <span key={t.id} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> {t.name}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleLaunch}
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
      >
        <Cpu className="w-5 h-5 text-white" />
        {loading ? "Running Simulated Annealing Solver..." : "Solve QUBO Route & Fleet Allocation"}
      </button>
    </div>
  );
};
