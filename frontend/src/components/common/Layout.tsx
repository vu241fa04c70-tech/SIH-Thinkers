import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AiAssistantWidget } from './AiAssistantWidget';

interface LayoutProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void, viewMode: 'simple' | 'technical') => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing');
  const [viewMode, setViewMode] = useState<'simple' | 'technical'>('simple');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans relative">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onNavigate={(tab) => setActiveTab(tab)}
      />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children(activeTab, setActiveTab, viewMode)}
        </main>
      </div>

      {/* Global AI Assistant Floating Widget */}
      <AiAssistantWidget />
    </div>
  );
};
