import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrip: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartTrip
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6 text-slate-900 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-700 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">{t('firstTimeGuide', 'First-Time Guide')}</span>
            <h2 className="text-2xl font-extrabold text-slate-900">{t('welcomeTitle', 'Welcome to GreenFleet 👋')}</h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {t('welcomeSub', 'GreenFleet helps you choose smarter routes that can reduce fuel use, operating cost and emissions.')}
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">{t('howItWorks4Steps', 'How It Works in 4 Steps')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="font-extrabold text-emerald-800 block text-sm">1️⃣ {t('step1Title', 'Choose vehicle')}</span>
              <span className="text-slate-600">{t('step1Desc', 'Select your truck, van, or cargo ship')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1">
              <span className="font-extrabold text-teal-800 block text-sm">2️⃣ {t('step2Title', 'Enter trip')}</span>
              <span className="text-slate-600">{t('step2Desc', 'Set distance, cargo weight & speed')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
              <span className="font-extrabold text-amber-800 block text-sm">3️⃣ {t('step3Title', 'Compare routes')}</span>
              <span className="text-slate-600">{t('step3Desc', 'See fuel, cost, & emissions comparison')}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
              <span className="font-extrabold text-purple-800 block text-sm">4️⃣ {t('step4Title', 'Choose best option')}</span>
              <span className="text-slate-600">{t('step4Desc', 'Save fuel and lower operating cost')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onStartTrip();
              onClose();
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 group"
          >
            <span>{t('letsPlanTripBtn', "Let's Plan a Trip →")}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all border border-slate-200"
          >
            {t('skipTutorial', 'Skip Tutorial')}
          </button>
        </div>
      </div>
    </div>
  );
};
