import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { RouteSegment } from '../../types/optimization';

// Custom Map Icons
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

const ROUTE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

export const RouteMap: React.FC<{ routes: RouteSegment[]; depotLocation?: { lat: number; lng: number; name: string } }> = ({
  routes,
  depotLocation = { lat: 19.0760, lng: 72.8777, name: "Central Depot" }
}) => {
  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
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
              <span className="font-bold text-xs block text-emerald-700">Central Logistics Depot</span>
              <span className="text-[11px] text-slate-600">Origin & Fleet Dispatch Base</span>
            </div>
          </Popup>
        </Marker>

        {/* Render Routes and Task Markers */}
        {routes.map((route, idx) => {
          const color = ROUTE_COLORS[idx % ROUTE_COLORS.length];
          const positions: [number, number][] = route.route_waypoints.map(w => [w.lat, w.lng]);

          return (
            <React.Fragment key={route.vehicle_id + idx}>
              <Polyline
                positions={positions}
                pathOptions={{ color: color, weight: 4, opacity: 0.85, dashArray: '5, 10' }}
              />

              {route.route_waypoints.slice(1, -1).map((wp, wIdx) => (
                <Marker key={wIdx} position={[wp.lat, wp.lng]} icon={taskIcon}>
                  <Popup>
                    <div className="text-slate-900 font-sans p-1">
                      <span className="font-bold text-xs block text-blue-700">{wp.name}</span>
                      <span className="text-[11px] text-slate-600">Assigned to {route.vehicle_id}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
