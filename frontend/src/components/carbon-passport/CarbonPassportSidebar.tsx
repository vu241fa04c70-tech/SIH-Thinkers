import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Award, 
  FileBarChart, 
  Settings, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  X,
  ChevronRight,
  TrendingDown,
  Landmark,
  Trophy,
  Gauge,
  Navigation,
  FileText
} from 'lucide-react';

interface CarbonPassportSidebarProps {
  onNavigate?: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CarbonPassportSidebar: React.FC<CarbonPassportSidebarProps> = ({
  onNavigate,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const handleItemClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const menuItems = [
    { 
      id: 'route-optimization', 
      label: 'Route Optimization', 
      icon: Navigation, 
      active: false,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-950 text-emerald-400 border border-emerald-800'
    },
    { 
      id: 'carbon-passport', 
      label: 'Carbon Passport', 
      icon: Award, 
      active: true, // explicitly active
      badge: 'ACTIVE',
      badgeColor: 'bg-slate-950 text-emerald-400 border border-slate-800'
    },
    { 
      id: 'government-incentives', 
      label: 'Government Incentives', 
      icon: Landmark, 
      active: false,
      badge: null
    },
    { 
      id: 'eco-challenge', 
      label: 'Eco Challenge', 
      icon: Trophy, 
      active: false,
      badge: null
    },
    { 
      id: 'route-risk-meter', 
      label: 'Route Risk Meter', 
      icon: Gauge, 
      active: false,
      badge: null
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText, 
      active: false,
      badge: 'ESG',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      active: false,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-[800] bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-[900] w-72 
        bg-slate-900/80 backdrop-blur-2xl border-r border-emerald-500/20 
        shadow-2xl shadow-emerald-950/40 p-5 
        flex flex-col justify-between 
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:min-h-screen
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top: Brand Logo */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-5">
            <div className="flex items-center gap-3">
              {/* High-Tech Stylized Logo Icon */}
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-300 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-slate-950">
                <Leaf className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white font-sans">
                    GREENFLEET
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-emerald-400 text-slate-950 tracking-wider">
                    ECO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                  Carbon Intelligence Hub
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-xl text-slate-400 hover:text-white lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1.5">
            <div className="px-3 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
              Core Modules
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 text-slate-950 font-black shadow-xl shadow-emerald-500/30 ring-1 ring-emerald-300/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-slate-950 stroke-[2.3]' : 'text-slate-400 group-hover:text-emerald-400'
                    }`} />
                    <span className="tracking-tight">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isActive ? 'bg-slate-950 text-emerald-300 shadow-sm' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: ESG Status Card & User Profile */}
        <div className="space-y-4 pt-4 border-t border-emerald-900/40">
          {/* Glassmorphism Tier-3 Compliance Widget */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                IPCC Tier-3 Standard
              </span>
              <span className="text-[10px] font-mono text-slate-400">ISO 14064-1</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cryptographic ledger tracking direct Scope 1 combustion & solar Scope 2 grid PPA.
            </p>

            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Net-Zero Progress</span>
                <span className="font-bold text-emerald-400 font-mono">82% Achieved</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 w-[82%]" />
              </div>
            </div>
          </div>

          {/* User Profile / Controller Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  FC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block leading-tight">Fleet Controller</span>
                <span className="text-[10px] text-slate-400">Guntur Logistics Hub</span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-800">
              Online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
