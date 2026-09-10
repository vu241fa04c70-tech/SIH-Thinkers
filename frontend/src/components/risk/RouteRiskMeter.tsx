import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {
  ShieldCheck, AlertTriangle, CloudSun, Gauge, Fuel, Navigation,
  MapPin, CheckCircle2, Lightbulb, ArrowRight, Compass, Sun, Clock, Smile
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  viewMode?: 'simple' | 'technical';
}

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [26, 42],
  iconAnchor: [13, 42],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [26, 42],
  iconAnchor: [13, 42],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ROUTE_COORDINATES: [number, number][] = [
  [16.5062, 80.6480], // Vijayawada Start
  [16.4750, 80.6150], // NH 16 Bypass
  [16.4210, 80.5680], // Mangalagiri Corridor
  [16.3520, 80.5050], // Kakani Junction
  [16.3067, 80.4365]  // Guntur Destination
];

export const RouteRiskMeter: React.FC<Props> = () => {
  const { t } = useLanguage();

  const [routeInfo] = useState({
    overallRisk: 32,
    overallStatus: 'Low Risk',
    overallMessage: 'Good News! This route is safe to travel. Keep an eye on the weather and traffic updates.',
    origin: 'Vijayawada',
    destination: 'Guntur',
    routeName: 'Via NH 16',
    distanceKm: 32,
    durationText: '1 hr 45 min',
    roadRisk: { score: 20, status: 'Low Risk', msg: 'Roads are in good condition. No major issues reported.', color: 'green' },
    trafficRisk: { score: 45, status: 'Moderate Risk', msg: 'Some traffic expected in a few areas.', color: 'yellow' },
    weatherRisk: { score: 30, status: 'Low Risk', msg: 'Light rain possible later. No severe weather.', color: 'green' },
    fuelEfficiency: { score: 78, status: 'Good', msg: 'This route gives better fuel efficiency.', color: 'green' }
  });

  const handleStartTrip = () => {
    alert("Trip started! Navigating along NH 16 Green Route.");
  };

  return (
    <div className="space-y-8 text-slate-900 pb-12 font-sans max-w-7xl mx-auto bg-transparent min-h-screen p-4 sm:p-6 rounded-3xl">
      
      {/* 1. HEADER WITH WEATHER, LOCATION & DRIVE SAFE BADGE */}
      <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t('routeRiskMeterTitle', 'Route Risk Meter')}</h1>
          </div>
          <p className="text-xs text-slate-700 font-medium tracking-wide">
            {t('saferRoadsSub', 'Safer Roads • Smarter Trips • Better Deliveries')}
          </p>
        </div>

        {/* Right Widgets: Weather, Location & Drive Safe Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Weather Widget */}
          <div className="px-3.5 py-2 rounded-xl bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] text-xs font-bold text-slate-700 flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span>28°C Partly Cloudy</span>
          </div>

          {/* Location & Time Widget */}
          <div className="px-3.5 py-2 rounded-xl bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] text-xs font-bold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Vijayawada, 10:14 AM</span>
          </div>

          {/* Drive Safe Badge */}
          <div className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
            <Smile className="w-4 h-4 text-emerald-600" />
            <span>{t('driveSafe', 'Drive Safe! 😊')}</span>
          </div>
        </div>
      </div>

      {/* 2. TOP SECTION: OVERALL RISK CARD (LEFT) & ROUTE MAP PREVIEW (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* OVERALL ROUTE RISK CARD (7 COLS) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">{t('overallRouteRisk', 'Overall Route Risk')}</h2>
              <p className="text-xs text-slate-700 font-medium">{t('howRiskyToday', 'How risky is this route today?')}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('verifiedSafe', 'Verified Safe')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px]">
            {/* Large Circular Gauge */}
            <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${routeInfo.overallRisk}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center space-y-0">
                <span className="text-3xl font-black text-slate-900 block font-mono leading-none">{routeInfo.overallRisk}</span>
                <span className="text-[10px] font-extrabold text-emerald-700 block uppercase tracking-wider mt-1">{t(routeInfo.overallStatus, routeInfo.overallStatus)}</span>
              </div>
            </div>

            {/* Short Safety Message */}
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                {t('goodNewsTitle', 'Good News!')}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {t('goodNewsMsg', routeInfo.overallMessage)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-700 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('preTripPassed', 'Pre-Trip Passed')}</span>
            <span>•</span>
            <span>{t('optimalHighwayCond', 'Optimal Highway Conditions')}</span>
          </div>
        </div>

        {/* INTERACTIVE ROUTE MAP PREVIEW (5 COLS) */}
        <div className="lg:col-span-5 rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm bg-white relative min-h-[300px] flex flex-col">
          <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-bold px-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Navigation className="w-3.5 h-3.5" /> {t('routePreview', 'Route Preview')}: {routeInfo.origin} → {routeInfo.destination}
            </span>
            <span className="text-[11px] font-mono text-slate-300">{routeInfo.distanceKm} km</span>
          </div>

          <div className="flex-1 w-full min-h-[260px] relative z-0">
            <MapContainer
              center={[16.4100, 80.5400]}
              zoom={11}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[16.5062, 80.6480]} icon={startIcon}>
                <Popup>
                  <div className="text-slate-900 font-sans p-1 text-xs">
                    <strong className="text-emerald-700">📍 Start: {routeInfo.origin}</strong>
                  </div>
                </Popup>
              </Marker>
              <Marker position={[16.3067, 80.4365]} icon={destIcon}>
                <Popup>
                  <div className="text-slate-900 font-sans p-1 text-xs">
                    <strong className="text-red-600">🏁 Destination: {routeInfo.destination}</strong>
                  </div>
                </Popup>
              </Marker>
              <Polyline
                positions={ROUTE_COORDINATES}
                pathOptions={{ color: '#10b981', weight: 6, opacity: 0.9 }}
              />
            </MapContainer>
          </div>
        </div>

      </div>

      {/* 3. FOUR EQUAL RISK BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARD 1: ROAD RISK */}
        <div className="p-5 rounded-[20px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-600" /> {t('roadRisk', 'Road Risk')}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
            {/* Small Circular Gauge */}
            <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray={`${routeInfo.roadRisk.score}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute font-mono font-extrabold text-slate-800 text-xs">{routeInfo.roadRisk.score}</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {t('lowRisk', routeInfo.roadRisk.status)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t('roadRiskMsg', routeInfo.roadRisk.msg)}
          </p>
        </div>

        {/* CARD 2: TRAFFIC RISK */}
        <div className="p-5 rounded-[20px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-500" /> {t('trafficRisk', 'Traffic Risk')}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>

          <div className="flex items-center gap-4">
            {/* Small Circular Gauge */}
            <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500" strokeDasharray={`${routeInfo.trafficRisk.score}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute font-mono font-extrabold text-slate-800 text-xs">{routeInfo.trafficRisk.score}</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {t('moderateRisk', routeInfo.trafficRisk.status)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t('trafficRiskMsg', routeInfo.trafficRisk.msg)}
          </p>
        </div>

        {/* CARD 3: WEATHER RISK */}
        <div className="p-5 rounded-[20px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-emerald-600" /> {t('weatherRisk', 'Weather Risk')}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
            {/* Small Circular Gauge */}
            <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray={`${routeInfo.weatherRisk.score}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute font-mono font-extrabold text-slate-800 text-xs">{routeInfo.weatherRisk.score}</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {t('lowRisk', routeInfo.weatherRisk.status)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t('weatherRiskMsg', routeInfo.weatherRisk.msg)}
          </p>
        </div>

        {/* CARD 4: FUEL EFFICIENCY */}
        <div className="p-5 rounded-[20px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-emerald-600" /> {t('fuelEfficiency', 'Fuel Efficiency')}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
            {/* Small Circular Gauge */}
            <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray={`${routeInfo.fuelEfficiency.score}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute font-mono font-extrabold text-slate-800 text-xs">{routeInfo.fuelEfficiency.score}</span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {t('good', routeInfo.fuelEfficiency.status)}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t('fuelEffMsg', routeInfo.fuelEfficiency.msg)}
          </p>
        </div>

      </div>

      {/* 4. BOTTOM SECTION: RECOMMENDED ROUTE (LEFT) & DRIVER TIP CARD (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* RECOMMENDED ROUTE CARD (8 COLS) */}
        <div className="lg:col-span-8 p-6 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{t('recommendedRoute', 'Recommended Route')}</h3>
              </div>
              <p className="text-xs text-slate-700 font-medium">{t('safestEfficientSub', 'This is the safest and most efficient route for you.')}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[11px]">
              {t('bestChoice', 'BEST CHOICE')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px]">
            <div className="space-y-1">
              <span className="text-lg font-black text-slate-900 block">{t(routeInfo.routeName, routeInfo.routeName)}</span>
              <span className="text-xs font-bold text-slate-700 block font-mono">{routeInfo.distanceKm} km • {routeInfo.durationText}</span>
            </div>

            {/* THREE SMALL BADGES */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                {t('lowerRiskBadge', 'Lower risk')}
              </span>
              <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 border border-blue-300">
                {t('lessTrafficBadge', 'Less traffic')}
              </span>
              <span className="px-3 py-1 rounded-xl bg-teal-100 text-teal-800 border border-teal-300">
                {t('betterFuelEffBadge', 'Better fuel efficiency')}
              </span>
            </div>

            {/* GREEN START TRIP BUTTON */}
            <button
              onClick={handleStartTrip}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[18px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 shrink-0"
            >
              <span>{t('startTripBtn', 'Start Trip')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DRIVER TIP CARD (4 COLS) */}
        <div className="lg:col-span-4 p-6 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base border-b border-slate-100 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>{t('driverTip', 'Driver Tip')}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {t('driverTipMsg', 'If you see heavy rain or traffic, you can take an alternate route shown on the map. 😊')}
          </p>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
            <div className="text-[11px] font-extrabold text-emerald-900">{t('safeDrivingMode', 'Safe Driving Mode')}</div>
            <div className="text-[10px] font-bold text-emerald-700">{t('preTripAiPassed', 'Pre-trip AI safety check passed')}</div>
          </div>
        </div>

      </div>

    </div>
  );
};
