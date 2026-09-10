import React, { useState } from 'react';
import { Sliders, MapPin, ChevronDown, ChevronUp, Cpu, Compass } from 'lucide-react';

interface Props {
  onRunOptimization: (params: any) => void;
  loading: boolean;
  viewMode?: 'simple' | 'technical';
}

export const OptimizationInput: React.FC<Props> = ({ onRunOptimization, loading, viewMode = 'simple' }) => {
  const [priorities, setPriorities] = useState({
    money: true,
    pollution: true,
    time: false
  });

  const [weights, setWeights] = useState({
    alpha_fuel: 0.4,
    beta_ghg: 0.3,
    gamma_time: 0.2,
    delta_penalty: 0.1
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

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
      alpha_fuel: priorities.money ? 0.5 : 0.2,
      beta_ghg: priorities.pollution ? 0.4 : 0.2,
      gamma_time: priorities.time ? 0.4 : 0.1,
      delta_penalty: 0.1
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl text-slate-900">
      <div className="border-b border-slate-100 pb-3 space-y-1">
        <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
          USER PRIORITIES
        </span>
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          WHAT MATTERS MOST TO YOU?
        </h3>
        <p className="text-[11px] text-slate-500 font-medium">
          Select what matters most to customize route recommendations.
        </p>
      </div>

      {/* 3 Large Selectable Cards */}
      <div className="space-y-3 text-xs">
        <button
          type="button"
          onClick={() => setPriorities({ ...priorities, money: !priorities.money })}
          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            priorities.money ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div>
            <span className="font-extrabold text-amber-800 text-sm block">💰 SAVE MONEY</span>
            <span className="text-slate-600 text-[11px]">Keep fuel cost low.</span>
          </div>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${priorities.money ? 'bg-amber-500 text-white' : 'border border-slate-300'}`}>
            {priorities.money ? '✓' : ''}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPriorities({ ...priorities, pollution: !priorities.pollution })}
          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            priorities.pollution ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div>
            <span className="font-extrabold text-emerald-800 text-sm block">🌱 REDUCE POLLUTION</span>
            <span className="text-slate-600 text-[11px]">Choose a cleaner option.</span>
          </div>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${priorities.pollution ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
            {priorities.pollution ? '✓' : ''}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPriorities({ ...priorities, time: !priorities.time })}
          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            priorities.time ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div>
            <span className="font-extrabold text-blue-800 text-sm block">⏱ SAVE TIME</span>
            <span className="text-slate-600 text-[11px]">Reach your destination faster.</span>
          </div>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${priorities.time ? 'bg-blue-600 text-white' : 'border border-slate-300'}`}>
            {priorities.time ? '✓' : ''}
          </span>
        </button>
      </div>

      {/* Task Summary */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-500">
          <span className="font-bold text-slate-800">Trip Waypoints</span>
          <span className="text-emerald-700 font-mono font-extrabold">{sampleTasks.length} Stops</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sampleTasks.map(t => (
            <span key={t.id} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200 flex items-center gap-1 shadow-sm font-medium">
              <MapPin className="w-3 h-3 text-emerald-600" /> {t.name}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleLaunch}
        disabled={loading}
        className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 group"
      >
        <span>Find Best Route →</span>
      </button>

      {/* Technical Optimization Progressive Disclosure */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-purple-600" /> How did GreenFleet choose this route?
          </span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 font-mono text-[11px] text-purple-900 space-y-1.5 leading-relaxed">
            <div className="font-extrabold text-purple-950 font-sans text-xs mb-1">Show Technical Details</div>
            <div>• QUBO Formulation: Min E(x) = x^T Q x</div>
            <div>• Simulated Annealing + Tabu Search Metaheuristic</div>
            <div>• Multi-Objective Weights: α={weights.alpha_fuel}, β={weights.beta_ghg}, γ={weights.gamma_time}</div>
            <div>• Constraint Handling: Payload & Time Window limits</div>
          </div>
        )}
      </div>
    </div>
  );
};
