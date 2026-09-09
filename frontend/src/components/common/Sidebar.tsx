import React from 'react';
import { Home, Truck, MapPin, Compass, DollarSign, BarChart3, HelpCircle, Info } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'landing', label: '🏠 Home', subtext: 'Control center & tools', icon: Home },
    { id: 'fleet', label: '🚚 My Vehicles', subtext: 'Manage trucks & ships', icon: Truck },
    { id: 'predictions', label: '📍 Plan a Trip', subtext: 'Estimate fuel & emissions', icon: MapPin },
    { id: 'optimization', label: '🧭 Best Route', subtext: 'Find cheapest green route', icon: Compass },
    { id: 'analytics', label: '💰 My Savings', subtext: 'Today\'s money & fuel saved', icon: DollarSign },
    { id: 'reports', label: '📊 Reports', subtext: 'Fleet efficiency insights', icon: BarChart3 },
    { id: 'about', label: 'ℹ️ About', subtext: 'How GreenFleet works', icon: Info },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] shadow-sm">
      <div className="space-y-2">
        <div className="px-3 py-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
          GreenFleet Menu
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'reports' && activeTab === 'analytics');
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id === 'reports' ? 'analytics' : item.id)}
              className={`w-full flex items-start space-x-3 px-3.5 py-3 rounded-2xl text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className="font-extrabold text-sm block">{item.label}</span>
                <span className={`text-[11px] block font-normal ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {item.subtext}
                </span>
              </div>
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
