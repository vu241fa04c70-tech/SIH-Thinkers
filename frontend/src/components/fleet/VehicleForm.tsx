import React, { useState } from 'react';
import { vehicleService } from '../../services/vehicleService';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export const VehicleForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicle_id: `FLEET-${Math.floor(1000 + Math.random() * 9000)}`,
    type: 'Heavy Truck',
    fuel_type: 'diesel',
    make: 'Tata Motors',
    model: 'Prima 2830.K',
    year: 2023,
    engine_capacity: 6.7,
    curb_weight: 8500,
    max_payload: 18000,
    fuel_tank_capacity: 300,
    emission_standard: 'BS6',
    status: 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vehicleService.createVehicle(formData as any);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add vehicle.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-6 relative shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white">Add New Fleet Vehicle</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Vehicle ID</label>
              <input
                type="text"
                value={formData.vehicle_id}
                onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Vehicle Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
              >
                <option value="Heavy Truck">Heavy Truck</option>
                <option value="Medium Van">Medium Van</option>
                <option value="Light Delivery Van">Light Delivery Van</option>
                <option value="CNG Cargo Vehicle">CNG Cargo Vehicle</option>
                <option value="Electric Fleet Van">Electric Fleet Van</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Fuel Type</label>
              <select
                value={formData.fuel_type}
                onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
              >
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
                <option value="cng">CNG</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Emission Standard</label>
              <select
                value={formData.emission_standard}
                onChange={(e) => setFormData({ ...formData, emission_standard: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
              >
                <option value="BS6">BS6</option>
                <option value="BS4">BS4</option>
                <option value="Euro 6">Euro 6</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Make</label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Max Payload (kg)</label>
              <input
                type="number"
                value={formData.max_payload}
                onChange={(e) => setFormData({ ...formData, max_payload: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm text-white font-medium shadow-lg shadow-emerald-600/20"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
