import React from 'react';
import { 
  Navigation, 
  MapPin, 
  Award, 
  Landmark, 
  Trophy, 
  Gauge, 
  FileText, 
  Settings as SettingsIcon 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'route-optimization', label: 'Route Optimization', icon: Navigation, isNew: false },
    { id: 'carbon-passport', label: 'Carbon Passport', icon: Award, isNew: false },
    { id: 'government-incentives', label: 'Government Incentives', icon: Landmark, isNew: false },
    { id: 'eco-challenge', label: 'Eco Challenge', icon: Trophy, isNew: false },
    { id: 'route-risk-meter', label: 'Route Risk Meter', icon: Gauge, isNew: false },
    { id: 'reports', label: 'Reports', icon: FileText, isNew: false },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, isNew: false },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-2">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Core Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.isNew && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-cyan-400 text-slate-950">
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
        <div className="text-xs font-semibold text-slate-400">GreenFleet Differentiator</div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Powered by XGBoost + LightGBM ensembles, SHAP explanations, and Simulated Annealing QUBO optimization.
        </p>
      </div>
    </aside>
  );
};
