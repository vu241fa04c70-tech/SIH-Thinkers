import React, { useEffect, useState } from 'react';
import { FleetMetrics } from './FleetMetrics';
import { PredictionChart } from './PredictionChart';
import { EmissionChart } from './EmissionChart';
import { optimizationService } from '../../services/optimizationService';
import { Sparkles, ShieldCheck, Activity, MapPin } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    optimizationService.getAnalyticsSummary().then(setSummary).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" /> Quantum QUBO Engine Active
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            GreenFleet AI Fleet Command Center
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Multi-objective optimization combining XGBoost fuel predictions, SHAP model explainability, IPCC GHG emissions calculation, and Simulated Annealing route optimization.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Avg MAPE Error</span>
            <span className="text-lg font-bold text-emerald-400">&lt; 4.8%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Target GHG Saved</span>
            <span className="text-lg font-bold text-teal-400">22.4%</span>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <FleetMetrics summary={summary} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionChart />
        <EmissionChart />
      </div>

      {/* Live System Alerts & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Active Route Optimization Solvers
            </h3>
            <span className="text-xs text-slate-400">Simulated Annealing + Tabu Search</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'QUBO-104', title: 'Mumbai-Thane Corridor Route', status: 'Completed in 142ms', savings: '23.4% Fuel Reduced', badge: 'bg-emerald-950 text-emerald-300' },
              { id: 'QUBO-105', title: 'Navi Mumbai Delivery Allocation', status: 'Completed in 98ms', savings: '19.8% GHG Reduced', badge: 'bg-teal-950 text-teal-300' },
              { id: 'QUBO-106', title: 'Bhiwandi Depot Heavy Vehicles', status: 'Completed in 210ms', savings: '21.0% Cost Saved', badge: 'bg-blue-950 text-blue-300' },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 font-mono text-xs">
                    {item.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <span className="text-xs text-slate-400">{item.status}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 ${item.badge}`}>
                  {item.savings}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact Compliance */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Sustainability Compliance
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">IPCC Tier 2 Emission Standards</span>
              Calculates direct combustion plus Well-to-Tank upstream electricity and fuel processing emissions.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-1">Tree Equivalent Offset</span>
              1,641 kg CO2 saved today equivalent to <span className="text-white font-bold">75.6 trees planted</span> annually.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
