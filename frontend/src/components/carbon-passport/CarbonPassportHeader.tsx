import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  Bell, 
  User, 
  ChevronDown, 
  Leaf, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Mail, 
  SlidersHorizontal,
  Menu,
  Check
} from 'lucide-react';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  organization: string;
  department: string;
  avatarUrl?: string;
}

// Sample users to demonstrate that the header works for ANY user
export const SAMPLE_USERS: UserProfile[] = [
  {
    id: 'u-1',
    name: 'Alex Morgan',
    role: 'Fleet Sustainability Director',
    email: 'alex.morgan@greenfleet.ai',
    organization: 'GreenFleet Global Logistics',
    department: 'ESG & Clean Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-2',
    name: 'Ramesh Reddy',
    role: 'Guntur Dispatch Controller',
    email: 'ramesh.reddy@greenfleet.in',
    organization: 'GreenFleet India (AP Hub)',
    department: 'Corridor Route Optimization',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-3',
    name: 'Elena Rostova',
    role: 'Lead ESG Compliance Auditor',
    email: 'elena.rostova@ecoverify.org',
    organization: 'Global GHG Verification Council',
    department: 'IPCC & ISO 14064 Audits',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  }
];

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'verification' | 'savings' | 'alert';
}

const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Trip #105 Certified Grade A+',
    description: 'Autonomous environmental performance report verified with 92 Fuel Score & 88 CO₂ Score.',
    time: '4m ago',
    unread: true,
    type: 'verification'
  },
  {
    id: 'n-2',
    title: '34.2 kg CO₂ Reduction Logged',
    description: 'Outer bypass route saved 15.7 L diesel fuel vs baseline corridor.',
    time: '28m ago',
    unread: true,
    type: 'savings'
  },
  {
    id: 'n-3',
    title: 'Monthly Net-Zero Progress: 82%',
    description: 'Guntur fleet division on track to achieve quarterly decarbonization goal.',
    time: '2h ago',
    unread: false,
    type: 'alert'
  }
];

interface CarbonPassportHeaderProps {
  user?: UserProfile;
  onUserChange?: (user: UserProfile) => void;
  onDownloadPassport?: () => void;
  onOpenMobileSidebar?: () => void;
}

export const CarbonPassportHeader: React.FC<CarbonPassportHeaderProps> = ({
  user = SAMPLE_USERS[0],
  onUserChange,
  onDownloadPassport,
  onOpenMobileSidebar
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [customNameInput, setCustomNameInput] = useState('');
  const [isEditingUser, setIsEditingUser] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      if (onDownloadPassport) {
        onDownloadPassport();
      }
    }, 600);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleSaveCustomUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNameInput.trim()) return;
    const updatedUser: UserProfile = {
      ...user,
      id: `custom-${Date.now()}`,
      name: customNameInput.trim(),
      role: 'Fleet Manager / Operator',
      email: `${customNameInput.toLowerCase().replace(/\s+/g, '.')}@greenfleet.ai`,
      avatarUrl: undefined
    };
    if (onUserChange) {
      onUserChange(updatedUser);
    }
    setIsEditingUser(false);
    setCustomNameInput('');
  };

  // Helper to get initials if no avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="w-full bg-slate-900/60 backdrop-blur-2xl border-b border-emerald-500/20 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30 shadow-xl shadow-slate-950/40">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Side: Title & Subtitle */}
        <div className="flex items-start gap-3">
          {/* Mobile hamburger menu toggle */}
          {onOpenMobileSidebar && (
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors mt-0.5"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30">
                <Leaf className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                Carbon Passport
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified Registry
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every completed trip receives an environmental performance report with verified GHG reduction scores and ecological credentials.
            </p>
          </div>
        </div>

        {/* Right Side: Action Controls (Download, Notifications, User Profile) */}
        <div className="flex items-center gap-3 self-end md:self-center">
          {/* 1. Download Carbon Passport Button */}
          <button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isDownloading ? 'Preparing PDF...' : 'Download Carbon Passport'}</span>
          </button>

          {/* 2. Notification Icon with Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-black flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/40 p-4 shadow-2xl shadow-emerald-950/50 space-y-3 animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Trip Verification Alerts</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        n.unread
                          ? 'bg-emerald-950/30 border-emerald-500/40'
                          : 'bg-slate-950/70 border-slate-800/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-white leading-tight">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap font-mono">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. User Profile with Dropdown & Switcher (Works for ANY User) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
            >
              {/* User Avatar or Initials */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30 group-hover:border-emerald-400 transition-colors"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs border border-emerald-500/30">
                  {getInitials(user.name)}
                </div>
              )}

              {/* User Info (Hidden on very small screens) */}
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-white block leading-tight truncate max-w-[130px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 block leading-none truncate max-w-[130px]">
                  {user.role}
                </span>
              </div>

              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Panel */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/40 p-4 shadow-2xl shadow-emerald-950/50 space-y-3 animate-in fade-in zoom-in-95 duration-200 z-50">
                {/* Active User Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-emerald-400"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-black text-white truncate">{user.name}</h4>
                      <p className="text-[11px] text-emerald-400 font-medium truncate">{user.role}</p>
                      <span className="text-[10px] text-slate-400 block truncate">{user.email}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-0.5">
                    <div>Organization: <strong className="text-slate-200">{user.organization}</strong></div>
                    <div>Department: <strong className="text-slate-200">{user.department}</strong></div>
                  </div>
                </div>

                {/* Switch Between Sample Profiles (Works for ANY user) */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block px-1">
                    Switch Active User
                  </span>
                  <div className="space-y-1">
                    {SAMPLE_USERS.map((sampleUser) => {
                      const isCurrent = sampleUser.id === user.id;
                      return (
                        <button
                          key={sampleUser.id}
                          onClick={() => {
                            if (onUserChange) onUserChange(sampleUser);
                            setIsProfileOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors text-xs ${
                            isCurrent
                              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-bold block truncate">{sampleUser.name}</span>
                            <span className="text-[10px] text-slate-400 block truncate">{sampleUser.role}</span>
                          </div>
                          {isCurrent && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom User Name Form (To verify it works for ANY user entered) */}
                <div className="pt-2 border-t border-slate-800">
                  {isEditingUser ? (
                    <form onSubmit={handleSaveCustomUser} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter any user's name..."
                        value={customNameInput}
                        onChange={(e) => setCustomNameInput(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                        autoFocus
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingUser(false)}
                          className="px-2.5 py-1 rounded-lg text-[10px] text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-slate-950 hover:bg-emerald-500"
                        >
                          Set User
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsEditingUser(true)}
                      className="w-full py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-semibold text-center transition-colors"
                    >
                      + Login as Custom User
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
