import React, { useState } from 'react';
import {
  MapPin, LocateFixed, Car, Bike, Bus, Truck, Zap,
  AlertTriangle, ShieldCheck, Fuel, DollarSign, CloudSun,
  Gauge, ArrowRightLeft, Sparkles, Navigation, ChevronDown, ChevronUp, Cpu
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  onRunOptimization: (params: any) => void;
  loading: boolean;
  viewMode?: 'simple' | 'technical';
  origin: string;
  setOrigin: (val: string) => void;
  destination: string;
  setDestination: (val: string) => void;
  selectedVehicle: string;
  setSelectedVehicle: (val: string) => void;
  routeMode: 'eco' | 'fastest';
  setRouteMode: (val: 'eco' | 'fastest') => void;
  isOptimized: boolean;
}

const LOCATION_SUGGESTIONS = [
  'Vijayawada Junction (NH 16)',
  'Guntur Logistics Base',
  'Amaravati Capital Region',
  'Eluru Highway Bypass',
  'Rajamahendravaram Freight Depot',
  'Visakhapatnam Port Terminal',
  'Suryapet Express Corridor',
  'Hyderabad Outer Ring Road'
];

const VEHICLE_OPTIONS = [
  { id: 'Car', label: 'Car', icon: Car, detail: 'Passenger Vehicle' },
  { id: 'Bike', label: 'Bike', icon: Bike, detail: '2-Wheeler Courier' },
  { id: 'Bus', label: 'Bus', icon: Bus, detail: 'Transit Shuttle' },
  { id: 'Truck', label: 'Truck', icon: Truck, detail: 'Heavy Freight' },
  { id: 'EV', label: 'Fleet EV', icon: Zap, detail: 'Electric Vehicle' }
];

export const OptimizationInput: React.FC<Props> = ({
  onRunOptimization,
  loading,
  viewMode = 'simple',
  origin,
  setOrigin,
  destination,
  setDestination,
  selectedVehicle,
  setSelectedVehicle,
  routeMode,
  setRouteMode,
  isOptimized
}) => {
  const { t } = useLanguage();
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setOrigin(`Live Location (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
        },
        () => {
          setOrigin('Live Location (Vijayawada Center)');
        }
      );
    } else {
      setOrigin('Live Location (Vijayawada Center)');
    }
  };

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="p-6 sm:p-8 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 space-y-6 shadow-xl shadow-slate-900/5 text-slate-900">
      {/* 1. Header & Location Inputs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-600" />
            Trip Route Planner
          </span>
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <LocateFixed className="w-3.5 h-3.5" /> Use My Location
          </button>
        </div>

        {/* From & To Location Search Fields */}
        <div className="space-y-3 relative">
          {/* FROM Input */}
          <div className="relative">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">From (Origin)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={origin}
                onChange={(e) => { setOrigin(e.target.value); setShowOriginList(true); }}
                onFocus={() => setShowOriginList(true)}
                placeholder="Enter starting city or landmark..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
              />
            </div>
            {showOriginList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                {LOCATION_SUGGESTIONS.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setOrigin(loc); setShowOriginList(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 text-xs text-slate-800 font-medium flex items-center gap-2 border-b border-slate-100"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-md"
              title="Swap Origin & Destination"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>

          {/* TO Input */}
          <div className="relative">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">To (Destination)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setShowDestList(true); }}
                onFocus={() => setShowDestList(true)}
                placeholder="Enter destination city..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm"
              />
            </div>
            {showDestList && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                {LOCATION_SUGGESTIONS.map((loc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setDestination(loc); setShowDestList(false); }}
                    className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 text-xs text-slate-800 font-medium flex items-center gap-2 border-b border-slate-100"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Vehicle Selection Bar */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Vehicle Type Selection</label>
        <div className="grid grid-cols-5 gap-1.5">
          {VEHICLE_OPTIONS.map((v) => {
            const Icon = v.icon;
            const isSelected = selectedVehicle === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v.id)}
                className={`py-2.5 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white/70 hover:bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-700'}`} />
                <span className="text-[10px] font-bold">{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Compact Smart Panel */}
      <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Compact Smart Panel
          </span>
          <span className="text-[10px] text-slate-700 font-mono">Live Route Metrics</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Risk Meter */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-slate-700 block font-medium">Route Risk</span>
                <span className="font-extrabold text-emerald-700 text-xs">Low (12%)</span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Live Traffic */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-600" />
            <div>
              <span className="text-[10px] text-slate-700 block font-medium">Live Traffic</span>
              <span className="font-extrabold text-blue-700 text-xs">Free Flow • 68 km/h</span>
            </div>
          </div>

          {/* Weather Alert */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-[10px] text-slate-700 block font-medium">Weather Alert</span>
              <span className="font-extrabold text-amber-800 text-xs">28°C Clear • Dry</span>
            </div>
          </div>

          {/* Toll Cost */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-700 block font-medium">Toll Cost</span>
              <span className="font-extrabold text-emerald-800 text-xs">₹380 FASTag Kaza</span>
            </div>
          </div>

          {/* Fuel Saving */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-2">
            <Fuel className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-700 block font-medium">Fuel Saving</span>
              <span className="font-extrabold text-emerald-700 text-xs">24.5 L (22.8%)</span>
            </div>
          </div>

          {/* CO2 Reduction */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-teal-600" />
            <div>
              <span className="text-[10px] text-slate-700 block font-medium">CO₂ Reduction</span>
              <span className="font-extrabold text-teal-700 text-xs">65.6 kg Avoided</span>
            </div>
          </div>
        </div>

        {/* Fastest vs Eco Route Switch */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-700">Route Preference</span>
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setRouteMode('eco')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                routeMode === 'eco'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌱 Eco Route
            </button>
            <button
              type="button"
              onClick={() => setRouteMode('fastest')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                routeMode === 'fastest'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ Fastest Route
            </button>
          </div>
        </div>
      </div>

      {/* 4. Optimize Route Action Button */}
      <button
        type="button"
        onClick={() => onRunOptimization({ origin, destination, vehicle: selectedVehicle, mode: routeMode })}
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 group"
      >
        <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
        <span>{loading ? "Optimizing Route..." : "Optimize Route"}</span>
      </button>

      {/* Progressive Disclosure: Benchmark solver details */}
      <div className="pt-2 border-t border-slate-200/80">
        <button
          type="button"
          onClick={() => setShowTechDetails(!showTechDetails)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-purple-600" /> View Solver Formulation Details
          </span>
          {showTechDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showTechDetails && (
          <div className="mt-3 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 font-mono text-[11px] text-purple-900 space-y-1.5">
            <div className="font-extrabold text-purple-950">QUBO Optimization Engine</div>
            <div>• Min E(x) = x^T Q x + α(Fuel) + β(Emissions)</div>
            <div>• Simulated Annealing Metaheuristic with Traffic Constraints</div>
            <div>• NH 16 Regional Node Mapping</div>
          </div>
        )}
      </div>
    </div>
  );
};

