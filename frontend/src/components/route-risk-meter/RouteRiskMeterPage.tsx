import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Truck, 
  MapPin, 
  CloudRain, 
  Car, 
  Fuel, 
  Settings as SettingsIcon, 
  Home, 
  Info, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Sun, 
  Clock, 
  Navigation, 
  ChevronDown, 
  Locate, 
  RotateCcw, 
  Compass, 
  Menu, 
  X, 
  Sparkles,
  Smile,
  Shield,
  ThumbsUp,
  Award,
  Landmark,
  Trophy,
  Gauge,
  FileText
} from 'lucide-react';
import blueTruckHighwayImg from '../../assets/blue_truck_highway.jpg';

// Smooth map bounds controller
const MapBoundsController: React.FC<{
  center: [number, number];
  zoom: number;
  startCoords?: [number, number];
  destCoords?: [number, number];
}> = ({ center, zoom, startCoords, destCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (startCoords && destCoords) {
      const bounds = L.latLngBounds([startCoords, destCoords]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true, duration: 1.0 });
    } else {
      map.flyTo(center, zoom, { duration: 1.0 });
    }
  }, [center, zoom, startCoords, destCoords, map]);

  return null;
};

// Reusable Circular Meter Component with customizable arc opening at bottom
interface CircularMeterProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  arcColor?: string;
  trackColor?: string;
  isRainbow?: boolean;
  gradientId?: string;
  label?: string;
  sublabel?: string;
  valueSuffix?: string;
  bottomBadge?: React.ReactNode;
}

