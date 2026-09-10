import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { AnimatedLogisticsDemo } from './AnimatedLogisticsDemo';
import { FeaturesSection } from './FeaturesSection';
import { StatisticsSection } from './StatisticsSection';
import { Footer } from './Footer';
import { LoginModal } from './LoginModal';
import { VideoDemoModal } from './VideoDemoModal';
import { BeforeAfterCard } from '../common/BeforeAfterCard';
import { WhyRecommendedCard } from '../common/WhyRecommendedCard';
import { InfoTooltip } from '../common/InfoTooltip';
import { ArrowRight, CheckCircle2, Cpu, ChevronDown, ChevronUp, DollarSign, ShieldCheck, Truck, MapPin, Compass, BarChart3, Fuel, Cloud, Leaf, Settings, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  onNavigateToApp: (tab?: string) => void;
  viewMode?: 'simple' | 'technical';
}

export const LandingPage: React.FC<Props> = ({ onNavigateToApp, viewMode = 'simple' }) => {
  const { t } = useLanguage();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCalcExplainedOpen, setIsCalcExplainedOpen] = useState(false);

  return (
    <div className="space-y-10 text-slate-900">
      {/* 1. TOP WELCOME & 3 LARGE FEATURE CARDS */}
      <div className="space-y-6">
        {/* 1. TOP WELCOME CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-xs font-extrabold text-emerald-800 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" /> {t('assistantBadge')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('welcomeTitle')}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 font-bold">
            {t('welcomeSub')}
          </p>
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
              {t('whatToDo')}
            </span>
          </div>
        </div>

        {/* 3 LARGE FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-3xl shadow-sm">
                🚚
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{t('planTrip').toUpperCase()}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('descPlanTrip')}
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('predictions')}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <span>{t('btnPlanTrip')}</span>
            </button>
          </div>

          {/* CARD 2 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-teal-200 hover:border-teal-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 border border-teal-300 text-teal-700 flex items-center justify-center text-3xl shadow-sm">
                📍
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{t('bestRoute').toUpperCase()}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('descBestRoute')}
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('optimization')}
              className="w-full py-3.5 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              <span>{t('btnBestRoute')}</span>
            </button>
          </div>

          {/* CARD 3 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center text-3xl shadow-sm">
                💰
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{t('mySavings').toUpperCase()}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t('descMySavings')}
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('analytics')}
              className="w-full py-3.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <span>{t('btnViewSavings')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY FEATURE CARDS: MORE TOOLS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">{t('moreTools')}</h3>
          <span className="text-xs text-slate-700 font-medium">{t('moreToolsSub')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <button
            onClick={() => onNavigateToApp('fleet')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">🚚</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">{t('toolMyVehicles')}</span>
            <span className="text-slate-700 text-[11px] font-medium">{t('descToolMyVehicles')}</span>
          </button>

          <button
            onClick={() => onNavigateToApp('predictions')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">⛽</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">{t('toolFuelCalc')}</span>
            <span className="text-slate-700 text-[11px] font-medium">{t('descToolFuelCalc')}</span>
          </button>

          <button
            onClick={() => onNavigateToApp('analytics')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">📊</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">{t('toolFleetReports')}</span>
            <span className="text-slate-700 text-[11px] font-medium">{t('descToolFleetReports')}</span>
          </button>

          <button
            onClick={() => onNavigateToApp('overview')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">🌱</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">{t('toolEcoImpact')}</span>
            <span className="text-slate-700 text-[11px] font-medium">{t('descToolEcoImpact')}</span>
          </button>

          <button
            onClick={() => onNavigateToApp('about')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">⚙️</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">{t('toolAdvOptimization')}</span>
            <span className="text-slate-700 text-[11px] font-medium">{t('descToolAdvOptimization')}</span>
          </button>
        </div>
      </div>

      {/* 3. YOUR FLEET TODAY SNAPSHOT */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">{t('fleetToday')}</h3>
          <button
            onClick={() => onNavigateToApp('overview')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <span>{t('seeFullReport')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1 shadow-sm">
            <span className="text-2xl block">🚚</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">44 / 52</span>
            <span className="text-xs text-slate-600 block font-bold">{t('lblVehiclesActive')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1 shadow-sm">
            <span className="text-2xl block">⛽</span>
            <span className="text-2xl font-extrabold text-amber-700 font-mono">612 L</span>
            <span className="text-xs text-slate-600 block font-bold">{t('lblFuelSaved')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1 shadow-sm">
            <span className="text-2xl block">💰</span>
            <span className="text-2xl font-extrabold text-emerald-700 font-mono">₹734.88</span>
            <span className="text-xs text-slate-600 block font-bold">{t('lblMoneySaved')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1 shadow-sm">
            <span className="text-2xl block">🌱</span>
            <span className="text-2xl font-extrabold text-teal-700 font-mono">1,641 kg</span>
            <span className="text-xs text-slate-600 block font-bold">{t('lblCo2Avoided')}</span>
          </div>
        </div>
      </div>

      {/* 4. HOW IT WORKS 4-STEP SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-lg text-center">
        <div className="space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
            {t('simpleWorkflow')}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">{t('howItWorksTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-emerald-700 block">01</span>
            <span className="text-2xl block">🚚</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{t('step1Title')}</h4>
            <p className="text-slate-600 text-[11px] font-medium">{t('step1Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-teal-700 block">02</span>
            <span className="text-2xl block">📍</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{t('step2Title')}</h4>
            <p className="text-slate-600 text-[11px] font-medium">{t('step2Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-amber-700 block">03</span>
            <span className="text-2xl block">🤖</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{t('step3Title')}</h4>
            <p className="text-slate-600 text-[11px] font-medium">{t('step3Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-purple-700 block">04</span>
            <span className="text-2xl block">⭐</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{t('step4Title')}</h4>
            <p className="text-slate-600 text-[11px] font-medium">{t('step4Desc')}</p>
          </div>
        </div>
      </div>

      {/* 5. FRIENDLY CTA BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-center space-y-4 shadow-xl">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white">{t('readyToPlanTitle')}</h2>
          <p className="text-xs text-emerald-100 font-medium">
            {t('readyToPlanSub')}
          </p>
        </div>

        <button
          onClick={() => onNavigateToApp('predictions')}
          className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-sm transition-all shadow-lg inline-flex items-center gap-2 group transform hover:scale-[1.02]"
        >
          <span>{t('startTripBtn')}</span>
        </button>
      </div>

      {/* Hero & Interactive Animation Components */}
      <AnimatedLogisticsDemo />

      {/* Footer */}
      <Footer />

      {/* Action Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          onNavigateToApp('predictions');
        }}
      />

      <VideoDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};
