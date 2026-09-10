import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { RouteSegment } from '../../types/optimization';
import { useLanguage } from '../../context/LanguageContext';
import { Layers, Navigation, Zap } from 'lucide-react';

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 44],
  iconAnchor: [14, 44],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 44],
  iconAnchor: [14, 44],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const waypointIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [22, 36],
  iconAnchor: [11, 36],
  popupAnchor: [1, -30],
  shadowSize: [35, 35]
});

interface RouteMapProps {
  routes?: RouteSegment[];
  depotLocation?: { lat: number; lng: number; name: string };
  isOptimized: boolean;
  originName?: string;
  destinationName?: string;
  vehicleType?: string;
}

// High accuracy real coordinates along NH 16 (Vijayawada <-> Guntur <-> Visakhapatnam corridor)
const ORIGINAL_UNOPTIMIZED_PATH: [number, number][] = [
  [16.5062, 80.6480], // Vijayawada City Center (Heavy Traffic)
  [16.5015, 80.6400], // Benz Circle Bottleneck
  [16.4850, 80.6200], // Old Krishna Bridge Slowdown
  [16.4400, 80.5900], // Mangalagiri Town Road
  [16.3600, 80.5200], // Pedakakani Local Road
  [16.3067, 80.4365]  // Guntur City Center
];

const OPTIMIZED_GREEN_PATH: [number, number][] = [
  [16.5062, 80.6480], // Vijayawada Start Pin
  [16.5180, 80.6650], // Vijayawada ORR Highway Entry
  [16.4750, 80.6150], // NH 16 Expressway Bypass
  [16.4210, 80.5680], // AIIMS Mangalagiri NH 16 Corridor
  [16.3520, 80.5050], // Kakani Toll Plaza (FASTag Eco Pass)
  [16.3067, 80.4365]  // Guntur Destination Pin
];

