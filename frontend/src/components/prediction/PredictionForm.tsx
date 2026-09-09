import React, { useState } from 'react';
import { SinglePredictionInput, SinglePredictionResult } from '../../types/prediction';
import { predictionService } from '../../services/predictionService';
import { PredictionResults } from './PredictionResults';
import { ModelExplanation } from './ModelExplanation';
import { BrainCircuit, Play, Upload, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const PredictionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SinglePredictionResult | null>(null);

  const [inputData, setInputData] = useState<SinglePredictionInput>({
    vehicle_type: 'Heavy Truck',
    fuel_type: 'diesel',
    distance_km: 145.0,
    payload_weight_kg: 6500.0,
    average_speed_kmh: 52.0,
    route_type: 'highway',
    traffic_condition: 'moderate',
    weather_condition: 'clear',
    temperature_celsius: 28.0,
    driver_behavior_score: 8.5,
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictionService.predictSingle(inputData);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Prediction calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-emerald-400" />
            AI Fuel & Multi-Gas GHG Prediction Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ensembled Machine Learning (XGBoost 70%, LightGBM 20%, RF 10%) with SHAP transparent feature explanations
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 font-medium">
          <Sparkles className="w-4 h-4" /> SHAP Explainer Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Parameters Form */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Trip & Vehicle Parameters
          </h3>

          <form onSubmit={handlePredict} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Vehicle Type</label>
                <select
                  value={inputData.vehicle_type}
                  onChange={(e) => setInputData({ ...inputData, vehicle_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="Heavy Truck">Heavy Truck</option>
                  <option value="Medium Van">Medium Van</option>
                  <option value="Light Delivery Van">Light Delivery Van</option>
                  <option value="CNG Cargo Vehicle">CNG Cargo Vehicle</option>
                  <option value="Electric Fleet Van">Electric Fleet Van</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Fuel Type</label>
                <select
                  value={inputData.fuel_type}
                  onChange={(e) => setInputData({ ...inputData, fuel_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="diesel">Diesel</option>
                  <option value="petrol">Petrol</option>
                  <option value="cng">CNG</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Distance (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputData.distance_km}
                  onChange={(e) => setInputData({ ...inputData, distance_km: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Payload Cargo (kg)</label>
                <input
                  type="number"
                  value={inputData.payload_weight_kg}
                  onChange={(e) => setInputData({ ...inputData, payload_weight_kg: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Avg Speed (km/h)</label>
                <input
                  type="number"
                  value={inputData.average_speed_kmh}
                  onChange={(e) => setInputData({ ...inputData, average_speed_kmh: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Driver Score (1-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={inputData.driver_behavior_score}
                  onChange={(e) => setInputData({ ...inputData, driver_behavior_score: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Route Profile</label>
                <select
                  value={inputData.route_type}
                  onChange={(e) => setInputData({ ...inputData, route_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="highway">Highway</option>
                  <option value="urban">Urban City</option>
                  <option value="mixed">Mixed Terrain</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Traffic Condition</label>
                <select
                  value={inputData.traffic_condition}
                  onChange={(e) => setInputData({ ...inputData, traffic_condition: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                >
                  <option value="light">Light Traffic</option>
                  <option value="moderate">Moderate Traffic</option>
                  <option value="heavy">Heavy Gridlock</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25"
            >
              <Play className="w-4 h-4 fill-white" />
              {loading ? "Running Ensemble Inference..." : "Run AI Fuel & GHG Prediction"}
            </button>
          </form>
        </div>

        {/* Results & SHAP Explanations Display */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800">
              <LoadingSpinner text="Computing XGBoost + LightGBM ensemble and SHAP attribution vectors..." />
            </div>
          ) : result ? (
            <>
              <PredictionResults result={result} />
              <ModelExplanation shapExplanations={result.shap_explanations} />
            </>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <BrainCircuit className="w-12 h-12 text-slate-700 mx-auto" />
              <h4 className="text-base font-bold text-slate-300">No Active Prediction Result</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Configure trip parameters on the left and click "Run AI Fuel & GHG Prediction" to evaluate multi-model ensemble results and SHAP impact breakdowns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
