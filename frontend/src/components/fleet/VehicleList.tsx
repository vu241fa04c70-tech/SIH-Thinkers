import React, { useEffect, useState } from 'react';
import { vehicleService } from '../../services/vehicleService';
import { Vehicle } from '../../types/vehicle';
import { VehicleForm } from './VehicleForm';
import { Truck, Plus, Search, Filter, Fuel, ShieldCheck, Zap } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const VehicleList: React.FC = () => {
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

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = v.vehicle_id.toLowerCase().includes(search.toLowerCase()) ||
                          v.make.toLowerCase().includes(search.toLowerCase()) ||
                          v.type.toLowerCase().includes(search.toLowerCase());
    const matchesFuel = fuelFilter === 'all' || v.fuel_type.toLowerCase() === fuelFilter.toLowerCase();
    return matchesSearch && matchesFuel;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-400" />
            Fleet Vehicle Registry
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage 50+ vehicles, fuel specifications, and emission standards</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-600/20"
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
            placeholder="Search by Vehicle ID, Make, or Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Fuel Types</option>
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
            <option value="cng">CNG</option>
            <option value="electric">Electric</option>
          </select>
        </div>
      </div>

      {/* Vehicle Grid */}
      {loading ? (
        <LoadingSpinner text="Fetching fleet registry..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">{vehicle.vehicle_id}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{vehicle.make} {vehicle.model}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                  vehicle.fuel_type === 'electric' ? 'bg-teal-950 text-teal-300 border border-teal-800' :
                  vehicle.fuel_type === 'cng' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {vehicle.fuel_type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/80">
                <div>
                  <span className="text-slate-400 block">Type</span>
                  <span className="text-slate-200 font-medium">{vehicle.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Max Payload</span>
                  <span className="text-slate-200 font-medium">{vehicle.max_payload} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Emission Standard</span>
                  <span className="text-slate-200 font-medium">{vehicle.emission_standard}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Year</span>
                  <span className="text-slate-200 font-medium">{vehicle.year}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Active & Operational
                </span>
                <span className="font-mono">{vehicle.fuel_tank_capacity} L / kWh Cap</span>
              </div>
            </div>
          ))}
        </div>
      )}

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
