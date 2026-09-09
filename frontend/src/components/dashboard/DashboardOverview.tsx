import React, { useEffect, useState } from 'react';
import { FleetMetrics } from './FleetMetrics';
import { PredictionChart } from './PredictionChart';
import { EmissionChart } from './EmissionChart';
import { optimizationService } from '../../services/optimizationService';
import { CheckCircle2 } from 'lucide-react';

interface DashboardOverviewProps {
  viewMode?: 'simple' | 'technical';
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ viewMode = 'simple' }) => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    optimizationService.getAnalyticsSummary().then(setSummary).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 text-slate-900">
      {/* Friendly Welcome Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Welcome back, Fleet Manager
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Today's Fleet Summary & Fuel Savings
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Here is your daily snapshot of active vehicles, fuel saved, and pollution avoided.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-xs text-slate-500 block font-semibold">Fuel Saved</span>
            <span className="text-xl font-extrabold text-emerald-700">21.5% Saved</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-center">
            <span className="text-xs text-slate-500 block font-semibold">Money Saved Today</span>
            <span className="text-xl font-extrabold text-teal-700">₹61,000</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <FleetMetrics summary={summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionChart />
        <EmissionChart />
      </div>
    </div>
  );
};
