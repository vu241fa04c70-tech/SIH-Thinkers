import React, { useState, useEffect } from 'react';
import { weatherService, WeatherData } from '../../services/weatherService';
import { CloudRain, Wind, Thermometer, Droplets, Navigation, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface WeatherWidgetProps {
  onWeatherSelect?: (data: WeatherData) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onWeatherSelect }) => {
  const cities = weatherService.getAvailableCities();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const data = await weatherService.getWeatherForCity(city);
      setWeather(data);
      if (onWeatherSelect) onWeatherSelect(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">Live Weather & Route Conditions API</h3>
            <p className="text-[11px] text-slate-500 font-medium">Real-time Open-Meteo & sea state analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-teal-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>📍 {c}</option>
            ))}
          </select>
          <button
            onClick={() => fetchWeather(selectedCity)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Refresh Weather"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {weather && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] block font-medium">Temperature</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">{weather.temperature_c}°C</span>
              <span className="text-[10px] text-teal-700 font-bold block">{weather.condition}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] block font-medium">Wind Speed</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">{weather.wind_speed_kmh} km/h</span>
              <span className="text-[10px] text-slate-500 block font-medium">Dir: {weather.wind_direction}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 text-[10px] block font-medium">Road / Surface</span>
              <span className="text-xs font-extrabold text-slate-900 block">{weather.road_condition}</span>
              <span className="text-[10px] text-slate-500 block font-medium">Rain: {weather.precipitation_mm} mm</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <span className="text-amber-800 text-[10px] block font-bold">Weather Fuel Penalty</span>
              <span className="text-lg font-extrabold text-amber-700 font-mono">+{weather.fuel_impact_percent}% Fuel</span>
              <span className="text-[10px] text-amber-800 font-bold block">Environmental Drag</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>{weather.explanation}</span>
          </div>
        </div>
      )}
    </div>
  );
};
