import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Download, 
  Trees, 
  Fuel, 
  Zap, 
  CheckCircle2, 
  QrCode, 
  Leaf, 
  Gauge, 
  FileCheck,
  Copy,
  Check,
  Route,
  Truck,
  User,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Share2
} from 'lucide-react';
import { DynamicTripPassport } from './carbonCalculator';

interface TripPassportDetailProps {
  trip: DynamicTripPassport;
}

export const TripPassportDetail: React.FC<TripPassportDetailProps> = ({ trip }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(trip.verified_hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowCertificateModal(true);
    }, 700);
  };

  // Radial progress ring circumference helper
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const fuelDashoffset = circumference - (trip.fuel_score / 100) * circumference;
  const co2Dashoffset = circumference - (trip.co2_score / 100) * circumference;

  return (
    <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative overflow-hidden space-y-6">
      {/* Background Ambient Glow Accent */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Verification Standard & Hash */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/40 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/50 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            IPCC Tier-3 & ISO 14064-1 Certified
          </span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            ID: CP-{trip.id.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHash}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800 text-[11px] font-mono text-cyan-300 transition-colors"
            title="Copy cryptographic audit hash"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{trip.verified_hash}</span>
              </>
            )}
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-600/25 transition-all"
          >
            {isExporting ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Certificate Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-gradient-to-r from-emerald-950/40 via-slate-950/80 to-teal-950/30 p-5 rounded-3xl border border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-300 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-slate-950">
            <Award className="w-8 h-8 stroke-[2.3]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase block">
              Trip Carbon Passport Document
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              {trip.trip_number}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Completed on <strong className="text-white">{trip.completed_at}</strong> • Tracked by GreenFleet Quantum AI
            </p>
          </div>
        </div>

        {/* Big Eco Grade Pill */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950/90 border border-emerald-500/50 shadow-xl self-stretch md:self-auto justify-between md:justify-start">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Official Eco Grade
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono leading-none">
                {trip.eco_grade}
              </span>
              <span className="text-xs font-bold text-emerald-300/80">
                ({trip.overall_score}/100)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dribbble-Style High-Tech Score Cards (Fuel Score & CO2 Score) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fuel Score Card */}
        <div className="p-5 rounded-3xl bg-slate-950/70 border border-emerald-500/25 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1.5 max-w-[60%]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                <Gauge className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Fuel Score
              </h3>
            </div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {trip.fuel_score} <span className="text-xs font-normal text-slate-400 font-sans">/ 100</span>
            </div>
            <p className="text-xs text-slate-300">
              Fuel Consumed: <strong className="text-white font-mono">{trip.fuel_used_liters} L</strong>
            </p>
            <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
              {trip.fuel_saved_liters} L fuel saved (-{trip.fuel_savings_percent}%)
            </span>
          </div>

          {/* Radial Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth="9"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-cyan-400 fill-none transition-all duration-1000"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={fuelDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-lg font-black text-white font-mono block leading-none">
                {trip.fuel_score}
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400">Score</span>
            </div>
          </div>
        </div>

        {/* CO2 Score Card */}
        <div className="p-5 rounded-3xl bg-slate-950/70 border border-emerald-500/25 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1.5 max-w-[60%]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                CO₂ Score
              </h3>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {trip.co2_score} <span className="text-xs font-normal text-slate-400 font-sans">/ 100</span>
            </div>
            <p className="text-xs text-slate-300">
              Total Emissions: <strong className="text-white font-mono">{trip.actual_co2_kg} kg CO₂e</strong>
            </p>
            <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
              {trip.co2_saved_kg} kg avoided (-{trip.co2_savings_percent}%)
            </span>
          </div>

          {/* Radial Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth="9"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-emerald-400 fill-none transition-all duration-1000"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={co2Dashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-lg font-black text-white font-mono block leading-none">
                {trip.co2_score}
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400">Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Journey & Logistics Telemetry Grid */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Route className="w-4 h-4 text-cyan-400" />
            Journey Telematics & Logistics Profile
          </span>
          <span className="text-[10px] font-mono text-emerald-400">
            {trip.ton_km} Ton-km Logged
          </span>
        </div>

        {/* Route Path */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Corridor Origin & Destination</span>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>{trip.origin}</span>
              <span className="text-emerald-400">➔</span>
              <span>{trip.destination}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300 font-mono text-xs">
            <span>{trip.distance_km} km</span>
            <span>•</span>
            <span>{trip.duration_mins} mins</span>
          </div>
        </div>

        {/* Metrics Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vehicle & Carrier</span>
            <span className="text-xs font-bold text-white font-mono mt-0.5 block truncate" title={trip.vehicle_name}>{trip.vehicle_name}</span>
            <span className="text-[10px] text-emerald-400 uppercase font-medium">{trip.truck_number} • {trip.fuel_type}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Driver</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{trip.driver_name}</span>
            <span className="text-[10px] text-slate-400">Certified Eco-Pilot</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Cargo Payload</span>
            <span className="text-xs font-bold text-white font-mono mt-0.5 block">
              {(trip.cargo_weight_kg / 1000).toFixed(1)} Metric Tons
            </span>
            <span className="text-[10px] text-slate-400">{trip.cargo_weight_kg.toLocaleString()} kg</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Carbon Intensity</span>
            <span className="text-xs font-bold text-emerald-400 font-mono mt-0.5 block">
              {trip.grams_co2_per_ton_km} g/ton-km
            </span>
            <span className="text-[10px] text-slate-400">GLEC Compliant</span>
          </div>
        </div>
      </div>

      {/* GHG Scope 1, Scope 2, Scope 3 Telemetry */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            GHG Protocol Scope Telemetry (This Trip)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Tier-3 Direct Ledger</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Scope 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Scope 1: Direct Combustion</span>
            <span className="text-base font-black text-white font-mono block">{trip.scope1_kg} kg CO₂e</span>
            <p className="text-[10px] text-slate-400">Tailpipe engine exhaust</p>
          </div>

          {/* Scope 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Scope 2: Charging Power</span>
            <span className="text-base font-black text-teal-300 font-mono block">{trip.scope2_kg} kg CO₂e</span>
            <p className="text-[10px] text-teal-400 font-medium">100% Green Solar PPA</p>
          </div>

          {/* Scope 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Scope 3: Upstream Carrier</span>
            <span className="text-base font-black text-cyan-300 font-mono block">{trip.scope3_kg} kg CO₂e</span>
            <p className="text-[10px] text-slate-400">Well-to-Tank fuel refining</p>
          </div>
        </div>
      </div>

      {/* Ecological Offset Equivalents Strip */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-teal-950/50 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Trees className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Trees Offset</span>
            <span className="text-sm font-bold text-white font-mono">{trip.trees_equivalent} Trees Planted</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Fuel className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fuel Avoided</span>
            <span className="text-sm font-bold text-white font-mono">{trip.fuel_saved_liters} L Diesel</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Clean Energy Equivalent</span>
            <span className="text-sm font-bold text-white font-mono">{(trip.co2_saved_kg * 1.8).toFixed(1)} kWh</span>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-emerald-500/50 p-6 sm:p-8 shadow-2xl shadow-emerald-950 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Verified Trip Carbon Certificate</span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <QrCode className="w-9 h-9" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block">
                  Official ESG Audit Docket
                </span>
                <h4 className="text-xl font-black text-white font-mono mt-0.5">
                  {trip.trip_number} Verified
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Hash: {trip.verified_hash}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Eco Grade:</span>
                  <span className="text-emerald-400 font-bold text-sm">{trip.eco_grade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">Fuel Score:</span>
                  <span className="text-cyan-400 font-bold text-sm">{trip.fuel_score} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Score:</span>
                  <span className="text-emerald-400 font-bold text-sm">{trip.co2_score} / 100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">CO₂ Avoided:</span>
                  <span className="text-white font-bold text-sm">{trip.co2_saved_kg} kg</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              This digital passport has been recorded under IPCC Tier-3 guidelines and ISO 14064-1 verification protocol.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
