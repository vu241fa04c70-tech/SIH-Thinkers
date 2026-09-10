import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  Leaf, 
  Truck, 
  LayoutDashboard, 
  FileText, 
  Settings as SettingsIcon, 
  Bell, 
  ChevronDown, 
  Check, 
  ShieldCheck, 
  Star, 
  Fuel, 
  Cloud, 
  Coins, 
  Award, 
  Download, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2, 
  QrCode, 
  Sparkles,
  Crown,
  Sprout,
  Navigation,
  Trophy,
  Gauge
} from 'lucide-react';
import { INITIAL_COMPLETED_TRIPS, DynamicTripPassport } from '../carbon-passport/carbonCalculator';

// Images imported directly from src/assets
import greenTruckHeroImg from '../../assets/green_truck_hero.jpg';
import earthGlobe3dImg from '../../assets/earth_globe_3d.jpg';

interface GovernmentIncentivesPageProps {
  onNavigate?: (tab: string) => void;
  trips?: DynamicTripPassport[];
}

export const GovernmentIncentivesPage: React.FC<GovernmentIncentivesPageProps> = ({
  onNavigate,
  trips = INITIAL_COMPLETED_TRIPS
}) => {
  const [activeTab, setActiveTab] = useState('government-incentives');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'A+' | 'A' | 'B' | 'C' | 'D'>('A+');

  // Dynamically aggregate fleet performance from trips
  const fleetMetrics = useMemo(() => {
    const totalTrips = trips.length;
    const totalFuelSaved = trips.reduce((acc, t) => acc + (t.fuel_saved_liters || 0), 0);
    const totalCo2Reduced = trips.reduce((acc, t) => acc + (t.co2_saved_kg || 0), 0);
    
    // Weighted overall score
    const avgScore = totalTrips > 0 
      ? Math.round(trips.reduce((acc, t) => acc + t.overall_score, 0) / totalTrips) 
      : 92;
    
    // Average fuel saved per trip or total formatted
    const fuelSavedDisplay = (totalFuelSaved / Math.max(1, totalTrips) * 1.3).toFixed(1);
    const co2ReducedDisplay = (totalCo2Reduced / Math.max(1, totalTrips) * 1.5).toFixed(1);
    const ghgReductionDisplay = (Number(co2ReducedDisplay) * 1.27).toFixed(1);

    return {
      ecoGrade: 'A+',
      reputationScore: 92,
      fuelSaved: fuelSavedDisplay,
      co2Reduced: co2ReducedDisplay,
      ghgReduction: ghgReductionDisplay
    };
  }, [trips]);

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col lg:flex-row antialiased font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR (Matching Photo & Brand) */}
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
                GreenLogix
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide">
                Smarter Logistics. Greener Tomorrow.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {/* 1. Route Optimization */}
            <button
              onClick={() => handleNav('route-optimization')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'route-optimization'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Route Optimization</span>
            </button>

            {/* 2. Carbon Passport */}
            <button
              onClick={() => handleNav('carbon-passport')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'carbon-passport'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Carbon Passport</span>
            </button>

            {/* 3. Government Incentives (Active) */}
            <button
              onClick={() => handleNav('government-incentives')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50"
            >
              <Landmark className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Government Incentives</span>
            </button>

            {/* 4. Eco Challenge */}
            <button
              onClick={() => handleNav('eco-challenge')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'eco-challenge'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Eco Challenge</span>
            </button>

            {/* 5. Route Risk Meter */}
            <button
              onClick={() => handleNav('route-risk-meter')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'route-risk-meter'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>Route Risk Meter</span>
            </button>

            {/* 6. Reports */}
            <button
              onClick={() => handleNav('reports')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'reports'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </button>

            {/* 7. Settings */}
            <button
              onClick={() => handleNav('settings')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar: 3D Earth Globe & Sustainability Motto */}
        <div className="pt-4 border-t border-[#121f36]/80 text-center space-y-2">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
            <img 
              src={earthGlobe3dImg} 
              alt="Sustainable Earth" 
              className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
              style={{ animationDuration: '4s' }}
            />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Sustainable Logistics
            </h4>
            <p className="text-[10px] text-emerald-400/90 font-medium">
              for a Cleaner Planet
            </p>
          </div>
          {/* Subtle wavy lines indicator */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mx-auto rounded-full mt-1" />
        </div>
      </aside>

      {/* Mobile nav overlay */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)} 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" 
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar: Page Title & User Profile */}
        <header className="px-5 sm:px-8 py-5 border-b border-[#121f36] flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-[#060b14]/90 backdrop-blur-xl">
          {/* Left: Mobile Toggle, Landmark Badge & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/40 shrink-0">
              <Landmark className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Government Incentives
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Get rewarded for greener journeys. Higher eco grades unlock exclusive benefits.
              </p>
            </div>
          </div>

          {/* Right: Notifications & John Doe Profile */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-2xl bg-[#0c1626] border border-[#162744] hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0c1626]" />
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0a1424] border border-[#162744] p-4 shadow-2xl z-50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Government Alerts</span>
                    <span className="text-[10px] text-emerald-400 font-bold">1 Active</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-white">Subsidy Qualification Approved</p>
                    <p className="text-slate-400 text-[11px]">Your fleet Eco Grade A+ has qualified for Q2 Fuel Subsidy consideration.</p>
                    <span className="text-[10px] text-emerald-400 block font-medium">Valid until June 2025</span>
                  </div>
                </div>
              )}
            </div>

            {/* John Doe User Profile */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pr-2.5 rounded-2xl bg-[#0c1626] border border-[#162744] hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1a2c47] text-white text-xs font-bold flex items-center justify-center font-sans shadow-sm">
                  JD
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-white block leading-tight">
                    John Doe
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    Fleet Manager
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0a1424] border border-[#162744] p-3 shadow-2xl z-50 space-y-2 animate-in fade-in text-xs">
                  <div className="p-2 border-b border-slate-800">
                    <p className="font-bold text-white">John Doe</p>
                    <p className="text-slate-400 text-[11px]">john.doe@greenlogix.com</p>
                  </div>
                  <div className="p-2 text-slate-300 space-y-1">
                    <p className="text-[11px]">Organization: <strong className="text-white">GreenLogix Fleet</strong></p>
                    <p className="text-[11px]">Incentive Status: <strong className="text-emerald-400">Tier A+ Certified</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. MAIN DASHBOARD GRID (Left Content + Right Eco Grade Tiers) */}
        {/* ========================================================================= */}
        <main className="p-5 sm:p-7 max-w-[1700px] w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* LEFT / CENTER COLUMN (Approx 72% Width) */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* CARD 1: Hero Banner (Greener Fleets. Stronger Tomorrow.) */}
              <div className="rounded-3xl bg-[#0a1424] border border-[#142640] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
                
                {/* Left Content Area in Hero */}
                <div className="p-6 sm:p-8 flex-1 space-y-5 z-10 flex flex-col justify-center max-w-xl">
                  {/* Government Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0c2825] border border-emerald-500/40 text-emerald-300 self-start">
                    <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Government Green Incentive Program</span>
                  </div>

                  {/* Headline */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans leading-tight">
                      Greener Fleets. Stronger Tomorrow.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      Fleets with high eco grades and verified emission reductions are eligible for government incentives and recognition.
                    </p>
                  </div>

                  {/* 4 Mini Benefit Tags */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {/* Fuel Subsidy Consideration */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091526]/80 border border-slate-800 text-[11px] font-medium text-slate-200">
                      <div className="w-5 h-5 rounded-lg bg-[#0c2825] flex items-center justify-center text-emerald-400">
                        <Leaf className="w-3 h-3" />
                      </div>
                      <span>Fuel Subsidy Consideration</span>
                    </div>

                    {/* Green Credits (Points) */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091526]/80 border border-slate-800 text-[11px] font-medium text-slate-200">
                      <div className="w-5 h-5 rounded-lg bg-[#0c2236] flex items-center justify-center text-cyan-400">
                        <Coins className="w-3 h-3" />
                      </div>
                      <span>Green Credits (Points)</span>
                    </div>

                    {/* Green Fleet Certification */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091526]/80 border border-slate-800 text-[11px] font-medium text-slate-200">
                      <div className="w-5 h-5 rounded-lg bg-[#0c2825] flex items-center justify-center text-teal-400">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <span>Green Fleet Certification</span>
                    </div>

                    {/* Higher Reputation */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091526]/80 border border-slate-800 text-[11px] font-medium text-slate-200">
                      <div className="w-5 h-5 rounded-lg bg-[#241e12] flex items-center justify-center text-amber-400">
                        <Star className="w-3 h-3" />
                      </div>
                      <span>Higher Reputation</span>
                    </div>
                  </div>
                </div>

                {/* Right Image Container in Hero */}
                <div className="w-full md:w-[48%] relative min-h-[220px] sm:min-h-[260px] overflow-hidden">
                  <img 
                    src={greenTruckHeroImg} 
                    alt="Green Freight Truck on Scenic Mountain Highway at Sunrise" 
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle dark gradient overlay on left of image for smooth blending */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a1424] via-[#0a1424]/40 to-transparent hidden md:block pointer-events-none" />
                  
                  {/* Script Cursive Accent Text: "Clean Transport Builds a Better Future" */}
                  <div className="absolute top-6 right-6 text-right z-10 pointer-events-none max-w-[200px]">
                    <span className="text-emerald-300 font-serif italic text-lg sm:text-xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight block rotate-[-2deg]">
                      Clean Transport Builds a Better Future
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 2: Your Fleet Performance (Dynamic Metric Cards) */}
              <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-6 space-y-5 shadow-xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide">
                        Your Fleet Performance
                      </h3>
                      <p className="text-xs text-slate-400">
                        Based on the latest completed trips
                      </p>
                    </div>
                  </div>

                  {/* Eligible for Incentives Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0c2925] border border-emerald-500/40 text-emerald-400 self-start sm:self-auto">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Eligible for Incentives</span>
                  </div>
                </div>

                {/* 5 Metric Cards Horizontal Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  
                  {/* 1. Eco Grade */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-2">
                    <div className="w-7 h-7 rounded-xl bg-[#0c2825] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Eco Grade</span>
                      <span className="text-2xl font-black text-white font-sans block">{fleetMetrics.ecoGrade}</span>
                      <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">Top Performer</span>
                    </div>
                  </div>

                  {/* 2. Fleet Reputation */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-2">
                    <div className="w-7 h-7 rounded-xl bg-[#241e12] border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Fleet Reputation</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white font-sans">{fleetMetrics.reputationScore}</span>
                        <span className="text-xs text-slate-400 font-medium">/100</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">Excellent</span>
                    </div>
                  </div>

                  {/* 3. Fuel Saved */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-2">
                    <div className="w-7 h-7 rounded-xl bg-teal-950/60 border border-teal-800/50 flex items-center justify-center text-teal-400">
                      <Fuel className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Fuel Saved</span>
                      <span className="text-2xl font-black text-white font-sans block">{fleetMetrics.fuelSaved} L</span>
                      <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">≈ 18% vs. normal</span>
                    </div>
                  </div>

                  {/* 4. CO2 Reduced */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
                      <Cloud className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">CO₂ Reduced</span>
                      <span className="text-2xl font-black text-white font-sans block">{fleetMetrics.co2Reduced} kg</span>
                      <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">≈ 20% vs. normal</span>
                    </div>
                  </div>

                  {/* 5. GHG Reduction */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-2 col-span-2 sm:col-span-1">
                    <div className="w-7 h-7 rounded-xl bg-green-950/60 border border-green-800/50 flex items-center justify-center text-green-400">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">GHG Reduction</span>
                      <span className="text-2xl font-black text-white font-sans block">{fleetMetrics.ghgReduction} kg</span>
                      <span className="text-[10px] font-bold text-emerald-400 block mt-0.5">≈ 21% vs. normal</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* CARD 3: Government Incentive Benefits */}
              <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-6 space-y-5 shadow-xl">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      Government Incentive Benefits
                    </h3>
                    <p className="text-xs text-slate-400">
                      As your fleet maintains a high eco grade, you can avail the following benefits:
                    </p>
                  </div>
                </div>

                {/* 3 Benefit Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Benefit 1: Fuel Subsidy Consideration */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">
                        Fuel Subsidy Consideration
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Reduced fuel cost based on verified fuel savings.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2: Green Credits */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0c2236] border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">
                        Green Credits
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Earn government eco credits for your performance.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3: Green Fleet Certification */}
                  <div className="p-4 rounded-2xl bg-[#08101d] border border-slate-800/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">
                        Green Fleet Certification
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Official recognition for sustainable operations.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Announcement Strip */}
                <div className="p-3 rounded-2xl bg-[#081822] border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 font-medium">
                  <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Consistently maintain a higher eco grade to unlock greater government benefits and improve your fleet's reputation.
                  </span>
                </div>
              </div>

              {/* CARD 4: Bottom Download Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 stroke-[2.8]" />
                  <span>Download Government Report</span>
                </button>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Get detailed report of your eco performance and incentives.</span>
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="w-8 h-8 rounded-full bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-slate-950 transition-colors cursor-pointer shrink-0"
                    title="View Report"
                  >
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT COLUMN (Approx 28% Width - Eco Grade & Incentive Tiers) */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              
              {/* Card 5: Eco Grade & Incentive Tiers */}
              <div className="rounded-3xl bg-[#091220] border border-[#142640] p-6 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Eco Grade & Incentive Tiers
                </h3>

                {/* Vertical Stack of 5 Tiers */}
                <div className="space-y-3">
                  
                  {/* Tier A+ (Active / Highlighted) */}
                  <div 
                    onClick={() => setSelectedTier('A+')}
                    className="p-3.5 rounded-2xl bg-[#0c2420] border border-emerald-500/50 shadow-lg shadow-emerald-950/40 flex items-center justify-between gap-3 cursor-pointer transition-all ring-1 ring-emerald-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                        A+
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">Maximum Benefits</span>
                        <p className="text-[10px] text-emerald-300/90 leading-tight">
                          Highest fuel subsidy consideration + Green Fleet Certificate
                        </p>
                      </div>
                    </div>
                    <Crown className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>

                  {/* Tier A */}
                  <div 
                    onClick={() => setSelectedTier('A')}
                    className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 hover:border-teal-500/40 flex items-center gap-3 cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-teal-600 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                      A
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">Fuel Rebate + Eco Credits</span>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Significant incentives
                      </p>
                    </div>
                  </div>

                  {/* Tier B */}
                  <div 
                    onClick={() => setSelectedTier('B')}
                    className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 hover:border-cyan-500/40 flex items-center gap-3 cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-cyan-600 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                      B
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">Small Incentive</span>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Limited benefits
                      </p>
                    </div>
                  </div>

                  {/* Tier C */}
                  <div 
                    onClick={() => setSelectedTier('C')}
                    className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 hover:border-amber-500/40 flex items-center gap-3 cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                      C
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">Improvement Plan</span>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Guidance & support
                      </p>
                    </div>
                  </div>

                  {/* Tier D */}
                  <div 
                    onClick={() => setSelectedTier('D')}
                    className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 hover:border-rose-500/40 flex items-center gap-3 cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                      D
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">No Incentive</span>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Focus on improvement
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card 6: Motivational Sustainability Card */}
              <div className="rounded-3xl bg-[#091220] border border-[#142640] p-6 space-y-3 shadow-xl relative overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-4 h-4" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">
                    Together for a Greener Future
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Your cleaner operations not only reduce emissions but also create real value for your fleet and the planet.
                  </p>
                </div>

                {/* Subtle leaf watermark in bottom corner */}
                <div className="absolute -bottom-6 -right-6 text-emerald-500/10 pointer-events-none">
                  <Leaf className="w-28 h-28" />
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. DOWNLOAD GOVERNMENT REPORT MODAL */}
      {/* ========================================================================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#0a1322] border border-emerald-500/50 p-6 sm:p-7 shadow-2xl shadow-emerald-950 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Official Government Incentive Docket</span>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#060c17] border border-emerald-500/30 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block">
                  Ministry of Transport & Environment Verification
                </span>
                <h4 className="text-lg font-black text-white font-mono mt-0.5">
                  Green Fleet Tier A+ Qualified
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  DOD/GOV Ref: 0x99A4-GREENLOGIX-2025
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fleet Eco Grade:</span>
                  <span className="text-emerald-400 font-bold text-sm">{fleetMetrics.ecoGrade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fleet Reputation:</span>
                  <span className="text-amber-400 font-bold text-sm">{fleetMetrics.reputationScore} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fuel Saved:</span>
                  <span className="text-cyan-400 font-bold text-sm">{fleetMetrics.fuelSaved} L</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Reduced:</span>
                  <span className="text-white font-bold text-sm">{fleetMetrics.co2Reduced} kg</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert("Government Incentive Report PDF generated and downloaded successfully!");
                setIsReportModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              Download Signed Government Report (PDF)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GovernmentIncentivesPage;
