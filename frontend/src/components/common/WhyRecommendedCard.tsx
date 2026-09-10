import React from 'react';
import { CheckCircle2, ThumbsUp, Fuel, DollarSign, Cloud, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface WhyRecommendedProps {
  routeName?: string;
  fuelSavedLiters?: number;
  moneySavedVal?: number;
  co2AvoidedKg?: number;
  extraTimeMinutes?: number;
  cargoCapacityKg?: number;
  currencySymbol?: string;
}

export const WhyRecommendedCard: React.FC<WhyRecommendedProps> = ({
  routeName = "Highway Bypass Route A",
  fuelSavedLiters = 62,
  moneySavedVal = 5200,
  co2AvoidedKg = 140,
  extraTimeMinutes = 8,
  cargoCapacityKg = 18000,
  currencySymbol = "₹"
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-6 sm:p-8 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-slate-900">{t('recRouteChoice', '⭐ Recommended Route Choice')}</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          {routeName}
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-extrabold text-emerald-800 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {t('whyChooseRoute', 'Why did GreenFleet choose this route?')}
        </h4>
        <p className="text-xs text-slate-700 font-medium">
          {t('bestOverallBalance', 'This route was selected because it provides the best overall balance based on your preferences:')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold pt-1">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {t('usesLessFuel', `Uses ${fuelSavedLiters} L less fuel`).replace('{fuel}', String(fuelSavedLiters))}
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {t('savesMoneyVal', `Saves ${currencySymbol}${moneySavedVal.toLocaleString()}`).replace('{money}', `${currencySymbol}${moneySavedVal.toLocaleString()}`)}
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {t('producesLessCo2', `Produces ${co2AvoidedKg} kg less CO₂e`).replace('{co2}', String(co2AvoidedKg))}
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {t('meetsCargo', `Meets cargo requirement (${cargoCapacityKg.toLocaleString()} kg)`).replace('{cargo}', cargoCapacityKg.toLocaleString())}
            </span>
            <span className="font-mono text-emerald-700">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
