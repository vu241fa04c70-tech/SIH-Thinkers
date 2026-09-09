import React from 'react';
import { CheckCircle2, ThumbsUp, Fuel, DollarSign, Cloud, Clock, ShieldCheck } from 'lucide-react';

interface WhyRecommendedProps {
  routeName?: string;
  fuelSavedLiters?: number;
  moneySavedVal?: number;
  co2AvoidedKg?: number;
  extraTimeMinutes?: number;
  cargoCapacityKg?: number;
  currencySymbol?: string;
}

export const WhyRecommendedCard: React.FC<WhyRecommendedProps> = ({
  routeName = "Highway Bypass Route A",
  fuelSavedLiters = 62,
  moneySavedVal = 5200,
  co2AvoidedKg = 140,
  extraTimeMinutes = 8,
  cargoCapacityKg = 18000,
  currencySymbol = "₹"
}) => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-slate-900">⭐ Recommended Route Choice</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          {routeName}
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-extrabold text-emerald-800 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Why did GreenFleet choose this route?
        </h4>
        <p className="text-xs text-slate-500 font-medium">
          This route was selected because it provides the best overall balance based on your preferences:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold pt-1">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Uses {fuelSavedLiters} L less fuel
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Saves {currencySymbol}{moneySavedVal.toLocaleString()}
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Produces {co2AvoidedKg} kg less CO₂e
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Meets cargo requirement ({cargoCapacityKg.toLocaleString()} kg)
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
