import React, { useState } from 'react';
import { Leaf, Cpu, UserCheck, HelpCircle, User, Mic, Globe } from 'lucide-react';
import { HelpModal } from './HelpModal';
import { UserProfile } from './AuthModal';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  viewMode: 'simple' | 'technical';
  setViewMode: (mode: 'simple' | 'technical') => void;
  onNavigate?: (tab: string) => void;
  user?: UserProfile | null;
  onOpenAuth?: (step?: 'language' | 'signin' | 'signup') => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'landing',
  setActiveTab,
  viewMode,
  setViewMode,
  onNavigate,
  user,
  onOpenAuth,
  onOpenProfile
}) => {
  const { currentLanguage, t } = useLanguage();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleOpenVoiceAssistant = () => {
    window.dispatchEvent(new CustomEvent('greenfleet:open-voice-assistant', { detail: { startListening: true } }));
  };

  const menuItems = [
    { id: 'landing', label: t('home') },
    { id: 'predictions', label: t('planTrip') },
    { id: 'optimization', label: t('bestRoute') },
    { id: 'passport', label: `🌱 ${t('carbonPassport', 'Carbon Passport')}` },
    { id: 'incentives', label: `🏛️ ${t('govIncentives', 'Government Incentives')}` },
    { id: 'challenge', label: `🏆 ${t('ecoChallenge', 'Eco Challenge')}` },
    { id: 'risk', label: `🛡️ ${t('routeRiskMeter', 'Route Risk Meter')}` },
    { id: 'analytics', label: t('mySavings') },
    { id: 'reports', label: t('reports') },
    { id: 'about', label: t('about') },
  ];

  const handleTabClick = (id: string) => {
    if (setActiveTab) setActiveTab(id);
    if (onNavigate) onNavigate(id);
  };

  return (
    <>
      <header className="bg-white/60 backdrop-blur-[12px] border-b border-white/20 shadow-lg shadow-slate-900/5 px-4 sm:px-6 py-2.5 sticky top-0 z-30 shadow-sm space-y-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* LEFT: Logo & Tagline */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('landing')}>
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
                <Leaf className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">GreenFleet</h1>
                  <span className="text-emerald-700 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    {t('headerSub')}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{t('headerTagline')}</p>
              </div>
            </div>

            {/* Mobile View Mode Switcher */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setViewMode(viewMode === 'simple' ? 'technical' : 'simple')}
                className="p-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200"
              >
                {viewMode === 'simple' ? `⚙️ ${t('techView')}` : `🌱 ${t('simpleView')}`}
              </button>
            </div>
          </div>

          {/* RIGHT: Savings Badge, Voice Assistant, Help, Mode Switcher, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto justify-end">
            {/* Potential Savings Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <span>{t('potentialSavings')}</span>
              <span className="font-mono text-emerald-950 font-extrabold">₹6,10,000</span>
            </div>

            {/* Top Voice Assistant Button */}
            <button
              onClick={handleOpenVoiceAssistant}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm border border-emerald-400 group"
              title="Click to speak with GreenFleet Voice Assistant"
            >
              <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{t('voiceAssistant')}</span>
            </button>

            {/* View Mode Switcher */}
            <div className="hidden md:flex p-1 rounded-2xl bg-slate-100 border border-slate-200 items-center gap-1">
              <button
                onClick={() => setViewMode('simple')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'simple'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t('simpleView')}</span>
              </button>

              <button
                onClick={() => setViewMode('technical')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'technical'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{t('techView')}</span>
              </button>
            </div>

            {/* Help Button */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors flex items-center gap-1.5 border border-emerald-200"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>{t('help')}</span>
            </button>

            {/* Create Account & Sign In or Profile Button */}
            {user ? (
              <button
                onClick={onOpenProfile}
                className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-black text-xs transition-all flex items-center gap-2 border border-emerald-300 shadow-sm"
                title="View Active Account Profile"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center border border-emerald-500">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline font-black">{user.fullName.split(' ')[0]}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth && onOpenAuth('signup')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30 border border-emerald-500"
                  title="Create New GreenFleet Account"
                >
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </button>

                <button
                  onClick={() => onOpenAuth && onOpenAuth('signin')}
                  className="hidden sm:flex px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs transition-all border border-slate-300 shadow-xs"
                  title="Sign In Existing User"
                >
                  <span>Sign In</span>
                </button>
              </div>
            )}

            {/* Language Switcher Button */}
            <button
              onClick={() => onOpenAuth && onOpenAuth('language')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-md border border-slate-700"
              title="Change Application Language"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>🌐 {currentLanguage}</span>
            </button>
          </div>
        </div>

        {/* TOP NAVIGATION MENU BAR (HORIZONTAL BUTTONS) */}
        <div className="border-t border-slate-200/60 pt-2.5 pb-1 max-w-7xl mx-auto flex items-center justify-start overflow-x-auto gap-1.5 sm:gap-2 text-xs scrollbar-none no-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-white/90 text-slate-800 hover:bg-emerald-50 hover:text-emerald-950 border border-slate-200 font-extrabold shadow-2xs'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onNavigate={(tab) => {
          if (onNavigate) onNavigate(tab);
        }}
      />
    </>
  );
};
