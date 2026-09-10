import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Navigation, 
  CheckCircle2, 
  Zap, 
  Truck, 
  Bus, 
  Sparkles, 
  Leaf, 
  ArrowLeftRight, 
  RotateCcw, 
  Menu, 
  X, 
  Locate, 
  Compass, 
  FileText, 
  Settings as SettingsIcon,
  ShieldCheck,
  Award,
  Landmark,
  Trophy,
  Gauge,
  Sun,
  DollarSign,
  Activity,
  MapPin
} from 'lucide-react';

// Controller to smoothly fit map bounds or fly to coordinates
const MapController: React.FC<{
  startCoords: [number, number] | null;
  destCoords: [number, number] | null;
  center: [number, number];
  zoom: number;
}> = ({ startCoords, destCoords, center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (startCoords && destCoords) {
      const bounds = L.latLngBounds([startCoords, destCoords]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13, animate: true, duration: 1.0 });
    } else if (startCoords) {
      map.flyTo(startCoords, 12, { duration: 1.0 });
    } else if (destCoords) {
      map.flyTo(destCoords, 12, { duration: 1.0 });
    } else {
      map.flyTo(center, zoom, { duration: 1.0 });
    }
  }, [startCoords, destCoords, center, zoom, map]);

  return null;
};

// Custom high-contrast SVG Pin for Start Origin (Teal/Emerald)
const createStartIcon = (label: string) => {
  return L.divIcon({
    className: 'custom-start-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: #065f46;
          border: 2.5px solid #10b981;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffffff; transform: rotate(45deg);"></div>
        </div>
        <div style="
          background: #060b14;
          border: 1px solid #10b981;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-top: 4px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        ">${label || 'Start'}</div>
      </div>
    `,
    iconSize: [36, 58],
    iconAnchor: [18, 48]
  });
};

// Custom high-contrast SVG Pin for Destination (Red / Rose)
const createDestinationIcon = (label: string) => {
  return L.divIcon({
    className: 'custom-dest-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: #881337;
          border: 2.5px solid #f43f5e;
          box-shadow: 0 0 16px rgba(244, 63, 94, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffffff; transform: rotate(45deg);"></div>
        </div>
        <div style="
          background: #060b14;
          border: 1px solid #f43f5e;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-top: 4px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        ">${label || 'Destination'}</div>
      </div>
    `,
    iconSize: [36, 58],
    iconAnchor: [18, 48]
  });
};

// Haversine formula to compute great-circle distance in kilometers
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// 4 Exact Vehicles Requested: Truck, Delivery Van, Bus, Fleet EV
export type FleetVehicleType = 'Truck' | 'Delivery Van' | 'Bus' | 'Fleet EV';

interface VehicleProfile {
  type: FleetVehicleType;
  icon: React.ElementType;
  label: string;
  speedMultiplier: number;
  fuelRatePer100km: number;
  co2RatePerKm: number;
  tollCostFastag: number;
  unit: string;
  origDistGunturVja: number;
  optDistGunturVja: number;
  distFactorOrig: number;
  distFactorOpt: number;
}

const VEHICLE_PROFILES: Record<FleetVehicleType, VehicleProfile> = {
  Truck: {
    type: 'Truck',
    icon: Truck,
    label: 'Heavy Truck',
    speedMultiplier: 1.0,
    fuelRatePer100km: 34.0,
    co2RatePerKm: 280,
    tollCostFastag: 380,
    unit: 'L',
    origDistGunturVja: 82,
    optDistGunturVja: 67,
    distFactorOrig: 1.35,
    distFactorOpt: 1.08
  },
  'Delivery Van': {
    type: 'Delivery Van',
    icon: Truck, // Delivery Van icon styled
    label: 'Delivery Van',
    speedMultiplier: 1.3,
    fuelRatePer100km: 11.5,
    co2RatePerKm: 145,
    tollCostFastag: 160,
    unit: 'L',
    origDistGunturVja: 75,
    optDistGunturVja: 61,
    distFactorOrig: 1.22,
    distFactorOpt: 1.04
  },
  Bus: {
    type: 'Bus',
    icon: Bus,
    label: 'Transit Bus',
    speedMultiplier: 0.95,
    fuelRatePer100km: 26.0,
    co2RatePerKm: 220,
    tollCostFastag: 270,
    unit: 'L',
    origDistGunturVja: 85,
    optDistGunturVja: 69,
    distFactorOrig: 1.30,
    distFactorOpt: 1.10
  },
  'Fleet EV': {
    type: 'Fleet EV',
    icon: Zap,
    label: 'Fleet EV',
    speedMultiplier: 1.2,
    fuelRatePer100km: 22.0,
    co2RatePerKm: 0,
    tollCostFastag: 140,
    unit: 'kWh',
    origDistGunturVja: 74,
    optDistGunturVja: 60,
    distFactorOrig: 1.20,
    distFactorOpt: 1.04
  }
};

