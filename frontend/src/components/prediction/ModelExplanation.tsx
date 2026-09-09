import React from 'react';
import { ShapContribution } from '../../types/prediction';
import { Sparkles, HelpCircle } from 'lucide-react';

export const ModelExplanation: React.FC<{ shapExplanations: ShapContribution[] }> = ({ shapExplanations }) => {
  const maxVal = Math.max(...shapExplanations.map(s => Math.abs(s.impact_value)), 1.0);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">SHAP Feature Explanation & Model Transparency</h3>
        </div>
        <span className="text-xs text-slate-400">Additive Feature Attribution</span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        SHAP (SHapley Additive exPlanations) values quantify how much each physical feature increased or decreased fuel consumption relative to expected baseline.
      </p>

      <div className="space-y-3 pt-2">
        {shapExplanations.map((item, idx) => {
          const isPositive = item.impact_value >= 0;
          const percentage = Math.min(100, (Math.abs(item.impact_value) / maxVal) * 100);

          return (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">{item.feature}</span>
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

              <p className="text-[11px] text-slate-500">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
