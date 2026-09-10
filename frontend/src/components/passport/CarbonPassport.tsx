import React, { useState } from 'react';
import {
  Download, Leaf, ShieldCheck, CheckCircle2, Truck, User, MapPin,
  Clock, Award, Zap, Fuel, ArrowDown, ArrowUp, Navigation, Sparkles,
  BarChart2, ChevronRight, FileText, Share2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  viewMode?: 'simple' | 'technical';
}

// Sample completed fleet trip records for dynamic data generation
const COMPLETED_TRIPS = [
  {
    id: 'Trip #104',
    vehicleName: 'Truck 3',
    vehicleType: 'Heavy Freight Truck',
    driverName: 'Ramesh Kumar',
    origin: 'Guntur',
    destination: 'Vijayawada',
    distanceKm: 42,
    dateCompleted: 'Apr 16, 2025 • 10:24 AM',
    status: 'Delivered',
    fuelUsedLiters: 14,
    fuelSavedPct: 12,
    co2EmittedKg: 32,
    co2ReducedKg: 14,
    avgSpeedKmh: 58,
    fuelScore: 88,
    co2Score: 82,
    ecoGrade: 'A',
    ecoGradeLabel: 'Top Performer',
    reputationScore: 94,
    aiReasons: [
      'Maintained consistent cruising speed of 58 km/h on NH 16 Bypass.',
      'Avoided city center congestion bottlenecks, saving 2.4 L fuel.',
      'Driver Ramesh Kumar achieved 92% smooth deceleration score.'
    ],
    truckImageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Trip #105',
    vehicleName: 'Electric Van 1',
    vehicleType: 'Electric Fleet Van',
    driverName: 'Priya Sharma',
    origin: 'Vijayawada',
    destination: 'Eluru',
    distanceKm: 58,
    dateCompleted: 'Apr 18, 2025 • 02:15 PM',
    status: 'Delivered',
    fuelUsedLiters: 0,
    fuelSavedPct: 100,
    co2EmittedKg: 0,
    co2ReducedKg: 45,
    avgSpeedKmh: 62,
    fuelScore: 98,
    co2Score: 96,
    ecoGrade: 'A+',
    ecoGradeLabel: 'Zero Emissions Pioneer',
    reputationScore: 99,
    aiReasons: [
      'Operated 100% zero-emission electric powertrain across the trip.',
      'Utilized regenerative braking efficiency on coastal highway segments.',
      'Zero tailpipe emissions saved 45 kg CO₂ compared to diesel baseline.'
    ],
    truckImageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Trip #108',
    vehicleName: 'Cargo Carrier 7',
    vehicleType: 'Multi-Axle Truck',
    driverName: 'Suresh V.',
    origin: 'Vijayawada',
    destination: 'Visakhapatnam',
    distanceKm: 350,
    dateCompleted: 'Apr 20, 2025 • 08:30 AM',
    status: 'Delivered',
    fuelUsedLiters: 82,
    fuelSavedPct: 15,
    co2EmittedKg: 219,
    co2ReducedKg: 62,
    avgSpeedKmh: 64,
    fuelScore: 91,
    co2Score: 86,
    ecoGrade: 'A',
    ecoGradeLabel: 'Highway Master',
    reputationScore: 92,
    aiReasons: [
      'Leveraged NH 16 Expressway eco-corridor to minimize steep acceleration.',
      'Engine idling time reduced by 35 minutes via smart stop planning.',
      'Cargo weight distribution optimized to reduce rolling resistance.'
    ],
    truckImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  }
];

