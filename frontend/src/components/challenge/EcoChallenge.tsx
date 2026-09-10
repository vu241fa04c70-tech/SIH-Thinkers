import React, { useState } from 'react';
import {
  Trophy, Award, Flame, Gift, CheckCircle2, Star, Fuel, ShieldCheck,
  Zap, Navigation, ArrowUpRight, ChevronRight, User, TrendingUp, Sparkles,
  Coins, FileCheck, Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  viewMode?: 'simple' | 'technical';
}

const TOP_10_DRIVERS = [
  { rank: 1, name: 'Rajesh Varma', hub: 'Guntur Dispatch Hub', vehicle: 'AP 07 TJ 1120', streakDays: 21, fuelSavedLiters: 68.2, ecoScore: 98.4, points: 3420, isCurrentDriver: false },
  { rank: 2, name: 'Ramesh Kumar (You)', hub: 'Vijayawada Port Logistics', vehicle: 'AP 39 TE 4920', streakDays: 14, fuelSavedLiters: 54.5, ecoScore: 96.2, points: 2850, isCurrentDriver: true },
  { rank: 3, name: 'Suresh Reddy', hub: 'Amaravati Capital Base', vehicle: 'AP 16 CK 9901', streakDays: 18, fuelSavedLiters: 49.0, ecoScore: 94.8, points: 2710, isCurrentDriver: false },
  { rank: 4, name: 'Ankit Sharma', hub: 'Hyderabad Hitec Hub', vehicle: 'TS 09 UB 3642', streakDays: 11, fuelSavedLiters: 44.8, ecoScore: 93.5, points: 2540, isCurrentDriver: false },
  { rank: 5, name: 'Vikram Singh', hub: 'Visakhapatnam Harbor Base', vehicle: 'AP 31 TN 7801', streakDays: 9, fuelSavedLiters: 41.2, ecoScore: 92.1, points: 2420, isCurrentDriver: false },
  { rank: 6, name: 'Murugan S', hub: 'Chennai Central Depot', vehicle: 'TN 02 BX 4410', streakDays: 12, fuelSavedLiters: 38.6, ecoScore: 91.5, points: 2260, isCurrentDriver: false },
  { rank: 7, name: 'Deepak Patel', hub: 'Suryapet Express Hub', vehicle: 'TS 15 CA 8820', streakDays: 6, fuelSavedLiters: 35.4, ecoScore: 90.2, points: 2150, isCurrentDriver: false },
  { rank: 8, name: 'Priya Sharma', hub: 'Vijayawada EV Hub', vehicle: 'AP 16 EV 0001', streakDays: 15, fuelSavedLiters: 32.0, ecoScore: 89.8, points: 2050, isCurrentDriver: false },
  { rank: 9, name: 'Karthik Raja', hub: 'Eluru Logistics Depot', vehicle: 'AP 37 TZ 5512', streakDays: 8, fuelSavedLiters: 29.5, ecoScore: 88.4, points: 1920, isCurrentDriver: false },
  { rank: 10, name: 'Manoj Verma', hub: 'Rajahmundry Base', vehicle: 'AP 05 TY 3310', streakDays: 5, fuelSavedLiters: 26.2, ecoScore: 87.0, points: 1810, isCurrentDriver: false },
];

