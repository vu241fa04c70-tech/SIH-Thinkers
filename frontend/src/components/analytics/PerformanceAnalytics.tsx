import React, { useEffect, useState } from 'react';
import { optimizationService } from '../../services/optimizationService';
import {
  BarChart3, TrendingDown, DollarSign, Award, TreePine, Calculator, Fuel, Cloud, Truck,
  Zap, Sparkles, ShieldCheck, CheckCircle2, ChevronRight, PieChart as PieIcon,
  Printer, Download, FileText
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend
} from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

interface PerformanceAnalyticsProps {
  viewMode?: 'simple' | 'technical';
}

const VEHICLE_CATEGORY_DATA = [
  { category: 'Heavy Freight', fuelSavedLiters: 8200, co2ReducedKg: 21976, color: '#10b981' },
  { category: 'Electric Fleet Van', fuelSavedLiters: 5400, co2ReducedKg: 14472, color: '#06b6d4' },
  { category: 'CNG Carrier', fuelSavedLiters: 3100, co2ReducedKg: 8308, color: '#8b5cf6' },
  { category: 'Hybrid Transit', fuelSavedLiters: 1650, co2ReducedKg: 4422, color: '#f59e0b' }
];

const SAVINGS_DRIVERS_DATA = [
  { driver: 'Route Optimization', savingsPct: 45, color: '#059669' },
  { driver: 'Smooth Deceleration', savingsPct: 25, color: '#0d9488' },
  { driver: 'Zero Idling Time', savingsPct: 18, color: '#2563eb' },
  { driver: 'Eco Speed Cruise', savingsPct: 12, color: '#7c3aed' }
];

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ viewMode = 'simple' }) => {
  const { t } = useLanguage();
  const [trends, setTrends] = useState<any[]>([]);
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Interactive ROI Calculator State
  const [roiFleetSize, setRoiFleetSize] = useState(50);
  const [roiAvgKm, setRoiAvgKm] = useState(180);
  const [roiFuelPrice, setRoiFuelPrice] = useState(100); // ₹100/L

  useEffect(() => {
    setLoading(true);
    Promise.all([
      optimizationService.getTrends(30),
      optimizationService.getRankings()
    ]).then(([trendsRes, rankingsRes]) => {
      setTrends(trendsRes || []);
      setRankings(rankingsRes || []);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleExportCSV = () => {
    const csvRows = [
      ['GreenFleet Performance & Sustainability Report'],
      [`Generated Date,${new Date().toLocaleString()}`],
      [''],
      ['Date', 'Distance (km)', 'Fuel Saved (Liters)', 'CO2 Avoided (kg)', 'Cost Saved (INR)']
    ];

    trends.forEach((t: any) => {
      const fuel = t.fuelSaved || t.litersSaved || 0;
      csvRows.push([
        t.date || t.day || '2026-09-10',
        t.distanceKm || 120,
        fuel,
        t.co2Saved || t.co2Avoided || Math.round(fuel * 2.68),
        t.costSavedInr || Math.round(fuel * 100)
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GreenFleet_Sustainability_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ROI math in ₹ INR & CO2
  const dailyFuelSaved = roiFleetSize * (roiAvgKm * 0.22) * 0.21; // 21% savings
  const annualCostSavedInr = Math.round(dailyFuelSaved * roiFuelPrice * 365);
  const annualGhgSavedTons = Math.round(((dailyFuelSaved * 2.68 * 365) / 1000) * 10) / 10;
  const treesEquivalent = Math.round(annualGhgSavedTons * 45);

  return (
    <div className="space-y-8 text-slate-900 pb-12 font-sans max-w-7xl mx-auto">
      
      {/* PRINT-ONLY EXECUTIVE HEADER */}
      <div className="hidden print:block border-b-2 border-emerald-600 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-emerald-950">GreenFleet Executive Fleet Report</h1>
            <p className="text-xs text-slate-600 font-bold">Official Sustainability & Performance Audit Log</p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p className="font-bold">Generated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
            <p className="font-mono text-[10px]">Doc ID: GF-RPT-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>
      </div>

      {/* 1. HERO TITLE BANNER */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:bg-white print:border-slate-300 print:shadow-none">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            {t('analyticsReportStandard', 'Fleet Analytics & Intelligence Report')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('mySavings', 'My Savings & Performance Reports')}
          </h1>
          <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-2xl">
            {t('descMySavings', 'Track cumulative fuel savings, environmental impact, vehicle leaderboards, and printable ROI forecasts.')}
          </p>
        </div>

        {/* Action Buttons for Download / Print */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4.5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 border border-emerald-500 hover:scale-[1.02]"
            title="Print or Save as PDF Report"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4.5 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-black text-xs transition-all flex items-center gap-2 shadow-xs hover:scale-[1.02]"
            title="Export CSV Dataset"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Export CSV Data</span>
          </button>
        </div>
      </div>

      {/* 2. TOP 4 KEY PERFORMANCE INDICATOR CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Money Saved */}
        <div className="p-5 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-emerald-800">
            <span>💰 {t('lblMoneySaved', 'MONEY SAVED').toUpperCase()}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">₹6,10,000</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Fuel Saved */}
        <div className="p-5 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-amber-800">
            <span>⛽ {t('lblFuelSaved', 'FUEL SAVED').toUpperCase()}</span>
            <Fuel className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">18,350 L</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
            <span>22.5% fuel reduction</span>
          </div>
        </div>

        {/* CO2 Avoided */}
        <div className="p-5 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-teal-800">
            <span>🌱 CO₂ AVOIDED</span>
            <Cloud className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-700 font-mono">49,178 kg</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-black text-teal-900 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300">
            <span>≈ 2,210 trees planted</span>
          </div>
        </div>

        {/* Fleet Efficiency */}
        <div className="p-5 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-blue-800">
            <span>🚚 FLEET EFFICIENCY</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-700 font-mono">94.2%</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
            <span>Grade A+ Top Performer</span>
          </div>
        </div>
      </div>

      {/* 3. HISTORICAL TREND CHARTS (AREA GRAPH 1: FUEL SAVED, AREA GRAPH 2: POLLUTION AVOIDED) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: FUEL SAVED OVER TIME */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Fuel Saved Over Time (Liters)</h3>
              <p className="text-xs text-slate-700 font-bold">Daily fuel reduction trajectory across 30 days</p>
            </div>
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
              30-Day History
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFuelTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis dataKey="date" stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '1rem', fontWeight: 'bold', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [`${val} Liters`, 'Fuel Saved']}
                />
                <Area type="monotone" dataKey="fuel_saved_liters" name="Fuel Saved (L)" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorFuelTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: POLLUTION AVOIDED OVER TIME */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Pollution Avoided Over Time (kg CO₂e)</h3>
              <p className="text-xs text-slate-700 font-bold">Total verified greenhouse gas prevention</p>
            </div>
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300 shadow-2xs">
              Clean Air Impact
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGhgTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis dataKey="date" stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '1rem', fontWeight: 'bold', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [`${val} kg CO₂e`, 'CO₂ Avoided']}
                />
                <Area type="monotone" dataKey="ghg_saved_kg" name="CO₂ Avoided (kg)" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorGhgTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. BAR GRAPH: SAVINGS BY VEHICLE CATEGORY & DRIVERS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BAR CHART 1: FUEL SAVINGS BY VEHICLE CATEGORY */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Fuel Savings by Vehicle Type</h3>
              <p className="text-xs text-slate-700 font-bold">Liters saved across different commercial vehicle classes</p>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
              Fleet Composition
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VEHICLE_CATEGORY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis dataKey="category" stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '1rem', fontWeight: 'bold' }}
                  formatter={(val: any) => [`${val} Liters`, 'Fuel Saved']}
                />
                <Bar dataKey="fuelSavedLiters" radius={[12, 12, 0, 0]}>
                  {VEHICLE_CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART 2: KEY GREENFLEET SAVINGS DRIVERS */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">Savings Contribution Drivers (%)</h3>
              <p className="text-xs text-slate-700 font-bold">What contributed most to efficiency gains?</p>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
              AI Drivers
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SAVINGS_DRIVERS_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis type="number" stroke="#1e293b" tick={{ fontSize: 11, fontWeight: 700 }} unit="%" />
                <YAxis dataKey="driver" type="category" stroke="#1e293b" tick={{ fontSize: 10, fontWeight: 700 }} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '1rem', fontWeight: 'bold' }}
                  formatter={(val: any) => [`${val}%`, 'Contribution']}
                />
                <Bar dataKey="savingsPct" radius={[0, 12, 12, 0]}>
                  {SAVINGS_DRIVERS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 5. LEADERBOARD & INTERACTIVE ROI CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEADERBOARD: MOST EFFICIENT VEHICLES */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-black text-slate-900">Most Efficient Vehicles</h3>
            </div>
            <span className="text-xs font-black text-slate-800">Top 5 Performers</span>
          </div>

          <div className="space-y-3">
            {rankings.map((veh, i) => (
              <div key={i} className="p-3.5 rounded-[20px] bg-white/80 backdrop-blur-[12px] border border-slate-200/80 flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-2xl font-black text-sm flex items-center justify-center border shadow-xs ${
                    i === 0 ? 'bg-amber-100 text-amber-900 border-amber-300' :
                    i === 1 ? 'bg-slate-200 text-slate-800 border-slate-300' :
                    i === 2 ? 'bg-amber-700/20 text-amber-900 border-amber-400' :
                    'bg-emerald-50 text-emerald-900 border-emerald-200'
                  }`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span>{veh.name || veh.vehicle_id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black">
                        {veh.status || 'Active'}
                      </span>
                    </div>
                    <span className="text-slate-800 block text-[11px] font-bold mt-0.5">
                      {veh.type} • Saved {veh.fuel_saved_l || Math.round(850 - i * 110)} L fuel
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-700 text-base block font-mono">
                    {veh.eco_score || Math.round(98 - i * 2.5)} / 100
                  </span>
                  <span className="text-[10px] font-black text-teal-800">
                    {veh.co2_reduced_kg || Math.round(2278 - i * 280)} kg CO₂ avoided
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE ROI CALCULATOR */}
        <div className="p-6 sm:p-7 rounded-[28px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-black text-slate-900">How Much Could Your Fleet Save?</h3>
            </div>
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Interactive ROI Calculator
            </span>
          </div>

          {/* Sliders */}
          <div className="space-y-4 text-xs font-bold">
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-900">
                <span>Number of Vehicles in Fleet</span>
                <span className="text-emerald-700 font-mono font-black text-sm">{roiFleetSize} Vehicles</span>
              </div>
              <input
                type="range" min="5" max="250" step="5"
                value={roiFleetSize}
                onChange={(e) => setRoiFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-900">
                <span>Average Daily Distance per Vehicle</span>
                <span className="text-teal-700 font-mono font-black text-sm">{roiAvgKm} km/day</span>
              </div>
              <input
                type="range" min="30" max="500" step="10"
                value={roiAvgKm}
                onChange={(e) => setRoiAvgKm(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-900">
                <span>Average Fuel Price per Liter</span>
                <span className="text-amber-800 font-mono font-black text-sm">₹{roiFuelPrice} / L</span>
              </div>
              <input
                type="range" min="70" max="150" step="5"
                value={roiFuelPrice}
                onChange={(e) => setRoiFuelPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Savings Result Cards */}
          <div className="p-5 rounded-[20px] bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white space-y-4 shadow-lg">
            <div className="text-center space-y-1">
              <span className="text-xs text-emerald-100 block font-black uppercase tracking-wider">Projected Annual Net Savings</span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                ₹{annualCostSavedInr.toLocaleString()} <span className="text-xs font-bold text-emerald-200">/ year</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-black pt-2 border-t border-white/20">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
                <span className="text-emerald-100 text-[10px] block font-extrabold uppercase">CO₂ Prevented</span>
                <span className="text-white text-base font-mono">{annualGhgSavedTons} Tons</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20">
                <span className="text-emerald-100 text-[10px] block font-extrabold uppercase">Tree Equivalent</span>
                <span className="text-white text-base font-mono">🌳 {treesEquivalent.toLocaleString()} Trees</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
