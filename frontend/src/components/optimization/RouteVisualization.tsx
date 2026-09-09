import React, { useState, useEffect } from 'react';
import { OptimizationInput } from './OptimizationInput';
import { OptimizationResults } from './OptimizationResults';
import { RouteMap } from '../maps/RouteMap';
import { optimizationService } from '../../services/optimizationService';
import { OptimizationResult } from '../../types/optimization';
import { Cpu, MapPin } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const RouteVisualization: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const runSolver = async (params: any) => {
    setLoading(true);
    try {
      const res = await optimizationService.runOptimization(params);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Optimization solver failed.");
    } finally {
      setLoading(false);
    }
  };

  // Run initial default optimization on mount
  useEffect(() => {
    runSolver({
      depot_location: { id: 'depot', name: 'Mumbai Central Depot', lat: 19.0760, lng: 72.8777 },
      tasks: [
        { id: 'T-1', name: 'Thane Hub', lat: 19.2183, lng: 72.9781, demand_kg: 2400 },
        { id: 'T-2', name: 'Navi Mumbai Hub', lat: 19.0330, lng: 73.0297, demand_kg: 1800 },
        { id: 'T-3', name: 'Bhiwandi Logistics', lat: 19.2812, lng: 73.0482, demand_kg: 3200 }
      ],
      available_vehicles: [
        { id: 'V-1', vehicle_id: 'FLEET-1001', type: 'Heavy Truck', fuel_type: 'diesel', max_payload_kg: 18000 },
        { id: 'V-2', vehicle_id: 'FLEET-1004', type: 'Electric Fleet Van', fuel_type: 'electric', max_payload_kg: 3500 }
      ],
      alpha_fuel: 0.4,
      beta_ghg: 0.3,
      gamma_time: 0.2,
      delta_penalty: 0.1
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            Quantum-Inspired QUBO Optimization & Route Visualization
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulated Annealing + Tabu Search multi-vehicle routing solver mapped in real-time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <OptimizationInput onRunOptimization={runSolver} loading={loading} />
        </div>

        {/* Map & Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800">
              <LoadingSpinner text="Executing QUBO Simulated Annealing matrix optimization..." />
            </div>
          ) : result ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-emerald-400" /> Live Interactive Fleet Map</span>
                  <span>Color-coded vehicle paths</span>
                </div>
                <RouteMap routes={result.routes} />
              </div>
              <OptimizationResults result={result} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
