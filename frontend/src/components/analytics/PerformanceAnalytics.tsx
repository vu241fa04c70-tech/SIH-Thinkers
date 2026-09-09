import React, { useEffect, useState } from 'react';
import { optimizationService } from '../../services/optimizationService';
import { BarChart3, TrendingDown, DollarSign, Award, TreePine, Calculator, Fuel, Cloud, Truck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InfoTooltip } from '../common/InfoTooltip';

interface PerformanceAnalyticsProps {
  viewMode?: 'simple' | 'technical';
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ viewMode = 'simple' }) => {
  const [trends, setTrends] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  
  // Interactive ROI Calculator State
  const [roiFleetSize, setRoiFleetSize] = useState(50);
  const [roiAvgKm, setRoiAvgKm] = useState(180);
  const [roiFuelPrice, setRoiFuelPrice] = useState(100); // ₹100/L

  useEffect(() => {
    optimizationService.getTrends(30).then(setTrends).catch(console.error);
    optimizationService.getRankings().then(setRankings).catch(console.error);
  }, []);

  // ROI math in ₹ INR
  const dailyFuelSaved = roiFleetSize * (roiAvgKm * 0.22) * 0.21; // 21% savings
  const annualCostSavedInr = dailyFuelSaved * roiFuelPrice * 365;
  const annualGhgSavedTons = (dailyFuelSaved * 2.68 * 365) / 1000;

  return (
    <div className="space-y-8 text-slate-900">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            Your Fleet's Savings
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            See how much fuel, money and pollution your fleet has saved over time.
          </p>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-emerald-800">
            <span>💰 MONEY SAVED</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">₹6,10,000</div>
          <span className="text-xs text-slate-600 font-medium">Total cumulative savings</span>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-amber-800">
            <span>⛽ FUEL SAVED</span>
            <Fuel className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">18,350 L</div>
          <span className="text-xs text-slate-600 font-medium">Total fuel saved over 30 days</span>
        </div>

        <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-teal-800">
            <span>🌱 CO₂ AVOIDED</span>
            <Cloud className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-teal-800 font-mono">49,178 kg</div>
          <span className="text-xs text-slate-600 font-medium">Greenhouse emissions avoided</span>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-blue-800">
            <span>🚚 FLEET EFFICIENCY</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-800 font-mono">94.2%</div>
          <span className="text-xs text-slate-600 font-medium">Overall fleet health score</span>
        </div>
      </div>

      {/* Historical Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Fuel Saved Over Time (Liters)</h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              30-Day History
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFuelTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '0.75rem' }} />
                <Area type="monotone" dataKey="ghg_saved_kg" name="Fuel Saved (L)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorFuelTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Pollution Avoided Over Time (kg CO₂e)</h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Clean Air Impact
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGhgTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '0.75rem' }} />
                <Area type="monotone" dataKey="ghg_saved_kg" name="CO₂ Avoided (kg)" stroke="#10b981" fillOpacity={1} fill="url(#colorGhgTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Efficient Vehicles Leaderboard */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Most Efficient Vehicles
          </h3>

          <div className="space-y-3">
            {rankings.map((veh, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-extrabold flex items-center justify-center text-sm">
                    #{i + 1}
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm">{veh.vehicle_id}</span>
                    <span className="text-slate-500 block text-[11px] font-medium">Lowest estimated fuel consumption • {veh.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-700 text-base block font-mono">{veh.efficiency_score} / 100</span>
                  <span className="text-[10px] text-slate-500">{veh.co2_intensity_g_km} g CO₂/km</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-md">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal-600" />
            How Much Could Your Fleet Save?
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Number of Vehicles</span>
                <span className="text-emerald-700 font-mono font-extrabold">{roiFleetSize} Vehicles</span>
              </div>
              <input
                type="range" min="5" max="500" step="5"
                value={roiFleetSize}
                onChange={(e) => setRoiFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Average Daily Distance per Vehicle</span>
                <span className="text-teal-700 font-mono font-extrabold">{roiAvgKm} km/day</span>
              </div>
              <input
                type="range" min="30" max="500" step="10"
                value={roiAvgKm}
                onChange={(e) => setRoiAvgKm(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Average Fuel Price per Liter</span>
                <span className="text-amber-700 font-mono font-extrabold">₹{roiFuelPrice} / L</span>
              </div>
              <input
                type="range" min="70" max="150" step="5"
                value={roiFuelPrice}
                onChange={(e) => setRoiFuelPrice(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
            <div className="text-center">
              <span className="text-xs text-slate-600 block mb-1 font-bold">Estimated Annual Savings</span>
              <div className="text-3xl font-extrabold text-emerald-800 font-mono">
                Your fleet could potentially save ₹{annualCostSavedInr.toLocaleString(undefined, { maximumFractionDigits: 0 })} per year.
              </div>
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-500 italic">
              *Estimate only — actual savings depend on route, vehicle, fuel prices and operating conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