export const EcoChallenge: React.FC<Props> = () => {
  const { t } = useLanguage();
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<'thisWeek' | 'lastWeek' | 'allTime'>('thisWeek');
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  const handleRedeemVoucher = () => {
    alert("₹2,500 Fuel Voucher claimed successfully! Voucher code: GF-GREEN-2025");
  };

  return (
    <div className="space-y-8 text-slate-900 pb-12 font-sans max-w-7xl mx-auto bg-transparent min-h-screen p-4 sm:p-6 rounded-3xl">
      
      {/* 1. TOP HEADER BAR WITH VIEW REWARDS BUTTON */}
      <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t('ecoChallengeTitle', 'Eco Challenge')}</h1>
          </div>
          <p className="text-xs text-slate-700 font-medium tracking-wide">
            {t('ecoChallengeSub', 'Drive Smarter. Save More. Earn More.')}
          </p>
        </div>

        <button
          onClick={() => setShowRewardsModal(true)}
          className="px-5 py-3 rounded-[18px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 shrink-0"
        >
          <Gift className="w-4 h-4" />
          <span>{t('viewRewards', 'View Rewards')}</span>
        </button>
      </div>

      {/* 2. HERO SECTION: DRIVER HERO CARD (LEFT) & TOP ECO DRIVER CHAMPION (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* DRIVER HERO CARD (8 COLS) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-emerald-600/20">
                RK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900">Ramesh Kumar ({t('you', 'You')})</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                    {t('rank2', 'Rank #2')}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">Vijayawada Port Logistics • {t('diamondTier', 'Diamond Eco Tier (Level 5)')}</p>
              </div>
            </div>

            {/* Redeem Voucher Pill */}
            <button
              onClick={handleRedeemVoucher}
              className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-extrabold text-xs hover:bg-emerald-100 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('redeemVoucher', 'Redeem ₹2,500 Voucher ›')}</span>
            </button>
          </div>

          {/* Points Overview & Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div className="sm:col-span-1 space-y-0.5">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">{t('totalGreenPoints', 'Total Green Points')}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-slate-900 font-mono">2,850</span>
                <span className="text-xs font-bold text-emerald-600">{t('thisWeekPts', '+120 this week')}</span>
              </div>
            </div>

            <div className="sm:col-span-3 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-700 text-[10px] block uppercase">{t('fuelSaverPts', 'Fuel Saver')}</span>
                <span className="text-emerald-700 font-mono">+1,240 Pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-700 text-[10px] block uppercase">{t('smoothBrakingPts', 'Smooth Braking')}</span>
                <span className="text-blue-700 font-mono">+860 Pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-700 text-[10px] block uppercase">{t('zeroIdlingPts', 'Zero Idling')}</span>
                <span className="text-teal-700 font-mono">+750 Pts</span>
              </div>
            </div>
          </div>

          {/* Weekly Challenge Goal Progress Bar */}
          <div className="p-4 rounded-[18px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> {t('weeklyGoal', 'Weekly Challenge Goal: Save 30L Fuel')}
              </span>
              <span className="text-emerald-700 font-mono">{t('goalDone', '24.5L / 30L (82% Done)')}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-500 w-[82%]" />
            </div>
          </div>
        </div>

        {/* TOP ECO DRIVER CHAMPION CARD (4 COLS) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-[24px] bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> {t('weekChampion', 'Week 17 Champion')}
            </span>
            <Star className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" />
          </div>

          <div className="text-center space-y-2 py-2">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-900 font-black text-2xl flex items-center justify-center mx-auto shadow-lg border-2 border-white">
              RV
            </div>
            <h3 className="text-2xl font-black tracking-tight">Rajesh Varma</h3>
            <p className="text-xs text-emerald-100 font-medium">Guntur Dispatch Hub</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 grid grid-cols-2 text-center text-xs font-mono">
            <div>
              <span className="text-[10px] text-emerald-200 block font-sans">{t('ecoScoreCol', 'Eco Score')}</span>
              <span className="font-extrabold text-white text-base">98.4/100</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block font-sans">{t('greenPointsCol', 'Total Points')}</span>
              <span className="font-extrabold text-amber-300 text-base">3,420 Pts ⭐️</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. MIDDLE SECTION: GREEN STREAK COUNTER (LEFT) & DRIVER ACHIEVEMENTS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* GREEN STREAK COUNTER (4 COLS) */}
        <div className="lg:col-span-4 p-6 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" /> {t('greenStreakTitle', 'Green Streak Counter')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
              {t('days14', '14 Days')}
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t('streakSub', 'Complete at least one eco-rated trip each day to keep your streak active and earn double multiplier points.')}
          </p>

          {/* Daily Streak Dots */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-700">{day}</span>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-2xs">
                  ✓
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
            <span>{t('activeMultiplier', 'Active Multiplier')}</span>
            <span className="font-mono text-emerald-700 font-extrabold">{t('multiplierVal', '1.5x Green Points')}</span>
          </div>
        </div>

        {/* DRIVER ACHIEVEMENT BADGES (8 COLS) */}
        <div className="lg:col-span-8 p-6 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> {t('driverBadgesTitle', 'Driver Achievement Badges')}
            </span>
            <span className="text-xs font-bold text-slate-700">{t('unlockedCount', '4 of 5 Unlocked')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* BADGE 1: FUEL SAVER */}
            <div className="p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Fuel className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">PLATINUM</span>
              </div>
              <span className="font-black text-slate-900 text-sm block">{t('fuelSaverBadge', 'Fuel Saver')}</span>
              <p className="text-[11px] text-slate-700 font-medium leading-snug">{t('fuelSaverBadgeDesc', 'Achieved > 22% better fuel economy than baseline.')}</p>
              <span className="text-[11px] font-extrabold text-emerald-700 block pt-1">+1,240 Pts</span>
            </div>

            {/* BADGE 2: SMOOTH DRIVER */}
            <div className="p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold text-[10px]">GOLD</span>
              </div>
              <span className="font-black text-slate-900 text-sm block">{t('smoothDriverBadge', 'Smooth Driver')}</span>
              <p className="text-[11px] text-slate-700 font-medium leading-snug">{t('smoothDriverBadgeDesc', 'Gentle braking & zero harsh acceleration events.')}</p>
              <span className="text-[11px] font-extrabold text-emerald-700 block pt-1">+450 Pts</span>
            </div>

            {/* BADGE 3: ZERO IDLE */}
            <div className="p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-extrabold text-[10px]">DIAMOND</span>
              </div>
              <span className="font-black text-slate-900 text-sm block">{t('zeroIdleBadge', 'Zero Idle')}</span>
              <p className="text-[11px] text-slate-700 font-medium leading-snug">{t('zeroIdleBadgeDesc', 'Engine idling kept under 2% of total trip time.')}</p>
              <span className="text-[11px] font-extrabold text-emerald-700 block pt-1">+750 Pts</span>
            </div>

            {/* BADGE 4: ECO CHAMPION */}
            <div className="p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-extrabold text-[10px]">GOLD</span>
              </div>
              <span className="font-black text-slate-900 text-sm block">{t('ecoChampionBadge', 'Eco Champion')}</span>
              <p className="text-[11px] text-slate-700 font-medium leading-snug">{t('ecoChampionBadgeDesc', 'Top eco performance grade in regional fleet.')}</p>
              <span className="text-[11px] font-extrabold text-emerald-700 block pt-1">+900 Pts</span>
            </div>

            {/* BADGE 5: GREEN ROUTE MASTER */}
            <div className="p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-2 hover:border-emerald-300 transition-colors col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold text-[10px]">PLATINUM</span>
              </div>
              <span className="font-black text-slate-900 text-sm block">{t('greenRouteMasterBadge', 'Green Route Master')}</span>
              <p className="text-[11px] text-slate-700 font-medium leading-snug">{t('greenRouteMasterBadgeDesc', 'Completed 10 consecutive eco-optimized highway trips on NH 16.')}</p>
              <span className="text-[11px] font-extrabold text-emerald-700 block pt-1">+850 Pts</span>
            </div>

          </div>
        </div>

      </div>

      {/* 4. WEEKLY ECO LEADERBOARD (TOP 10 DRIVERS) */}
      <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('weeklyLeaderboardTitle', 'Weekly Eco Leaderboard - Top 10 Drivers')}</h2>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-0.5">{t('leaderboardSub', 'Ranked by fuel efficiency, smooth highway braking & zero-idle time')}</p>
          </div>

          {/* Timeframe Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setLeaderboardTimeframe('thisWeek')}
              className={`px-3 py-1.5 rounded-xl transition-all ${leaderboardTimeframe === 'thisWeek' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t('thisWeek', 'This Week')}
            </button>
            <button
              onClick={() => setLeaderboardTimeframe('lastWeek')}
              className={`px-3 py-1.5 rounded-xl transition-all ${leaderboardTimeframe === 'lastWeek' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t('lastWeek', 'Last Week')}
            </button>
            <button
              onClick={() => setLeaderboardTimeframe('allTime')}
              className={`px-3 py-1.5 rounded-xl transition-all ${leaderboardTimeframe === 'allTime' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t('allTimeLegends', 'All-Time Legends')}
            </button>
          </div>
        </div>

        {/* LEADERBOARD TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">{t('rankCol', 'Rank')}</th>
                <th className="pb-3 px-3">{t('driverHubCol', 'Driver Name & Hub')}</th>
                <th className="pb-3 px-3">{t('vehicleIdCol', 'Vehicle ID')}</th>
                <th className="pb-3 px-3">{t('streakCol', 'Streak')}</th>
                <th className="pb-3 px-3">{t('fuelSavedCol', 'Fuel Saved')}</th>
                <th className="pb-3 px-3">{t('ecoScoreCol', 'Eco Score')}</th>
                <th className="pb-3 px-3 text-right">{t('greenPointsCol', 'Green Points')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TOP_10_DRIVERS.map((d) => (
                <tr
                  key={d.rank}
                  className={`transition-colors ${
                    d.isCurrentDriver
                      ? 'bg-emerald-50/90 font-extrabold border-l-4 border-l-emerald-600'
                      : 'hover:bg-slate-50/80 font-medium'
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                      d.rank === 1 ? 'bg-amber-400 text-slate-900' :
                      d.rank === 2 ? 'bg-emerald-600 text-white' :
                      d.rank === 3 ? 'bg-slate-300 text-slate-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{d.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">{d.name}</span>
                      <span className="text-[11px] text-slate-700 font-normal">{d.hub}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{d.vehicle}</td>
                  <td className="py-3.5 px-3 text-amber-600 font-bold">🔥 {d.streakDays} {t('daysLabel', 'Days')}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{d.fuelSavedLiters} L</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-700">{d.ecoScore}/100</td>
                  <td className="py-3.5 px-3 text-right font-mono font-extrabold text-emerald-600 text-sm">
                    {d.points.toLocaleString()} Pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 5. WEEKLY PROGRESS & REWARDS SECTION */}
      <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('unlockableRewardsTitle', 'Unlockable Eco Benefits & Rewards')}</h2>
          </div>
          <p className="text-xs text-slate-700 font-medium mt-0.5">
            {t('unlockableRewardsSub', 'Convert your green points into fuel vouchers, government green credits, and official driver recognition.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* REWARD 1 */}
          <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
              <Coins className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{t('greenCreditsVouchers', 'Green Credits & Vouchers')}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {t('greenCreditsVouchersDesc', 'Exchange points for HPCL / IOCL fuel discounts and FASTag wallet top-ups.')}
              </p>
            </div>
            <button
              onClick={handleRedeemVoucher}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-xs"
            >
              {t('claimVoucher', 'Claim Voucher')}
            </button>
          </div>

          {/* REWARD 2 */}
          <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{t('nationalRecognition', 'National Fleet Recognition')}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {t('nationalRecognitionDesc', 'Featured on SIH national driver leaderboard and annual green logistics awards.')}
              </p>
            </div>
            <span className="w-full text-center py-2.5 rounded-xl bg-slate-200 text-slate-700 font-extrabold text-xs">
              {t('unlockedAtRank2', 'Unlocked at Rank #2')}
            </span>
          </div>

          {/* REWARD 3 */}
          <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
              <FileCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{t('ecoDrivingCert', 'Eco Driving Certificate')}</h3>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {t('ecoDrivingCertDesc', 'Official Government-aligned green driver certification for professional credentials.')}
              </p>
            </div>
            <button
              onClick={() => alert("Certificate downloaded: Greenfleet_Master_Driver_Ramesh_Kumar.pdf")}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-xs"
            >
              {t('downloadCertificate', 'Download Certificate')}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
