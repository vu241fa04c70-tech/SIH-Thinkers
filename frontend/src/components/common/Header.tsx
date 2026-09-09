import React, { useState } from 'react';
import { Leaf, Cpu, UserCheck, HelpCircle, User } from 'lucide-react';
import { HelpModal } from './HelpModal';

interface HeaderProps {
  viewMode: 'simple' | 'technical';
  setViewMode: (mode: 'simple' | 'technical') => void;
  onNavigate?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode, onNavigate }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* LEFT: Logo & Tagline */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20">
                <Leaf className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">GreenFleet</h1>
                  <span className="text-emerald-700 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    Smart Fuel & Route Assistant
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Save fuel. Save money. Drive smarter.</p>
              </div>
            </div>

            {/* Mobile View Mode Switcher */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setViewMode(viewMode === 'simple' ? 'technical' : 'simple')}
                className="p-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200"
              >
                {viewMode === 'simple' ? '⚙️ Tech View' : '🌱 Simple View'}
              </button>
            </div>
          </div>

          {/* RIGHT: Savings Badge, Help, Mode Switcher, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto justify-end">
            {/* Potential Savings Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <span>🌱 Potential savings:</span>
              <span className="font-mono text-emerald-950 font-extrabold">₹6,10,000</span>
            </div>

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
                <span>Simple View</span>
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
                <span>Technical View (SIH Judge)</span>
              </button>
            </div>

            {/* Help Button */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors flex items-center gap-1.5 border border-emerald-200"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Help ❓</span>
            </button>

            {/* Profile Button */}
            <div className="p-1.5 px-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                GF
              </div>
              <span className="hidden sm:inline">Fleet Account</span>
            </div>
          </div>
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
