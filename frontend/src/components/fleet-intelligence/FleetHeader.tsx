import React from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface FleetHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onSimulateEvent: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const FleetHeader: React.FC<FleetHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onSimulateEvent,
  onRefresh,
  isRefreshing
}) => {
  return (
    <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-blue-900/40 p-5 lg:p-6 shadow-2xl shadow-blue-950/40 space-y-5">
      {/* Upper Row: Title, Live Status, Key Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Fleet Intelligence Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Guntur Live Telematics
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Tracking 5 trucks in Guntur with OpenStreetMap • Red Original Route vs Green Optimized Route
              </p>
            </div>
          </div>
        </div>

        {/* Quick KPI Stat Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-blue-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/40">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Guntur Fleet</span>
              <span className="text-sm font-bold text-white">5 Active Trucks</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-blue-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Fleet Eco-Index</span>
              <span className="text-sm font-bold text-emerald-400">94.2% <span className="text-[10px] text-slate-400 font-mono font-normal">A+</span></span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-blue-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">CO₂ Avoided</span>
              <span className="text-sm font-bold text-cyan-300">1,840 kg</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-blue-900/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/40">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Total Distance</span>
              <span className="text-sm font-bold text-indigo-300">3,480 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: Search Bar, Status Filter, Action Triggers */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        <div className="flex flex-1 items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search truck number (e.g. AP 07 TJ 4821), ID, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="all">All Vehicles</option>
                <option value="en_route">En Route</option>
                <option value="charging">Charging</option>
                <option value="idle">Idle / Standby</option>
                <option value="alert">Alerts / Attention</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onSimulateEvent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all"
            title="Simulate a traffic delay event to trigger AI Copilot reroute"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Simulate Alert</span>
          </button>

          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
            title="Refresh live telemetry feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
