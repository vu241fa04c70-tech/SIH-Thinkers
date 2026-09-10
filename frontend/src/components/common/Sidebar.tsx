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
    <aside className="w-64 bg-white/90 backdrop-blur-md border-r border-slate-200/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] shadow-sm sticky top-16">
      <div className="space-y-2">
        <div className="px-3 py-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
          GreenFleet Menu
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'reports' && activeTab === 'analytics');
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

      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2 text-xs">
        <div className="font-extrabold text-emerald-800">🌱 Smart Assistant</div>
        <p className="text-emerald-900 leading-relaxed font-medium">
          Open app → choose your trip → GreenFleet finds your savings!
        </p>
      </div>
    </aside>
  );
};
