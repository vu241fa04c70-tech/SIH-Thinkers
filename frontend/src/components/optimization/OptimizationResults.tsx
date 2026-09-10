import React from 'react';
import { OptimizationResult } from '../../types/optimization';
import { Fuel, Cloud, Zap, Timer, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OptimizationResults: React.FC<{ result: OptimizationResult }> = ({ result }) => {
  const { t } = useLanguage();

  return (
    <div className="p-6 rounded-[28px] bg-white/70 backdrop-blur-[12px] border border-white/30 space-y-6 text-slate-900 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider">SOLVER SOLVED #{result.id.slice(0, 8)}</span>
          <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{t('solverSolved', 'QUBO Optimization Execution Metrics')}</h3>
        </div>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('globalMinConverged', 'Global Minimum Converged')}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/80 border border-emerald-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-700 font-semibold block">{t('fuelSavedPct', 'Fuel Saved %')}</span>
          <span className="text-2xl font-extrabold text-emerald-600">-{result.fuel_reduction_percentage}%</span>
          <span className="text-[10px] text-slate-700 block font-mono">{result.total_predicted_fuel_liters} L total</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-teal-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-700 font-semibold block">{t('ghgReducedPct', 'GHG Reduced %')}</span>
          <span className="text-2xl font-extrabold text-teal-600">-{result.ghg_reduction_percentage}%</span>
          <span className="text-[10px] text-slate-700 block font-mono">{result.total_predicted_ghg_kg} kg CO2e</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-blue-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-700 font-semibold block">{t('quboEnergyScore', 'QUBO Matrix Energy')}</span>
          <span className="text-2xl font-extrabold text-blue-600">{result.qubo_energy_score}</span>
          <span className="text-[10px] text-slate-700 block">Ground state minimum</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-purple-200 text-center space-y-1 shadow-sm">
          <span className="text-xs text-slate-700 font-semibold block">{t('solverRuntime', 'Solver Runtime')}</span>
          <span className="text-2xl font-extrabold text-purple-600">{result.computation_time_ms} ms</span>
          <span className="text-[10px] text-slate-700 block">1,500 SA Iterations</span>
        </div>
      </div>

      {/* Routes Assigned List */}
      <div className="space-y-3">
        <h4 className="text-sm font-extrabold text-slate-900">{t('assignedVehicleRoutes', 'Assigned Vehicle Routes')}</h4>
        {result.routes.map((route, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/80 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
            <div>
              <div className="font-extrabold text-emerald-800 text-sm">{route.vehicle_id} ({route.vehicle_type})</div>
              <p className="text-slate-600 font-medium mt-0.5">Tasks: {route.assigned_tasks.join(' → ')}</p>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div><span className="text-slate-700 block text-[10px] font-semibold uppercase">{t('distLabel', 'Distance')}</span><span className="font-mono font-bold text-slate-900">{route.total_distance_km} km</span></div>
              <div><span className="text-slate-700 block text-[10px] font-semibold uppercase">{t('estTimeLabel', 'Est Time')}</span><span className="font-mono font-bold text-slate-900">{route.estimated_time_minutes} mins</span></div>
              <div><span className="text-slate-700 block text-[10px] font-semibold uppercase">{t('fuelBurnLabel', 'Fuel Burn')}</span><span className="font-mono font-bold text-amber-600">{route.predicted_fuel_liters} L</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
