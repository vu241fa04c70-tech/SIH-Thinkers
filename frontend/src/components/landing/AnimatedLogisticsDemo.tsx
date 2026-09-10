import React, { useState, useEffect } from 'react';
import { Truck, Ship, Fuel, Play, Pause, RefreshCw, Zap, Gauge, Navigation, MapPin, CheckCircle2, ShieldCheck, Sparkles, FastForward } from 'lucide-react';
import { InfoTooltip } from '../common/InfoTooltip';
import { useLanguage } from '../../context/LanguageContext';

interface Waypoint {
  id: string;
  nameKey: string;
  defaultName: string;
  percent: number;
  labelKey: string;
  defaultLabel: string;
  bonus: string;
}

const TRUCK_WAYPOINTS: Waypoint[] = [
  { id: 'depot', nameKey: 'wpStartDepot', defaultName: 'Start Depot', percent: 5, labelKey: 'lblOriginTerminal', defaultLabel: 'Origin Terminal', bonus: '📦 Fleet Dispatched' },
  { id: 'toll', nameKey: 'wpGreenTollHub', defaultName: 'Green Toll Hub', percent: 35, labelKey: 'lblFastagPass', defaultLabel: 'Automated FASTag Pass', bonus: '⚡ -12 Min Saved' },
  { id: 'rest', nameKey: 'wpEvChargingRest', defaultName: 'EV Charging / Rest', percent: 68, labelKey: 'lblEcoChargeStop', defaultLabel: 'Eco-Charge Stop', bonus: '🔋 +30% Battery Boost' },
  { id: 'dest', nameKey: 'wpDestinationHub', defaultName: 'Destination Hub', percent: 95, labelKey: 'lblFinalDropoff', defaultLabel: 'Final Drop-off', bonus: '🏁 On-Time Delivery' },
];

const SHIP_WAYPOINTS: Waypoint[] = [
  { id: 'port_start', nameKey: 'wpMumbaiPort', defaultName: 'Mumbai Port', percent: 10, labelKey: 'lblOceanFreightLoad', defaultLabel: 'Ocean Freight Load', bonus: '⚓ Cargo Anchored' },
  { id: 'strait', nameKey: 'wpCoastalWaypoint', defaultName: 'Coastal Waypoint', percent: 42, labelKey: 'lblOptimalCurrentFlow', defaultLabel: 'Optimal Current Flow', bonus: '🌊 +4 Knots Speed' },
  { id: 'deep_sea', nameKey: 'wpOceanicRoute', defaultName: 'Oceanic Route', percent: 75, labelKey: 'lblEcoSailingCorridor', defaultLabel: 'Eco-Sailing Corridor', bonus: '🌱 -22% Diesel Burn' },
  { id: 'port_end', nameKey: 'wpKochiTerminal', defaultName: 'Kochi Terminal', percent: 95, labelKey: 'lblPortArrival', defaultLabel: 'Port Arrival', bonus: '🎉 Zero-Delay Docking' },
];

