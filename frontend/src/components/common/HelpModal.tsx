import React from 'react';
import { HelpCircle, MapPin, PlusCircle, LayoutDashboard, Calculator, Info, X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const options = [
    {
      label: 'Find the Best Route',
      sublabel: 'Compare routes to balance fuel, cost, and time',
      tab: 'optimization',
      icon: MapPin,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      label: 'Plan a Trip Fuel Estimate',
      sublabel: 'Calculate fuel & emissions before starting',
      tab: 'predictions',
      icon: Calculator,
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      label: 'Check Today\'s Fleet Savings',
      sublabel: 'See live summary of active vehicles & money saved',
      tab: 'overview',
      icon: LayoutDashboard,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      label: 'Add or View Vehicles',
      sublabel: 'Manage trucks, vans, and cargo ships in your fleet',
      tab: 'fleet',
      icon: PlusCircle,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      label: 'Understand My Results & Tech',
      sublabel: 'Learn about GreenFleet optimization models',
      tab: 'about',
      icon: Info,
      color: 'text-purple-700 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Need Help? ❓</h2>
            <p className="text-xs text-slate-500 font-medium">What would you like to do?</p>
          </div>
        </div>

        <div className="space-y-2.5 pt-1">
          {options.map((opt, i) => {
            const IconComponent = opt.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  onNavigate(opt.tab);
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 flex items-center justify-between text-left transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${opt.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-800 group-hover:text-emerald-800 block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-slate-500">{opt.sublabel}</span>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all text-xs font-bold">
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
