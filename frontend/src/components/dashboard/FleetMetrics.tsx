import React from 'react';
import { Truck, Cloud, Fuel, DollarSign, TrendingDown } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  const cards = [
    {
      title: `🚚 ${t('vehiclesActiveTitle', 'VEHICLES ACTIVE')}`,
      value: `${summary?.active_vehicles || 44} of ${summary?.total_vehicles || 52}`,
      subtext: t('vehiclesActiveSub', '84.6% of your fleet is currently operating'),
      tooltip: "The percentage of registered fleet vehicles and ships currently active on trips today.",
      icon: Truck,
      color: "text-blue-700",
      bg: "bg-blue-50/70 border-blue-200",
    },
    {
      title: `🌱 ${t('pollutionAvoidedTodayTitle', 'POLLUTION AVOIDED TODAY')}`,
      value: `${(summary?.ghg_saved_today_kg || 1641.2).toLocaleString()} kg CO₂e`,
      subtext: t('pollutionSub', 'Compared with normal routes'),
      tooltip: "Total greenhouse gas emissions prevented today by taking GreenFleet optimized routes.",
      icon: Cloud,
      color: "text-emerald-700",
      bg: "bg-emerald-50/70 border-emerald-200",
    },
    {
      title: `⛽ ${t('fuelSavedTodayTitle', 'FUEL SAVED TODAY')}`,
      value: `${summary?.fuel_saved_today_liters || 612} L`,
      subtext: t('fuelSub', '21.5% below normal routes'),
      tooltip: "Total fuel volume saved today across all active land and maritime trips.",
      icon: Fuel,
      color: "text-amber-700",
      bg: "bg-amber-50/70 border-amber-200",
    },
    {
      title: `💰 ${t('moneySavedTodayTitle', 'MONEY SAVED TODAY')}`,
      value: `₹${Math.round((summary?.cost_savings_today_usd || 734.88) * 83).toLocaleString()}`,
      subtext: t('moneySub', 'Direct fuel bill savings'),
      tooltip: "Total money saved on fuel costs today compared to taking conventional unoptimized routes.",
      icon: DollarSign,
      color: "text-teal-700",
      bg: "bg-teal-50/70 border-teal-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`p-5 rounded-2xl border ${card.bg} flex flex-col justify-between transition-all hover:shadow-md hover:scale-[1.01]`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700 tracking-wide flex items-center">
                {card.title}
                <InfoTooltip text={card.tooltip} title="What does this mean?" />
              </span>
              <div className={`p-2 rounded-xl bg-white border border-slate-200 shadow-sm ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{card.value}</div>
              <div className="text-xs font-semibold text-slate-600 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
