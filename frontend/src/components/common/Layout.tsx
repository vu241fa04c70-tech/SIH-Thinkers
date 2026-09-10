import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { AiAssistantWidget } from './AiAssistantWidget';
import { AuthModal, UserProfile } from './AuthModal';
import { UserProfileModal } from './UserProfileModal';

interface LayoutProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void, viewMode: 'simple' | 'technical') => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('landing');
  const [viewMode, setViewMode] = useState<'simple' | 'technical'>('simple');

  // User Profile & Modal States
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('GREENFLEET_USER_PROFILE');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authStep, setAuthStep] = useState<'language' | 'signin' | 'signup'>('language');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Auto open Auth Modal on initial launch if no user profile exists
  useEffect(() => {
    if (!user) {
      // Optional slight delay for smooth page animation
      const timer = setTimeout(() => {
        setIsAuthOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenAuth = (step: 'language' | 'signin' | 'signup' = 'language') => {
    setAuthStep(step);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (newProfile: UserProfile) => {
    setUser(newProfile);
    setIsAuthOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('GREENFLEET_USER_PROFILE');
    setUser(null);
    setIsProfileOpen(false);
    handleOpenAuth('language');
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-sans relative">
      {/* Crisp Full-Color HD Aerial Green Highway Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/assets/green_highway_bg.jpg')" }}
      />
      {/* Subtle translucent overlay for crisp contrast */}
      <div className="fixed inset-0 z-0 bg-slate-900/20 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onNavigate={(tab) => setActiveTab(tab)}
          user={user}
          onOpenAuth={handleOpenAuth}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children(activeTab, setActiveTab, viewMode)}
        </main>
      </div>

      {/* Global AI & Voice Assistant Floating Widget */}
      <AiAssistantWidget onNavigate={(tab) => setActiveTab(tab)} />

      {/* Profile Onboarding / Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialStep={authStep}
        onSuccess={handleAuthSuccess}
      />

      {/* User Profile View Drawer */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onSwitchAccount={() => handleOpenAuth('signin')}
        onChangeLanguage={() => handleOpenAuth('language')}
        onSignOut={handleSignOut}
      />
    </div>
  );
};

