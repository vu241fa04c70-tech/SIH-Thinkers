import React, { useState } from 'react';
import { fuelPriceService, FuelPriceItem } from '../../services/fuelPriceService';
import { Fuel, DollarSign, MapPin, RefreshCw, Zap, Flame, Ship } from 'lucide-react';

interface FuelPriceWidgetProps {
  onPriceSelect?: (item: FuelPriceItem) => void;
}

export const FuelPriceWidget: React.FC<FuelPriceWidgetProps> = ({ onPriceSelect }) => {
  const regions = fuelPriceService.getAvailableRegions();
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [prices, setPrices] = useState<FuelPriceItem[]>(fuelPriceService.getAllPricesAsList(regions[0]));

  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setPrices(fuelPriceService.getAllPricesAsList(reg));
  };

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">⛽ Fuel Price Index API</h3>
            <p className="text-[11px] text-slate-500 font-medium">Daily state & port fuel tariffs in ₹ INR</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:border-amber-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>📍 {r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        {prices.map((item) => (
          <div
            key={item.fuel_type}
            onClick={() => onPriceSelect && onPriceSelect(item)}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 cursor-pointer transition-all space-y-1.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">
                {item.fuel_type === 'diesel' ? '⛽' : item.fuel_type === 'lng' ? '🔥' : item.fuel_type === 'electric' ? '⚡' : item.fuel_type === 'petrol' ? '🚗' : '🚢'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{item.last_updated}</span>
            </div>
            <h4 className="font-extrabold text-slate-900 text-xs truncate">{item.name}</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-amber-700 font-mono">₹{item.price_inr}</span>
              <span className="text-[10px] text-slate-500 font-medium">{item.unit}</span>
            </div>
            <span className="text-[10px] text-slate-400 block truncate font-medium">{item.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
