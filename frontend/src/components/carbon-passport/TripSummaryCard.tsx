import React, { useState } from 'react';
import { 
  Truck, 
  User, 
  MapPin, 
  Calendar, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Hash, 
  ArrowRight, 
  Copy, 
  Check, 
  ShieldCheck,
  Zap,
  Fuel,
  Package,
  Sparkles
} from 'lucide-react';
import { DynamicTripPassport } from './carbonCalculator';

interface TripSummaryCardProps {
  trip: DynamicTripPassport;
}

export const TripSummaryCard: React.FC<TripSummaryCardProps> = ({ trip }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(trip.trip_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine delivery status color badge
  const getStatusBadgeStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('delivered') || s.includes('completed')) {
      return {
        bg: 'bg-emerald-950/80',
        border: 'border-emerald-500/50',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400'
      };
    }
    if (s.includes('transit') || s.includes('progress')) {
      return {
        bg: 'bg-cyan-950/80',
        border: 'border-cyan-500/50',
        text: 'text-cyan-400',
        dot: 'bg-cyan-400'
      };
    }
    return {
      bg: 'bg-teal-950/80',
      border: 'border-teal-500/50',
      text: 'text-teal-400',
      dot: 'bg-teal-400'
    };
  };

  const statusStyle = getStatusBadgeStyle(trip.delivery_status);

  // Fuel type badge styling
  const getFuelTypeBadge = (type: string) => {
    switch (type) {
      case 'electric':
        return {
          icon: <Zap className="w-3 h-3 text-emerald-400" />,
          label: 'Electric EV',
          bg: 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
        };
      case 'cng':
        return {
          icon: <Fuel className="w-3 h-3 text-cyan-400" />,
          label: 'Clean CNG',
          bg: 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
        };
      case 'hydrogen':
        return {
          icon: <Sparkles className="w-3 h-3 text-teal-400" />,
          label: 'Hydrogen Fuel Cell',
          bg: 'bg-teal-950/60 border-teal-500/30 text-teal-300'
        };
      default:
        return {
          icon: <Fuel className="w-3 h-3 text-amber-400" />,
          label: 'Clean Diesel',
          bg: 'bg-amber-950/60 border-amber-500/30 text-amber-300'
        };
    }
  };

  const fuelBadge = getFuelTypeBadge(trip.fuel_type);

  return (
    <div className="rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-emerald-500/30 p-6 sm:p-7 shadow-2xl shadow-emerald-950/40 relative overflow-hidden space-y-6">
      {/* Background ambient lighting accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Card Title, Live Sync Beacon & Delivery Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/40 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25">
            <Navigation className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">
                Trip Summary
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800/80 border border-slate-700 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Synced
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verified operational telematics for <span className="text-emerald-300 font-bold font-mono">{trip.trip_number}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Delivery Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl ${statusStyle.bg} border ${statusStyle.border} shadow-lg shadow-emerald-950/30`}>
            <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-ping`} />
            <span className={`w-2 h-2 rounded-full ${statusStyle.dot} -ml-4`} />
            <CheckCircle2 className={`w-4 h-4 ${statusStyle.text}`} />
            <span className={`text-xs font-black uppercase tracking-wider ${statusStyle.text}`}>
              {trip.delivery_status}
            </span>
          </div>
        </div>
      </div>

      {/* Corridor Route Visualizer (Start -> Destination & Distance) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Active Route Corridor
          </span>
          <span className="font-mono text-emerald-400 text-xs">
            {trip.distance_km} km Total
          </span>
        </div>

        {/* Route Nodes Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin Node (Start) */}
          <div className="md:col-span-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <span className="text-xs font-black">A</span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Start Origin
              </span>
              <p className="text-xs sm:text-sm font-bold text-white truncate" title={trip.origin}>
                {trip.origin}
              </p>
            </div>
          </div>

          {/* Transit Line & Arrow Connector */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-1">
            <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
              <span>{trip.distance_km} km</span>
            </div>
            <div className="w-full flex items-center justify-center gap-1 text-emerald-400/60 my-1">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500/80 via-teal-500 to-cyan-500/80 rounded-full" />
              <ArrowRight className="w-4 h-4 text-cyan-400 stroke-[3] shrink-0" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{trip.duration_mins} mins</span>
            </div>
          </div>

          {/* Destination Node (End) */}
          <div className="md:col-span-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <span className="text-xs font-black">B</span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Destination
              </span>
              <p className="text-xs sm:text-sm font-bold text-white truncate" title={trip.destination}>
                {trip.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Telematics Grid: Trip ID, Vehicle Name, Driver Name, Date, Distance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
        {/* 1. Trip ID Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                <Hash className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Trip ID
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Copy Trip ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
          <div>
            <span className="text-base sm:text-lg font-black text-white font-mono block">
              {trip.trip_number}
            </span>
            <span className="text-[10px] text-emerald-400/90 font-mono block mt-0.5">
              Manifest #{trip.id.replace('passport-', '').toUpperCase()}
            </span>
          </div>
        </div>

        {/* 2. Vehicle Name Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-950/80 text-teal-400 border border-teal-800/40">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Vehicle Name
              </span>
            </div>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border ${fuelBadge.bg}`}>
              {fuelBadge.icon}
              <span>{fuelBadge.label}</span>
            </div>
          </div>
          <div>
            <span className="text-sm sm:text-base font-black text-white truncate block" title={trip.vehicle_name}>
              {trip.vehicle_name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              Plate: <strong className="text-cyan-300">{trip.truck_number}</strong>
            </span>
          </div>
        </div>

        {/* 3. Driver Name Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Driver Name
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-800 text-slate-300">
              Eco-Pilot
            </span>
          </div>
          <div>
            <span className="text-sm sm:text-base font-black text-white truncate block">
              {trip.driver_name}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">
              Verified Dispatch Personnel
            </span>
          </div>
        </div>

        {/* 4. Date & Timestamp Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Date
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {trip.completed_at}
            </span>
          </div>
          <div>
            <span className="text-sm sm:text-base font-black text-white block">
              {trip.date}
            </span>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              {trip.completed_at}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip: Distance, Cargo & Verification */}
      <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>Distance:</span>
            <strong className="text-white font-mono">{trip.distance_km} km</strong>
          </div>

          <div className="hidden sm:block text-slate-600">•</div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span>Payload:</span>
            <strong className="text-white font-mono">{(trip.cargo_weight_kg / 1000).toFixed(1)} MT ({trip.cargo_weight_kg.toLocaleString()} kg)</strong>
          </div>

          <div className="hidden sm:block text-slate-600">•</div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Trip Time:</span>
            <strong className="text-white font-mono">{trip.duration_mins} mins</strong>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 self-end sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Audit Ref: {trip.verified_hash}</span>
        </div>
      </div>
    </div>
  );
};
