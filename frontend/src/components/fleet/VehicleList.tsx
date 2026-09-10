import React, { useEffect, useState } from 'react';
import { vehicleService } from '../../services/vehicleService';
import { Vehicle } from '../../types/vehicle';
import { VehicleForm } from './VehicleForm';
import { InfoTooltip } from '../common/InfoTooltip';
import { Truck, Plus, Search, Filter, Fuel, ShieldCheck, ArrowRight, Zap, Ship } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface VehicleListProps {
  viewMode?: 'simple' | 'technical';
  onSelectVehicleForTrip?: (vehicle: Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({ viewMode = 'simple', onSelectVehicleForTrip }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVehicles = () => {
    setLoading(true);
    vehicleService.getVehicles()
      .then(setVehicles)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const getFuelTooltip = (fuel: string) => {
    switch (fuel.toLowerCase()) {
      case 'diesel': return 'Conventional fuel widely used for long-distance transport.';
      case 'lng': return 'Lower-carbon fuel option used for land trucks and cargo ships.';
      case 'methanol': return 'Alternative fuel with lower direct emission intensity.';
      case 'hydrogen': return 'Low-emission fuel producing minimal tailpipe pollution.';
      case 'shore_power': return 'Uses electricity while docked, allowing onboard engines to be switched off.';
      default: return 'Engine fuel specification.';
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.vehicle_id.toLowerCase().includes(search.toLowerCase()) ||
                          v.make.toLowerCase().includes(search.toLowerCase()) ||
                          v.type.toLowerCase().includes(search.toLowerCase());
    const matchesFuel = fuelFilter === 'all' || v.fuel_type.toLowerCase() === fuelFilter.toLowerCase();
    return matchesSearch && matchesFuel;
  });

  return (
    <div className="space-y-8 text-slate-900">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-600" />
            My Vehicles & Ships
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Manage your active trucks, vans, and cargo vessels</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by Vehicle Name, Type, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 font-medium shadow-sm transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 font-extrabold shadow-sm"
          >
            <option value="all">All Fuel Types</option>
            <option value="diesel">Diesel</option>
            <option value="lng">LNG</option>
            <option value="methanol">Methanol</option>
            <option value="hydrogen">Hydrogen</option>
            <option value="electric">Electric / Shore Power</option>
          </select>
        </div>
      </div>

      {/* Vehicle Grid */}
      {loading ? (
        <LoadingSpinner text="Fetching fleet registry..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const isMarine = vehicle.type.toLowerCase().includes('ship') || vehicle.type.toLowerCase().includes('vessel');
            return (
              <div key={vehicle.id} className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 transition-all space-y-4 shadow-md flex flex-col justify-between text-slate-900">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        {isMarine ? '🚢' : '🚚'} {vehicle.make} {vehicle.model}
                      </h3>
                      <span className="font-mono text-[11px] text-slate-500 font-medium">ID: {vehicle.vehicle_id}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center">
                      ⛽ {vehicle.fuel_type}
                      <InfoTooltip text={getFuelTooltip(vehicle.fuel_type)} />
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-slate-500 block text-[11px] font-medium">Carries</span>
                      <span className="text-slate-900 font-extrabold">{vehicle.max_payload.toLocaleString()} kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] font-medium">Fuel Capacity</span>
                      <span className="text-slate-900 font-extrabold">{vehicle.fuel_tank_capacity} L</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] font-medium">Emission Standard</span>
                      <span className="text-slate-900 font-extrabold">{vehicle.emission_standard}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] font-medium">Status</span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectVehicleForTrip) {
                      onSelectVehicleForTrip(vehicle);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 font-extrabold text-xs transition-all flex items-center justify-center gap-2 group mt-2 shadow-sm"
                >
                  <span>Use This Vehicle →</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Which Fuel is Best? Guidance Section */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-amber-600" />
            Which fuel is best for your trip?
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            The best option depends on vehicle type, trip distance, cargo, availability, cost and operating conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="font-extrabold text-amber-800 block">Diesel</span>
            <span className="text-slate-700 block font-medium">Good availability</span>
            <span className="text-slate-500 text-[11px]">Higher emissions</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="font-extrabold text-blue-800 block">LNG</span>
            <span className="text-slate-700 block font-medium">Lower emissions</span>
            <span className="text-slate-500 text-[11px]">Suitable for vessels & heavy trucks</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
            <span className="font-extrabold text-teal-800 block">Methanol</span>
            <span className="text-slate-700 block font-medium">Alternative marine fuel</span>
            <span className="text-slate-500 text-[11px]">Growing port availability</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-800 block">Hydrogen</span>
            <span className="text-slate-700 block font-medium">Very low direct emissions</span>
            <span className="text-slate-500 text-[11px]">Infrastructure dependent</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
            <span className="font-extrabold text-purple-800 block">Shore Power</span>
            <span className="text-slate-700 block font-medium">Uses electricity while docked</span>
            <span className="text-slate-500 text-[11px]">Zero port engine idling</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <VehicleForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchVehicles();
          }}
        />
      )}
    </div>
  );
};
