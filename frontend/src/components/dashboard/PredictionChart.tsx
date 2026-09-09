import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', baseline: 3200, optimized: 2520, saved: 680 },
  { day: 'Tue', baseline: 3450, optimized: 2710, saved: 740 },
  { day: 'Wed', baseline: 3100, optimized: 2440, saved: 660 },
  { day: 'Thu', baseline: 3600, optimized: 2830, saved: 770 },
  { day: 'Fri', baseline: 3800, optimized: 2980, saved: 820 },
  { day: 'Sat', baseline: 2900, optimized: 2280, saved: 620 },
  { day: 'Sun', baseline: 2400, optimized: 1890, saved: 510 },
];

export const PredictionChart: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Fuel Consumption: Baseline vs AI Optimized</h3>
          <p className="text-xs text-slate-400">Weekly tracking in liters (L)</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
          -21.3% Average Reduction
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
            <Legend />
            <Area type="monotone" dataKey="baseline" name="Baseline (Unoptimized L)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorBaseline)" />
            <Area type="monotone" dataKey="optimized" name="QUBO Optimized (L)" stroke="#10b981" fillOpacity={1} fill="url(#colorOptimized)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