const CircularMeter: React.FC<CircularMeterProps> = ({
  value,
  size = 130,
  strokeWidth = 11,
  arcColor = '#10b981',
  trackColor = '#132338',
  isRainbow = false,
  gradientId,
  label,
  sublabel = '/100',
  bottomBadge
}) => {
  // 260 degree arc with gap centered at the bottom (6 o'clock)
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcAngle = 260;
  const totalArcLength = (arcAngle / 360) * circumference;
  const filledLength = (Math.min(100, Math.max(0, value)) / 100) * totalArcLength;

  // Center the gap at the bottom (90 deg). Gap is 100 deg (from 40 deg to 140 deg).
  // Arc starts at 140 deg and goes 260 deg clockwise to 40 deg.
  const center = size / 2;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          {isRainbow && (
            <linearGradient id={gradientId || 'rainbowGrad'} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="40%" stopColor="#84cc16" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="90%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          )}
        </defs>

        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${totalArcLength} ${circumference}`}
          transform={`rotate(140 ${center} ${center})`}
        />

        {/* Filled Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={isRainbow ? `url(#${gradientId || 'rainbowGrad'})` : arcColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${circumference}`}
          transform={`rotate(140 ${center} ${center})`}
          style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>

      {/* Center Label & Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-black text-white tracking-tight leading-none">
          {value}
        </span>
        {sublabel && (
          <span className="text-[11px] font-bold text-slate-400 mt-0.5 leading-none">
            {sublabel}
          </span>
        )}
        {label && (
          <span 
            className="text-xs font-bold mt-1.5 leading-none"
            style={{ color: isRainbow ? (value <= 35 ? '#34d399' : value <= 65 ? '#facc15' : '#f87171') : arcColor }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Optional bottom badge (like the green shield check on Overall Risk) */}
      {bottomBadge && (
        <div className="absolute -bottom-2.5 z-10 flex items-center justify-center">
          {bottomBadge}
        </div>
      )}
    </div>
  );
};

// Route Data Model
export interface RouteOption {
  id: string;
  name: string;
  via: string;
  fromName: string;
  toName: string;
  distanceKm: number;
  timeEstimate: string;
  overallRisk: number;
  overallRiskLabel: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  goodNewsTitle: string;
  goodNewsText: string;
  roadRisk: number;
  roadRiskLabel: string;
  roadRiskDesc: string;
  trafficRisk: number;
  trafficRiskLabel: string;
  trafficRiskDesc: string;
  weatherRisk: number;
  weatherRiskLabel: string;
  weatherRiskDesc: string;
  fuelEfficiency: number;
  fuelEfficiencyLabel: string;
  fuelEfficiencyDesc: string;
  driverTip: string;
  centerCoords: [number, number];
  zoom: number;
  startCoords: [number, number];
  destCoords: [number, number];
  // Segmented polylines for risk coloring
  segments: {
    points: [number, number][];
    status: 'safe' | 'watch' | 'risk';
    label: string;
  }[];
  // Incidents / Waypoint pins along the road
  incidents: {
    coords: [number, number];
    type: 'warning' | 'rain' | 'traffic';
    title: string;
    description: string;
  }[];
}

const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'vijayawada-guntur',
    name: 'Vijayawada ➔ Guntur',
    via: 'Via NH 16',
    fromName: 'Vijayawada',
    toName: 'Guntur',
    distanceKm: 92,
    timeEstimate: '1 hr 45 min',
    overallRisk: 32,
    overallRiskLabel: 'Low Risk',
    goodNewsTitle: 'Good News!',
    goodNewsText: 'This route is safe to travel. Keep an eye on the weather and traffic updates.',
    roadRisk: 20,
    roadRiskLabel: 'Low Risk',
    roadRiskDesc: 'Roads are in good condition, No major issues reported.',
    trafficRisk: 45,
    trafficRiskLabel: 'Moderate Risk',
    trafficRiskDesc: 'Some traffic expected in a few areas.',
    weatherRisk: 30,
    weatherRiskLabel: 'Low Risk',
    weatherRiskDesc: 'Light rain possible later. No severe weather.',
    fuelEfficiency: 78,
    fuelEfficiencyLabel: 'Good',
    fuelEfficiencyDesc: 'This route gives better fuel efficiency.',
    driverTip: 'If you see heavy rain or traffic, you can take an alternate route shown on the map.',
    centerCoords: [16.4150, 80.5400],
    zoom: 11,
    startCoords: [16.5062, 80.6480],
    destCoords: [16.3067, 80.4365],
    segments: [
      {
        status: 'safe',
        label: 'Safe Flow • 60 km/h',
        points: [
          [16.5062, 80.6480],
          [16.4800, 80.6200],
          [16.4500, 80.5900]
        ]
      },
      {
        status: 'watch',
        label: 'Caution • Bridge Repair & Light Rain',
        points: [
          [16.4500, 80.5900],
          [16.4150, 80.5500],
          [16.3800, 80.5150]
        ]
      },
      {
        status: 'risk',
        label: 'Traffic Slowdown • Toll Plaza Queue',
        points: [
          [16.3800, 80.5150],
          [16.3500, 80.4850],
          [16.3350, 80.4650]
        ]
      },
      {
        status: 'safe',
        label: 'Clear Highway to Guntur Logistics Bay',
        points: [
          [16.3350, 80.4650],
          [16.3180, 80.4480],
          [16.3067, 80.4365]
        ]
      }
    ],
    incidents: [
      {
        coords: [16.4500, 80.5900],
        type: 'warning',
        title: 'Roadwork Caution',
        description: 'Single-lane detour near Krishna river bridge repair.'
      },
      {
        coords: [16.4150, 80.5500],
        type: 'rain',
        title: 'Scattered Drizzle',
        description: 'Wet pavement ahead. Reduce speed to 50 km/h.'
      },
      {
        coords: [16.3500, 80.4850],
        type: 'traffic',
        title: 'Toll Congestion',
        description: 'Heavy commercial vehicles queuing. Expected delay: 8 mins.'
      }
    ]
  },
  {
    id: 'hyderabad-vijayawada',
    name: 'Hyderabad ➔ Vijayawada',
    via: 'Via NH 65 Expressway',
    fromName: 'Hyderabad',
    toName: 'Vijayawada',
    distanceKm: 275,
    timeEstimate: '4 hr 30 min',
    overallRisk: 54,
    overallRiskLabel: 'Moderate Risk',
    goodNewsTitle: 'Caution Advised',
    goodNewsText: 'Moderate traffic near Suryapet and scattered heavy rain near Kodad.',
    roadRisk: 28,
    roadRiskLabel: 'Low-Moderate',
    roadRiskDesc: 'Widened 4-lane highway with minor uneven patches near tollways.',
    trafficRisk: 62,
    trafficRiskLabel: 'High Traffic',
    trafficRiskDesc: 'Heavy freight density approaching Ibrahimpatnam checkpost.',
    weatherRisk: 48,
    weatherRiskLabel: 'Moderate Rain',
    weatherRiskDesc: 'Monsoon showers reported along Kodad corridor.',
    fuelEfficiency: 68,
    fuelEfficiencyLabel: 'Average',
    fuelEfficiencyDesc: 'Frequent stops at toll plazas may increase fuel burn.',
    driverTip: 'Maintain safe following distance during rain showers on NH 65.',
    centerCoords: [16.9500, 79.5500],
    zoom: 8,
    startCoords: [17.3850, 78.4867],
    destCoords: [16.5062, 80.6480],
    segments: [
      {
        status: 'safe',
        label: 'Clear Expressway Exit',
        points: [
          [17.3850, 78.4867],
          [17.2500, 78.8500],
          [17.1500, 79.2500]
        ]
      },
      {
        status: 'watch',
        label: 'Moderate Freight & Drizzle',
        points: [
          [17.1500, 79.2500],
          [17.0500, 79.6200],
          [16.9200, 79.9800]
        ]
      },
      {
        status: 'risk',
        label: 'Heavy Rain & Checkpost Slowdown',
        points: [
          [16.9200, 79.9800],
          [16.7500, 80.3200],
          [16.5800, 80.5200]
        ]
      },
      {
        status: 'safe',
        label: 'Arrival Corridor into Vijayawada',
        points: [
          [16.5800, 80.5200],
          [16.5062, 80.6480]
        ]
      }
    ],
    incidents: [
      {
        coords: [17.1500, 79.2500],
        type: 'warning',
        title: 'Construction Detour',
        description: 'Road resurfacing on left lane.'
      },
      {
        coords: [16.9200, 79.9800],
        type: 'rain',
        title: 'Heavy Downpour',
        description: 'Visibility down to 100m. Turn on low beams.'
      },
      {
        coords: [16.7500, 80.3200],
        type: 'traffic',
        title: 'Checkpost Bottleneck',
        description: 'Commercial inspection queue.'
      }
    ]
  },
  {
    id: 'guntur-amaravati',
    name: 'Guntur ➔ Amaravati Capital Link',
    via: 'Via Seed Access Expressway',
    fromName: 'Guntur',
    toName: 'Amaravati',
    distanceKm: 42,
    timeEstimate: '45 min',
    overallRisk: 18,
    overallRiskLabel: 'Low Risk',
    goodNewsTitle: 'Optimal Highway!',
    goodNewsText: 'Clean 6-lane highway with minimal traffic and excellent visibility.',
    roadRisk: 10,
    roadRiskLabel: 'Excellent',
    roadRiskDesc: 'Smooth pavement, zero potholes, high-speed rating.',
    trafficRisk: 15,
    trafficRiskLabel: 'Minimal',
    trafficRiskDesc: 'Very light traffic. Consistent cruise speed.',
    weatherRisk: 18,
    weatherRiskLabel: 'Clear Skies',
    weatherRiskDesc: 'Dry roads and sunny weather throughout the route.',
    fuelEfficiency: 89,
    fuelEfficiencyLabel: 'Excellent',
    fuelEfficiencyDesc: 'Optimal aerodynamic highway yielding +24% fuel savings.',
    driverTip: 'Ideal corridor for electric and eco-diesel fleets to maximize range.',
    centerCoords: [16.4100, 80.4800],
    zoom: 11,
    startCoords: [16.3067, 80.4365],
    destCoords: [16.5131, 80.5165],
    segments: [
      {
        status: 'safe',
        label: 'Broad Expressway',
        points: [
          [16.3067, 80.4365],
          [16.3700, 80.4650],
          [16.4400, 80.4900],
          [16.5131, 80.5165]
        ]
      }
    ],
    incidents: [
      {
        coords: [16.3700, 80.4650],
        type: 'warning',
        title: 'High Speed Zone',
        description: 'Enforced speed radar limit 80 km/h.'
      }
    ]
  }
];

