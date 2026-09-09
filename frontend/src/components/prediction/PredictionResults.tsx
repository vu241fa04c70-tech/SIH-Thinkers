import React from 'react';
import { SinglePredictionResult } from '../../types/prediction';
import { Fuel, Cloud, ShieldCheck, Cpu } from 'lucide-react';

export const PredictionResults: React.FC<{ result: SinglePredictionResult }> = ({ result }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-emerald-400 font-mono font-semibold">PREDICTION REF #{result.id.slice(0, 8)}</span>
          <h3 className="text-lg font-bold text-white mt-0.5">Prediction Results & Multi-Gas Breakdown</h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" /> Confidence Score: {(result.confidence_score * 100).toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Fuel Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Predicted Fuel Consumption</span>
            <Fuel className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {result.predicted_fuel_liters} <span className="text-sm font-normal text-slate-400">Liters</span>
          </div>
          <p className="text-xs text-slate-400">Est. {(result.predicted_fuel_liters / result.distance_km * 100).toFixed(1)} L / 100 km rate</p>
        </div>

        {/* GHG Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Well-to-Wheel Total GHG</span>
            <Cloud className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {result.predicted_ghg_kg} <span className="text-sm font-normal text-slate-400">kg CO2e</span>
          </div>
          <p className="text-xs text-slate-400">IPCC 2026 Tier 2 Standards</p>
        </div>
      </div>

      {/* Gas Breakdown Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs">
        <div>
          <span className="text-slate-400 block mb-1">CO2 Emissions</span>
          <span className="text-slate-200 font-bold text-sm">{result.co2_kg} kg</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-1">CH4 Equivalent</span>
          <span className="text-slate-200 font-bold text-sm">{result.ch4_kg} kg</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-1">N2O Equivalent</span>
          <span className="text-slate-200 font-bold text-sm">{result.n2o_kg} kg</span>
        </div>
      </div>

      {/* Model Ensemble Weights */}
      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-semibold text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400" /> Multi-Model Ensemble Output
          </span>
          <span>XGB (70%) + LGBM (20%) + RF (10%)</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">XGBoost</span>
            <span className="font-mono text-emerald-400 font-bold">{result.model_ensemble.xgboost} L</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">LightGBM</span>
            <span className="font-mono text-teal-400 font-bold">{result.model_ensemble.lightgbm} L</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block text-[10px]">RandomForest</span>
            <span className="font-mono text-blue-400 font-bold">{result.model_ensemble.random_forest} L</span>
          </div>
        </div>
      </div>
    </div>
  );
};
