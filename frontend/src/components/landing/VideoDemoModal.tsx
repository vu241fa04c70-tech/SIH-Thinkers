import React, { useState } from 'react';
import { X, Play, Sparkles, Cpu, Fuel, Cloud, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Vehicle & Route Inputs",
      desc: "Input distance (185km), cargo payload (12,000kg), traffic index, and vehicle fuel type.",
      metric: "5 Parameters Configured",
      color: "text-blue-400"
    },
    {
      title: "2. XGBoost + LightGBM Ensemble",
      desc: "Multi-model ensemble predicts exact fuel consumption (41.2 L) with < 4.8% MAPE error.",
      metric: "Predicted: 41.2 L Burn",
      color: "text-amber-400"
    },
    {
      title: "3. SHAP Additive Feature Attributions",
      desc: "Breaks down distance (+18.5L), heavy traffic (+7.4L), and driver behavior (-3.2L).",
      metric: "SHAP Explainability Active",
      color: "text-purple-400"
    },
    {
      title: "4. Quantum QUBO Simulated Annealing",
      desc: "Formulates multi-vehicle matrix E(x)=x^TQx. Solves global minimum in 142ms.",
      metric: "-22.4% Fuel & GHG Reduced",
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-2xl space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Play className="w-6 h-6 fill-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">GreenFleet AI Interactive Walkthrough</h3>
            <p className="text-xs text-slate-400">Step-by-Step AI Engine & QUBO Optimization Simulation</p>
          </div>
        </div>

        {/* Step Preview Player */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className={`font-bold text-sm ${steps[activeStep].color}`}>{steps[activeStep].title}</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
              {steps[activeStep].metric}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed min-h-[40px]">{steps[activeStep].desc}</p>

          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeStep === idx
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] text-slate-500">Step {idx + 1}</div>
              <div className="truncate text-[11px] mt-0.5">{s.title.split('.')[1]}</div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400">Click steps above to navigate simulation</span>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};
