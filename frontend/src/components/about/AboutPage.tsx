import React from 'react';
import { InfoTooltip } from '../common/InfoTooltip';
import { Leaf, ShieldCheck, Cpu, Zap, Truck, DollarSign, Cloud, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AboutPageProps {
  viewMode?: 'simple' | 'technical';
}

export const AboutPage: React.FC<AboutPageProps> = ({ viewMode = 'simple' }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 text-slate-900">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <Leaf className="w-4 h-4 text-emerald-600" /> {t('aboutSihTag', 'SIH PS 26138 Project Overview')}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('aboutTitle', 'About GreenFleet AI')}</h2>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
            {t('aboutSub', 'Quantum-Inspired Fuel Consumption Prediction and Green Fleet Optimization Framework for Land & Maritime Logistics.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-md">
          <span className="text-xs font-extrabold text-red-700 uppercase tracking-wider block">1. {t('theProblemTag', 'The Problem')}</span>
          <h3 className="text-lg font-extrabold text-slate-900">{t('problemTitle', 'High Fuel Costs & Growing Emissions')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t('problemDesc', 'Fleet operators and shipping companies spend over 40% of operating expenses on fuel. Meanwhile, transportation emissions continue to rise, and logistics managers lack simple tools to compare alternative fuels, traffic routes, and payload efficiency.')}
          </p>
        </div>

        {/* Our Solution */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-md">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">2. {t('ourSolutionTag', 'Our Solution')}</span>
          <h3 className="text-lg font-extrabold text-slate-900">{t('solutionTitle', 'Smart Optimization Made Simple')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t('solutionDesc', 'GreenFleet predicts trip fuel consumption and finds the smartest routes that balance fuel cost, travel time, and pollution reduction. You enter your trip details, and GreenFleet calculates the best option in seconds.')}
          </p>
        </div>
      </div>

      {/* What We Optimize */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
        <h3 className="text-base font-extrabold text-slate-900">{t('whatGreenFleetOptimizes', 'What GreenFleet Optimizes')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="text-2xl block">⛽</span>
            <span className="font-extrabold text-slate-900 block">{t('optFuelUsed', 'Fuel Used')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('minimizesLiters', 'Minimizes liters')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-2xl block">💰</span>
            <span className="font-extrabold text-slate-900 block">{t('optTripCost', 'Trip Cost')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('lowerExpenses', 'Lower expenses')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
            <span className="text-2xl block">🌱</span>
            <span className="font-extrabold text-slate-900 block">{t('optEmissions', 'Emissions')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('avoidsCo2', 'Avoids CO₂e')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="text-2xl block">⏱</span>
            <span className="font-extrabold text-slate-900 block">{t('optTravelTime', 'Travel Time')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('avoidsDelays', 'Avoids delays')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
            <span className="text-2xl block">📦</span>
            <span className="font-extrabold text-slate-900 block">{t('optCargoLoad', 'Cargo Load')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('fitsCapacity', 'Fits capacity')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1">
            <span className="text-2xl block">🚚</span>
            <span className="font-extrabold text-slate-900 block">{t('optFleetRate', 'Fleet Rate')}</span>
            <span className="text-[10px] text-slate-700 font-medium">{t('smartAllocation', 'Smart allocation')}</span>
          </div>
        </div>
      </div>

      {/* Underlying Technology */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            {t('techArchTitle', 'Underlying Technology & Core Architecture')}
          </h3>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            SIH PS 26138
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-extrabold text-emerald-800 block text-sm flex items-center gap-1">
              {t('multiModelEnsemble', 'Multi-Model AI Ensemble')}
              <InfoTooltip text="Combines XGBoost (70%), LightGBM (20%), and Random Forest (10%) for fuel prediction with high accuracy." />
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t('multiModelDesc', 'Predicts fuel consumption across alternative fuels (LNG, Methanol, H2, Ammonia, Diesel, Electric) using weather, speed, and payload data.')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-extrabold text-teal-800 block text-sm flex items-center gap-1">
              {t('quantumQuboTitle', 'Quantum QUBO Solver')}
              <InfoTooltip text="Quadratic Unconstrained Binary Optimization formulation solved using Simulated Annealing + Tabu Search." />
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t('quantumQuboDesc', 'Formulates multi-objective route optimization as E(x) = x^T Q x to evaluate millions of potential combinations simultaneously.')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-extrabold text-amber-800 block text-sm flex items-center gap-1">
              {t('ipccEmissionsTitle', 'IPCC 2026 WTW Emissions')}
              <InfoTooltip text="Well-to-Wheel multi-gas emission accounting for CO2, CH4, and N2O." />
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t('ipccEmissionsDesc', 'Calculates full fuel cycle emissions to determine exact greenhouse gas savings in kg CO₂e avoided per trip.')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-extrabold text-purple-800 block text-sm flex items-center gap-1">
              {t('interactiveGisTitle', 'Interactive GIS Mapping')}
              <InfoTooltip text="Real-time route rendering with waypoint nodes, Leaflet GIS, and live telematics animation." />
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t('interactiveGisDesc', 'Visualizes recommended routes, alternative choices, and live vehicle location tracking on interactive maps.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
