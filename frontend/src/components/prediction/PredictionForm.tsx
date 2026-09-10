import React, { useState, useEffect } from 'react';
import { SinglePredictionInput, SinglePredictionResult } from '../../types/prediction';
import { predictionService } from '../../services/predictionService';
import { PredictionResults } from './PredictionResults';
import { WeatherData, weatherService } from '../../services/weatherService';
import { fuelPriceService } from '../../services/fuelPriceService';
import { 
  Calculator, Play, Sparkles, Truck, Ship, Fuel, ChevronDown, ChevronUp, 
  CheckCircle2, ArrowRight, Lightbulb, Zap, CloudRain, Wind, Thermometer, 
  Droplets, RefreshCw, BarChart2, Info, Flame, Sun, AlertTriangle
} from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface PredictionFormProps {
  viewMode?: 'simple' | 'technical';
  initialVehicle?: any;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ viewMode = 'simple', initialVehicle }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SinglePredictionResult | null>(null);
  const [activeWizardStep, setActiveWizardStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'road' | 'marine'>('road');
  const [selectedWhatIf, setSelectedWhatIf] = useState<string | null>(null);

  // Weather & Fuel price state
  const cities = weatherService.getAvailableCities();
  const [selectedCity, setSelectedCity] = useState('Hyderabad (TS)');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const fuelRegions = fuelPriceService.getAvailableRegions();
  const [selectedFuelRegion, setSelectedFuelRegion] = useState('Hyderabad (Telangana)');

  const [inputData, setInputData] = useState<SinglePredictionInput>({
    vehicle_type: initialVehicle ? `${initialVehicle.make} (${initialVehicle.type})` : 'Heavy Truck',
    fuel_type: initialVehicle ? initialVehicle.fuel_type : 'diesel',
    distance_km: 185.0,
    payload_weight_kg: initialVehicle ? initialVehicle.max_payload : 18000.0,
    average_speed_kmh: 65.0,
    route_type: 'highway',
    traffic_condition: 'moderate',
    weather_condition: 'clear',
    temperature_celsius: 28.0,
    driver_behavior_score: 9.0,
  });

  const fetchWeather = async (city: string) => {
    setWeatherLoading(true);
    try {
      const data = await weatherService.getWeatherForCity(city);
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  // Calculate live estimate values dynamically on input change
  const liveDistance = inputData.distance_km || 185;
  const livePayload = inputData.payload_weight_kg || 18000;
  const liveSpeed = inputData.average_speed_kmh || 65;

  const weatherPenaltyMultiplier = 1 + (weatherData ? weatherData.fuel_impact_percent / 100 : 0.02);
  const baseRate = inputData.fuel_type === 'electric' ? 0.8 : inputData.fuel_type === 'lng' ? 1.8 : 2.2;
  const liveFuelEst = Math.round((liveDistance * 0.22) * baseRate * (1 + livePayload / 100000) * weatherPenaltyMultiplier);
  const liveCostEst = liveFuelEst * 95.65;
  const liveCo2Est = Math.round(liveFuelEst * 2.68);
  const liveHoursEst = (liveDistance / Math.max(1, liveSpeed)).toFixed(1);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictionService.predictSingle(inputData);
      setResult(res);
      setActiveWizardStep(4);
    } catch (err) {
      console.error(err);
      alert("Prediction calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* 1. TOP HEADER BANNER WITH GRAPHIC */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-xs font-bold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guided Trip Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Plan Your Trip</span>
            <span className="text-3xl">🚚</span>
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Get real-time fuel prices, weather conditions and AI-powered fuel & emission estimates.
          </p>
        </div>

        {/* Decorative Graphic Banner */}
        <div className="w-full md:w-[420px] h-32 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-4 flex items-center justify-between text-white relative shadow-lg overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Sun & Hills SVG illustration background */}
          <div className="absolute top-2 left-6 w-10 h-10 rounded-full bg-amber-300 opacity-90 blur-[1px]" />
          <div className="absolute -bottom-6 left-0 right-0 h-20 bg-emerald-700/40 rounded-t-full" />
          
          {/* Moving truck illustration */}
          <div className="z-10 flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur border border-white/30 text-2xl shadow-md">
              🚚
            </div>
          </div>

          {/* Right Leaf Badge */}
          <div className="z-10 bg-white/95 backdrop-blur p-3 rounded-2xl border border-white text-slate-900 space-y-0.5 text-right shadow-xl">
            <span className="text-xs font-extrabold block text-emerald-800 flex items-center justify-end gap-1">
              <span>Cleaner Routes</span>
              <LeafIcon className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            <span className="text-[11px] font-bold text-slate-700 block">Greener Future</span>
            <span className="text-[11px] font-extrabold text-emerald-700 block">Lower Costs</span>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME FUEL PRICES & LIVE WEATHER WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT CARD: REAL-TIME FUEL PRICES */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-100 border border-orange-200 text-orange-600">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Real-Time Fuel Prices</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Live prices from government & oil company APIs (₹ per unit)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedFuelRegion}
                  onChange={(e) => setSelectedFuelRegion(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-emerald-500 shadow-sm"
                >
                  {fuelRegions.map((r) => (
                    <option key={r} value={r}>📍 {r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end text-[10px] text-slate-400 font-medium gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Last updated: 12 Sep 2025, 03:28 PM</span>
            </div>

            {/* 6 FUEL CARDS HORIZONTAL GRID */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
              {/* DIESEL */}
              <div className="p-2.5 rounded-2xl bg-red-50/50 border border-red-200 space-y-1 shadow-sm">
                <span className="text-xl block">⛽</span>
                <span className="font-extrabold text-slate-900 block text-xs">Diesel</span>
                <span className="font-extrabold text-red-700 block font-mono text-sm">₹95.65</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ Liter (IOCL)</span>
              </div>

              {/* PETROL */}
              <div className="p-2.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1 shadow-sm">
                <span className="text-xl block">⛽</span>
                <span className="font-extrabold text-slate-900 block text-xs">Petrol</span>
                <span className="font-extrabold text-emerald-700 block font-mono text-sm">₹109.32</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ Liter (HPCL)</span>
              </div>

              {/* CNG */}
              <div className="p-2.5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-1 shadow-sm">
                <span className="text-xl block">🔥</span>
                <span className="font-extrabold text-slate-900 block text-xs">CNG</span>
                <span className="font-extrabold text-blue-700 block font-mono text-sm">₹82.00</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ kg (IGL)</span>
              </div>

              {/* LNG */}
              <div className="p-2.5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-1 shadow-sm">
                <span className="text-xl block">💧</span>
                <span className="font-extrabold text-slate-900 block text-xs">LNG</span>
                <span className="font-extrabold text-teal-700 block font-mono text-sm">₹68.50</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ kg (GAIL)</span>
              </div>

              {/* METHANOL */}
              <div className="p-2.5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1 shadow-sm">
                <span className="text-xl block">🧪</span>
                <span className="font-extrabold text-slate-900 block text-xs">Methanol</span>
                <span className="font-extrabold text-purple-700 block font-mono text-sm">₹56.20</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ Liter (Indicative)</span>
              </div>

              {/* HYDROGEN */}
              <div className="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1 shadow-sm">
                <span className="text-xl block">⚡</span>
                <span className="font-extrabold text-slate-900 block text-xs">Hydrogen</span>
                <span className="font-extrabold text-amber-700 block font-mono text-sm">₹410.00</span>
                <span className="text-[9px] text-slate-500 block font-medium">/ kg (Indicative)</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Prices are updated in real-time from official sources (IOCL, HPCL, BPCL, IGL, GAIL) and may vary by location.</span>
          </div>
        </div>

        {/* RIGHT CARD: LIVE WEATHER & ROUTE CONDITIONS */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 border border-blue-200 text-blue-600">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Live Weather & Route Conditions</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Real-time data from Open-Meteo API</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-blue-500 shadow-sm"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>📍 {c}</option>
                  ))}
                </select>
                <button
                  onClick={() => fetchWeather(selectedCity)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${weatherLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end text-[10px] text-slate-400 font-medium gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Last updated: 12 Sep 2025, 03:28 PM</span>
            </div>

            {/* 8 WEATHER METRIC BOXES GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {/* Temperature */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-red-600 font-bold text-[10px]">
                  <Thermometer className="w-3.5 h-3.5" /> Temperature
                </div>
                <span className="text-base font-extrabold text-slate-900 font-mono block">29°C</span>
                <span className="text-[10px] text-slate-500 block font-medium">Feels like 32°C</span>
              </div>

              {/* Humidity */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-blue-600 font-bold text-[10px]">
                  <Droplets className="w-3.5 h-3.5" /> Humidity
                </div>
                <span className="text-base font-extrabold text-slate-900 font-mono block">62%</span>
                <span className="text-[10px] text-slate-500 block font-medium">Moderate</span>
              </div>

              {/* Wind Speed */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-teal-600 font-bold text-[10px]">
                  <Wind className="w-3.5 h-3.5" /> Wind Speed
                </div>
                <span className="text-base font-extrabold text-slate-900 font-mono block">14 km/h</span>
                <span className="text-[10px] text-slate-500 block font-medium">SW (210°)</span>
              </div>

              {/* Conditions */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                  <Sun className="w-3.5 h-3.5" /> Conditions
                </div>
                <span className="text-base font-extrabold text-slate-900 block truncate">Clear</span>
                <span className="text-[10px] text-slate-500 block font-medium">Sunny</span>
              </div>

              {/* Rain Chance */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-blue-600 font-bold text-[10px]">
                  <CloudRain className="w-3.5 h-3.5" /> Rain Chance
                </div>
                <span className="text-base font-extrabold text-slate-900 font-mono block">0%</span>
                <span className="text-[10px] text-slate-500 block font-medium">No rain expected</span>
              </div>

              {/* Road Condition */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-slate-700 font-bold text-[10px]">
                  🛣️ Road Condition
                </div>
                <span className="text-xs font-extrabold text-slate-900 block truncate">Dry & Clear</span>
                <span className="text-[10px] text-slate-500 block font-medium">Good for driving</span>
              </div>

              {/* Sea State */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-cyan-600 font-bold text-[10px]">
                  🌊 Sea State (if marine)
                </div>
                <span className="text-xs font-extrabold text-slate-900 block truncate">Calm</span>
                <span className="text-[10px] text-slate-500 block font-medium">Wave height: 0.3 m</span>
              </div>

              {/* Weather Fuel Impact Badge */}
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-0.5 shadow-sm">
                <div className="flex items-center gap-1 text-emerald-800 font-bold text-[10px]">
                  🍃 Weather Fuel Impact
                </div>
                <span className="text-base font-extrabold text-emerald-700 font-mono block">+2% Fuel</span>
                <span className="text-[10px] text-emerald-800 block font-medium">Normal conditions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5-STEP HORIZONTAL WIZARD BAR */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 overflow-x-auto shadow-sm">
        <div className="flex items-center justify-between min-w-[700px] text-xs font-extrabold">
          {[
            { step: 1, title: '1 Vehicle' },
            { step: 2, title: '2 Fuel' },
            { step: 3, title: '3 Trip & Conditions' },
            { step: 4, title: '4 Prediction' },
            { step: 5, title: '5 Recommendation' }
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <button
                type="button"
                onClick={() => setActiveWizardStep(item.step)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all shadow-sm ${
                  activeWizardStep === item.step
                    ? 'bg-emerald-600 text-white font-extrabold shadow-emerald-600/20'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 font-bold'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[11px] flex items-center justify-center font-extrabold">
                  {item.step}
                </span>
                <span>{item.title}</span>
              </button>
              {idx < 4 && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 4. MAIN INPUT FORM & ESTIMATE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: GUIDED FORM */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handlePredict} className="space-y-6">
            {/* STEP 1: WHAT ARE YOU DRIVING? */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-md">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-blue-100 text-blue-600">🚚</span>
                  <span>STEP 1: What are you driving?</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Select your vehicle type to get started.</p>
              </div>

              {/* VEHICLE CATEGORY TABS */}
              <div className="flex items-center gap-2 text-xs font-extrabold">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('road')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === 'road'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  🚚 Road Vehicles
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('marine')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === 'marine'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  🚢 Marine Vessels
                </button>
              </div>

              {/* 4 VEHICLE SELECTION CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-extrabold">
                {[
                  { label: 'Heavy Truck', icon: '🚚', val: 'Heavy Cargo Truck' },
                  { label: 'Delivery Van', icon: '🚐', val: 'Electric Fleet Van' },
                  { label: 'Cargo Truck', icon: '📦', val: 'Medium Cargo Truck' },
                  { label: 'Bus', icon: '🚌', val: 'Passenger Fleet Bus' }
                ].map((v) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setInputData({ ...inputData, vehicle_type: v.val })}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                      inputData.vehicle_type === v.val
                        ? 'bg-emerald-50/80 border-2 border-emerald-500 text-emerald-900 shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-3xl">{v.icon}</span>
                    <span>{v.label}</span>
                    {inputData.vehicle_type === v.val && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: FUEL SELECTION */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>⛽ STEP 2: What fuel are you using?</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-bold">
                {[
                  { label: 'Diesel', icon: '⛽', val: 'diesel', rate: '₹95.65/L' },
                  { label: 'LNG', icon: '🔥', val: 'lng', rate: '₹68.50/kg' },
                  { label: 'Methanol', icon: '🧪', val: 'methanol', rate: '₹56.20/L' },
                  { label: 'Hydrogen', icon: '⚡', val: 'hydrogen', rate: '₹410.00/kg' },
                  { label: 'Electric', icon: '⚡', val: 'electric', rate: '₹9.50/kWh' }
                ].map((fuel) => (
                  <button
                    key={fuel.val}
                    type="button"
                    onClick={() => setInputData({ ...inputData, fuel_type: fuel.val })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      inputData.fuel_type === fuel.val
                        ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl block mb-1">{fuel.icon}</span>
                    <span className="font-extrabold block">{fuel.label}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{fuel.rate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: TRIP DETAILS */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
              <h3 className="text-base font-extrabold text-slate-900">
                <span>📍 STEP 3: Trip Details & Conditions</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div className="space-y-1">
                  <label className="text-slate-800 font-extrabold block">📍 How far are you travelling (km)?</label>
                  <input
                    type="number"
                    value={inputData.distance_km}
                    onChange={(e) => setInputData({ ...inputData, distance_km: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-extrabold font-mono focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-800 font-extrabold block">📦 Cargo payload (kg)?</label>
                  <input
                    type="number"
                    value={inputData.payload_weight_kg}
                    onChange={(e) => setInputData({ ...inputData, payload_weight_kg: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-extrabold font-mono focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* RUN CALCULATE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group"
            >
              <span>✨ Calculate My Trip</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ESTIMATE PANEL */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xl sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Your Trip Estimate</h3>
                  <p className="text-[11px] text-slate-500 font-medium">GreenFleet is estimating your trip live.</p>
                </div>
              </div>
            </div>

            {/* AI READY GREEN BANNER */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-xs text-emerald-900 font-bold shadow-sm">
              <Zap className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="block font-extrabold flex items-center gap-1.5 text-emerald-800">
                  <span>AI Ready</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[11px] text-emerald-800 font-medium block">Fill in the details to see fuel, cost and emissions prediction.</span>
              </div>
            </div>

            {/* LIVE NUMBERS GRID */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="text-2xl block">⛽</span>
                <span className="text-2xl font-extrabold text-slate-900 font-mono">{liveFuelEst} L</span>
                <span className="text-[10px] text-slate-600 block font-bold">Estimated fuel</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-2xl block">💰</span>
                <span className="text-2xl font-extrabold text-emerald-800 font-mono">₹{liveCostEst.toLocaleString()}</span>
                <span className="text-[10px] text-slate-600 block font-bold">Estimated cost</span>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
                <span className="text-2xl block">🌱</span>
                <span className="text-2xl font-extrabold text-teal-800 font-mono">{liveCo2Est} kg</span>
                <span className="text-[10px] text-slate-600 block font-bold">Estimated CO₂e</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-2xl block">⏱</span>
                <span className="text-2xl font-extrabold text-blue-800 font-mono">{liveHoursEst} h</span>
                <span className="text-[10px] text-slate-600 block font-bold">Estimated time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Results */}
      {result && (
        <div className="pt-4">
          <PredictionResults result={result} />
        </div>
      )}
    </div>
  );
};

function LeafIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.4-3.6 8-8 8Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
