import React, { useState } from 'react';
import { 
  Leaf, 
  Truck, 
  LayoutDashboard, 
  FileText, 
  Settings as SettingsIcon, 
  Bell, 
  ChevronDown, 
  Calendar, 
  User, 
  MapPin, 
  Route, 
  CheckCircle2, 
  Fuel, 
  Cloud, 
  Trees, 
  Gauge, 
  Sparkles, 
  Download, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  X,
  QrCode,
  Share2,
  Check,
  ShieldCheck,
  Menu,
  Landmark,
  Navigation,
  Trophy
} from 'lucide-react';
import { DynamicTripPassport, INITIAL_COMPLETED_TRIPS } from './carbonCalculator';

// Images imported directly from src/assets
import blueTruckImg from '../../assets/blue_truck_highway.jpg';
import greenTruckSunriseImg from '../../assets/green_truck_sunrise.jpg';
import earthGlobe3dImg from '../../assets/earth_globe_3d.jpg';

interface CarbonPassportPhotoViewProps {
  onNavigate?: (tab: string) => void;
  trips?: DynamicTripPassport[];
  activeTripId?: string;
  onSelectTrip?: (trip: DynamicTripPassport) => void;
  onOpenSimulator?: () => void;
}

export const CarbonPassportPhotoView: React.FC<CarbonPassportPhotoViewProps> = ({
  onNavigate,
  trips = INITIAL_COMPLETED_TRIPS,
  activeTripId,
  onSelectTrip,
  onOpenSimulator
}) => {
  // Use active trip or default to the first trip (Trip #104 from photo)
  const currentTrip = trips.find(t => t.id === activeTripId) || trips[0] || INITIAL_COMPLETED_TRIPS[0];

  const [activeTab, setActiveTab] = useState('carbon-passport');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isTripPickerOpen, setIsTripPickerOpen] = useState(false);

  // Radial progress calculations
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const fuelDashoffset = circumference - (currentTrip.fuel_score / 100) * circumference;
  const co2Dashoffset = circumference - (currentTrip.co2_score / 100) * circumference;

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col lg:flex-row antialiased font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR (Exact Match to Photo) */}
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

          {/* 7 Navigation Links */}
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

            {/* 2. Carbon Passport (Active) */}
            <button
              onClick={() => handleNav('carbon-passport')}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50"
            >
              <Leaf className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Carbon Passport</span>
            </button>

            {/* 3. Government Incentives */}
            <button
              onClick={() => handleNav('government-incentives')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === 'government-incentives'
                  ? 'bg-[#0d2a2a] text-emerald-400 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Landmark className="w-4 h-4" />
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
        
        {/* Top Header Bar: Page Header & User Profile */}
        <header className="px-5 sm:px-8 py-5 border-b border-[#121f36] flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-[#060b14]/90 backdrop-blur-xl">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/40 shrink-0">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Carbon Passport
                </h1>

                {/* Subtle Dynamic Trip Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsTripPickerOpen(!isTripPickerOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0d1e33] border border-[#1b3457] hover:border-emerald-500/50 text-[11px] font-mono text-emerald-300 font-bold transition-all cursor-pointer"
                    title="Switch trip data"
                  >
                    <span>{currentTrip.trip_number}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {isTripPickerOpen && (
                    <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-[#0a1424] border border-emerald-500/40 p-2 shadow-2xl z-50 space-y-1 animate-in fade-in">
                      <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
                        Available Completed Trips
                      </span>
                      {trips.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            if (onSelectTrip) onSelectTrip(t);
                            setIsTripPickerOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                            t.trip_number === currentTrip.trip_number
                              ? 'bg-emerald-950 text-emerald-400 font-bold'
                              : 'text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{t.trip_number} ({t.origin} ➔ {t.destination})</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400">{t.eco_grade}</span>
                        </button>
                      ))}
                      {onOpenSimulator && (
                        <button
                          onClick={() => {
                            setIsTripPickerOpen(false);
                            onOpenSimulator();
                          }}
                          className="w-full mt-1 pt-1.5 border-t border-slate-800 text-center text-xs font-bold text-emerald-400 hover:underline py-1"
                        >
                          + Simulate Any Trip
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-0.5">
                Every completed trip receives an environmental performance report.
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
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] text-emerald-400 font-bold">1 New</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-white">Trip #104 Certified</p>
                    <p className="text-slate-400 text-[11px]">Environmental performance report generated with Grade A.</p>
                    <span className="text-[10px] text-slate-500 block">10:24 AM Today</span>
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
                    <p className="text-[11px]">Hub: <strong className="text-emerald-400">Guntur Logistics Hub</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. MAIN DASHBOARD GRID (Left/Center Content + Right Showcase Column) */}
        {/* ========================================================================= */}
        <main className="p-5 sm:p-7 max-w-[1700px] w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* --------------------------------------------------------------------- */}
            {/* LEFT / CENTER COLUMN (Approx 72% Width) */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* CARD 1: Trip Summary Hero Card */}
              <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-5 sm:p-6 shadow-xl shadow-slate-950/40 flex flex-col md:flex-row items-center gap-6">
                {/* Truck Photo on Left */}
                <div className="w-full md:w-72 lg:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden shrink-0 border border-slate-800 relative shadow-md">
                  <img 
                    src={blueTruckImg} 
                    alt="Blue Commercial Cargo Truck" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Trip Details on Right */}
                <div className="flex-1 w-full space-y-4">
                  {/* Top: Status Pill, Trip ID & Completed Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0c2925] border border-emerald-500/40 text-emerald-400">
                        <Check className="w-3 h-3 stroke-[3]" />
                        Completed
                      </span>
                      <h2 className="text-2xl font-black text-white tracking-tight font-sans">
                        {currentTrip.trip_number}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Completed on <strong className="text-white">{currentTrip.completed_at}</strong></span>
                    </div>
                  </div>

                  {/* Middle: Vehicle & Driver */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Vehicle</span>
                        <span className="text-sm font-bold text-white block">{currentTrip.vehicle_name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Driver</span>
                        <span className="text-sm font-bold text-white block">{currentTrip.driver_name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Corridor Route Visualizer */}
                  <div className="p-3 rounded-2xl bg-[#060d19] border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    {/* Origin */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-bold text-white block">{currentTrip.origin}</span>
                        <span className="text-[10px] text-slate-500 block">Start</span>
                      </div>
                    </div>

                    <span className="text-slate-600 font-bold">➔</span>

                    {/* Destination */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-bold text-white block">{currentTrip.destination}</span>
                        <span className="text-[10px] text-slate-500 block">Destination</span>
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="flex items-center gap-2">
                      <Route className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-bold text-white block">{currentTrip.distance_km} km</span>
                        <span className="text-[10px] text-slate-500 block">Distance</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Status</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0c2925] text-emerald-400 border border-emerald-500/30">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          {currentTrip.delivery_status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: 3 Score Cards (Side-by-Side) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Fuel Score Card */}
                <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-5 flex items-center justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Fuel className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">Fuel Score</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-sans">{currentTrip.fuel_score}</span>
                      <span className="text-xs text-slate-400 font-medium">/100</span>
                    </div>

                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#0d2a26] text-emerald-400 border border-emerald-800/60">
                      Great
                    </span>
                  </div>

                  {/* SVG Radial Gauge */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className="stroke-[#132238] fill-none"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className="stroke-emerald-400 fill-none transition-all duration-1000"
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={fuelDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-white font-mono">
                      {currentTrip.fuel_score}
                    </span>
                  </div>
                </div>

                {/* 2. CO2 Score Card */}
                <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-5 flex items-center justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-[#0c2038] border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">CO₂ Score</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-sans">{currentTrip.co2_score}</span>
                      <span className="text-xs text-slate-400 font-medium">/100</span>
                    </div>

                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#0d2538] text-cyan-400 border border-cyan-800/60">
                      Good
                    </span>
                  </div>

                  {/* SVG Radial Gauge */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className="stroke-[#132238] fill-none"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className="stroke-cyan-400 fill-none transition-all duration-1000"
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={co2Dashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-white font-mono">
                      {currentTrip.co2_score}
                    </span>
                  </div>
                </div>

                {/* 3. Eco Grade Card with Laurel Crest */}
                <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-5 flex items-center justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">Eco Grade</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-sans">{currentTrip.eco_grade}</span>
                    </div>

                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#0d2a26] text-emerald-400 border border-emerald-800/60">
                      Top Performer
                    </span>
                  </div>

                  {/* Stylized Laurel Wreath Crest SVG */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-18 h-18 text-emerald-400">
                      {/* Shield Center */}
                      <path 
                        d="M50 20 L75 30 L70 65 L50 82 L30 65 L25 30 Z" 
                        fill="#0c2825" 
                        stroke="#10b981" 
                        strokeWidth="2.5" 
                      />
                      {/* Left Laurel Leaves */}
                      <path d="M22 35 C18 42, 18 52, 22 62" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <circle cx="16" cy="38" r="3" fill="#10b981" />
                      <circle cx="14" cy="48" r="3" fill="#10b981" />
                      <circle cx="16" cy="58" r="3" fill="#10b981" />
                      {/* Right Laurel Leaves */}
                      <path d="M78 35 C82 42, 82 52, 78 62" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <circle cx="84" cy="38" r="3" fill="#10b981" />
                      <circle cx="86" cy="48" r="3" fill="#10b981" />
                      <circle cx="84" cy="58" r="3" fill="#10b981" />
                      {/* Grade Letter in Center */}
                      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
                        {currentTrip.eco_grade}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* CARD 3: Environmental Impact Card (6 Structured Metrics) */}
              <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#0c2825] text-emerald-400 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Environmental Impact
                  </h3>
                </div>

                {/* 6 Structured Metric Tiles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {/* 1. CO2 Emitted */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-1.5">
                    <div className="w-7 h-7 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">CO₂ Emitted</span>
                      <span className="text-base font-black text-white font-sans block">{currentTrip.co2_emitted_kg} kg</span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <ArrowDown className="w-3 h-3 stroke-[3]" />
                        15% vs. original
                      </span>
                    </div>
                  </div>

                  {/* 2. Fuel Used */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-1.5">
                    <div className="w-7 h-7 rounded-xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Fuel Used</span>
                      <span className="text-base font-black text-white font-sans block">{currentTrip.fuel_used_liters} L</span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <ArrowDown className="w-3 h-3 stroke-[3]" />
                        12% vs. original
                      </span>
                    </div>
                  </div>

                  {/* 3. Fuel Saved */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-1.5">
                    <div className="w-7 h-7 rounded-xl bg-teal-950/60 border border-teal-800/50 flex items-center justify-center text-teal-400">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Fuel Saved</span>
                      <span className="text-base font-black text-white font-sans block">12%</span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <ArrowUp className="w-3 h-3 stroke-[3]" />
                        12% vs. original
                      </span>
                    </div>
                  </div>

                  {/* 4. CO2 Reduced */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 space-y-1.5">
                    <div className="w-7 h-7 rounded-xl bg-green-950/60 border border-green-800/50 flex items-center justify-center text-green-400">
                      <Trees className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">CO₂ Reduced</span>
                      <span className="text-base font-black text-white font-sans block">{currentTrip.co2_reduced_kg} kg</span>
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5">
                        <ArrowUp className="w-3 h-3 stroke-[3]" />
                        18% vs. original
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Row of Tiles: Distance Covered & Avg Speed */}
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  {/* 5. Distance Covered */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                      <Route className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Distance Covered</span>
                      <span className="text-base font-black text-white font-sans block">{currentTrip.distance_km} km</span>
                    </div>
                  </div>

                  {/* 6. Avg Speed */}
                  <div className="p-3.5 rounded-2xl bg-[#08101d] border border-slate-800/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Avg. Speed</span>
                      <span className="text-base font-black text-white font-sans block">{currentTrip.avg_speed_kmh} km/h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 4: AI Insight Card */}
              <div className="rounded-3xl bg-[#0a1322] border border-[#142640] p-6 space-y-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      AI Insight
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Why this trip earned A pill button */}
                    <button
                      onClick={() => setIsExplanationOpen(!isExplanationOpen)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0a231f] border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-[#0d2f2a] transition-all cursor-pointer shrink-0"
                    >
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Why this trip earned A</span>
                    </button>

                    {/* 3 Bullets with Green Checkmarks */}
                    <div className="space-y-1 text-xs text-slate-300 font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                        <span>Optimized route reduced fuel consumption.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                        <span>Driver maintained efficient speed.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                        <span>Lower emissions than the original route.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stylized Earth Illustration on Right */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
                  <img 
                    src={earthGlobe3dImg} 
                    alt="AI Planet Insight" 
                    className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  />
                </div>
              </div>

              {/* CARD 5: Download Carbon Passport Button (Centered, Large Glowing Pill) */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="flex items-center gap-2.5 px-10 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 stroke-[2.8]" />
                  <span>Download Carbon Passport</span>
                </button>
              </div>

            </div>

            {/* --------------------------------------------------------------------- */}
            {/* RIGHT SHOWCASE COLUMN (Approx 28% Width - Exact Match to Photo) */}
            {/* --------------------------------------------------------------------- */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="rounded-3xl bg-[#091220] border border-[#142640] p-6 flex flex-col justify-between min-h-[750px] shadow-2xl relative overflow-hidden">
                
                {/* Background ambient lighting */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Section: Header & Motto */}
                <div className="space-y-3 relative z-10">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30">
                    <Leaf className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans leading-tight">
                      Cleaner Routes
                    </h2>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans leading-tight">
                      Greener Future
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Smaller changes in logistics make a big difference for the planet.
                  </p>
                </div>

                {/* Middle Section: Scenic Green Eco-Truck Mountain Highway Photo */}
                <div className="my-6 rounded-2xl overflow-hidden border border-[#1a3154] shadow-2xl relative z-10 aspect-[3/4] max-h-[380px]">
                  <img 
                    src={greenTruckSunriseImg} 
                    alt="Eco Green Commercial Truck on Scenic Mountain Highway at Sunrise" 
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle golden morning gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091220]/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Section: Glass Highlight Card & Circular CTA Arrow */}
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-[#0c182c]/90 backdrop-blur-md border border-[#182f50] flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0d2a26] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                        <Leaf className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Your trip contributed to</span>
                        <span className="text-sm font-black text-white block">
                          {currentTrip.co2_reduced_kg} kg less CO₂
                        </span>
                        <span className="text-[10px] text-slate-400 block font-medium">than the original route.</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsDownloadModalOpen(true)}
                      className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-600/30 transition-transform active:scale-95 shrink-0 cursor-pointer"
                      title="Inspect Certificate"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Flowing green wave accent line at the very bottom */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent rounded-full" />
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS & POPUPS */}
      {/* ========================================================================= */}

      {/* Download Carbon Passport Certificate Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#0a1322] border border-emerald-500/50 p-6 sm:p-7 shadow-2xl shadow-emerald-950 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Verified Carbon Passport Certificate</span>
              </div>
              <button
                onClick={() => setIsDownloadModalOpen(false)}
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
                  Official GreenLogix Registry
                </span>
                <h4 className="text-lg font-black text-white font-mono mt-0.5">
                  {currentTrip.trip_number} Verified
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Hash: {currentTrip.verified_hash}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Eco Grade:</span>
                  <span className="text-emerald-400 font-bold text-sm">{currentTrip.eco_grade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fuel Score:</span>
                  <span className="text-cyan-400 font-bold text-sm">{currentTrip.fuel_score} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Score:</span>
                  <span className="text-emerald-400 font-bold text-sm">{currentTrip.co2_score} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Reduced:</span>
                  <span className="text-white font-bold text-sm">{currentTrip.co2_reduced_kg} kg</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Carbon Passport PDF for ${currentTrip.trip_number} downloaded successfully!`);
                setIsDownloadModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              Export Signed PDF Certificate
            </button>
          </div>
        </div>
      )}

      {/* AI Explanation Modal */}
      {isExplanationOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-[#0a1322] border border-emerald-500/50 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Why this trip earned Grade A</span>
              </div>
              <button
                onClick={() => setIsExplanationOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>
                GreenLogix AI evaluated <strong className="text-white">{currentTrip.trip_number}</strong> against baseline logistics corridors:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li><strong className="text-emerald-400">14 kg CO₂ avoided</strong> compared to non-optimized baseline routing.</li>
                <li><strong className="text-teal-400">12% Fuel Reduction</strong> achieved via intelligent dispatch timing.</li>
                <li>Driver <strong className="text-white">{currentTrip.driver_name}</strong> maintained consistent speed at 56 km/h.</li>
              </ul>
            </div>

            <button
              onClick={() => setIsExplanationOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
