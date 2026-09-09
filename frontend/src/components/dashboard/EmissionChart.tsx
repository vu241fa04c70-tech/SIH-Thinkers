import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const emissionData = [
  { fuel: 'Diesel Trucks', co2: 5200, ch4: 140, n2o: 180 },
  { fuel: 'Petrol Vans', co2: 2400, ch4: 90, n2o: 70 },
  { fuel: 'CNG Vehicles', co2: 1200, ch4: 210, n2o: 30 },
  { fuel: 'Electric Fleet', co2: 480, ch4: 15, n2o: 10 },
];

export const EmissionChart: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">GHG Emissions Breakdown (IPCC Well-to-Wheel)</h3>
          <p className="text-xs text-slate-400">Emissions in $kg CO_2e$ per fuel category</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
          WTW Standards
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emissionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="fuel" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
            <Legend />
            <Bar dataKey="co2" name="CO2 Emissions (kg)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ch4" name="CH4 Equivalent (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="n2o" name="N2O Equivalent (kg)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