export const AnimatedLogisticsDemo: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeVehicle, setActiveVehicle] = useState<'all' | 'truck' | 'van' | 'ship'>('all');

  const [truckProgress, setTruckProgress] = useState(18);
  const [vanProgress, setVanProgress] = useState(32);
  const [shipProgress, setShipProgress] = useState(25);
  const [fuelLevel, setFuelLevel] = useState(88);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const step = 0.6 * speedMultiplier;

      setTruckProgress((prev) => {
        const next = prev >= 95 ? 5 : prev + step;
        return next;
      });

      setVanProgress((prev) => {
        const next = prev >= 95 ? 5 : prev + step * 1.25;
        return next;
      });

      setShipProgress((prev) => {
        const next = prev >= 95 ? 10 : prev + step * 0.7;
        return next;
      });

      setFuelLevel((prev) => {
        if (prev <= 15) return 95;
        return Math.max(10, prev - 0.15 * speedMultiplier);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const resetDemo = () => {
    setTruckProgress(18);
    setVanProgress(32);
    setShipProgress(25);
    setFuelLevel(88);
    setActiveNotification('Animation reset to start!');
    setTimeout(() => setActiveNotification(null), 2500);
  };

  const jumpToWaypoint = (percent: number, bonus: string) => {
    setTruckProgress(percent);
    setVanProgress(percent);
    setShipProgress(percent);
    setActiveNotification(`Jumped to Waypoint! Event: ${bonus}`);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  // Live Telemetry Calculations
  const distanceCovered = Math.round((truckProgress / 100) * 450);
  const currentSpeed = isPlaying ? Math.round(72 + Math.sin(truckProgress * 0.1) * 8 * speedMultiplier) : 0;
  const fuelUsed = Math.round(420 - ((fuelLevel / 100) * 120));
  const moneySaved = Math.round(fuelUsed * 22.5);
  const co2Saved = Math.round(fuelUsed * 2.68);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl relative overflow-hidden text-slate-900">
      {/* Top Header & Interactive Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin-fast" /> {t('simBadge', 'Real-Time Interactive Simulator')}
            </span>
            <span className="text-xs text-slate-700 font-bold hidden sm:inline">• {t('simPhysicsTelemetry', 'Live Physics & Route Telemetry')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('simTitle')}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-extrabold">
            <button
              onClick={() => setActiveVehicle('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVehicle === 'all' ? 'bg-white text-emerald-700 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('simAllVehicles')}
            </button>
            <button
              onClick={() => setActiveVehicle('truck')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVehicle === 'truck' ? 'bg-white text-emerald-700 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('simHeavyTruck')}
            </button>
            <button
              onClick={() => setActiveVehicle('van')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVehicle === 'van' ? 'bg-white text-emerald-700 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('simEvVan')}
            </button>
            <button
              onClick={() => setActiveVehicle('ship')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVehicle === 'ship' ? 'bg-white text-teal-700 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('simCargoShip')}
            </button>
          </div>

          {/* Speed Multipliers */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-extrabold">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  speedMultiplier === spd ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            {isPlaying ? t('simPause', 'Pause') : t('simPlayMovement', 'Play Movement')}
          </button>

          {/* Reset */}
          <button
            onClick={resetDemo}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all active:scale-95"
            title={t('simResetTitle', 'Reset Simulation')}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Waypoint Jump Banner */}
      {activeNotification && (
        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{activeNotification}</span>
        </div>
      )}

      {/* Track 1: Heavy Truck Highway Movement */}
      {(activeVehicle === 'all' || activeVehicle === 'truck') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2 text-emerald-700 font-extrabold">
              <Truck className="w-4 h-4" /> {t('heavyTruckTrackTitle', 'Heavy Diesel Truck #1001 • Highway AI Route')}
            </span>
            <div className="flex items-center gap-3 font-mono text-slate-600">
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                {currentSpeed} km/h
              </span>
              <span>{Math.round(truckProgress)}% {t('tripComplete', 'Trip Complete')}</span>
            </div>
          </div>

          <div className="relative h-28 rounded-2xl bg-slate-900 border border-slate-700 p-4 flex items-center overflow-hidden shadow-inner">
            {/* Highway Asphalt Texture */}
            <div className="absolute inset-0 bg-slate-900" />
            
            {/* Animated Moving Road Lanes */}
            <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 animate-road opacity-80`} />
            
            {/* Road Guard Rails */}
            <div className="absolute inset-x-0 top-2 h-0.5 bg-slate-700 border-t border-slate-600" />
            <div className="absolute inset-x-0 bottom-2 h-0.5 bg-slate-700 border-b border-slate-600" />

            {/* Clickable Waypoint Markers along the track */}
            <div className="absolute inset-x-8 top-3 bottom-3 flex justify-between z-0">
              {TRUCK_WAYPOINTS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => jumpToWaypoint(wp.percent, wp.bonus)}
                  className="flex flex-col items-center group focus:outline-none"
                  title={`Click to jump to ${t(wp.nameKey, wp.defaultName)}`}
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-md group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] text-slate-300 font-extrabold mt-1 group-hover:text-emerald-400 transition-colors">
                    {t(wp.nameKey, wp.defaultName)}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono hidden sm:inline">
                    {wp.percent}%
                  </span>
                </button>
              ))}
            </div>

            {/* Vehicle Avatar on Track */}
            <div
              className={`absolute top-4 transition-all duration-150 ease-linear flex flex-col items-center z-10 ${
                isPlaying ? 'animate-bob' : ''
              }`}
              style={{ left: `calc(${truckProgress}% - 28px)` }}
            >
              {/* Status Popup Tag above vehicle */}
              <div className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black whitespace-nowrap mb-1 shadow-lg border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                {t('truck1001Tag', 'Truck #1001')}
              </div>

              {/* Vehicle Body with Headlights & Wheel Effects */}
              <div className="relative p-2.5 rounded-xl bg-emerald-600 text-white shadow-xl shadow-emerald-500/40 border border-emerald-400 flex items-center justify-center">
                <Truck className="w-6 h-6 transform -scale-x-100 text-white" />
                
                {/* Glowing Headlight Beam */}
                <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-4 h-3 bg-amber-300/60 blur-xs rounded-r-full animate-headlight" />
                
                {/* Rear Exhaust Smoke Effect */}
                {isPlaying && (
                  <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400/40 animate-ping" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track 2: EV Smart Delivery Van Movement */}
      {(activeVehicle === 'all' || activeVehicle === 'van') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2 text-cyan-700 font-extrabold">
              <Zap className="w-4 h-4 text-cyan-600" /> {t('evVanTrackTitle', 'EV Smart Express Van #204 • Zero Emissions')}
            </span>
            <div className="flex items-center gap-3 font-mono text-slate-600">
              <span className="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-200 font-bold">
                ⚡ {t('batteryCleanBadge', '100% Battery Clean')}
              </span>
              <span>{Math.round(vanProgress)}% {t('tripComplete', 'Trip Complete')}</span>
            </div>
          </div>

          <div className="relative h-24 rounded-2xl bg-slate-800 border border-slate-600 p-4 flex items-center overflow-hidden shadow-inner">
            {/* City Road Lane */}
            <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 animate-road opacity-70`} />

            {/* EV Van Avatar */}
            <div
              className={`absolute top-3 transition-all duration-150 ease-linear flex flex-col items-center z-10 ${
                isPlaying ? 'animate-bob' : ''
              }`}
              style={{ left: `calc(${vanProgress}% - 26px)` }}
            >
              <div className="px-2 py-0.5 rounded-md bg-cyan-400 text-slate-950 text-[10px] font-black whitespace-nowrap mb-1 shadow-lg border border-cyan-200">
                {t('evVan204Tag', 'EV Van #204')}
              </div>
              <div className="relative p-2 rounded-xl bg-cyan-600 text-white shadow-lg shadow-cyan-500/40 border border-cyan-300">
                <Truck className="w-5 h-5 transform -scale-x-100" />
                {/* EV Aura Beam */}
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-3 h-2 bg-cyan-200/80 blur-xs rounded-r-full" />
              </div>
            </div>

            <div className="w-full flex justify-between px-6 z-0 text-[10px] text-slate-700 font-extrabold">
              <span>{t('wpUrbanHub', 'Urban Hub')}</span>
              <span>{t('wpGreenGridCharging', 'Green Grid Charging')}</span>
              <span>{t('wpExpressDelivery', 'Express Delivery')}</span>
              <span>{t('wpCustomerDoorstep', 'Customer Doorstep')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Track 3: Maritime Cargo Ship Movement */}
      {(activeVehicle === 'all' || activeVehicle === 'ship') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2 text-teal-700 font-extrabold">
              <Ship className="w-4 h-4 text-teal-600" /> {t('shipTrackTitle', 'Ocean Freight Ship #804 • Maritime Currents AI')}
            </span>
            <div className="flex items-center gap-3 font-mono text-slate-600">
              <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 font-bold">
                🌊 {t('knotsSeaSpeedBadge', '24 Knots Sea Speed')}
              </span>
              <span>{Math.round(shipProgress)}% {t('seaJourney', 'Sea Journey')}</span>
            </div>
          </div>

          <div className="relative h-28 rounded-2xl bg-teal-950 border border-teal-800 p-4 flex items-center overflow-hidden shadow-inner">
            {/* Animated Waves Track */}
            <div className={`absolute inset-x-0 bottom-4 h-3 animate-waves opacity-80`} />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900 to-teal-950" />

            {/* Clickable Sea Waypoints */}
            <div className="absolute inset-x-8 top-3 bottom-3 flex justify-between z-0">
              {SHIP_WAYPOINTS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => jumpToWaypoint(wp.percent, wp.bonus)}
                  className="flex flex-col items-center group focus:outline-none"
                  title={`Click to jump to ${t(wp.nameKey, wp.defaultName)}`}
                >
                  <span className="w-3 h-3 rounded-full bg-teal-400 border-2 border-white shadow-md group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] text-teal-200 font-extrabold mt-1 group-hover:text-teal-300 transition-colors">
                    {t(wp.nameKey, wp.defaultName)}
                  </span>
                  <span className="text-[9px] text-teal-300 font-mono hidden sm:inline">
                    {wp.percent}%
                  </span>
                </button>
              ))}
            </div>

            {/* Ship Avatar with Wake Trail */}
            <div
              className={`absolute top-4 transition-all duration-150 ease-linear flex flex-col items-center z-10 ${
                isPlaying ? 'animate-bob' : ''
              }`}
              style={{ left: `calc(${shipProgress}% - 28px)` }}
            >
              <div className="px-2 py-0.5 rounded-md bg-teal-400 text-slate-950 text-[10px] font-black whitespace-nowrap mb-1 shadow-lg border border-teal-200">
                {t('ship804Tag', 'Ship #804')}
              </div>
              <div className="relative p-2.5 rounded-xl bg-teal-600 text-white shadow-xl shadow-teal-500/40 border border-teal-400">
                <Ship className="w-6 h-6 text-white" />
                {/* Water Wake Foam Effect */}
                {isPlaying && (
                  <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 flex items-center">
                    <span className="w-3 h-1 bg-white/60 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Energy & Telemetry Dashboard */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-extrabold text-slate-900">
              {t('simTelemetryCounter')}
            </span>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            {t('simFuelSavedBadge')}
          </span>
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-700 block text-[11px] font-bold">{t('simSpeed')}</span>
            <span className="font-black text-slate-900 text-xl font-mono">{currentSpeed}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-700 block text-[11px] font-bold">{t('simFuelLevel')}</span>
            <div className="flex items-center justify-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-500" />
              <span className="font-black text-amber-600 text-xl font-mono">{Math.round(fuelLevel)}%</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-700 block text-[11px] font-bold">{t('simMoneySaved')}</span>
            <span className="font-black text-emerald-600 text-xl font-mono">₹{moneySaved.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-700 block text-[11px] font-bold">
              {t('simCo2Avoided')}
              <InfoTooltip text="Carbon dioxide emissions avoided using AI route optimization." />
            </span>
            <span className="font-black text-teal-600 text-xl font-mono">{co2Saved} kg</span>
          </div>
        </div>

        {/* Clear Route Comparison: Normal Route vs GreenFleet Route */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5 text-xs">
            <span className="font-black text-red-700 block uppercase tracking-wider text-[11px]">{t('simNormalRoute')}</span>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblFuelUsed')}</span> <span className="font-black text-slate-900">420 {t('liters')}</span></div>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblTripCost')}</span> <span className="font-black text-slate-900">₹42,000</span></div>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblEmissions')}</span> <span className="font-bold text-slate-700">1,125 kg CO₂e</span></div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs">
            <span className="font-black text-emerald-700 block uppercase tracking-wider text-[11px]">{t('simGreenFleetRoute')}</span>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblFuelUsed')}</span> <span className="font-black text-emerald-700">336 {t('liters')}</span></div>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblTripCost')}</span> <span className="font-black text-emerald-700">₹33,600</span></div>
            <div className="flex justify-between text-slate-700 font-medium"><span>{t('lblEmissions')}</span> <span className="font-bold text-teal-700">900 kg CO₂e</span></div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white space-y-1.5 text-xs font-bold shadow-md">
            <span className="font-black text-emerald-100 block uppercase tracking-wider text-[11px]">{t('simNetSavings')}</span>
            <div className="flex justify-between text-white"><span>{t('lblFuelSavedLabel')}</span> <span className="font-black text-amber-300">84 {t('liters')}</span></div>
            <div className="flex justify-between text-white"><span>{t('lblMoneySavedLabel')}</span> <span className="font-black text-emerald-200">₹8,400</span></div>
            <div className="flex justify-between text-emerald-100"><span>{t('lblCo2AvoidedLabel')}</span> <span className="font-black text-teal-200">225 kg CO₂e</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

