import React from 'react';
import { Fuel, DollarSign, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';

interface BeforeAfterProps {
  baselineFuel?: number;
  optimizedFuel?: number;
  fuelUnit?: string;
  currencySymbol?: string;
  fuelPricePerUnit?: number;
  co2Multiplier?: number;
}

export const BeforeAfterCard: React.FC<BeforeAfterProps> = ({
  baselineFuel = 500,
  optimizedFuel = 420,
  fuelUnit = 'L',
  currencySymbol = '₹',
  fuelPricePerUnit = 100, // ₹100/L default
  co2Multiplier = 2.68
}) => {
  const savedFuel = Math.max(0, baselineFuel - optimizedFuel);
  const baselineCost = Math.round(baselineFuel * fuelPricePerUnit);
  const optimizedCost = Math.round(optimizedFuel * fuelPricePerUnit);
  const savedCost = Math.max(0, baselineCost - optimizedCost);

  const baselineCo2 = Math.round(baselineFuel * co2Multiplier);
  const optimizedCo2 = Math.round(optimizedFuel * co2Multiplier);
  const savedCo2 = Math.max(0, baselineCo2 - optimizedCo2);

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-slate-900">Before vs After GreenFleet Comparison</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          Proven Impact
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* WITHOUT GREENFLEET */}
        <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-red-700 uppercase tracking-wider">
            <span>Without GreenFleet</span>
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 text-[10px]">Unoptimized</span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans"><Fuel className="w-4 h-4 text-amber-600" /> Fuel Used:</span>
              <span className="font-extrabold text-slate-900">{baselineFuel} {fuelUnit}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans"><DollarSign className="w-4 h-4 text-emerald-600" /> Trip Cost:</span>
              <span className="font-extrabold text-slate-900">{currencySymbol}{baselineCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans"><Cloud className="w-4 h-4 text-slate-500" /> CO₂e Emitted:</span>
              <span className="font-extrabold text-slate-700">{baselineCo2} kg</span>
            </div>
          </div>
        </div>

        {/* WITH GREENFLEET */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
            <span>With GreenFleet</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px]">Optimized</span>
          </div>

          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 font-sans"><Fuel className="w-4 h-4 text-amber-600" /> Fuel Used:</span>
              <span className="font-extrabold text-emerald-700">{optimizedFuel} {fuelUnit}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 font-sans"><DollarSign className="w-4 h-4 text-emerald-600" /> Trip Cost:</span>
              <span className="font-extrabold text-emerald-700">{currencySymbol}{optimizedCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 font-sans"><Cloud className="w-4 h-4 text-teal-600" /> CO₂e Emitted:</span>
              <span className="font-extrabold text-teal-700">{optimizedCo2} kg</span>
            </div>
          </div>
        </div>

        {/* YOUR SAVINGS RESULT */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-extrabold text-emerald-100 uppercase tracking-wider">
            <span>Your Net Savings</span>
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>

          <div className="space-y-2 text-xs font-extrabold">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-between">
              <span className="text-emerald-100">Fuel Saved:</span>
              <span className="text-white font-mono text-sm">{savedFuel} {fuelUnit} Saved</span>
            </div>
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-between">
              <span className="text-emerald-100">Money Saved:</span>
              <span className="text-white font-mono text-sm">{currencySymbol}{savedCost.toLocaleString()} Saved</span>
            </div>
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-between">
              <span className="text-emerald-100">Emissions Avoided:</span>
              <span className="text-white font-mono text-sm">{savedCo2} kg CO₂e Avoided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