// Custom Leaflet Icons
const createTealPinIcon = (label: string) => {
  return L.divIcon({
    className: 'custom-teal-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: #0284c7;
          border: 2.5px solid #38bdf8;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffffff; transform: rotate(45deg);"></div>
        </div>
        <div style="
          background: #08162b;
          border: 1px solid #38bdf8;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-top: 4px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        ">${label}</div>
      </div>
    `,
    iconSize: [32, 54],
    iconAnchor: [16, 44]
  });
};

const createRedPinIcon = (label: string) => {
  return L.divIcon({
    className: 'custom-red-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: #dc2626;
          border: 2.5px solid #f87171;
          box-shadow: 0 0 15px rgba(248, 113, 113, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffffff; transform: rotate(45deg);"></div>
        </div>
        <div style="
          background: #08162b;
          border: 1px solid #f87171;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-top: 4px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        ">${label}</div>
      </div>
    `,
    iconSize: [32, 54],
    iconAnchor: [16, 44]
  });
};

// Incident Icons on Map (Caution, Rain, Traffic)
const createIncidentIcon = (type: 'warning' | 'rain' | 'traffic') => {
  let bgColor = '#eab308';
  let borderColor = '#fef08a';
  let svgIcon = '';

  if (type === 'warning') {
    bgColor = '#d97706';
    borderColor = '#fde68a';
    svgIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (type === 'rain') {
    bgColor = '#2563eb';
    borderColor = '#93c5fd';
    svgIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>`;
  } else {
    bgColor = '#dc2626';
    borderColor = '#fca5a5';
    svgIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
  }

  return L.divIcon({
    className: 'incident-badge-icon',
    html: `
      <div style="
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: ${bgColor};
        border: 2px solid ${borderColor};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 12px ${bgColor}aa;
        transform: translate(-50%, -50%);
        cursor: pointer;
      ">
        ${svgIcon}
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
};

interface RouteRiskMeterPageProps {
  onNavigate?: (tab: string) => void;
}

export const RouteRiskMeterPage: React.FC<RouteRiskMeterPageProps> = ({ onNavigate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('vijayawada-guntur');
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isTripStartedModalOpen, setIsTripStartedModalOpen] = useState(false);

  const currentRoute = ROUTE_OPTIONS.find(r => r.id === selectedRouteId) || ROUTE_OPTIONS[0];

  const handleNav = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 flex flex-col antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR */}
      {/* ========================================================================= */}
      <header className="px-5 sm:px-8 py-3.5 border-b border-[#122238] bg-[#081224]/95 backdrop-blur-xl flex items-center justify-between gap-4 sticky top-0 z-40">
        
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Blue Truck Logo Icon */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
            <Truck className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                Route <span className="text-sky-400">Risk Meter</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Safer Roads &bull; Smarter Trips &bull; Better Deliveries
            </p>
          </div>
        </div>

        {/* Right: Weather Pill, Location Pill, Driver Status */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Weather Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#0b1b33] border border-[#183256] text-xs shadow-inner">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <span className="font-bold text-white block text-xs">26°C</span>
              <span className="text-[10px] text-slate-400">Partly Cloudy</span>
            </div>
          </div>

          {/* Location & Time Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#0b1b33] border border-[#183256] text-xs shadow-inner">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="text-left leading-tight hidden md:block">
              <span className="font-bold text-white block text-xs">{currentRoute.fromName}</span>
              <span className="text-[10px] text-slate-400">Today, 10:24 AM</span>
            </div>
          </div>

          {/* Driver Avatar Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#0b1b33] border border-sky-500/30 text-xs shadow-md shadow-sky-950/40">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Smile className="w-5 h-5 text-white" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-medium">Driver</span>
              <span className="font-extrabold text-amber-300 text-xs flex items-center gap-1">
                Drive Safe! <span className="text-sm">🙂</span>
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex min-w-0">
        
        {/* Left Sidebar */}
        <aside className={`
          fixed lg:sticky top-[69px] left-0 z-30 h-[calc(100vh-69px)] w-56 bg-[#081224] border-r border-[#122238] flex flex-col justify-between p-4 transition-transform duration-300
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-2">
            
            {/* 7 Navigation Links */}
            <nav className="space-y-1 pt-1">
              {/* 1. Route Optimization */}
              <button
                type="button"
                onClick={() => handleNav('route-optimization')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Route Optimization</span>
              </button>

              {/* 2. Carbon Passport */}
              <button
                type="button"
                onClick={() => handleNav('carbon-passport')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Carbon Passport</span>
              </button>

              {/* 3. Government Incentives */}
              <button
                type="button"
                onClick={() => handleNav('government-incentives')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Gov Incentives</span>
              </button>

              {/* 4. Eco Challenge */}
              <button
                type="button"
                onClick={() => handleNav('eco-challenge')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Eco Challenge</span>
              </button>

              {/* 5. Route Risk Meter (Active) */}
              <button
                type="button"
                onClick={() => handleNav('route-risk-meter')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 cursor-pointer"
              >
                <Gauge className="w-4 h-4 stroke-[2.5]" />
                <span>Route Risk Meter</span>
              </button>

              {/* 6. Reports */}
              <button
                type="button"
                onClick={() => handleNav('reports')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>

              {/* 7. Settings */}
              <button
                type="button"
                onClick={() => handleNav('settings')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#0c1c34] transition-all cursor-pointer"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Bottom Card: Truck Graphic & Motivational Driver Text */}
          <div className="relative rounded-3xl overflow-hidden border border-[#1a3152] bg-[#0a162b] shadow-xl group">
            <img 
              src={blueTruckHighwayImg} 
              alt="Truck on highway" 
              className="w-full h-36 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081224] via-[#081224]/80 to-transparent" />
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
              <span className="text-xs font-extrabold text-white leading-tight font-sans">
                Good Routes Keep You Moving
              </span>
              <span className="text-amber-400 text-lg mt-1 block">🙂</span>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobileNavOpen && (
          <div 
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* ========================================================================= */}
        {/* 3. MAIN DASHBOARD CONTENT */}
        {/* ========================================================================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1700px] w-full mx-auto space-y-5">
          
          {/* TOP SECTION: Overall Risk (Left) + 4 Sub-meters (Middle) + Leaflet Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* LEFT / CENTER: OVERALL GAUGE + 4 CIRCULAR METERS (7 COLS) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* 1. OVERALL ROUTE RISK CARD */}
              <div className="rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-5 sm:p-6 shadow-2xl relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                      Overall Route Risk
                    </h2>
                    <div 
                      className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-[10px] cursor-pointer"
                      title="Calculated from real-time road conditions, live congestion, rainfall intensity, and topological gradient."
                    >
                      <Info className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 -mt-3 mb-5 font-medium">
                  How risky is this route today?
                </p>

                {/* Inner Content: Large Rainbow Gauge + Good News Card */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  
                  {/* Gauge */}
                  <div className="shrink-0 flex justify-center py-2">
                    <CircularMeter 
                      value={currentRoute.overallRisk}
                      size={175}
                      strokeWidth={15}
                      isRainbow={true}
                      gradientId="mainRiskRainbow"
                      label={currentRoute.overallRiskLabel}
                      bottomBadge={
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/50">
                          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      }
                    />
                  </div>

                  {/* "Good News!" Card */}
                  <div className="flex-1 w-full rounded-2xl bg-[#081324]/80 border border-[#172e50] p-4 sm:p-5 flex items-start gap-4 shadow-inner">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Smile className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                        <span>{currentRoute.goodNewsTitle}</span>
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {currentRoute.goodNewsText}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. FOUR CIRCULAR RISK & EFFICIENCY METERS (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                
                {/* 2.1 Road Risk */}
                <div className="rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-4 sm:p-5 flex flex-col justify-between shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Road Risk</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <CircularMeter 
                      value={currentRoute.roadRisk}
                      size={110}
                      strokeWidth={9}
                      arcColor="#10b981"
                      trackColor="#101f36"
                    />
                  </div>

                  <div className="text-center space-y-1 pt-1 border-t border-[#13243d]">
                    <span className="text-xs font-black text-emerald-400 block">
                      {currentRoute.roadRiskLabel}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {currentRoute.roadRiskDesc}
                    </p>
                  </div>
                </div>

                {/* 2.2 Traffic Risk */}
                <div className="rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-4 sm:p-5 flex flex-col justify-between shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Traffic Risk</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <CircularMeter 
                      value={currentRoute.trafficRisk}
                      size={110}
                      strokeWidth={9}
                      arcColor="#f59e0b"
                      trackColor="#101f36"
                    />
                  </div>

                  <div className="text-center space-y-1 pt-1 border-t border-[#13243d]">
                    <span className="text-xs font-black text-amber-400 block">
                      {currentRoute.trafficRiskLabel}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {currentRoute.trafficRiskDesc}
                    </p>
                  </div>
                </div>

                {/* 2.3 Weather Risk */}
                <div className="rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-4 sm:p-5 flex flex-col justify-between shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <CloudRain className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Weather Risk</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <CircularMeter 
                      value={currentRoute.weatherRisk}
                      size={110}
                      strokeWidth={9}
                      arcColor="#10b981"
                      trackColor="#101f36"
                    />
                  </div>

                  <div className="text-center space-y-1 pt-1 border-t border-[#13243d]">
                    <span className="text-xs font-black text-emerald-400 block">
                      {currentRoute.weatherRiskLabel}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {currentRoute.weatherRiskDesc}
                    </p>
                  </div>
                </div>

                {/* 2.4 Fuel Efficiency */}
                <div className="rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-4 sm:p-5 flex flex-col justify-between shadow-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Fuel Efficiency</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <CircularMeter 
                      value={currentRoute.fuelEfficiency}
                      size={110}
                      strokeWidth={9}
                      arcColor="#10b981"
                      trackColor="#101f36"
                    />
                  </div>

                  <div className="text-center space-y-1 pt-1 border-t border-[#13243d]">
                    <span className="text-xs font-black text-emerald-400 block">
                      {currentRoute.fuelEfficiencyLabel}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {currentRoute.fuelEfficiencyDesc}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT: CLEAN GOOGLE MAPS-STYLE MAP WITH ROUTE SELECTOR (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="rounded-3xl bg-[#0a162a] border border-[#162c4a] overflow-hidden shadow-2xl relative h-[520px] lg:h-full min-h-[500px] flex flex-col">
                
                {/* Route Selector Dropdown Header */}
                <div className="absolute top-4 left-4 right-4 z-[400] flex items-center justify-between gap-3">
                  
                  {/* Route Dropdown Pill */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-slate-200 shadow-xl flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-left min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                          <Navigation className="w-3.5 h-3.5 rotate-45" />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-black text-slate-900 block truncate">
                            {currentRoute.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            {currentRoute.distanceKm} km &bull; {currentRoute.timeEstimate}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 ml-1 transition-transform ${isRouteDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Route Switcher Dropdown Menu */}
                    {isRouteDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl bg-[#081324] border border-[#1b3457] p-2 shadow-2xl z-50 space-y-1 animate-in fade-in">
                        <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Select Corridor
                        </div>
                        {ROUTE_OPTIONS.map((route) => (
                          <button
                            key={route.id}
                            type="button"
                            onClick={() => {
                              setSelectedRouteId(route.id);
                              setIsRouteDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                              selectedRouteId === route.id
                                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                          >
                            <div>
                              <span className="font-bold block">{route.name}</span>
                              <span className="text-[10px] text-slate-400">{route.via} &bull; {route.distanceKm} km</span>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                              route.overallRisk <= 35 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                                : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                            }`}>
                              Risk: {route.overallRisk}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Risk Color Legend Pill */}
                  <div className="px-3 py-2 rounded-2xl bg-white/95 text-slate-900 border border-slate-200 shadow-xl flex items-center gap-3 text-[11px] font-bold shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Safe</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>Watch</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span>Risk</span>
                    </div>
                  </div>

                </div>

                {/* Leaflet Map Component */}
                <div className="flex-1 w-full h-full relative">
                  <MapContainer
                    center={currentRoute.centerCoords}
                    zoom={currentRoute.zoom}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      maxZoom={19}
                    />

                    <MapBoundsController 
                      center={currentRoute.centerCoords}
                      zoom={currentRoute.zoom}
                      startCoords={currentRoute.startCoords}
                      destCoords={currentRoute.destCoords}
                    />

                    {/* Start Marker (Teal) */}
                    <Marker position={currentRoute.startCoords} icon={createTealPinIcon(currentRoute.fromName)}>
                      <Popup>
                        <div className="p-1 font-sans text-xs">
                          <strong className="text-sky-700 font-bold block">{currentRoute.fromName}</strong>
                          <span>Departure Station</span>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Destination Marker (Red) */}
                    <Marker position={currentRoute.destCoords} icon={createRedPinIcon(currentRoute.toName)}>
                      <Popup>
                        <div className="p-1 font-sans text-xs">
                          <strong className="text-rose-700 font-bold block">{currentRoute.toName}</strong>
                          <span>Destination Station</span>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Multi-Colored Segmented Polylines */}
                    {currentRoute.segments.map((seg, idx) => {
                      const color = 
                        seg.status === 'safe' 
                          ? '#10b981' 
                          : seg.status === 'watch' 
                          ? '#f59e0b' 
                          : '#ef4444';

                      return (
                        <Polyline
                          key={`seg-${currentRoute.id}-${idx}`}
                          positions={seg.points}
                          pathOptions={{
                            color,
                            weight: 7,
                            opacity: 0.95,
                            lineCap: 'round',
                            lineJoin: 'round'
                          }}
                        >
                          <Tooltip sticky>
                            <div className="text-xs font-sans font-bold">
                              <span style={{ color }}>● {seg.label}</span>
                            </div>
                          </Tooltip>
                        </Polyline>
                      );
                    })}

                    {/* Incidents / Waypoint Badges (Caution, Rain, Traffic) */}
                    {currentRoute.incidents.map((incident, idx) => (
                      <Marker 
                        key={`inc-${currentRoute.id}-${idx}`} 
                        position={incident.coords} 
                        icon={createIncidentIcon(incident.type)}
                      >
                        <Popup>
                          <div className="p-1 font-sans text-xs max-w-[200px]">
                            <strong className="block text-slate-900 font-bold mb-0.5">{incident.title}</strong>
                            <p className="text-slate-600 text-[11px] leading-tight">{incident.description}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Bottom-right Locate Button */}
                <div className="absolute bottom-4 right-4 z-[400]">
                  <button
                    type="button"
                    onClick={() => {
                      // Trigger bounds refit
                      setSelectedRouteId(currentRoute.id);
                    }}
                    className="p-2.5 rounded-2xl bg-white/95 text-slate-800 hover:text-sky-600 border border-slate-200 shadow-xl transition-all cursor-pointer"
                    title="Center Route"
                  >
                    <Locate className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 4. BOTTOM ROW: RECOMMENDED ROUTE (LEFT) + DRIVER TIP (RIGHT) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* 4.1 RECOMMENDED ROUTE CARD (8 COLS) */}
            <div className="lg:col-span-8 rounded-3xl bg-[#091a27]/90 backdrop-blur-xl border border-emerald-500/30 p-5 sm:p-6 shadow-2xl space-y-4">
              
              {/* Header with big green checkmark */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Recommended Route
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    This is the safest and most efficient route for you.
                  </p>
                </div>
              </div>

              {/* Inner Highway Banner */}
              <div className="p-4 rounded-2xl bg-[#07131f] border border-[#142e42] flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Best Choice badge + Via NH 16 + Distance */}
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-400 text-slate-950 font-black text-[10px] tracking-wide uppercase">
                    Best Choice
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-white block">
                        {currentRoute.via}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {currentRoute.distanceKm} km &bull; {currentRoute.timeEstimate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Feature Pills (Lower risk, Less traffic, Good fuel efficiency) */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b2031] border border-[#173a57]">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-white">Lower risk</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b2031] border border-[#173a57]">
                    <Car className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold text-white">Less traffic</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b2031] border border-[#173a57]">
                    <Fuel className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold text-white">Good fuel efficiency</span>
                  </div>
                </div>

                {/* Right: Big Green Start Trip Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsTripStartedModalOpen(true)}
                    className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Start Trip</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>

            </div>

            {/* 4.2 DRIVER TIP WITH ILLUSTRATED CHARACTER (4 COLS) */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0a162a]/95 backdrop-blur-xl border border-[#162c4a] p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Header with yellow bulb */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-sm font-black text-white">
                    Driver Tip
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {currentRoute.driverTip} <span className="text-amber-300">🙂</span>
                </p>
              </div>

              {/* Driver Character Illustration (Thumbs up with blue cap) */}
              <div className="flex items-end justify-between pt-2 border-t border-[#13243d]">
                <div className="text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold block">Safe Driving Mode</span>
                  <span>Pre-trip AI safety check passed</span>
                </div>

                {/* Illustrated SVG Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 border-2 border-sky-400 flex items-center justify-center shadow-lg shadow-sky-600/30 overflow-hidden relative">
                    {/* Character SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Cap */}
                      <path d="M25 42 Q50 20 75 42 L88 44 Q70 42 62 43 Z" fill="#0369a1" />
                      <path d="M30 40 Q50 26 70 40 Z" fill="#0284c7" />
                      {/* Face */}
                      <circle cx="50" cy="52" r="22" fill="#fed7aa" />
                      {/* Eyes */}
                      <ellipse cx="43" cy="50" rx="2.5" ry="3" fill="#1e293b" />
                      <ellipse cx="57" cy="50" rx="2.5" ry="3" fill="#1e293b" />
                      {/* Smile */}
                      <path d="M43 59 Q50 67 57 59" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Cheeks */}
                      <circle cx="39" cy="56" r="3" fill="#fca5a5" opacity="0.6" />
                      <circle cx="61" cy="56" r="3" fill="#fca5a5" opacity="0.6" />
                      {/* Collar / Shirt */}
                      <path d="M30 76 Q50 72 70 76 L78 100 L22 100 Z" fill="#0284c7" />
                    </svg>
                  </div>
                  {/* Thumbs-up Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md font-bold text-xs">
                    👍
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 5. BOTTOM SAFETY TICKER BAR */}
          {/* ========================================================================= */}
          <div className="rounded-3xl bg-[#081222] border border-[#142640] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            
            {/* 5 Core Safety Pillars */}
            <div className="flex flex-wrap items-center justify-around gap-4 sm:gap-6 flex-1 text-xs">
              
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-300">
                  Check the risk before you go
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <CloudRain className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-300">
                  Stay updated with weather
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-300">
                  Avoid traffic when possible
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Fuel className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-300">
                  Save fuel and money
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Smile className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-300">
                  Reach safely and on time
                </span>
              </div>

            </div>

            {/* Right: Slogan in script styling */}
            <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
              <span className="text-sm sm:text-base font-extrabold text-sky-400 tracking-wide block font-serif italic">
                Safe Driver
              </span>
              <span className="text-xs font-black text-amber-300 tracking-wider block">
                Happy Journey !
              </span>
            </div>

          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 6. TRIP START CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {isTripStartedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#081324] border border-[#1b3457] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#142640]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Pre-Trip Departure Check</h3>
                  <p className="text-[11px] text-slate-400">{currentRoute.name} &bull; {currentRoute.via}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsTripStartedModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Route Risk Verified (Score: {currentRoute.overallRisk}/100)</strong>
                  <span className="text-emerald-300 text-[11px]">{currentRoute.goodNewsTitle}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0c1c34] border border-[#183256] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <strong className="text-white block">Vehicle Safety Diagnostics Active</strong>
                  <span className="text-slate-400 text-[11px]">Tire pressure optimal &bull; Brake telemetry live</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0c1c34] border border-[#183256] flex items-center gap-3">
                <CloudRain className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <strong className="text-white block">Live Doppler Weather Sync</strong>
                  <span className="text-slate-400 text-[11px]">Alerts will trigger if rain intensifies</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsTripStartedModalOpen(false)}
                className="flex-1 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Trip started on ${currentRoute.name} (${currentRoute.via})! Have a safe journey!`);
                  setIsTripStartedModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-400/25"
              >
                <span>Proceed to Navigation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RouteRiskMeterPage;
