import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  CheckCircle2, 
  Zap, 
  Truck, 
  Gauge, 
  Sparkles,
  Info,
  Route,
  ArrowRight,
  TrendingDown,
  Clock,
  X
} from 'lucide-react';
import { FleetVehicle, LogisticsHub, GUNTUR_CENTER, GUNTUR_ROUTES } from './dummyData';

// Helper component to smoothly center map on selected coordinates or Guntur
const MapController: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom = 12 }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Create custom high-visibility Truck Marker Icons
const createTruckIcon = (vehicle: FleetVehicle, isSelected: boolean) => {
  const isAlert = vehicle.status === 'alert';
  const isElectric = vehicle.fuel_type === 'electric';
  const isIdle = vehicle.status === 'idle';

  const markerColor = isAlert ? '#ef4444' : isElectric ? '#06b6d4' : isIdle ? '#94a3b8' : '#10b981';
  const ringColor = isSelected ? '#ffffff' : markerColor;

  const html = `
    <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
      ${isAlert || isSelected ? `
        <div style="
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background-color: ${markerColor};
          opacity: 0.35;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
      ` : ''}
      <div style="
        position: relative;
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: #090d16;
        border: 2px solid ${ringColor};
        box-shadow: 0 4px 14px ${markerColor}99;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
      ">
        <span style="font-size: 14px; line-height: 1;">🚚</span>
        <span style="font-size: 7.5px; font-weight: 800; font-family: monospace; color: ${markerColor}; line-height: 1; margin-top: 2px;">
          ${vehicle.vehicle_id}
        </span>
      </div>
      <div style="
        position: absolute;
        bottom: -2px;
        width: 6px;
        height: 6px;
        border-radius: 9999px;
        background-color: ${markerColor};
        box-shadow: 0 0 6px ${markerColor};
      "></div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-truck-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -26]
  });
};

// Custom Hub Icon for Guntur Warehouses & Depots
const createHubIcon = (hub: LogisticsHub) => {
  const isCharger = hub.type === 'megawatt_charger';
  const color = isCharger ? '#38bdf8' : '#34d399';

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      <div style="
        width: 28px;
        height: 28px;
        border-radius: 9px;
        background: #0f172a;
        border: 1.5px solid ${color};
        box-shadow: 0 2px 10px ${color}66;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${color};
        font-size: 13px;
        cursor: pointer;
      ">
        ${isCharger ? '⚡' : '🏬'}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-hub-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

interface FleetMapSectionProps {
  vehicles: FleetVehicle[];
  hubs: LogisticsHub[];
  selectedVehicle: FleetVehicle | null;
  onSelectVehicle: (v: FleetVehicle | null) => void;
  onAskCopilotAboutVehicle: (v: FleetVehicle) => void;
}

export const FleetMapSection: React.FC<FleetMapSectionProps> = ({
  vehicles,
  hubs,
  selectedVehicle,
  onSelectVehicle,
  onAskCopilotAboutVehicle
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(GUNTUR_CENTER);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [tileMode, setTileMode] = useState<'osm_standard' | 'osm_dark'>('osm_standard');
  const [selectedRoute, setSelectedRoute] = useState<'original' | 'optimized'>('optimized');
  const [showHubs, setShowHubs] = useState(true);

  // Center on vehicle if selected
  useEffect(() => {
    if (selectedVehicle) {
      setMapCenter([selectedVehicle.current_location.lat, selectedVehicle.current_location.lng]);
      setZoomLevel(13);
    }
  }, [selectedVehicle]);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Route Toggle Bar Above Map */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-blue-900/40 shadow-xl backdrop-blur-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-950 text-cyan-400 border border-blue-800/40">
              <Route className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Guntur Route Selection
              </h3>
              <p className="text-[11px] text-slate-400">
                Select a route to display on the map while keeping all 5 truck markers visible
              </p>
            </div>
          </div>

          {/* Toggle Buttons: Original Route & Optimized Route */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setSelectedRoute('original')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRoute === 'original'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-white" />
              <span>Original Route</span>
            </button>

            <button
              onClick={() => setSelectedRoute('optimized')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRoute === 'optimized'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 border border-white" />
              <span>Optimized Route</span>
            </button>
          </div>
        </div>

        {/* Telemetry info for current route selection */}
        {selectedRoute === 'original' ? (
          <div className="p-3 rounded-2xl bg-red-950/30 border border-red-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse shrink-0" />
              <div>
                <span className="font-bold text-red-300 block sm:inline">Active: Red Original Route</span>
                <span className="text-[11px] text-slate-400 sm:ml-2">
                  (Cuts through congested Guntur inner-city market corridors)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-300">Distance: <strong className="text-white">{GUNTUR_ROUTES.original.distance}</strong></span>
              <span className="text-slate-300">Duration: <strong className="text-red-300">{GUNTUR_ROUTES.original.duration}</strong></span>
              <span className="text-slate-300">Fuel: <strong className="text-red-400">{GUNTUR_ROUTES.original.fuelEstimated}</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-emerald-300 block sm:inline">Active: Green Optimized Route</span>
                <span className="text-[11px] text-emerald-400 sm:ml-2 font-semibold">
                  (Bypasses inner city via Outer Ring Road & NH16 • 32% Fuel Saved)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-300">Distance: <strong className="text-white">{GUNTUR_ROUTES.optimized.distance}</strong></span>
              <span className="text-slate-300">Duration: <strong className="text-emerald-300">{GUNTUR_ROUTES.optimized.duration}</strong></span>
              <span className="text-slate-300">Fuel: <strong className="text-emerald-400">{GUNTUR_ROUTES.optimized.fuelEstimated}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Main Map Container Card */}
      <div className="relative w-full h-[550px] lg:h-[650px] rounded-3xl overflow-hidden border border-blue-900/40 bg-slate-950 shadow-2xl shadow-blue-950/40">
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Tile Layer: OpenStreetMap */}
          {tileMode === 'osm_standard' ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          ) : (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />
          )}

          <MapController center={mapCenter} zoom={zoomLevel} />

          {/* Logistics Hubs Markers in Guntur */}
          {showHubs && hubs.map((hub) => (
            <Marker
              key={hub.id}
              position={[hub.lat, hub.lng]}
              icon={createHubIcon(hub)}
            >
              <Popup>
                <div className="p-1 font-sans text-slate-900 text-xs">
                  <div className="font-bold text-slate-900 text-sm">{hub.name}</div>
                  <div className="text-slate-600 mt-0.5">{hub.capacity}</div>
                  <div className="text-emerald-700 font-semibold mt-1">
                    {hub.active_vehicles} Fleets Assigned
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Red Route: "Original Route" - shown only when Original is selected */}
          {selectedRoute === 'original' && (
            <Polyline
              positions={GUNTUR_ROUTES.original.coordinates}
              pathOptions={{
                color: '#ef4444',
                weight: 6,
                opacity: 0.92,
                dashArray: '8, 6'
              }}
            >
              <Tooltip sticky>
                <div className="text-xs font-bold text-red-700">
                  🔴 Original Route (Congested City Core)
                  <div className="text-[10px] font-normal text-slate-700">Distance: 31.8 km • Fuel: 48.5 L</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="p-1 font-sans text-slate-900 text-xs">
                  <span className="font-bold text-red-600 block text-sm">Original Route</span>
                  <p className="text-slate-600 mt-1">{GUNTUR_ROUTES.original.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] font-mono bg-red-50 p-2 rounded-lg border border-red-200">
                    <div>Est. Fuel: <strong>48.5 L</strong></div>
                    <div>Est. Time: <strong>68 mins</strong></div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          )}

          {/* Green Route: "Optimized Route" - shown only when Optimized is selected */}
          {selectedRoute === 'optimized' && (
            <Polyline
              positions={GUNTUR_ROUTES.optimized.coordinates}
              pathOptions={{
                color: '#10b981',
                weight: 6,
                opacity: 0.95
              }}
            >
              <Tooltip sticky>
                <div className="text-xs font-bold text-emerald-700">
                  🟢 Optimized Route (Green Bypass Corridor)
                  <div className="text-[10px] font-normal text-slate-700">Distance: 24.2 km • Fuel: 32.8 L (-32%)</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="p-1 font-sans text-slate-900 text-xs">
                  <span className="font-bold text-emerald-700 block text-sm">Optimized Route</span>
                  <p className="text-slate-600 mt-1">{GUNTUR_ROUTES.optimized.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-1 text-[11px] font-mono bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <div>Est. Fuel: <strong>32.8 L (-32%)</strong></div>
                    <div>Est. Time: <strong>38 mins (-30m)</strong></div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          )}

          {/* 5 Truck Markers with Popups */}
          {vehicles.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.current_location.lat, truck.current_location.lng]}
              icon={createTruckIcon(truck, selectedVehicle?.id === truck.id)}
              eventHandlers={{
                click: () => onSelectVehicle(truck)
              }}
            >
              {/* Detailed Truck Popup as requested */}
              <Popup minWidth={240}>
                <div className="p-1 font-sans text-slate-900 space-y-2.5">
                  {/* Popup Header */}
                  <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Truck Number
                      </span>
                      <span className="text-sm font-black text-slate-900 font-mono tracking-tight">
                        {truck.truck_number}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800 font-mono">
                      {truck.vehicle_id}
                    </span>
                  </div>

                  {/* Required Telemetry Details */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-slate-600 font-medium">Speed:</span>
                      <span className="font-bold text-slate-900 font-mono text-xs">{truck.speed} km/h</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-slate-600 font-medium">Fuel used:</span>
                      <span className="font-bold text-emerald-700 font-mono text-xs">{truck.fuel_used}</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-slate-600 font-medium">Cargo weight:</span>
                      <span className="font-bold text-slate-900 font-mono text-xs">{truck.cargo_weight}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-600 font-medium">Status:</span>
                      <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase ${
                        truck.status === 'alert' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        truck.status === 'idle' ? 'bg-slate-100 text-slate-800 border border-slate-300' :
                        'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {truck.status_display}
                      </span>
                    </div>
                  </div>

                  {/* Driver and Location Info */}
                  <div className="pt-1 text-[11px] text-slate-600 border-t border-slate-100 flex items-center justify-between">
                    <span>Driver: <strong>{truck.driver.name}</strong></span>
                    <span className="text-emerald-700 font-semibold">⭐ {truck.driver.rating}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Controls & Basemap Switcher (Top Right) */}
        <div className="absolute top-4 right-4 z-[500] flex flex-wrap items-center gap-2 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-2xl border border-blue-900/40 shadow-xl">
          {/* Reset Guntur Center */}
          <button
            onClick={() => {
              setMapCenter(GUNTUR_CENTER);
              setZoomLevel(12);
              onSelectVehicle(null);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800"
            title="Recenter on Guntur"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guntur Center</span>
          </button>

          {/* Toggle Basemap */}
          <button
            onClick={() => setTileMode(tileMode === 'osm_standard' ? 'osm_dark' : 'osm_standard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-950 text-cyan-300 border border-blue-800 hover:bg-blue-900 transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{tileMode === 'osm_standard' ? 'OpenStreetMap Standard' : 'OpenStreetMap Dark'}</span>
          </button>

          {/* Toggle Hubs */}
          <button
            onClick={() => setShowHubs(!showHubs)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              showHubs ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            <span>Hubs</span>
          </button>
        </div>

        {/* Map Legend Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-[500] bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-blue-900/40 text-xs text-slate-300 shadow-xl space-y-1.5 max-w-xs">
          <div className="font-bold text-white text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Route Active:</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              selectedRoute === 'original' 
                ? 'bg-red-950 text-red-300 border border-red-800' 
                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {selectedRoute === 'original' ? 'Original (Red)' : 'Optimized (Green)'}
            </span>
          </div>

          {selectedRoute === 'original' ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded bg-red-500"></span>
              <span className="text-[11px] font-semibold text-red-300">Original Route (Congested City Core)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded bg-emerald-400"></span>
              <span className="text-[11px] font-semibold text-emerald-300">Optimized Route (Bypass Corridor)</span>
            </div>
          )}

          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
            <span>5 Truck Markers Active</span>
            <span className="text-cyan-400 font-mono">Click for Popup</span>
          </div>
        </div>

        {/* Floating Selected Truck HUD Overlay (Top-Left inside Map) */}
        {selectedVehicle && (
          <div className="absolute top-4 left-4 z-[600] max-w-sm w-full bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-cyan-500/40 p-4 shadow-2xl shadow-cyan-950/50 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
                    {selectedVehicle.truck_number}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800">
                    {selectedVehicle.vehicle_id}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  {selectedVehicle.model}
                </h3>
              </div>

              <button
                onClick={() => onSelectVehicle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Required fields highlight */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Speed</span>
                <span className="text-xs font-bold text-white font-mono">{selectedVehicle.speed} km/h</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Fuel Used</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{selectedVehicle.fuel_used}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Cargo Weight</span>
                <span className="text-xs font-bold text-cyan-300 font-mono">{selectedVehicle.cargo_weight}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className="text-xs font-bold text-amber-300 truncate block">{selectedVehicle.status_display}</span>
              </div>
            </div>

            {/* Current Address & Driver */}
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{selectedVehicle.current_location.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Driver: <strong className="text-slate-200">{selectedVehicle.driver.name}</strong>
              </span>

              <button
                onClick={() => onAskCopilotAboutVehicle(selectedVehicle)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5 Trucks Quick-Select Cards along Bottom */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            5 Guntur Active Trucks (Click to Focus & Open Popup)
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Centered on Guntur, AP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {vehicles.map((v) => {
            const isSelected = selectedVehicle?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectVehicle(v)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-950/90 border-cyan-500/70 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-black text-cyan-300">{v.truck_number}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    v.status === 'alert' ? 'bg-red-400 animate-ping' :
                    v.status === 'idle' ? 'bg-slate-400' :
                    'bg-emerald-400'
                  }`} />
                </div>
                <div className="text-[11px] text-slate-300 font-bold truncate">{v.vehicle_id} • {v.model}</div>
                <div className="mt-2 space-y-0.5 text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-white font-mono font-bold">{v.speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel:</span>
                    <span className="text-emerald-400 font-mono font-bold">{v.fuel_used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cargo:</span>
                    <span className="text-cyan-300 font-mono">{v.cargo_weight}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
