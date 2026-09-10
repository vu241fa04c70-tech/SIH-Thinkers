import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Award, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  ChevronRight, 
  Calendar, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Gift, 
  Clock, 
  Fuel, 
  Navigation, 
  FileText, 
  LayoutDashboard, 
  Settings as SettingsIcon,
  Landmark,
  Gauge,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Download,
  Share2
} from 'lucide-react';

interface DriverLeaderboardEntry {
  rank: number;
  name: string;
  depot: string;
  truckNo: string;
  ecoScore: number;
  fuelSavedLiters: number;
  greenPoints: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

const TOP_10_DRIVERS: DriverLeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Rajesh Varma',
    depot: 'Guntur Dispatch Hub',
    truckNo: 'AP 07 TJ 1120',
    ecoScore: 98.4,
    fuelSavedLiters: 68.2,
    greenPoints: 3420,
    streakDays: 21
  },
  {
    rank: 2,
    name: 'Ramesh Kumar (You)',
    depot: 'Vijayawada Port Logistics',
    truckNo: 'AP 39 TE 4920',
    ecoScore: 96.2,
    fuelSavedLiters: 54.5,
    greenPoints: 2850,
    streakDays: 14,
    isCurrentUser: true
  },
  {
    rank: 3,
    name: 'Suresh Reddy',
    depot: 'Amaravati Capital Bay',
    truckNo: 'AP 16 CK 9901',
    ecoScore: 94.8,
    fuelSavedLiters: 49.0,
    greenPoints: 2710,
    streakDays: 18
  },
  {
    rank: 4,
    name: 'Ankit Sharma',
    depot: 'Hyderabad Hitec Hub',
    truckNo: 'TS 09 UB 5542',
    ecoScore: 93.5,
    fuelSavedLiters: 44.8,
    greenPoints: 2540,
    streakDays: 11
  },
  {
    rank: 5,
    name: 'Vikram Singh',
    depot: 'Visakhapatnam Harbor Bay',
    truckNo: 'AP 31 TN 7831',
    ecoScore: 92.1,
    fuelSavedLiters: 41.2,
    greenPoints: 2420,
    streakDays: 9
  },
  {
    rank: 6,
    name: 'Murugan S',
    depot: 'Chennai Central Depot',
    truckNo: 'TN 02 BX 6610',
    ecoScore: 91.0,
    fuelSavedLiters: 38.6,
    greenPoints: 2280,
    streakDays: 12
  },
  {
    rank: 7,
    name: 'Deepak Patel',
    depot: 'Bengaluru Industrial Link',
    truckNo: 'KA 01 MG 4419',
    ecoScore: 89.7,
    fuelSavedLiters: 36.0,
    greenPoints: 2150,
    streakDays: 8
  },
  {
    rank: 8,
    name: 'Manoj Verma',
    depot: 'Tirupati Highway Depot',
    truckNo: 'AP 26 TH 3311',
    ecoScore: 88.4,
    fuelSavedLiters: 34.2,
    greenPoints: 2010,
    streakDays: 6
  },
  {
    rank: 9,
    name: 'Srinivas Rao',
    depot: 'Tenali Freight Station',
    truckNo: 'AP 07 AB 2209',
    ecoScore: 87.2,
    fuelSavedLiters: 31.8,
    greenPoints: 1890,
    streakDays: 5
  },
  {
    rank: 10,
    name: 'Farhan Ali',
    depot: 'Kurnool Logistics Depot',
    truckNo: 'AP 21 VK 8820',
    ecoScore: 86.5,
    fuelSavedLiters: 29.4,
    greenPoints: 1780,
    streakDays: 7
  }
];

interface AchievementBadge {
  id: string;
  name: string;
  icon: React.ElementType;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  desc: string;
  unlocked: boolean;
  progress?: string;
  unlockedDate?: string;
  pointsEarned: number;
}

const ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'smooth-driver',
    name: 'Smooth Driver',
    icon: ShieldCheck,
    tier: 'Gold',
    desc: 'Gentle braking & zero harsh acceleration events (< 2 per 500 km)',
    unlocked: true,
    unlockedDate: 'Earned 3 days ago',
    pointsEarned: 860
  },
  {
    id: 'fuel-saver',
    name: 'Fuel Saver',
    icon: Fuel,
    tier: 'Platinum',
    desc: 'Achieved > 25% better fuel economy than fleet baseline for 10 trips',
    unlocked: true,
    unlockedDate: 'Earned yesterday',
    pointsEarned: 1240
  },
  {
    id: 'zero-idle',
    name: 'Zero Idle',
    icon: Clock,
    tier: 'Diamond',
    desc: 'Engine idling kept under 3% of total running time across the week',
    unlocked: true,
    unlockedDate: 'Earned this week',
    pointsEarned: 750
  },
  {
    id: 'green-corridor',
    name: 'Corridor Master',
    icon: Leaf,
    tier: 'Platinum',
    desc: 'Completed 10 consecutive eco-optimized trips on NH 16 green corridor',
    unlocked: false,
    progress: '8 of 10 trips completed',
    pointsEarned: 500
  },
  {
    id: 'night-owl',
    name: 'Night Owl Eco',
    icon: Star,
    tier: 'Gold',
    desc: 'Maintained steady cruising speed on overnight highway freight runs',
    unlocked: true,
    unlockedDate: 'Earned 5 days ago',
    pointsEarned: 400
  },
  {
    id: 'ev-pioneer',
    name: 'EV Regenerator',
    icon: Zap,
    tier: 'Silver',
    desc: 'Recovered > 20% kinetic energy via regenerative braking in EV mode',
    unlocked: false,
    progress: '14% of 20% target',
    pointsEarned: 350
  }
];

interface EcoChallengePageProps {
  onNavigate?: (tab: string) => void;
}

