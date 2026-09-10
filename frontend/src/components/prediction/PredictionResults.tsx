import React from 'react';
import { SinglePredictionResult } from '../../types/prediction';
import { Fuel, Cloud, ShieldCheck, DollarSign, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

interface PredictionResultsProps {
  result: SinglePredictionResult;
  onFindBetterRoute?: () => void;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ result, onFindBetterRoute }) => {
  const normalFuel = Math.round(result.predicted_fuel_liters * 1.22);
  const normalCost = normalFuel * 100;
  const greenFleetFuel = result.predicted_fuel_liters;
  const greenFleetCost = greenFleetFuel * 100;

  const savedFuel = normalFuel - greenFleetFuel;
  const savedCost = normalCost - greenFleetCost;

  const normalCo2 = Math.round(normalFuel * 2.68);
  const greenFleetCo2 = Math.round(greenFleetFuel * 2.68);
  const savedCo2 = normalCo2 - greenFleetCo2;

  const speed = result.average_speed_kmh ?? 60;
  const travelHours = (result.distance_km / Math.max(1, speed)).toFixed(1);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-xs text-emerald-700 font-mono font-extrabold uppercase">RESULTS SUMMARY</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">YOUR TRIP ESTIMATE 🎯</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> High Accuracy Model
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1">
        <span className="text-slate-600 text-xs font-bold">Your trip is estimated to use:</span>
        <div className="text-4xl font-extrabold text-amber-900 font-mono">{greenFleetFuel} L</div>
      </div>

      {/* 3 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
          <span className="text-2xl block">💰</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono">₹{greenFleetCost.toLocaleString()}</span>
          <span className="text-slate-600 text-xs font-bold block">Estimated fuel cost</span>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
          <span className="text-2xl block">🌱</span>
          <span className="text-2xl font-extrabold text-teal-800 font-mono">{greenFleetCo2} kg</span>
          <span className="text-slate-600 text-xs font-bold block">Estimated CO₂e</span>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
          <span className="text-2xl block">⏱</span>
          <span className="text-2xl font-extrabold text-blue-800 font-mono">{travelHours} h</span>
          <span className="text-slate-600 text-xs font-bold block">Estimated travel time</span>
        </div>
      </div>

      {/* Friendly Sentence & Action */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-white font-extrabold text-sm block">Want to see if GreenFleet can find a better option?</span>
          <span className="text-emerald-100 text-xs">Compare alternative routes and prioritize cost, emissions or time.</span>
        </div>

        <button
          onClick={() => {
            if (onFindBetterRoute) onFindBetterRoute();
          }}
          className="px-6 py-3 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-sm transition-all shadow-md flex items-center gap-2 group whitespace-nowrap"
        >
          <span>Find a Better Route →</span>
        </button>
      </div>
    </div>
  );
};
