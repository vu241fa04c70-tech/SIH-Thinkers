import React from 'react';
import { Leaf, Github, Twitter, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-6 text-xs text-slate-600 rounded-3xl mt-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">GREENFLEET <span className="text-emerald-700 font-extrabold text-xs">AI</span></span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            {t('footerTagline')}
          </p>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">{t('techStack')}</h4>
          <ul className="space-y-2 font-medium text-slate-600">
            <li>{t('footerTech1', 'FastAPI Python Microservices')}</li>
            <li>{t('footerTech2', 'XGBoost & LightGBM Ensembles')}</li>
            <li>{t('footerTech3', 'SHAP Additive Explanations')}</li>
            <li>{t('footerTech4', 'Simulated Annealing QUBO')}</li>
            <li>{t('footerTech5', 'React 18 + TypeScript + Leaflet')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">{t('coreModules')}</h4>
          <ul className="space-y-2 font-medium text-slate-600">
            <li>{t('footerMod1', 'AI Fuel & GHG Predictor')}</li>
            <li>{t('footerMod2', 'Quantum QUBO Route Solver')}</li>
            <li>{t('footerMod3', 'Interactive Leaflet Map')}</li>
            <li>{t('footerMod4', 'Vehicle Eco Leaderboard')}</li>
            <li>{t('footerMod5', 'Annual Carbon ROI Calculator')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 text-xs uppercase tracking-wider">{t('sihAttribution')}</h4>
          <p className="text-slate-600 leading-relaxed mb-3 font-medium">
            {t('sihDesc')}
          </p>
          <div className="flex items-center space-x-2 text-slate-700 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('ipccStandards')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-slate-700 font-medium">
          © 2026 GREENFLEET AI. SIH Thinkers Team. {t('allRightsReserved')}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-slate-700 font-medium">
          <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> {t('builtWith')}
        </div>
      </div>
    </footer>
  );
};