export const CarbonPassport: React.FC<Props> = () => {
  const { t } = useLanguage();
  const [selectedTripId, setSelectedTripId] = useState('Trip #104');

  const trip = COMPLETED_TRIPS.find(t => t.id === selectedTripId) || COMPLETED_TRIPS[0];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-slate-900 pb-12 font-sans max-w-7xl mx-auto">
      {/* 1. ENTERPRISE HEADER BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
            <Leaf className="w-4 h-4 text-emerald-600" />
            {t('officialSustCert', 'Official Sustainability Certificate')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('carbonPassportTitle', 'Carbon Passport')}
          </h1>
          <p className="text-sm text-slate-700 font-medium max-w-xl">
            {t('carbonPassportSub', 'Verified trip carbon accounting, driver efficiency score, and fleet environmental impact report.')}
          </p>
        </div>

        {/* Action Controls & Trip Selection */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Trip Selector Dropdown */}
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-extrabold text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
          >
            {COMPLETED_TRIPS.map(tItem => (
              <option key={tItem.id} value={tItem.id}>
                {tItem.id} - {tItem.vehicleName} ({tItem.origin} → {tItem.destination})
              </option>
            ))}
          </select>

          {/* Download Report Button */}
          <button
            onClick={handleDownload}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{t('downloadReport', 'Download Report')}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID: 2 COLUMNS (LEFT 2/3, RIGHT 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* TRIP OVERVIEW CARD */}
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('delivered', 'Delivered')}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{trip.id}</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                <Clock className="w-4 h-4 text-slate-700" />
                <span>{t('completedOn', 'Completed on')} {trip.dateCompleted}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Truck Illustration/Photo */}
              <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                <img
                  src={trip.truckImageUrl}
                  alt={trip.vehicleName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-extrabold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                    {t(trip.vehicleType, trip.vehicleType)}
                  </span>
                </div>
              </div>

              {/* Trip Metadata Details */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-[20px] bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm space-y-1">
                  <span className="text-slate-900 text-[11px] font-black block uppercase tracking-wider">{t('vehicleLabel', 'Vehicle')}</span>
                  <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" /> {trip.vehicleName}
                  </span>
                </div>

                <div className="p-3.5 rounded-[20px] bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm space-y-1">
                  <span className="text-slate-900 text-[11px] font-black block uppercase tracking-wider">{t('driverLabel', 'Driver')}</span>
                  <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-600" /> {trip.driverName}
                  </span>
                </div>

                <div className="p-3.5 rounded-[20px] bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm space-y-1">
                  <span className="text-slate-900 text-[11px] font-black block uppercase tracking-wider">{t('routeLabel', 'Route')}</span>
                  <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600" /> {trip.origin} → {trip.destination}
                  </span>
                </div>

                <div className="p-3.5 rounded-[20px] bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm space-y-1">
                  <span className="text-slate-900 text-[11px] font-black block uppercase tracking-wider">{t('distanceAndStatus', 'Distance & Status')}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{trip.distanceKm} km</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-black text-[10px]">
                      {t('delivered', 'Delivered')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THREE MAIN SCORE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* FUEL SCORE CARD */}
            <div className="p-6 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-emerald-600" /> {t('fuelScore', 'Fuel Score')}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">{trip.fuelScore}</span>
                  <span className="text-xs font-bold text-slate-800">/100</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs border border-emerald-300">
                  {t('greatEfficiency', 'Great Efficiency')}
                </span>
              </div>
              {/* Circular Gauge */}
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-600"
                    strokeDasharray={`${trip.fuelScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono font-black text-slate-900 text-xs">{trip.fuelScore}</span>
              </div>
            </div>

            {/* CO2 SCORE CARD */}
            <div className="p-6 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-teal-600" /> {t('co2Score', 'CO₂ Score')}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">{trip.co2Score}</span>
                  <span className="text-xs font-bold text-slate-800">/100</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-black text-xs border border-teal-300">
                  {t('goodPerformance', 'Good Performance')}
                </span>
              </div>
              {/* Circular Gauge */}
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-teal-600"
                    strokeDasharray={`${trip.co2Score}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono font-black text-slate-900 text-xs">{trip.co2Score}</span>
              </div>
            </div>

            {/* ECO GRADE BADGE & FLEET REPUTATION */}
            <div className="p-6 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> {t('ecoGrade', 'Eco Grade')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-700 tracking-tight">{trip.ecoGrade}</span>
                  <span className="text-xs font-extrabold text-slate-900">{t(trip.ecoGradeLabel, trip.ecoGradeLabel)}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-900 font-extrabold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('fleetReputation', 'Fleet Reputation')}: {trip.reputationScore}/100</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-emerald-600/20">
                {trip.ecoGrade}
              </div>
            </div>
          </div>

          {/* ENVIRONMENTAL IMPACT SECTION (ONLY 6 SIMPLE CARDS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                {t('envImpactMetrics', 'Environmental Impact Metrics')}
              </h3>
              <span className="text-xs font-extrabold text-slate-800">{t('verifiedBaselineComp', 'Verified Baseline Comparison')}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* CARD 1: FUEL USED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('fuelUsed', 'Fuel Used')}</span>
                  <Fuel className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{trip.fuelUsedLiters} L</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  <ArrowDown className="w-3 h-3 text-emerald-700" />
                  <span>{trip.fuelSavedPct}% {t('vsOriginal', 'vs. original')}</span>
                </div>
              </div>

              {/* CARD 2: FUEL SAVED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('fuelSavedVal', 'Fuel Saved')}</span>
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono">{trip.fuelSavedPct}%</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  <ArrowUp className="w-3 h-3 text-emerald-700" />
                  <span>{t('optimalRoute', 'Optimal Route')}</span>
                </div>
              </div>

              {/* CARD 3: CO2 EMITTED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('co2Emitted', 'CO₂ Emitted')}</span>
                  <Leaf className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{trip.co2EmittedKg} kg</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  <ArrowDown className="w-3 h-3 text-emerald-700" />
                  <span>15% {t('vsOriginal', 'vs. original')}</span>
                </div>
              </div>

              {/* CARD 4: CO2 REDUCED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('co2Reduced', 'CO₂ Reduced')}</span>
                  <Sparkles className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-teal-700 font-mono">{trip.co2ReducedKg} kg</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-teal-900 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300">
                  <ArrowUp className="w-3 h-3 text-teal-700" />
                  <span>18% {t('vsOriginal', 'vs. original')}</span>
                </div>
              </div>

              {/* CARD 5: DISTANCE COVERED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('distanceCovered', 'Distance Covered')}</span>
                  <Navigation className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{trip.distanceKm} km</div>
                <div className="text-[11px] font-extrabold text-slate-800">
                  {t('nh16Corridor', 'NH 16 Highway Corridor')}
                </div>
              </div>

              {/* CARD 6: AVERAGE SPEED */}
              <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-2">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-black uppercase tracking-wider">{t('avgSpeed', 'Average Speed')}</span>
                  <BarChart2 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{trip.avgSpeedKmh} km/h</div>
                <div className="text-[11px] font-extrabold text-emerald-800">
                  {t('optimalFuelZone', 'Optimal Fuel Economy Zone')}
                </div>
              </div>

            </div>
          </div>

          {/* ONE AI INSIGHT CARD */}
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>{t('aiInsights', 'AI Sustainability Insights')}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {t('ecoGradeRationale', 'Eco Grade Rationale')}
              </span>
            </div>

            <div className="space-y-3 text-xs font-medium text-slate-700 leading-relaxed">
              {trip.aiReasons.map((reason, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5">{t(reason, reason)}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (SLIM SUSTAINABILITY SIDEBAR & DOWNLOAD ACTION) */}
        <div className="space-y-6">
          
          {/* SLIM RIGHT-SIDE SUSTAINABILITY CARD */}
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                <Leaf className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {t('cleanerRoutesTitle', 'Cleaner Routes, Greener Future')}
                </h3>
                <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed">
                  {t('cleanerRoutesDesc', 'Smaller changes in logistics make a big difference for the planet. Every optimized kilometer reduces fuel waste and keeps tailpipe carbon out of local ecosystems.')}
                </p>
              </div>

              {/* Truck Graphic Asset */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80"
                  alt="Eco Green Commercial Truck"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Highlight Contribution Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">{t('tripContribution', 'Trip Contribution')}</div>
                <div className="text-sm font-extrabold text-emerald-950 flex items-center justify-between">
                  <span>{t('tripContributedTo', 'Your trip contributed to')}</span>
                  <span className="font-mono text-emerald-700 text-base">{trip.co2ReducedKg} kg {t('lessCo2', 'less CO₂')}</span>
                </div>
              </div>
            </div>

            {/* Quick Share / Export Link */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('sihVerifiedLogistics', 'SIH Verified Logistics')}
              </span>
              <button
                onClick={handleDownload}
                className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-extrabold"
              >
                <span>{t('share', 'Share')}</span> <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* FULL-WIDTH GREEN DOWNLOAD CARBON PASSPORT BUTTON */}
          <button
            onClick={handleDownload}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 group"
          >
            <Download className="w-5 h-5 text-white group-hover:translate-y-0.5 transition-transform" />
            <span>{t('downloadPassportBtn', 'Download Carbon Passport')}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
