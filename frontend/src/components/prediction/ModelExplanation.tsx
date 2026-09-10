import React from 'react';
import { ShapContribution } from '../../types/prediction';
import { HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ModelExplanation: React.FC<{ shapExplanations: ShapContribution[] }> = ({ shapExplanations }) => {
  const { t } = useLanguage();
  const maxVal = Math.max(...shapExplanations.map(s => Math.abs(s.impact_value)), 1.0);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">{t('whyTripFuel', 'Why Your Trip Uses This Much Fuel')}</h3>
        </div>
        <span className="text-xs text-slate-700 font-bold">{t('easyFuelFactors', 'Easy Fuel Factors')}</span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed">
        {t('shapBreakdownSub', 'Here is a simple breakdown of what increased or decreased your fuel consumption for this trip:')}
      </p>

      <div className="space-y-3 pt-2">
        {shapExplanations.map((item, idx) => {
          const isPositive = item.impact_value >= 0;
          const percentage = Math.min(100, (Math.abs(item.impact_value) / maxVal) * 100);

          return (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{item.feature}</span>
                <span className={`font-mono font-bold ${isPositive ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {isPositive ? `+${item.impact_value} L` : `${item.impact_value} L`}
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPositive ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-700">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