// Generate realistic polyline points tailored specifically to each vehicle type
function generateVehicleRoute(
  start: [number, number],
  dest: [number, number],
  isOptimized: boolean,
  vehicle: FleetVehicleType
): [number, number][] {
  const [lat1, lon1] = start;
  const [lat2, lon2] = dest;
  const points: [number, number][] = [];

  const vehicleDetourMap: Record<FleetVehicleType, { origOffset: number; optOffset: number; steps: number; wobble: number }> = {
    Truck:          { origOffset: 0.088, optOffset: 0.024, steps: 12, wobble: 0.016 },
    'Delivery Van': { origOffset: 0.065, optOffset: 0.018, steps: 10, wobble: 0.008 },
    Bus:            { origOffset: 0.076, optOffset: 0.028, steps: 11, wobble: 0.010 },
    'Fleet EV':     { origOffset: 0.054, optOffset: 0.016, steps: 10, wobble: 0.006 },
  };

  const profile = vehicleDetourMap[vehicle];
  const detour = isOptimized ? profile.optOffset : profile.origOffset;
  const steps = profile.steps;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const perpLat = -dLon;
  const perpLon = dLat;
  const norm = Math.sqrt(perpLat * perpLat + perpLon * perpLon) || 1;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let lat = lat1 + t * dLat;
    let lon = lon1 + t * dLon;

    const arc = Math.sin(Math.PI * t);
    const lateralWobble = isOptimized ? 0 : (i % 2 === 1 ? profile.wobble : -profile.wobble);
    
    lat += (perpLat / norm) * (detour * arc + lateralWobble);
    lon += (perpLon / norm) * (detour * arc + lateralWobble);

    points.push([Number(lat.toFixed(5)), Number(lon.toFixed(5))]);
  }

  points[0] = start;
  points[points.length - 1] = dest;
  return points;
}

// Benchmark Guntur <-> Vijayawada corridor coordinates
const GUNTUR_COORDS: [number, number] = [16.3067, 80.4365];
const VIJAYAWADA_COORDS: [number, number] = [16.5062, 80.6480];
const DEFAULT_MAP_CENTER: [number, number] = [16.4150, 80.5400];

