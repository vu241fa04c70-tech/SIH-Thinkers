import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { InfoTooltip } from '../common/InfoTooltip';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center">
            {t('fuelSavingsTitle', 'How Much Fuel Are We Saving?')}
            <InfoTooltip text="Compares daily fleet fuel consumption between taking normal routes vs GreenFleet optimized routes." />
          </h3>
          <p className="text-xs text-slate-700 font-medium mt-0.5">{t('fuelSavingsSub', "GreenFleet's routes use less fuel than normal routes.")}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          {t('avgSavingsBadge', '-21.3% Average Savings')}
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Legend />
            <Area type="monotone" dataKey="baseline" name={t('normalRoute', 'Normal Route')} stroke="#f59e0b" fillOpacity={1} fill="url(#colorBaseline)" />
            <Area type="monotone" dataKey="optimized" name={t('greenFleetRoute', 'GreenFleet Route')} stroke="#10b981" fillOpacity={1} fill="url(#colorOptimized)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
