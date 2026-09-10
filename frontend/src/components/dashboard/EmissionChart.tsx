import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { InfoTooltip } from '../common/InfoTooltip';
import { useLanguage } from '../../context/LanguageContext';

const emissionData = [
  { fuel: 'Diesel Trucks', co2: 5200, ch4: 140, n2o: 180 },
  { fuel: 'Petrol Vans', co2: 2400, ch4: 90, n2o: 70 },
  { fuel: 'CNG Vehicles', co2: 1200, ch4: 210, n2o: 30 },
  { fuel: 'Electric Fleet', co2: 480, ch4: 15, n2o: 10 },
];

export const EmissionChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center">
            {t('pollutionSourceTitle', 'Where Does Pollution Come From?')}
            <InfoTooltip text="CO₂e means carbon-dioxide-equivalent emissions. It is a standard way of comparing different greenhouse gases." title="What is CO₂e?" />
          </h3>
          <p className="text-xs text-slate-700 font-medium mt-0.5">{t('pollutionSourceSub', 'This chart shows estimated emissions from different vehicle and fuel types.')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
          Standard Emission Factors
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emissionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="fuel" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Legend />
            <Bar dataKey="co2" name={t('co2EmissionsName', 'CO₂ Emissions (kg)')} fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ch4" name={t('ch4GasName', 'CH₄ Gas Equivalent (kg)')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="n2o" name={t('n2oGasName', 'N₂O Gas Equivalent (kg)')} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
