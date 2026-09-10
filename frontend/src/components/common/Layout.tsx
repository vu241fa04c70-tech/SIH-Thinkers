import React, { useState } from 'react';
import { Header } from './Header';
import { AiAssistantWidget } from './AiAssistantWidget';

interface LayoutProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void, viewMode: 'simple' | 'technical') => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing');
  const [viewMode, setViewMode] = useState<'simple' | 'technical'>('simple');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900/10 text-slate-900 font-sans relative backdrop-blur-[1px]">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onNavigate={(tab) => setActiveTab(tab)}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children(activeTab, setActiveTab, viewMode)}
      </main>

      {/* Global AI Assistant Floating Widget */}
      <AiAssistantWidget />
    </div>
  );
};
