import React, { useState, useEffect } from 'react';
import { Truck, Ship, Fuel, Play, Pause, RefreshCw, DollarSign, Cloud, CheckCircle2 } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';

export const AnimatedLogisticsDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [truckProgress, setTruckProgress] = useState(15);
  const [shipProgress, setShipProgress] = useState(25);
  const [fuelLevel, setFuelLevel] = useState(90);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTruckProgress((prev) => (prev >= 95 ? 5 : prev + 1.2));
      setShipProgress((prev) => (prev >= 95 ? 10 : prev + 0.8));
      setFuelLevel((prev) => (prev <= 25 ? 95 : prev - 0.7));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetDemo = () => {
    setTruckProgress(15);
    setShipProgress(25);
    setFuelLevel(90);
  };

  const fuelUsedDemo = Math.round(420 - ((95 - fuelLevel) * 1.5));
  const costDemo = fuelUsedDemo * 100;
  const co2Demo = Math.round(fuelUsedDemo * 2.68);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl relative overflow-hidden text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
            🎬 Live Visual Demo
          </span>
          <h3 className="text-xl font-extrabold text-slate-900">
            Watch How Vehicles Move & Save Fuel
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            {isPlaying ? "Pause Demo" : "Play Demo"}
          </button>
          <button
            onClick={resetDemo}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Reset Animation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animation Track 1: Moving Truck */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2 text-emerald-700">
            <Truck className="w-4 h-4" /> 🚚 Step 1: Your truck starts its trip
          </span>
          <span className="font-mono text-slate-500">{Math.round(truckProgress)}% Trip Completed</span>
        </div>

        <div className="relative h-20 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center overflow-hidden">
          <div className="absolute inset-x-0 bottom-4 h-1.5 bg-slate-200 border-t border-dashed border-slate-400" />

          <div
            className="absolute top-3 transition-all duration-150 ease-linear flex flex-col items-center z-10"
            style={{ left: `calc(${truckProgress}% - 24px)` }}
          >
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold whitespace-nowrap mb-1 shadow-sm">
              Truck #1001 • Driving
            </span>
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <Truck className="w-5 h-5 transform -scale-x-100" />
            </div>
          </div>

          <div className="w-full flex justify-between px-6 z-0 text-[10px] text-slate-400 font-bold">
            <span>Start Depot</span>
            <span>Stop 1</span>
            <span>Stop 2</span>
            <span>Destination Hub</span>
          </div>
        </div>
      </div>

      {/* Animation Track 2: Moving Cargo Ship */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2 text-teal-700">
            <Ship className="w-4 h-4" /> 🚢 Step 2: Your ship follows its optimized route
          </span>
          <span className="font-mono text-slate-500">{Math.round(shipProgress)}% Sea Journey</span>
        </div>

        <div className="relative h-20 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center overflow-hidden">
          <div className="absolute inset-x-0 bottom-3 h-2 bg-teal-100/80 border-t border-teal-300" />

          <div
            className="absolute top-3 transition-all duration-150 ease-linear flex flex-col items-center z-10"
            style={{ left: `calc(${shipProgress}% - 24px)` }}
          >
            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-300 text-[10px] font-extrabold whitespace-nowrap mb-1 shadow-sm">
              Ship #804 • Sailing
            </span>
            <div className="p-2 rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/30">
              <Ship className="w-5 h-5" />
            </div>
          </div>

          <div className="w-full flex justify-between px-6 z-0 text-[10px] text-slate-400 font-bold">
            <span>Start Port</span>
            <span>Coastal Waypoint</span>
            <span>Ocean Route</span>
            <span>Destination Port</span>
          </div>
        </div>
      </div>

      {/* Track 3: 💰 Step 3: Less fuel = more money saved */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
          <span className="flex items-center gap-2 text-amber-700">
            <Fuel className="w-4 h-4" /> 💰 Step 3: Less fuel = more money saved
          </span>
          <span className="text-emerald-700 font-bold">20% Saved Compared to Normal Route</span>
        </div>

        {/* Live Animated Numbers */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-500 block text-[11px] font-medium">Fuel Used</span>
            <span className="font-extrabold text-amber-600 text-lg font-mono">{fuelUsedDemo} L</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-500 block text-[11px] font-medium">Money Spent</span>
            <span className="font-extrabold text-emerald-600 text-lg font-mono">₹{costDemo.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-500 block text-[11px] font-medium">
              CO₂ Produced
              <InfoTooltip text="Carbon dioxide emissions calculated based on fuel consumed." />
            </span>
            <span className="font-extrabold text-teal-600 text-lg font-mono">{co2Demo} kg</span>
          </div>
        </div>

        {/* Clear Route Comparison: Normal Route vs GreenFleet Route */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-1.5 text-xs">
            <span className="font-extrabold text-red-700 block uppercase tracking-wider text-[11px]">Normal Route</span>
            <div className="flex justify-between text-slate-700"><span>Fuel Used:</span> <span className="font-bold text-slate-900">420 L</span></div>
            <div className="flex justify-between text-slate-700"><span>Trip Cost:</span> <span className="font-bold text-slate-900">₹42,000</span></div>
            <div className="flex justify-between text-slate-700"><span>Emissions:</span> <span className="font-bold text-slate-700">1,100 kg CO₂e</span></div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5 text-xs">
            <span className="font-extrabold text-emerald-700 block uppercase tracking-wider text-[11px]">GreenFleet Route</span>
            <div className="flex justify-between text-slate-700"><span>Fuel Used:</span> <span className="font-bold text-emerald-700">350 L</span></div>
            <div className="flex justify-between text-slate-700"><span>Trip Cost:</span> <span className="font-bold text-emerald-700">₹35,000</span></div>
            <div className="flex justify-between text-slate-700"><span>Emissions:</span> <span className="font-bold text-teal-700">910 kg CO₂e</span></div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white space-y-1.5 text-xs font-bold shadow-md">
            <span className="font-extrabold text-emerald-100 block uppercase tracking-wider text-[11px]">YOU SAVE</span>
            <div className="flex justify-between text-white"><span>Fuel Saved:</span> <span>70 L</span></div>
            <div className="flex justify-between text-white"><span>Money Saved:</span> <span>₹7,000</span></div>
            <div className="flex justify-between text-emerald-100"><span>CO₂ Avoided:</span> <span>190 kg CO₂e</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