export const RouteMap: React.FC<RouteMapProps> = ({
  routes,
  depotLocation = { lat: 16.5062, lng: 80.6480, name: "Vijayawada Hub" },
  isOptimized = false,
  originName = "Vijayawada Junction",
  destinationName = "Guntur Logistics Base",
  vehicleType = "Truck"
}) => {
  const { t } = useLanguage();
  const [mapStyle, setMapStyle] = useState<'satellite' | 'street'>('satellite');

  // Center around Vijayawada-Guntur NH 16 corridor
  const mapCenter: [number, number] = [16.4100, 80.5400];

  return (
    <div className="space-y-4">
      {/* Map Control Bar & Mode Toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs shadow-xl">
        <div className="flex items-center gap-3 font-extrabold text-white">
          <span className="flex items-center gap-2 text-slate-300">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>{isOptimized ? "Optimized Eco Route View" : "Original Baseline Route View"}</span>
          </span>
          <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] ${
            isOptimized ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
          }`}>
            {isOptimized ? "🟢 Green Optimization Active" : "🟠 Original Baseline (Unoptimized)"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMapStyle('street')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border ${
              mapStyle === 'street'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-slate-800/80 text-slate-700 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Street Map
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border ${
              mapStyle === 'satellite'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-slate-800/80 text-slate-700 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Esri Satellite View
          </button>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="h-[460px] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
        <MapContainer
          center={mapCenter}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          {mapStyle === 'satellite' ? (
            <>
              {/* Esri World Imagery (High-Res Satellite) */}
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              {/* Real Road, City & Village Labels Overlay */}
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              />
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
              />
            </>
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &mdash; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
          )}

          {/* START MARKER (Origin) */}
          <Marker position={[16.5062, 80.6480]} icon={startIcon}>
            <Popup>
              <div className="text-slate-900 font-sans p-1">
                <span className="font-extrabold text-xs block text-emerald-700">📍 ORIGIN: {originName}</span>
                <span className="text-[11px] text-slate-600 block">NH 16 Vijayawada Central Corridor</span>
              </div>
            </Popup>
          </Marker>

          {/* DESTINATION MARKER */}
          <Marker position={[16.3067, 80.4365]} icon={destIcon}>
            <Popup>
              <div className="text-slate-900 font-sans p-1">
                <span className="font-extrabold text-xs block text-red-600">🏁 DESTINATION: {destinationName}</span>
                <span className="text-[11px] text-slate-600 block">NH 16 Guntur Logistics Hub</span>
              </div>
            </Popup>
          </Marker>

          {/* BEFORE OPTIMIZATION: Render ONLY Original Route (Unoptimized Orange/Red Dashed Path) */}
          {!isOptimized && (
            <>
              <Polyline
                positions={ORIGINAL_UNOPTIMIZED_PATH}
                pathOptions={{
                  color: '#ef4444',
                  weight: 5,
                  opacity: 0.85,
                  dashArray: '8, 12'
                }}
              />
              <Marker position={[16.4850, 80.6200]} icon={waypointIcon}>
                <Popup>
                  <div className="text-slate-900 font-sans p-1">
                    <span className="font-bold text-xs text-amber-700">⚠️ Traffic Bottleneck: Old Krishna Bridge</span>
                    <span className="text-[11px] text-slate-600 block">High congestion on baseline route</span>
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* AFTER OPTIMIZATION: Render ONLY Green Optimized Route */}
          {isOptimized && (
            <>
              {/* Outer Glow Line for Premium Visual Effect */}
              <Polyline
                positions={OPTIMIZED_GREEN_PATH}
                pathOptions={{
                  color: '#059669',
                  weight: 10,
                  opacity: 0.35
                }}
              />
              {/* Solid Green Core Line */}
              <Polyline
                positions={OPTIMIZED_GREEN_PATH}
                pathOptions={{
                  color: '#10b981',
                  weight: 6,
                  opacity: 1.0
                }}
              />
              <Marker position={[16.3520, 80.5050]} icon={startIcon}>
                <Popup>
                  <div className="text-slate-900 font-sans p-1">
                    <span className="font-bold text-xs text-emerald-700">⚡ Kakani FASTag Eco Toll</span>
                    <span className="text-[11px] text-slate-600 block">Express Highway Bypass • Smooth Flow</span>
                  </div>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-white space-y-1.5 shadow-2xl">
          <div className="font-extrabold text-[11px] text-slate-300 uppercase tracking-wider">Map Legend</div>
          {isOptimized ? (
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <span className="w-4 h-1.5 rounded bg-emerald-500 inline-block shadow-sm" />
              <span>Optimized Eco Route (NH 16 Bypass)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-bold text-red-400">
              <span className="w-4 h-1 rounded border-b-2 border-dashed border-red-500 inline-block" />
              <span>Original Baseline Route (City Congestion)</span>
            </div>
          )}
        </div>
      </div>

      {/* Selected Route Summary Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-white space-y-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold tracking-wide uppercase flex items-center gap-2 text-emerald-400">
            <Zap className="w-4 h-4 text-emerald-400" />
            {isOptimized ? "GreenFleet AI Optimized Route" : "Original Baseline Route"}
          </span>
          <span className="text-slate-700 font-mono">Mode: {vehicleType}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-slate-700 text-[10px] block font-sans">Total Distance</span>
            <span className="font-bold text-white text-sm">{isOptimized ? "31.2 km" : "36.8 km"}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-slate-700 text-[10px] block font-sans">Estimated Time</span>
            <span className="font-bold text-blue-400 text-sm">{isOptimized ? "28 min" : "44 min"}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-slate-700 text-[10px] block font-sans">Fuel Required</span>
            <span className="font-bold text-amber-400 text-sm">{isOptimized ? "8.2 L" : "12.6 L"}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-slate-700 text-[10px] block font-sans">Est. Toll Cost</span>
            <span className="font-bold text-emerald-400 text-sm">₹{isOptimized ? "120" : "180"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