const BENCHMARK_ROUTES: Record<FleetVehicleType, { original: [number, number][]; optimized: [number, number][] }> = {
  Truck: {
    original: [
      [16.3067, 80.4365],
      [16.2750, 80.4600],
      [16.2300, 80.5300],
      [16.2650, 80.6250],
      [16.3600, 80.6800],
      [16.4400, 80.6900],
      [16.5062, 80.6480]
    ],
    optimized: [
      [16.3067, 80.4365],
      [16.3450, 80.4720],
      [16.3900, 80.5220],
      [16.4350, 80.5650],
      [16.4800, 80.6120],
      [16.5062, 80.6480]
    ]
  },
  'Delivery Van': {
    original: [
      [16.3067, 80.4365],
      [16.3200, 80.4600],
      [16.3500, 80.4900],
      [16.3900, 80.5300],
      [16.4400, 80.5800],
      [16.4800, 80.6200],
      [16.5062, 80.6480]
    ],
    optimized: [
      [16.3067, 80.4365],
      [16.3550, 80.4850],
      [16.4100, 80.5400],
      [16.4650, 80.5950],
      [16.5062, 80.6480]
    ]
  },
  Bus: {
    original: [
      [16.3067, 80.4365],
      [16.2900, 80.4650],
      [16.3300, 80.5050],
      [16.3750, 80.5500],
      [16.4250, 80.5950],
      [16.4700, 80.6350],
      [16.5062, 80.6480]
    ],
    optimized: [
      [16.3067, 80.4365],
      [16.3500, 80.4800],
      [16.4050, 80.5350],
      [16.4550, 80.5900],
      [16.5062, 80.6480]
    ]
  },
  'Fleet EV': {
    original: [
      [16.3067, 80.4365],
      [16.3100, 80.4550],
      [16.3450, 80.4900],
      [16.3850, 80.5300],
      [16.4350, 80.5750],
      [16.4750, 80.6150],
      [16.5062, 80.6480]
    ],
    optimized: [
      [16.3067, 80.4365],
      [16.3580, 80.4880],
      [16.4120, 80.5420],
      [16.4680, 80.5980],
      [16.5062, 80.6480]
    ]
  }
};

// Real Indian Cities & Hubs (Zero fake logistics labels)
export interface LocationOption {
  name: string;
  region: string;
  coords: [number, number];
}

const LOCATION_PRESETS: LocationOption[] = [
  { name: 'Vijayawada', region: 'Andhra Pradesh (Krishna)', coords: [16.5062, 80.6480] },
  { name: 'Guntur', region: 'Andhra Pradesh (Guntur)', coords: [16.3067, 80.4365] },
  { name: 'Amaravati', region: 'Andhra Pradesh (Capital Region)', coords: [16.5131, 80.5165] },
  { name: 'Mangalagiri', region: 'Andhra Pradesh (NH 16)', coords: [16.4300, 80.5600] },
  { name: 'Hyderabad', region: 'Telangana', coords: [17.3850, 78.4867] },
  { name: 'Visakhapatnam', region: 'Andhra Pradesh', coords: [17.6868, 83.2185] },
  { name: 'Bengaluru', region: 'Karnataka', coords: [12.9716, 77.5946] },
  { name: 'Chennai', region: 'Tamil Nadu', coords: [13.0827, 80.2707] },
  { name: 'Tenali', region: 'Andhra Pradesh', coords: [16.2420, 80.6480] },
  { name: 'Tirupati', region: 'Andhra Pradesh', coords: [13.6288, 79.4192] },
  { name: 'Rajahmundry', region: 'Andhra Pradesh', coords: [17.0005, 81.8040] },
  { name: 'Kurnool', region: 'Andhra Pradesh', coords: [15.8281, 78.0373] }
];

interface RouteOptimizationPageProps {
  onNavigate?: (tab: string) => void;
}

