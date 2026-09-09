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
import { ArrowRight, CheckCircle2, Cpu, ChevronDown, ChevronUp, DollarSign, ShieldCheck, Truck, MapPin, Compass, BarChart3, Fuel, Cloud, Leaf, Settings } from 'lucide-react';

interface Props {
  onNavigateToApp: (tab?: string) => void;
  viewMode?: 'simple' | 'technical';
}

export const LandingPage: React.FC<Props> = ({ onNavigateToApp, viewMode = 'simple' }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCalcExplainedOpen, setIsCalcExplainedOpen] = useState(false);

  return (
    <div className="space-y-10 text-slate-900">
      {/* 1. TOP WELCOME & 3 LARGE FEATURE CARDS */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto py-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Welcome to GreenFleet 👋
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-semibold">
            Let's help you plan a smarter trip.
          </p>
        </div>

        <div className="text-center">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
            WHAT DO YOU WANT TO DO?
          </span>
        </div>

        {/* 3 LARGE FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-3xl shadow-sm">
                🚚
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">PLAN A TRIP</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Estimate fuel, cost and emissions before you travel.
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('predictions')}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <span>Plan My Trip →</span>
            </button>
          </div>

          {/* CARD 2 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-teal-200 hover:border-teal-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 border border-teal-300 text-teal-700 flex items-center justify-center text-3xl shadow-sm">
                📍
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">FIND THE BEST ROUTE</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Compare routes and choose a smarter option.
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('optimization')}
              className="w-full py-3.5 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              <span>Find Best Route →</span>
            </button>
          </div>

          {/* CARD 3 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-500 shadow-md hover:shadow-xl flex flex-col justify-between space-y-4 group transition-all transform hover:-translate-y-1">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center text-3xl shadow-sm">
                💰
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">CHECK MY SAVINGS</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                See how much fuel, money and CO₂ you've saved.
              </p>
            </div>
            <button
              onClick={() => onNavigateToApp('analytics')}
              className="w-full py-3.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <span>View Savings →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY FEATURE CARDS: MORE TOOLS */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">MORE TOOLS</h3>
          <span className="text-xs text-slate-500 font-medium">Everything you need for fleet optimization</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <button
            onClick={() => onNavigateToApp('fleet')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">🚚</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">My Vehicles</span>
            <span className="text-slate-500 text-[11px] font-medium">Manage your trucks and ships.</span>
          </button>

          <button
            onClick={() => onNavigateToApp('predictions')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">⛽</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">Fuel Calculator</span>
            <span className="text-slate-500 text-[11px] font-medium">Compare fuel options.</span>
          </button>

          <button
            onClick={() => onNavigateToApp('analytics')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">📊</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">Fleet Reports</span>
            <span className="text-slate-500 text-[11px] font-medium">See your fleet performance.</span>
          </button>

          <button
            onClick={() => onNavigateToApp('overview')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">🌱</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">Environmental Impact</span>
            <span className="text-slate-500 text-[11px] font-medium">Track emissions avoided.</span>
          </button>

          <button
            onClick={() => onNavigateToApp('about')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 text-left space-y-1.5 transition-all group shadow-sm"
          >
            <span className="text-xl block">⚙️</span>
            <span className="font-extrabold text-slate-900 block group-hover:text-emerald-700">Advanced Optimization</span>
            <span className="text-slate-500 text-[11px] font-medium">Explore technical optimization.</span>
          </button>
        </div>
      </div>

      {/* 3. YOUR FLEET TODAY SNAPSHOT */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">YOUR FLEET TODAY</h3>
          <button
            onClick={() => onNavigateToApp('overview')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <span>See full report →</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1 shadow-sm">
            <span className="text-2xl block">🚚</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">44 / 52</span>
            <span className="text-xs text-slate-600 block font-bold">Vehicles Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1 shadow-sm">
            <span className="text-2xl block">⛽</span>
            <span className="text-2xl font-extrabold text-amber-700 font-mono">612 L</span>
            <span className="text-xs text-slate-600 block font-bold">Fuel Saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1 shadow-sm">
            <span className="text-2xl block">💰</span>
            <span className="text-2xl font-extrabold text-emerald-700 font-mono">₹734.88</span>
            <span className="text-xs text-slate-600 block font-bold">Money Saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1 shadow-sm">
            <span className="text-2xl block">🌱</span>
            <span className="text-2xl font-extrabold text-teal-700 font-mono">1,641 kg</span>
            <span className="text-xs text-slate-600 block font-bold">CO₂ Avoided</span>
          </div>
        </div>
      </div>

      {/* 4. HOW IT WORKS 4-STEP SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-lg text-center">
        <div className="space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
            SIMPLE WORKFLOW
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">HOW IT WORKS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-emerald-700 block">01</span>
            <span className="text-2xl block">🚚</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Choose your vehicle</h4>
            <p className="text-slate-600 text-[11px] font-medium">Tell us what you're driving.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-teal-700 block">02</span>
            <span className="text-2xl block">📍</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Enter your trip</h4>
            <p className="text-slate-600 text-[11px] font-medium">Add distance, cargo and conditions.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-amber-700 block">03</span>
            <span className="text-2xl block">🤖</span>
            <h4 className="font-extrabold text-slate-900 text-sm">GreenFleet analyzes</h4>
            <p className="text-slate-600 text-[11px] font-medium">We estimate fuel, cost and emissions.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
            <span className="text-xs font-mono font-extrabold text-purple-700 block">04</span>
            <span className="text-2xl block">⭐</span>
            <h4 className="font-extrabold text-slate-900 text-sm">Get your best option</h4>
            <p className="text-slate-600 text-[11px] font-medium">Choose the route that works best for you.</p>
          </div>
        </div>
      </div>

      {/* 5. FRIENDLY CTA BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-center space-y-4 shadow-xl">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white">READY TO PLAN YOUR NEXT TRIP?</h2>
          <p className="text-xs text-emerald-100 font-medium">
            Let GreenFleet do the complicated calculations for you.
          </p>
        </div>

        <button
          onClick={() => onNavigateToApp('predictions')}
          className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-emerald-800 font-extrabold text-sm transition-all shadow-lg inline-flex items-center gap-2 group transform hover:scale-[1.02]"
        >
          <span>Start a Trip →</span>
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
