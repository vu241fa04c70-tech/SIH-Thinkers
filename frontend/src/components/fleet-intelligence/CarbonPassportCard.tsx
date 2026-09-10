import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Download, 
  Trees, 
  Fuel, 
  Zap, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  QrCode, 
  Leaf, 
  Gauge, 
  FileCheck,
  ChevronRight,
  Route,
  Truck,
  Layers
} from 'lucide-react';
import { DUMMY_CARBON_PASSPORT, COMPLETED_TRIPS, CompletedTrip } from './dummyData';

export const CarbonPassportCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'esg'>('trips');
  const [selectedTrip, setSelectedTrip] = useState<CompletedTrip | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleDownload = (trip?: CompletedTrip) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setSelectedTrip(trip || COMPLETED_TRIPS[0]);
      setShowCertificateModal(true);
    }, 600);
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 p-5 shadow-2xl shadow-emerald-950/40 space-y-4">
      {/* Header with Green Eco Styling & Sustainability Icons */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Leaf className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">Carbon Passport</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              On-chain digital eco-credentials & trip sustainability ratings
            </p>
          </div>
        </div>

        {/* Global Eco Rating Badge */}
        <div className="px-3 py-1.5 rounded-2xl bg-gradient-to-b from-emerald-950 to-slate-950 border border-emerald-500/40 text-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">ESG Rating</span>
          <span className="text-sm font-black text-emerald-400">A+</span>
          <span className="text-[9px] text-emerald-300/80 font-mono block">96.4 / 100</span>
        </div>
      </div>

      {/* Tab Switcher: Completed Trips vs ESG Scope */}
      <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'trips'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 shadow-md shadow-emerald-600/30 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Completed Trips</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            activeTab === 'trips' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
          }`}>
            {COMPLETED_TRIPS.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('esg')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'esg'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 shadow-md shadow-emerald-600/30 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Fleet ESG Telemetry</span>
        </button>
      </div>

      {/* VIEW 1: COMPLETED TRIPS PASSPORT CARDS */}
      {activeTab === 'trips' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Award className="w-4 h-4 text-emerald-400" />
              Verified Trip Passports
            </span>
            <span className="text-[10px] text-slate-400 font-mono">ISO 14064-1 Audited</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
            {COMPLETED_TRIPS.map((trip) => {
              const isSample105 = trip.trip_number === 'Trip #105';
              return (
                <div
                  key={trip.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSample105
                      ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-emerald-700/60'
                  }`}
                >
                  {/* Trip Header: Trip ID & Eco Grade */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-white font-mono tracking-tight">
                            {trip.trip_number}
                          </h3>
                          {isSample105 && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500 text-slate-950 font-sans">
                              Sample
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{trip.completed_at}</span>
                      </div>
                    </div>

                    {/* Eco Grade Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-950 to-green-950 border border-emerald-500/50 shadow-sm">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-none">Eco Grade</span>
                        <span className="text-xs font-black text-emerald-400 leading-none">{trip.eco_grade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fuel Score & CO2 Score Display */}
                  <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-800/80">
                    {/* Fuel Score */}
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                          Fuel Score
                        </span>
                        <span className="text-xs font-black text-cyan-400 font-mono">
                          {trip.fuel_score}
                        </span>
                      </div>
                      {/* Fuel Score Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                          style={{ width: `${trip.fuel_score}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        Saved: {trip.fuel_saved_liters} L fuel
                      </span>
                    </div>

                    {/* CO2 Score */}
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-900/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                          CO₂ Score
                        </span>
                        <span className="text-xs font-black text-emerald-400 font-mono">
                          {trip.co2_score}
                        </span>
                      </div>
                      {/* CO2 Score Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
                          style={{ width: `${trip.co2_score}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        Avoided: {trip.co2_saved_kg} kg CO₂
                      </span>
                    </div>
                  </div>

                  {/* Route & Truck Details */}
                  <div className="mt-2.5 space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5 truncate">
                      <Route className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{trip.route_name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-slate-400" />
                        {trip.truck_number} ({trip.driver_name})
                      </span>
                      <span className="text-emerald-400 font-mono">
                        🌲 {trip.trees_equivalent} Trees
                      </span>
                    </div>
                  </div>

                  {/* Verify Certificate Action */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      Hash: {trip.verified_hash}
                    </span>
                    <button
                      onClick={() => handleDownload(trip)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 text-[11px] font-semibold transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>View Passport</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: FLEET ESG SCOPE SUMMARY */}
      {activeTab === 'esg' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Compliance Standard Banner */}
          <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-medium text-[11px]">
                {DUMMY_CARBON_PASSPORT.complianceStandard}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 hidden sm:inline">
              {DUMMY_CARBON_PASSPORT.validationHash}
            </span>
          </div>

          {/* Scope 1, 2, 3 Breakdown */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              GHG Scope Breakdown
            </div>

            <div className="space-y-1.5">
              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">Scope 1: Direct Fleet Combustion</span>
                  <span className="text-[10px] text-slate-400">Diesel & CNG route emissions</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white font-mono block">412 kg CO₂e</span>
                  <span className="text-[10px] font-medium text-emerald-400">-34% vs baseline</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">Scope 2: Grid Charging</span>
                  <span className="text-[10px] text-slate-400">100% Solar PPA contracted</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-teal-300 font-mono block">84 kg CO₂e</span>
                  <span className="text-[10px] font-medium text-teal-400">-62% net-zero</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 block">Scope 3: Upstream Well-to-Wheel</span>
                  <span className="text-[10px] text-slate-400">Carrier supply chain optimization</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-300 font-mono block">126 kg CO₂e</span>
                  <span className="text-[10px] font-medium text-cyan-400">-18% optimized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Net-Zero Milestone Progress Bar */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Monthly Net-Zero Milestone</span>
              <span className="font-bold text-emerald-400 font-mono">
                {DUMMY_CARBON_PASSPORT.monthlyProgress}% achieved
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400"
                style={{ width: `${DUMMY_CARBON_PASSPORT.monthlyProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Target: 22.5 Tons</span>
              <span className="font-mono text-slate-300">Saved: {DUMMY_CARBON_PASSPORT.carbonSavingsThisMonth}</span>
            </div>
          </div>

          {/* Ecological Offset Equivalents */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <Trees className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase font-semibold text-slate-400 block">Tree Offset</span>
              <span className="text-xs font-bold text-emerald-300 font-mono">118 Trees</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <Fuel className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase font-semibold text-slate-400 block">Diesel Saved</span>
              <span className="text-xs font-bold text-cyan-300 font-mono">680 Liters</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[9px] uppercase font-semibold text-slate-400 block">Solar Power</span>
              <span className="text-xs font-bold text-amber-300 font-mono">3.4 MWh</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Action Trigger */}
      <button
        onClick={() => handleDownload(COMPLETED_TRIPS[0])}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
      >
        {downloading ? (
          <span className="animate-pulse">Generating Secure ESG Document...</span>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download Verified Carbon Passport (PDF)</span>
          </>
        )}
      </button>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-emerald-500/50 p-6 shadow-2xl shadow-emerald-950 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Verified Trip Carbon Passport</span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">
                  {selectedTrip?.trip_number || 'Trip #105'} Certified
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Eco Grade: <strong className="text-emerald-400">{selectedTrip?.eco_grade || 'A+'}</strong> • Hash: {selectedTrip?.verified_hash || '0x7e4b...9a12'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fuel Score:</span>
                  <span className="text-cyan-400 font-bold">{selectedTrip?.fuel_score || 92} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Score:</span>
                  <span className="text-emerald-400 font-bold">{selectedTrip?.co2_score || 88} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Truck Assigned:</span>
                  <span className="text-white font-bold">{selectedTrip?.truck_number || 'AP 07 TJ 4821'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Trees Offset:</span>
                  <span className="text-emerald-300 font-bold">🌲 {selectedTrip?.trees_equivalent || 4.8} Trees</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Audited in compliance with GHG Protocol Tier-3 & ISO 14064-1 Standards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
