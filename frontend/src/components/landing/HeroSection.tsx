import React from 'react';
import { ArrowRight, Play, LogIn, CheckCircle2, Sparkles, Truck, Ship, MapPin, Fuel, DollarSign, Leaf } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
  onWatchDemo: () => void;
  onLogin: () => void;
}

export const HeroSection: React.FC<Props> = ({ onGetStarted, onWatchDemo, onLogin }) => {
  return (
    <div className="relative py-6 md:py-10 flex flex-col items-center text-center space-y-6 overflow-hidden">
      {/* Friendly Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-800 shadow-sm">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Your Intelligent Fuel-Saving Assistant</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Save Fuel. Save Money.<br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Drive Greener Every Trip.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          GreenFleet finds smarter routes for trucks and ships so you can use less fuel, spend less money, and reduce pollution.
        </p>
      </div>

      {/* Primary & Secondary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={onGetStarted}
          className="px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 group transform hover:scale-[1.02]"
        >
          <span>Find My Best Route →</span>
        </button>

        <button
          onClick={onWatchDemo}
          className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
        >
          <Play className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          <span>See How GreenFleet Works</span>
        </button>

        <button
          onClick={onLogin}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Driver / Owner Login</span>
        </button>
      </div>

      {/* Very Simple 3-Step Visual Immediately Below */}
      <div className="w-full max-w-4xl pt-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-4">
          <div className="text-center">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block">
              3 Simple Steps to Fuel Savings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* STEP 1 */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Choose Your Vehicle</h4>
              <p className="text-xs text-slate-600 flex items-center justify-center gap-2 font-medium">
                <span>🚚 Truck</span> • <span>🚢 Ship</span>
              </p>
            </div>

            {/* STEP 2 */}
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Enter Your Trip</h4>
              <p className="text-xs text-slate-600 font-medium">
                📍 Distance + Cargo + Conditions
              </p>
            </div>

            {/* STEP 3 */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Get The Best Option</h4>
              <p className="text-xs text-slate-600 font-medium">
                ⛽ Less Fuel • 💰 Lower Cost • 🌱 Less Pollution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
