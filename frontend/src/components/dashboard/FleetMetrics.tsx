import React from 'react';
import { Truck, CloudRain, Fuel, TrendingDown, DollarSign } from 'lucide-react';

interface SummaryData {
  total_vehicles: number;
  active_vehicles: number;
  ghg_emitted_today_kg: number;
  ghg_saved_today_kg: number;
  fuel_consumed_today_liters: number;
  fuel_saved_today_liters: number;
  cost_savings_today_usd: number;
  fleet_efficiency_score: number;
}

export const FleetMetrics: React.FC<{ summary?: SummaryData }> = ({ summary }) => {
  const cards = [
    {
      title: "Active Fleet Vehicles",
      value: `${summary?.active_vehicles || 44} / ${summary?.total_vehicles || 52}`,
      subtext: "84.6% Operational Rate",
      icon: Truck,
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/40",
    },
    {
      title: "GHG Saved Today",
      value: `${summary?.ghg_saved_today_kg || 1641.2} kg`,
      subtext: "Well-to-Wheel CO2e Reduction",
      icon: CloudRain,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/40",
    },
    {
      title: "Fuel Savings Today",
      value: `${summary?.fuel_saved_today_liters || 612.4} L`,
      subtext: "21.5% Below Baseline",
      icon: Fuel,
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/40",
    },
    {
      title: "Daily Cost Savings",
      value: `$${summary?.cost_savings_today_usd || 734.88}`,
      subtext: "Estimated $268K Annualized",
      icon: DollarSign,
      color: "text-teal-400",
      bg: "bg-teal-950/40 border-teal-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`p-5 rounded-2xl border ${card.bg} backdrop-blur flex flex-col justify-between transition-all hover:scale-[1.01]`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{card.title}</span>
              <div className={`p-2 rounded-xl bg-slate-900/60 ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-white tracking-tight">{card.value}</div>
              <div className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
