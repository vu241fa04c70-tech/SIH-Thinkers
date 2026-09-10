import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void) => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('route-optimization');

  // When viewing full-screen dedicated views, render full-bleed layout
  if (
    activeTab === 'route-optimization' ||
    activeTab === 'carbon-passport' ||
    activeTab === 'government-incentives' ||
    activeTab === 'eco-challenge' ||
    activeTab === 'route-risk-meter' ||
    activeTab === 'settings'
  ) {
    return (
      <div className="min-h-screen bg-[#060b14] text-slate-100">
        {children(activeTab, setActiveTab)}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      {/* Mobile Top Navigation Pills */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'route-optimization', label: 'Route Optimization' },
          { id: 'carbon-passport', label: 'Carbon Passport' },
          { id: 'government-incentives', label: 'Gov Incentives' },
          { id: 'eco-challenge', label: 'Eco Challenge' },
          { id: 'route-risk-meter', label: 'Route Risk Meter' },
          { id: 'reports', label: 'Reports' },
          { id: 'settings', label: 'Settings' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === item.id
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 bg-slate-800/60 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1750px] mx-auto w-full overflow-x-hidden">
          {children(activeTab, setActiveTab)}
        </main>
      </div>
    </div>
  );
};
