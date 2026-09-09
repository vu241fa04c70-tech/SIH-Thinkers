import React from 'react';
import { OptimizationResult } from '../../types/optimization';
import { Fuel, Cloud, Zap, Timer, CheckCircle2 } from 'lucide-react';

export const OptimizationResults: React.FC<{ result: OptimizationResult }> = ({ result }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">SOLVER SOLVED #{result.id.slice(0, 8)}</span>
          <h3 className="text-lg font-bold text-white mt-0.5">QUBO Optimization Execution Metrics</h3>
        </div>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Global Minimum Converged
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-center space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">Fuel Saved %</span>
          <span className="text-2xl font-extrabold text-emerald-400">-{result.fuel_reduction_percentage}%</span>
          <span className="text-[10px] text-slate-500 block">{result.total_predicted_fuel_liters} L total</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/20 text-center space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">GHG Reduced %</span>
          <span className="text-2xl font-extrabold text-teal-400">-{result.ghg_reduction_percentage}%</span>
          <span className="text-[10px] text-slate-500 block">{result.total_predicted_ghg_kg} kg CO2e</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/20 text-center space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">QUBO Matrix Energy</span>
          <span className="text-2xl font-extrabold text-blue-400">{result.qubo_energy_score}</span>
          <span className="text-[10px] text-slate-500 block">Ground state minimum</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 text-center space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">Solver Runtime</span>
          <span className="text-2xl font-extrabold text-purple-400">{result.computation_time_ms} ms</span>
          <span className="text-[10px] text-slate-500 block">1,500 SA Iterations</span>
        </div>
      </div>

      {/* Routes Assigned List */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-white">Assigned Vehicle Routes</h4>
        {result.routes.map((route, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-bold text-emerald-400 text-sm">{route.vehicle_id} ({route.vehicle_type})</div>
              <p className="text-slate-400 mt-0.5">Tasks: {route.assigned_tasks.join(' → ')}</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div><span className="text-slate-500 block text-[10px]">Distance</span><span className="font-mono font-bold">{route.total_distance_km} km</span></div>
              <div><span className="text-slate-500 block text-[10px]">Est Time</span><span className="font-mono font-bold">{route.estimated_time_minutes} mins</span></div>
              <div><span className="text-slate-500 block text-[10px]">Fuel Burn</span><span className="font-mono font-bold text-amber-400">{route.predicted_fuel_liters} L</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