export const RouteOptimizationPage: React.FC<RouteOptimizationPageProps> = ({ onNavigate }) => {
  const [activeNavTab, setActiveNavTab] = useState('route-optimization');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Search & Locations: Starts with empty map
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null);

  // Suggestions Dropdown visibility
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // GPS & Vehicle States
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationAlert, setLocationAlert] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicleType>('Truck');

  // Map Tile Mode (Street vs. Esri Hybrid Satellite)
  const [mapTileMode, setMapTileMode] = useState<'map' | 'satellite'>('map');
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER);
  const [zoomLevel, setZoomLevel] = useState(8);

  // Route State:
  // Before clicking "Optimize Route": displays ONLY Original Route
  // After clicking "Optimize Route": replaces with ONLY green Optimized Route
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const vehicleProfile = VEHICLE_PROFILES[selectedVehicle];

  // Dynamic Distance Calculations
  const directDistance = startCoords && destCoords ? calculateDistance(startCoords, destCoords) : 0;
  
  const isGunturVijayawada = 
    Boolean(startCoords && destCoords &&
    Math.abs(startCoords[0] - GUNTUR_COORDS[0]) < 0.25 &&
    Math.abs(destCoords[0] - VIJAYAWADA_COORDS[0]) < 0.25);

  const originalDistance = isGunturVijayawada 
    ? vehicleProfile.origDistGunturVja 
    : (directDistance > 0 ? Math.max(1, Math.round(directDistance * vehicleProfile.distFactorOrig)) : 0);

  const optimizedDistance = isGunturVijayawada 
    ? vehicleProfile.optDistGunturVja 
    : (directDistance > 0 ? Math.max(1, Math.round(directDistance * vehicleProfile.distFactorOpt)) : 0);

  const distanceSaved = Math.max(0, originalDistance - optimizedDistance);

  // Fuel / Energy & Carbon Calculations
  const fuelUsedOriginal = Number(((originalDistance * vehicleProfile.fuelRatePer100km) / 100).toFixed(1));
  const fuelUsedOptimized = Number(((optimizedDistance * vehicleProfile.fuelRatePer100km * 0.86) / 100).toFixed(1));
  const fuelSaved = Number(Math.max(0, fuelUsedOriginal - fuelUsedOptimized).toFixed(1));
  const fuelEfficiencyPct = fuelUsedOriginal > 0 ? Math.round(((fuelUsedOriginal - fuelUsedOptimized) / fuelUsedOriginal) * 100) : 22;

  const co2OriginalKg = Math.round((originalDistance * vehicleProfile.co2RatePerKm) / 1000);
  const co2OptimizedKg = Math.round((optimizedDistance * (vehicleProfile.co2RatePerKm * 0.85)) / 1000);
  const co2ReducedKg = Math.max(0, co2OriginalKg - co2OptimizedKg);

  // Polyline coordinates
  const originalRoutePoints: [number, number][] = 
    startCoords && destCoords
      ? (isGunturVijayawada 
          ? BENCHMARK_ROUTES[selectedVehicle].original 
          : generateVehicleRoute(startCoords, destCoords, false, selectedVehicle))
      : [];

  const optimizedRoutePoints: [number, number][] = 
    startCoords && destCoords
      ? (isGunturVijayawada 
          ? BENCHMARK_ROUTES[selectedVehicle].optimized 
          : generateVehicleRoute(startCoords, destCoords, true, selectedVehicle))
      : [];

  // "Use My Location" browser geolocation handler
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationAlert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    setLocationAlert(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords: [number, number] = [latitude, longitude];
        setFromLocation(`My Location (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`);
        setStartCoords(coords);
        setMapCenter(coords);
        setZoomLevel(12);
        setIsDetectingLocation(false);
        setLocationAlert('Live GPS location detected successfully!');
        setTimeout(() => setLocationAlert(null), 3500);
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setFromLocation('Vijayawada');
        setStartCoords(VIJAYAWADA_COORDS);
        setMapCenter(VIJAYAWADA_COORDS);
        setIsDetectingLocation(false);
        setLocationAlert('Using Vijayawada base hub.');
        setTimeout(() => setLocationAlert(null), 3500);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Swap starting point and destination
  const handleSwapLocations = () => {
    const tempName = fromLocation;
    const tempCoords = startCoords;
    setFromLocation(toLocation);
    setStartCoords(destCoords);
    setToLocation(tempName);
    setDestCoords(tempCoords);
    setIsOptimized(false);
  };

  // Handle "Optimize Route" action
  const handleOptimizeRoute = () => {
    if (!startCoords || !destCoords) return;
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimized(true);
      setIsOptimizing(false);
    }, 400);
  };

  const handleResetRoute = () => {
    setIsOptimized(false);
  };

  const handleNav = (tab: string) => {
    setActiveNavTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  // Filter suggestion presets
  const filteredFromPresets = LOCATION_PRESETS.filter(p => 
    !fromLocation || p.name.toLowerCase().includes(fromLocation.toLowerCase()) || p.region.toLowerCase().includes(fromLocation.toLowerCase())
  );
  const filteredToPresets = LOCATION_PRESETS.filter(p => 
    !toLocation || p.name.toLowerCase().includes(toLocation.toLowerCase()) || p.region.toLowerCase().includes(toLocation.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col lg:flex-row antialiased font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ========================================================================= */}
      {/* 1. UNIFIED 7-ITEM LEFT SIDEBAR */}
      {/* ========================================================================= */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#070e1a] border-r border-[#121f36] flex flex-col justify-between p-5 transition-transform duration-300
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white font-sans leading-none">
                GreenFleet
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide">
                Clean Fleet Intelligence
              </p>
            </div>
          </div>

          {/* 7 Navigation Links */}
          <nav className="space-y-1 pt-1">
            
            {/* 1. Route Optimization (Default Home) */}
            <button
              onClick={() => handleNav('route-optimization')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeNavTab === 'route-optimization'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Route Optimization</span>
            </button>

            {/* 2. Carbon Passport */}
            <button
              onClick={() => handleNav('carbon-passport')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'carbon-passport'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Carbon Passport</span>
            </button>

            {/* 3. Government Incentives */}
            <button
              onClick={() => handleNav('government-incentives')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'government-incentives'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Government Incentives</span>
            </button>

            {/* 4. Eco Challenge */}
            <button
              onClick={() => handleNav('eco-challenge')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'eco-challenge'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Eco Challenge</span>
            </button>

            {/* 5. Route Risk Meter */}
            <button
              onClick={() => handleNav('route-risk-meter')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'route-risk-meter'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>Route Risk Meter</span>
            </button>

            {/* 6. Reports */}
            <button
              onClick={() => handleNav('reports')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'reports'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </button>

            {/* 7. Settings */}
            <button
              onClick={() => handleNav('settings')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'settings'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>

          </nav>
        </div>

        {/* Minimal Footer Tag */}
        <div className="p-3.5 rounded-2xl bg-[#091f24] border border-emerald-500/30 text-center space-y-1">
          <span className="text-xs font-bold text-white block">
            National Green Corridor
          </span>
          <p className="text-[10px] text-slate-400">
            Esri Hybrid Satellite &bull; Real NH 16 Routes
          </p>
        </div>
      </aside>

      {/* Backdrop for Mobile Navigation */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN VIEW CONTAINER (ROUTE OPTIMIZATION HOME PAGE) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="px-5 sm:px-8 py-3 border-b border-[#121f36] flex items-center justify-between gap-4 sticky top-0 z-30 bg-[#060b14]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/40 shrink-0">
              <Navigation className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                Route Optimization Planner
              </h1>
              <p className="text-[11px] text-slate-400">
                Google Maps-style Hybrid Satellite &bull; NH 16 Corridors &bull; Certified Green Routing
              </p>
            </div>
          </div>

          {/* Active Profile Info */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-[#091322] px-3.5 py-1.5 rounded-2xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Vehicle: <strong className="text-white">{vehicleProfile.label}</strong></span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. TOP SEARCH & VEHICLE SELECTOR */}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-8 pt-4 space-y-3">
          
          {/* Row 1: 4 Fleet Vehicles: Truck, Delivery Van, Bus, Fleet EV */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#091322] border border-[#162744] overflow-x-auto w-full sm:w-auto">
              {[
                { type: 'Truck' as const, label: 'Truck', icon: Truck },
                { type: 'Delivery Van' as const, label: 'Delivery Van', icon: Truck },
                { type: 'Bus' as const, label: 'Bus', icon: Bus },
                { type: 'Fleet EV' as const, label: 'Fleet EV', icon: Zap }
              ].map(({ type, label, icon: Icon }) => {
                const isActive = selectedVehicle === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedVehicle(type)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-black'
                        : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 stroke-[2.4]" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Demo Corridor Pills */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[11px] text-slate-500 hidden md:inline">Popular Corridors:</span>
              <button
                type="button"
                onClick={() => {
                  setFromLocation('Vijayawada');
                  setStartCoords(VIJAYAWADA_COORDS);
                  setToLocation('Guntur');
                  setDestCoords(GUNTUR_COORDS);
                  setIsOptimized(false);
                }}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-[#091322] border border-[#162744] hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                📍 Vijayawada ➔ Guntur (NH 16)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFromLocation('Amaravati');
                  setStartCoords([16.5131, 80.5165]);
                  setToLocation('Guntur');
                  setDestCoords(GUNTUR_COORDS);
                  setIsOptimized(false);
                }}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-[#091322] border border-[#162744] hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer hidden sm:inline"
              >
                📍 Amaravati ➔ Guntur
              </button>
            </div>
          </div>

          {/* Row 2: Search Inputs (From, Swap, To, and Optimize Route Button) */}
          <div className="rounded-3xl bg-[#091322] border border-[#162744] p-3.5 sm:p-4 shadow-xl shadow-slate-950/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* FROM Search Bar */}
              <div className="md:col-span-5 relative">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute left-4 top-1/2 -translate-y-1/2 shadow-sm shadow-emerald-400" />
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => {
                      setFromLocation(e.target.value);
                      setShowFromSuggestions(true);
                    }}
                    onFocus={() => setShowFromSuggestions(true)}
                    placeholder="Choose starting point (From)..."
                    className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                  {fromLocation && (
                    <button
                      type="button"
                      onClick={() => {
                        setFromLocation('');
                        setStartCoords(null);
                        setIsOptimized(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showFromSuggestions && filteredFromPresets.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl bg-[#0a1526] border border-emerald-500/40 p-2 shadow-2xl z-50 space-y-1 animate-in fade-in max-h-56 overflow-y-auto">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Real Indian Cities
                    </div>
                    {filteredFromPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFromLocation(preset.name);
                          setStartCoords(preset.coords);
                          setMapCenter(preset.coords);
                          setShowFromSuggestions(false);
                          setIsOptimized(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#0d2a2a] text-slate-200 hover:text-emerald-300 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-bold">{preset.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{preset.region}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  className="p-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 transition-all cursor-pointer shadow-md"
                  title="Swap Starting Point and Destination"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* TO Search Bar */}
              <div className="md:col-span-4 relative">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute left-4 top-1/2 -translate-y-1/2 shadow-sm shadow-rose-500" />
                  <input
                    type="text"
                    value={toLocation}
                    onChange={(e) => {
                      setToLocation(e.target.value);
                      setShowToSuggestions(true);
                    }}
                    onFocus={() => setShowToSuggestions(true)}
                    placeholder="Choose destination (To)..."
                    className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
                  />
                  {toLocation && (
                    <button
                      type="button"
                      onClick={() => {
                        setToLocation('');
                        setDestCoords(null);
                        setIsOptimized(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showToSuggestions && filteredToPresets.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl bg-[#0a1526] border border-emerald-500/40 p-2 shadow-2xl z-50 space-y-1 animate-in fade-in max-h-56 overflow-y-auto">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Real Indian Cities
                    </div>
                    {filteredToPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setToLocation(preset.name);
                          setDestCoords(preset.coords);
                          setShowToSuggestions(false);
                          setIsOptimized(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#2a1118] text-slate-200 hover:text-rose-300 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="font-bold">{preset.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{preset.region}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Optimize Route Button */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleOptimizeRoute}
                  disabled={isOptimizing || !startCoords || !destCoords}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                  <span>{isOptimizing ? 'Optimizing...' : 'Optimize Route'}</span>
                </button>
              </div>

            </div>

            {locationAlert && (
              <div className="mt-2.5 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{locationAlert}</span>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SMART FEATURES (COMPACT) - 6 CLEAN CARDS BESIDE / BELOW OPTIMIZE */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            
            {/* 1. Route Risk */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Route Risk</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black text-emerald-400">Green • Low</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Safe Corridor</span>
            </div>

            {/* 2. Traffic */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Traffic</span>
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-xs font-black text-white block">Free Flow</span>
              <span className="text-[10px] text-emerald-400 font-bold block">65 km/h avg</span>
            </div>

            {/* 3. Weather */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Weather</span>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-xs font-black text-white block">28°C Clear</span>
              <span className="text-[10px] text-slate-500 block">Dry roads</span>
            </div>

            {/* 4. Toll Cost */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Toll Cost</span>
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-xs font-black text-white block">₹{vehicleProfile.tollCostFastag}</span>
              <span className="text-[10px] text-slate-500 block">FASTag (Kaza)</span>
            </div>

            {/* 5. Fuel Saved */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Fuel Saved</span>
              <span className="text-xs font-black text-emerald-400 block">
                {isOptimized ? `${fuelSaved} ${vehicleProfile.unit}` : `0.0 ${vehicleProfile.unit}`}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-bold block">
                {isOptimized ? `+${fuelEfficiencyPct}% Saved` : 'Baseline'}
              </span>
            </div>

            {/* 6. CO2 Reduction */}
            <div className="p-3 rounded-2xl bg-[#091322] border border-[#162744] space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">CO₂ Reduction</span>
              <span className="text-xs font-black text-emerald-400 block">
                {isOptimized ? `${co2ReducedKg} kg` : `0 kg`}
              </span>
              <span className="text-[10px] text-slate-500 block">Green Corridors</span>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. EXPANDED MAP CANVAS (LEAFLET WITH ESRI HYBRID & STREET VIEW) */}
        {/* ========================================================================= */}
        <main className="p-5 sm:p-8 max-w-[1750px] w-full mx-auto flex-1 flex flex-col">
          <div className="rounded-3xl bg-[#091322] border border-[#162744] overflow-hidden shadow-2xl relative h-[580px] sm:h-[620px] flex flex-col">
            
            {/* Floating Map & Satellite Controls (Top-Left) */}
            <div className="absolute top-4 left-4 z-[400] flex items-center bg-[#070e1a]/95 backdrop-blur-md rounded-2xl border border-slate-800 p-1 shadow-xl">
              <button
                onClick={() => setMapTileMode('map')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapTileMode === 'map'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Street Map
              </button>
              <button
                onClick={() => setMapTileMode('satellite')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mapTileMode === 'satellite'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Satellite (Hybrid)
              </button>
            </div>

            {/* Floating "Use My Location" Button (Top-Right) */}
            <div className="absolute top-4 right-4 z-[400]">
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isDetectingLocation}
                className="px-3.5 py-2 rounded-2xl bg-[#070e1a]/95 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
                title="Detect current GPS location"
              >
                <Locate className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>{isDetectingLocation ? 'Locating...' : 'Use My Location'}</span>
              </button>
            </div>

            {/* Floating Fit Route Controls (Left) */}
            <div className="absolute top-16 left-4 z-[400]">
              <button
                onClick={() => {
                  if (startCoords && destCoords) {
                    setMapCenter([(startCoords[0] + destCoords[0]) / 2, (startCoords[1] + destCoords[1]) / 2]);
                    setZoomLevel(11);
                  } else {
                    setMapCenter(DEFAULT_MAP_CENTER);
                    setZoomLevel(8);
                  }
                }}
                className="p-2.5 rounded-2xl bg-[#070e1a]/95 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 shadow-xl transition-all cursor-pointer"
                title="Fit Route to View"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>

            {/* Route Status Overlay at Bottom-Left */}
            {startCoords && destCoords && (
              <div className="absolute bottom-4 left-4 z-[400] bg-[#070e1a]/95 backdrop-blur-md rounded-2xl border border-slate-800 px-3.5 py-2 flex items-center gap-2.5 text-xs font-bold shadow-xl">
                {isOptimized ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
                    <span className="text-emerald-400 font-bold">Optimized Route in Green ({optimizedDistance} km)</span>
                    <button
                      type="button"
                      onClick={handleResetRoute}
                      className="ml-2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Show Original Route"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-rose-400 font-bold">Original Route ({originalDistance} km)</span>
                  </>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* FLOATING "GREEN ROUTE CERTIFIED" BADGE (POST-OPTIMIZATION) */}
            {/* =================================================================== */}
            {isOptimized && (
              <div className="absolute bottom-4 right-4 z-[400] max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="rounded-3xl bg-[#071722]/90 backdrop-blur-xl border border-emerald-500/50 p-4 shadow-2xl shadow-emerald-950/80 space-y-2 relative overflow-hidden">
                  {/* Subtle decorative glow */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white leading-tight">
                        Green Route Certified
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        Verified by GreenFleet
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-300">Fuel Saved:</span>
                    <strong className="text-emerald-300 font-mono font-black text-xs">
                      {fuelSaved} {vehicleProfile.unit} (+{fuelEfficiencyPct}%)
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* Leaflet Map Canvas */}
            <div className="flex-1 w-full h-full relative">
              <MapContainer
                center={mapCenter}
                zoom={zoomLevel}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                {/* STREET MAP: High-Quality OpenStreetMap Street View */}
                {mapTileMode === 'map' && (
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                  />
                )}

                {/* SATELLITE VIEW: Real Esri World Imagery + Highway/Road Overlays (NH 16) + Village/City Labels */}
                {mapTileMode === 'satellite' && (
                  <>
                    {/* 1. Base Satellite Photos */}
                    <TileLayer
                      attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      maxZoom={19}
                    />
                    {/* 2. Real Roads & Highway Lines Overlay (NH 16) */}
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                      maxZoom={19}
                      opacity={0.9}
                    />
                    {/* 3. Real City, Village, and Town Labels Overlay */}
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                      maxZoom={19}
                      opacity={0.95}
                    />
                  </>
                )}

                <MapController 
                  startCoords={startCoords} 
                  destCoords={destCoords} 
                  center={mapCenter} 
                  zoom={zoomLevel} 
                />

                {/* Start Marker */}
                {startCoords && (
                  <Marker position={startCoords} icon={createStartIcon(fromLocation || 'Start')}>
                    <Popup>
                      <div className="p-1 text-slate-900 font-sans">
                        <strong className="block text-emerald-700 font-bold">Departure Origin</strong>
                        <span className="text-xs font-semibold">{fromLocation || 'Start Location'}</span>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Destination Marker */}
                {destCoords && (
                  <Marker position={destCoords} icon={createDestinationIcon(toLocation || 'Destination')}>
                    <Popup>
                      <div className="p-1 text-slate-900 font-sans">
                        <strong className="block text-rose-700 font-bold">Destination</strong>
                        <span className="text-xs font-semibold">{toLocation || 'Destination'}</span>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* 1. ORIGINAL ROUTE: Shown ONLY before clicking Optimize Route */}
                {!isOptimized && originalRoutePoints.length > 0 && (
                  <Polyline
                    key={`orig-${selectedVehicle}`}
                    positions={originalRoutePoints}
                    pathOptions={{
                      color: '#f43f5e',
                      weight: 5,
                      dashArray: '8, 10',
                      opacity: 0.9,
                      lineCap: 'round',
                      lineJoin: 'round'
                    }}
                  >
                    <Tooltip sticky>
                      <div className="text-xs font-sans font-bold text-rose-600">
                        🔴 Original Route ({originalDistance} km)
                      </div>
                    </Tooltip>
                  </Polyline>
                )}

                {/* 2. OPTIMIZED ROUTE: Shown ONLY after clicking Optimize Route; rendered in GREEN */}
                {isOptimized && optimizedRoutePoints.length > 0 && (
                  <>
                    <Polyline
                      key={`opt-glow-${selectedVehicle}`}
                      positions={optimizedRoutePoints}
                      pathOptions={{
                        color: '#10b981',
                        weight: 14,
                        opacity: 0.45,
                        lineCap: 'round',
                        lineJoin: 'round'
                      }}
                    />
                    <Polyline
                      key={`opt-core-${selectedVehicle}`}
                      positions={optimizedRoutePoints}
                      pathOptions={{
                        color: '#10b981',
                        weight: 6,
                        opacity: 1.0,
                        lineCap: 'round',
                        lineJoin: 'round'
                      }}
                    >
                      <Tooltip sticky>
                        <div className="text-xs font-sans font-bold text-emerald-800">
                          🟢 Optimized Green Route ({optimizedDistance} km) &bull; Certified by GreenFleet
                        </div>
                      </Tooltip>
                    </Polyline>
                  </>
                )}
              </MapContainer>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default RouteOptimizationPage;
