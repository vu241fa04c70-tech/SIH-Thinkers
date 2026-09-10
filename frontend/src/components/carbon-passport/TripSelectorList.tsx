import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Leaf, 
  Gauge, 
  Fuel, 
  Route, 
  Truck, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DynamicTripPassport } from './carbonCalculator';

interface TripSelectorListProps {
  trips: DynamicTripPassport[];
  selectedTripId: string;
  onSelectTrip: (trip: DynamicTripPassport) => void;
  onOpenSimulator: () => void;
}

export const TripSelectorList: React.FC<TripSelectorListProps> = ({
  trips,
  selectedTripId,
  onSelectTrip,
  onOpenSimulator
}) => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');

  const filteredTrips = trips.filter((t) => {
    const q = search.toLowerCase().trim();
    const matchesSearch = 
      t.trip_number.toLowerCase().includes(q) ||
      t.truck_number.toLowerCase().includes(q) ||
      t.driver_name.toLowerCase().includes(q) ||
      t.route_name.toLowerCase().includes(q);

    const matchesGrade = gradeFilter === 'ALL' || t.eco_grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/30 p-5 shadow-2xl shadow-emerald-950/40 space-y-4">
      {/* Header & Simulator CTA */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-white tracking-tight">Completed Trips Registry</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {trips.length} Total
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Select any trip to inspect its dynamic Carbon Passport</p>
        </div>

        <button
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Simulate Trip</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Trip ID (e.g. Trip #105), truck, route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Eco Grade Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['ALL', 'A+', 'A', 'B+'].map((grade) => (
          <button
            key={grade}
            onClick={() => setGradeFilter(grade)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              gradeFilter === grade
                ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-600/25'
                : 'text-slate-400 bg-slate-950/80 hover:text-white border border-slate-800'
            }`}
          >
            {grade === 'ALL' ? 'All Grades' : `Grade ${grade}`}
          </button>
        ))}
      </div>

      {/* Trip Cards List */}
      <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
        {filteredTrips.map((trip) => {
          const isSelected = trip.id === selectedTripId;
          const isSample105 = trip.trip_number === 'Trip #105';

          return (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-emerald-600/50 hover:bg-slate-900/80'
              }`}
            >
              {/* Top Row: Trip ID & Eco Grade */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-white">
                    {trip.trip_number}
                  </span>
                  {isSample105 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500 text-slate-950">
                      Sample
                    </span>
                  )}
                </div>

                {/* Eco Grade */}
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-black">
                  <Leaf className="w-3 h-3 text-emerald-400" />
                  {trip.eco_grade}
                </span>
              </div>

              {/* Fuel Score & CO2 Score Pills */}
              <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-800/80">
                <div className="p-1.5 rounded-xl bg-slate-900 flex items-center justify-between px-2.5">
                  <span className="text-[10px] text-slate-400 font-medium">Fuel Score:</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">{trip.fuel_score}</span>
                </div>
                <div className="p-1.5 rounded-xl bg-slate-900 flex items-center justify-between px-2.5">
                  <span className="text-[10px] text-slate-400 font-medium">CO₂ Score:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{trip.co2_score}</span>
                </div>
              </div>

              {/* Route & Truck Info */}
              <div className="mt-2 space-y-0.5 text-[11px] text-slate-400 truncate">
                <div className="truncate text-slate-300 font-medium">
                  {trip.origin} ➔ {trip.destination}
                </div>
                <div className="flex items-center justify-between text-[10px] pt-1">
                  <span>{trip.truck_number} ({trip.fuel_type})</span>
                  <span className="text-emerald-400 font-mono">{trip.distance_km} km • {trip.completed_at}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTrips.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500 space-y-2">
            <p>No completed trips found matching "{search}".</p>
            <button
              onClick={onOpenSimulator}
              className="text-emerald-400 hover:underline font-semibold"
            >
              Simulate a new completed trip now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