export const EcoChallengePage: React.FC<EcoChallengePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('eco-challenge');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'this-week' | 'last-week' | 'all-time'>('this-week');
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  const currentUser = TOP_10_DRIVERS.find(d => d.isCurrentUser) || TOP_10_DRIVERS[1];
  const topChampion = TOP_10_DRIVERS[0];

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col lg:flex-row antialiased font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR */}
      {/* ========================================================================= */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#070e1a] border-r border-[#121f36] flex flex-col justify-between p-6 transition-transform duration-300
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-8">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white font-sans leading-none">
                GreenFleet
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide">
                Eco Challenge Rewards
              </p>
            </div>
          </div>

          {/* 7 Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {/* 1. Route Optimization (Home) */}
            <button
              onClick={() => handleNav('route-optimization')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Route Optimization</span>
            </button>

            {/* 2. Carbon Passport */}
            <button
              onClick={() => handleNav('carbon-passport')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Carbon Passport</span>
            </button>

            {/* 3. Government Incentives */}
            <button
              onClick={() => handleNav('government-incentives')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Government Incentives</span>
            </button>

            {/* 4. Active Eco Challenge Tab */}
            <button
              onClick={() => handleNav('eco-challenge')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              <span>Eco Challenge</span>
            </button>

            {/* 5. Route Risk Meter */}
            <button
              onClick={() => handleNav('route-risk-meter')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>Route Risk Meter</span>
            </button>

            {/* 6. Reports */}
            <button
              onClick={() => handleNav('reports')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </button>

            {/* 7. Settings */}
            <button
              onClick={() => handleNav('settings')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-850 transition-all cursor-pointer"
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Driver Card in Sidebar */}
        <div className="p-4 rounded-3xl bg-[#091f24] border border-emerald-500/30 space-y-2 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs">
              RK
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white truncate block">Ramesh Kumar</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" /> 14-Day Streak
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed pt-1 border-t border-[#123038]">
            Rank #2 in Fleet • Top 2% Fuel Saver this month.
          </p>
        </div>
      </aside>

      {/* Backdrop for Mobile Navigation */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN VIEW CONTAINER */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="px-5 sm:px-8 py-3.5 border-b border-[#121f36] flex items-center justify-between gap-4 sticky top-0 z-30 bg-[#060b14]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-950/40 shrink-0">
              <Trophy className="w-5 h-5 stroke-[2.4]" />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Eco Challenge & Driver Rewards</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 border border-amber-400/40 text-amber-300 uppercase tracking-wider">
                  Season 4 Active
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Drive smooth, conserve fuel, avoid idling, and climb the national driver leaderboard.
              </p>
            </div>
          </div>

          {/* User Quick Rank Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-[#091322] px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Your Standing</span>
              <span className="text-xs font-black text-emerald-400">Rank #2 Fleet-Wide</span>
            </div>
            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shadow-emerald-500/30">
              2
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. MAIN DASHBOARD CONTENT */}
        {/* ========================================================================= */}
        <main className="p-5 sm:p-8 max-w-[1700px] w-full mx-auto space-y-6 flex-1">
          
          {/* --------------------------------------------------------------------- */}
          {/* ROW 1: HERO GREEN POINTS CARD + REIGNING CHAMPION CARD */}
          {/* --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* 1.1 DRIVER GREEN POINTS (HERO CARD - 8 COLS) */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0a1a2e] via-[#091728] to-[#06121f] border border-emerald-500/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
              
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header inside Hero */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
                    RK
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-black text-white">{currentUser.name}</h2>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                        {currentUser.truckNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {currentUser.depot} &bull; Diamond Eco Tier (Level 5)
                    </p>
                  </div>
                </div>

                {/* Redeem Voucher Button */}
                <button
                  type="button"
                  onClick={() => setIsRedeemModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-400/30 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Gift className="w-4 h-4 stroke-[2.4]" />
                  <span>Redeem ₹2,500 Voucher</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Center Hero Points Counter */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-2">
                
                {/* Big Points Display */}
                <div className="sm:col-span-6 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Total Green Points</span>
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                      {currentUser.greenPoints.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                      +320 this week
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium pt-1">
                    Earned through smooth acceleration, reduced idle time, and optimized highway speeds on NH 16.
                  </p>
                </div>

                {/* 3 Point Breakdown Cards */}
                <div className="sm:col-span-6 grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-[#081524]/80 border border-[#162a42] space-y-1 shadow-inner">
                    <span className="text-[10px] text-slate-400 block font-medium">Fuel Saver</span>
                    <span className="text-sm sm:text-base font-black text-emerald-400 block">+1,240</span>
                    <span className="text-[9px] text-slate-500 font-bold block">Points</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#081524]/80 border border-[#162a42] space-y-1 shadow-inner">
                    <span className="text-[10px] text-slate-400 block font-medium">Smooth Braking</span>
                    <span className="text-sm sm:text-base font-black text-sky-400 block">+860</span>
                    <span className="text-[9px] text-slate-500 font-bold block">Points</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#081524]/80 border border-[#162a42] space-y-1 shadow-inner">
                    <span className="text-[10px] text-slate-400 block font-medium">Zero Idling</span>
                    <span className="text-sm sm:text-base font-black text-amber-400 block">+750</span>
                    <span className="text-[9px] text-slate-500 font-bold block">Points</span>
                  </div>
                </div>

              </div>

              {/* Weekly Goal Progress Bar inside Hero */}
              <div className="relative z-10 pt-4 border-t border-[#142840] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Weekly Challenge Goal: <strong>Save 30L Fuel & Keep Idling &lt; 5%</strong></span>
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    24.5L / 30L (82% Done)
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-[#081422] border border-[#142840] overflow-hidden p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 shadow-md shadow-emerald-500/50 transition-all duration-1000"
                    style={{ width: '82%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>5.5L remaining to unlock <strong>+500 Bonus Points</strong></span>
                  <span>Ends in 2 days 14 hrs</span>
                </div>
              </div>

            </div>

            {/* 1.2 "TOP ECO DRIVER" BADGE WITH GLOWING CROWN (4 COLS) */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#121c2c] via-[#0d1726] to-[#081220] border border-amber-500/40 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-5">
              
              {/* Radiant Glow Behind Crown */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-300 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
                  <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
                  <span>Top Eco Driver</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Week 37 Champion</span>
              </div>

              {/* Reigning Champion Spotlight */}
              <div className="relative z-10 text-center space-y-3 py-2">
                
                {/* Glowing Crown Avatar */}
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-400 p-0.5 shadow-xl shadow-amber-500/40 animate-pulse">
                    <div className="w-full h-full rounded-[22px] bg-[#091424] flex items-center justify-center text-amber-300 font-black text-2xl font-sans">
                      RV
                    </div>
                  </div>
                  {/* Floating Golden Crown */}
                  <div className="absolute -top-4 -right-3 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/50">
                    <Crown className="w-4 h-4 fill-slate-950" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">{topChampion.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{topChampion.depot}</p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#091524] border border-amber-500/30 text-xs">
                  <span className="text-amber-400 font-black">{topChampion.ecoScore} Eco Score</span>
                  <span className="text-slate-600">&bull;</span>
                  <span className="text-emerald-400 font-bold">{topChampion.fuelSavedLiters} L Saved</span>
                </div>
              </div>

              {/* Champion Stat Footer */}
              <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="text-[11px] text-slate-400">Total Points:</span>
                <strong className="text-white font-mono font-bold text-sm text-amber-300">
                  {topChampion.greenPoints.toLocaleString()} Pts 👑
                </strong>
              </div>

            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 2: STREAK COUNTER + ACHIEVEMENT BADGES */}
          {/* --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* 2.1 14-DAY STREAK COUNTER CARD (4 COLS) */}
            <div className="lg:col-span-4 rounded-3xl bg-[#091322]/95 backdrop-blur-xl border border-[#162744] p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center">
                      <Flame className="w-4 h-4 fill-orange-400" />
                    </div>
                    <h3 className="text-sm font-black text-white">Green Streak Counter</h3>
                  </div>
                  <span className="text-xs font-black text-orange-400">🔥 14 Days</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Complete at least one eco-rated trip each day to keep your streak active and earn double multiplier points.
                </p>
              </div>

              {/* Day by Day Tracker (Monday to Sunday) */}
              <div className="grid grid-cols-7 gap-1.5 py-2">
                {[
                  { day: 'M', active: true, label: 'Mon' },
                  { day: 'T', active: true, label: 'Tue' },
                  { day: 'W', active: true, label: 'Wed' },
                  { day: 'T', active: true, label: 'Thu' },
                  { day: 'F', active: true, label: 'Fri' },
                  { day: 'S', active: true, label: 'Sat' },
                  { day: 'S', active: true, isToday: true, label: 'Sun' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                      item.isToday
                        ? 'bg-gradient-to-tr from-emerald-400 to-teal-400 text-slate-950 shadow-md shadow-emerald-400/40 animate-pulse'
                        : item.active
                        ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-900 border border-slate-800 text-slate-600'
                    }`}>
                      {item.isToday ? '⚡' : '✓'}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{item.day}</span>
                  </div>
                ))}
              </div>

              {/* Streak Bonus Tag */}
              <div className="p-3 rounded-2xl bg-[#06121f] border border-[#14263c] flex items-center justify-between text-xs">
                <span className="text-slate-400">Active Multiplier:</span>
                <span className="text-emerald-400 font-bold">1.5x Green Points Active</span>
              </div>

            </div>

            {/* 2.2 ACHIEVEMENT BADGES (8 COLS) */}
            <div className="lg:col-span-8 rounded-3xl bg-[#091322]/95 backdrop-blur-xl border border-[#162744] p-5 sm:p-6 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <Award className="w-4 h-4 stroke-[2.4]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">Driver Achievement Badges</h3>
                    <p className="text-[11px] text-slate-400">Unlock tiers by mastering safe, fuel-efficient highway habits</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30 hidden sm:inline-block">
                  4 of 6 Unlocked
                </span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ACHIEVEMENTS.map((badge) => {
                  const Icon = badge.icon;
                  const isUnlocked = badge.unlocked;

                  return (
                    <div 
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2.5 ${
                        isUnlocked
                          ? 'bg-[#071322] border-emerald-500/30 hover:border-emerald-500/60 shadow-md'
                          : 'bg-[#060e1a]/60 border-slate-800/80 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                            : 'bg-slate-900 text-slate-600 border border-slate-800'
                        }`}>
                          <Icon className="w-4 h-4 stroke-[2.2]" />
                        </div>

                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          badge.tier === 'Diamond'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                            : badge.tier === 'Platinum'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {badge.tier}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-black text-white block truncate">{badge.name}</span>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                          {badge.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        {isUnlocked ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Unlocked
                          </span>
                        ) : (
                          <span className="text-amber-400 font-medium flex items-center gap-1 truncate">
                            <Clock className="w-3 h-3" /> {badge.progress}
                          </span>
                        )}
                        <span className="font-mono font-bold text-white">+{badge.pointsEarned} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 3: WEEKLY LEADERBOARD (TOP 10 ECO DRIVERS) */}
          {/* --------------------------------------------------------------------- */}
          <div className="rounded-3xl bg-[#091322]/95 backdrop-blur-xl border border-[#162744] p-5 sm:p-6 shadow-xl space-y-4">
            
            {/* Leaderboard Header with Filter Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Trophy className="w-4 h-4 stroke-[2.4]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Weekly Eco Leaderboard &bull; Top 10 Drivers</h3>
                  <p className="text-xs text-slate-400 font-medium">Ranked by fuel efficiency, smooth highway braking & zero idle time</p>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#070e1a] border border-[#182f50] self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setLeaderboardFilter('this-week')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leaderboardFilter === 'this-week'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  This Week
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardFilter('last-week')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leaderboardFilter === 'last-week'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Last Week
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardFilter('all-time')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leaderboardFilter === 'all-time'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All-Time Legends
                </button>
              </div>
            </div>

            {/* Leaderboard Table / Cards */}
            <div className="space-y-2 overflow-x-auto">
              {TOP_10_DRIVERS.map((driver) => {
                const isRank1 = driver.rank === 1;
                const isRank2 = driver.rank === 2;
                const isRank3 = driver.rank === 3;
                const isCurrentUser = driver.isCurrentUser;

                return (
                  <div
                    key={driver.rank}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isCurrentUser
                        ? 'bg-[#0a232c] border-emerald-400/80 shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/40'
                        : isRank1
                        ? 'bg-[#141b24] border-amber-500/40 shadow-md'
                        : 'bg-[#07101c] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Left: Rank & Driver Info */}
                    <div className="flex items-center gap-3.5 min-w-[220px]">
                      {/* Rank Number / Crown */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-xs font-sans">
                        {isRank1 ? (
                          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-400/40 font-black">
                            👑
                          </div>
                        ) : isRank2 ? (
                          <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-950 flex items-center justify-center shadow-md font-black">
                            🥈
                          </div>
                        ) : isRank3 ? (
                          <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-md font-black">
                            🥉
                          </div>
                        ) : (
                          <span className="text-slate-400 font-bold">#{driver.rank}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white block">{driver.name}</span>
                          {isCurrentUser && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-400 text-slate-950 uppercase tracking-wider">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block">{driver.depot} &bull; {driver.truckNo}</span>
                      </div>
                    </div>

                    {/* Middle: Streak & Fuel Saved */}
                    <div className="hidden md:flex items-center gap-6 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">Streak</span>
                        <span className="font-bold text-orange-400 flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-orange-400" /> {driver.streakDays} Days
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">Fuel Saved</span>
                        <span className="font-bold text-emerald-400">{driver.fuelSavedLiters} Liters</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">Eco Score</span>
                        <span className="font-bold text-white font-mono">{driver.ecoScore}/100</span>
                      </div>
                    </div>

                    {/* Right: Green Points Badge */}
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-black text-emerald-400 block font-mono">
                        {driver.greenPoints.toLocaleString()} Pts
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Earned This Season</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* ROW 4: REWARD VOUCHERS TICKER */}
          {/* --------------------------------------------------------------------- */}
          <div className="rounded-3xl bg-[#081220] border border-[#14263c] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/30 shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Monthly Green Incentives Unlocked</h4>
                <p className="text-xs text-slate-400">
                  Drivers in the Top 10 earn direct monthly fuel cashbacks, FASTag toll exemptions, and government green badges.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsRedeemModalOpen(true)}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                View Available Rewards
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. REDEEM REWARDS MODAL */}
      {/* ========================================================================= */}
      {isRedeemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#081324] border border-[#1b3457] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#142640]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Redeem Eco Green Points</h3>
                  <p className="text-[11px] text-slate-400">Balance: <strong>2,850 Green Points</strong></p>
                </div>
              </div>
              <button 
                onClick={() => setIsRedeemModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Vouchers List */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#06121f] border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">₹2,500 Cash Fuel Voucher</strong>
                  <span className="text-emerald-400 text-[11px]">Valid at HP, IndianOil & BPCL</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    alert('₹2,500 Fuel Voucher successfully sent to your registered driver mobile number!');
                    setIsRedeemModalOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                >
                  Redeem (2,500 Pts)
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#06121f] border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">₹1,000 FASTag Toll Recharge</strong>
                  <span className="text-slate-400 text-[11px]">Direct credit to vehicle AP 39 TE 4920</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    alert('₹1,000 FASTag Recharge initiated!');
                    setIsRedeemModalOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Redeem (1,000 Pts)
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#06121f] border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">Certified Green Driver Badge</strong>
                  <span className="text-slate-400 text-[11px]">Govt. verified eco certification</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">✓ Claimed</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsRedeemModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EcoChallengePage;
