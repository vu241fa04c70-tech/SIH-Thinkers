import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { RouteSegment } from '../../types/optimization';
import { InfoTooltip } from '../common/InfoTooltip';

const depotIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const taskIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ROUTE_COLORS = ['#059669', '#2563eb', '#d97706'];

export const RouteMap: React.FC<{ routes: RouteSegment[]; depotLocation?: { lat: number; lng: number; name: string } }> = ({
  routes,
  depotLocation = { lat: 19.0760, lng: 72.8777, name: "Central Depot" }
}) => {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);

  return (
    <div className="space-y-3">
      {/* Map Interactive Legend Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-4 font-extrabold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> 🟢 Recommended Route
          </span>
          <span className="flex items-center gap-1.5 text-blue-700">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> 🔵 Alternative Route
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" /> 🟠 Higher Fuel Cost Route
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-500 font-medium text-[11px]">
          <span>📍 START</span> • <span>📍 STOPS</span> • <span>🏁 DESTINATION</span>
        </div>
      </div>

      {/* Interactive Leaflet Map */}
      <div className="h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative">
        <MapContainer
          center={[depotLocation.lat, depotLocation.lng]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Depot Marker */}
          <Marker position={[depotLocation.lat, depotLocation.lng]} icon={depotIcon}>
            <Popup>
              <div className="text-slate-900 font-sans p-1">
                <span className="font-bold text-xs block text-emerald-700">📍 START & DESTINATION: Central Depot</span>
                <span className="text-[11px] text-slate-600">Origin dispatch base</span>
              </div>
            </Popup>
          </Marker>

          {/* Render Polyline Routes & Stop Markers */}
          {routes.map((route, idx) => {
            const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];
            const positions: [number, number][] = route.route_waypoints.map(w => [w.lat, w.lng]);
            const isSelected = selectedRouteIdx === idx;

            return (
              <React.Fragment key={route.vehicle_id + idx}>
                <Polyline
                  positions={positions}
                  eventHandlers={{
                    click: () => setSelectedRouteIdx(idx)
                  }}
                  pathOptions={{
                    color: color,
                    weight: isSelected ? 6 : 4,
                    opacity: isSelected ? 1 : 0.65,
                    dashArray: idx === 0 ? undefined : '5, 10'
                  }}
                />

                {route.route_waypoints.slice(1, -1).map((wp, wIdx) => (
                  <Marker key={wIdx} position={[wp.lat, wp.lng]} icon={taskIcon}>
                    <Popup>
                      <div className="text-slate-900 font-sans p-1">
                        <span className="font-bold text-xs block text-blue-700">📍 STOP {wIdx + 1}: {wp.name}</span>
                        {wp.demand_kg && <span className="text-[11px] text-slate-600 block">Cargo demand: {wp.demand_kg} kg</span>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Selected Route Simple Summary Card */}
      {routes.length > 0 && (
        <div className="p-5 rounded-2xl bg-white border border-emerald-300 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-emerald-800 uppercase tracking-wider">
              {selectedRouteIdx === 0 ? "⭐ GREENFLEET RECOMMENDED ROUTE" : `ALTERNATIVE ROUTE #${selectedRouteIdx + 1}`}
            </span>
            <span className="text-slate-500 font-mono font-medium">Assigned to: {routes[selectedRouteIdx]?.vehicle_id}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-sans">Distance</span>
              <span className="font-bold text-slate-900">{routes[selectedRouteIdx]?.total_distance_km} km</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-sans">Est. Time</span>
              <span className="font-bold text-blue-700">{Math.round(routes[selectedRouteIdx]?.estimated_time_minutes)} min</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-sans">Fuel Needed</span>
              <span className="font-bold text-amber-700">{routes[selectedRouteIdx]?.predicted_fuel_liters} L</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-sans">Trip Cost</span>
              <span className="font-bold text-emerald-700">₹{Math.round(routes[selectedRouteIdx]?.predicted_fuel_liters * 100).toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-slate-500 text-[10px] block font-sans">CO₂ Emissions</span>
              <span className="font-bold text-teal-700">{routes[selectedRouteIdx]?.predicted_ghg_kg} kg</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-sans">
            <span className="font-extrabold text-emerald-800">Why is this route recommended?</span>
            <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
              Because it provides the best balance of fuel cost, travel time and emissions based on your selected preferences.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
