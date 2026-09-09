import React from 'react';
import { LayoutDashboard, Truck, BrainCircuit, Cpu, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Management', icon: Truck },
    { id: 'predictions', label: 'AI Fuel & GHG Predictor', icon: BrainCircuit },
    { id: 'optimization', label: 'Quantum QUBO Solver', icon: Cpu },
    { id: 'analytics', label: 'Analytics & Savings', icon: BarChart3 },
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
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
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
