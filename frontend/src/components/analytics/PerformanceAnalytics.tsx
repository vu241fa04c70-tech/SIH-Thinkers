import React, { useEffect, useState } from 'react';
import { optimizationService } from '../../services/optimizationService';
import { BarChart3, TrendingDown, DollarSign, Award, TreePine, Calculator } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const PerformanceAnalytics: React.FC = () => {
  const [trends, setTrends] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  
  // Interactive ROI Calculator State
  const [roiFleetSize, setRoiFleetSize] = useState(50);
  const [roiAvgKm, setRoiAvgKm] = useState(180);

  useEffect(() => {
    optimizationService.getTrends(30).then(setTrends).catch(console.error);
    optimizationService.getRankings().then(setRankings).catch(console.error);
  }, []);

  // ROI math
  const dailyFuelSaved = roiFleetSize * (roiAvgKm * 0.22) * 0.21; // 21% savings
  const annualCostSaved = dailyFuelSaved * 1.25 * 365;
  const annualGhgSavedTons = (dailyFuelSaved * 2.68 * 365) / 1000;

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            Performance Analytics & Carbon Footprint ROI
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track historical GHG reductions, vehicle eco-rankings, and calculate fleet ROI savings
          </p>
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">30-Day Cumulative GHG Carbon Emission Saved (kg CO2e)</h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
            Total 49.2 Metric Tons Saved
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGhg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="ghg_saved_kg" name="GHG Saved (kg CO2e)" stroke="#10b981" fillOpacity={1} fill="url(#colorGhg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vehicle Eco-Ranking Leaderboard */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Fleet Efficiency Leaderboard
          </h3>

          <div className="space-y-3">
            {rankings.map((veh, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold flex items-center justify-center">
                    #{i + 1}
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">{veh.vehicle_id}</span>
                    <span className="text-slate-500 block text-[11px]">{veh.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400 text-sm block">{veh.efficiency_score} / 100</span>
                  <span className="text-[10px] text-slate-400">{veh.co2_intensity_g_km} g CO2/km</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive ROI & Carbon Offset Calculator */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-400" />
            Interactive Fleet ROI & Sustainability Calculator
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Fleet Vehicle Count</span>
                <span className="text-emerald-400 font-mono">{roiFleetSize} Vehicles</span>
              </div>
              <input
                type="range" min="5" max="500" step="5"
                value={roiFleetSize}
                onChange={(e) => setRoiFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-300 mb-1">
                <span>Avg Daily Distance per Vehicle</span>
                <span className="text-teal-400 font-mono">{roiAvgKm} km/day</span>
              </div>
              <input
                type="range" min="30" max="500" step="10"
                value={roiAvgKm}
                onChange={(e) => setRoiAvgKm(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Projected Annual Cost Savings</span>
                <span className="text-2xl font-extrabold text-emerald-400">${annualCostSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Annual GHG Emission Reduced</span>
                <span className="text-2xl font-extrabold text-teal-400">{annualGhgSavedTons.toFixed(1)} Tons</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-400" />
              Equivalent to <span className="font-bold text-white">{(annualGhgSavedTons * 46).toFixed(0)} mature trees</span> absorbing carbon annually.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
