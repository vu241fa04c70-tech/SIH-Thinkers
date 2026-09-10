import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Navigation, 
  Award, 
  Landmark, 
  Trophy, 
  Gauge, 
  FileText, 
  Leaf, 
  Menu, 
  Sliders, 
  CreditCard, 
  Save, 
  CheckCircle2, 
  RotateCcw,
  Globe
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate?: (tab: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [activeNavTab, setActiveNavTab] = useState('settings');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [fleetName, setFleetName] = useState('GreenFleet Andhra Logistics');
  const [defaultCorridor, setDefaultCorridor] = useState('Vijayawada to Guntur (NH 16)');
  const [fastagAutoRecharge, setFastagAutoRecharge] = useState(true);
  const [fastagThreshold, setFastagThreshold] = useState('₹1,500');
  const [ecoRoutingLevel, setEcoRoutingLevel] = useState('Maximum Green (Strict CO2 Minimization)');
  const [liveTrafficAlerts, setLiveTrafficAlerts] = useState(true);
  const [satelliteHybridMap, setSatelliteHybridMap] = useState(true);
  const [co2TargetKg, setCo2TargetKg] = useState('500');

  const handleNav = (tab: string) => {
    setActiveNavTab(tab);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col lg:flex-row antialiased font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. UNIFIED 7-ITEM LEFT SIDEBAR */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#070e1a] border-r border-[#121f36] flex flex-col justify-between p-5 transition-transform duration-300
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white font-sans leading-none">
                GreenFleet
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide">
                Clean Fleet Intelligence
              </p>
            </div>
          </div>

          <nav className="space-y-1 pt-1">
            <button
              onClick={() => handleNav('route-optimization')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'route-optimization'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Route Optimization</span>
            </button>

            <button
              onClick={() => handleNav('carbon-passport')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'carbon-passport'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Carbon Passport</span>
            </button>

            <button
              onClick={() => handleNav('government-incentives')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'government-incentives'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Government Incentives</span>
            </button>

            <button
              onClick={() => handleNav('eco-challenge')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'eco-challenge'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Eco Challenge</span>
            </button>

            <button
              onClick={() => handleNav('route-risk-meter')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'route-risk-meter'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Gauge className="w-4 h-4 text-sky-400" />
              <span>Route Risk Meter</span>
            </button>

            <button
              onClick={() => handleNav('reports')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeNavTab === 'reports'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => handleNav('settings')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeNavTab === 'settings'
                  ? 'bg-[#0d2a2a] text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#091f24] border border-emerald-500/30 text-center space-y-1">
          <span className="text-xs font-bold text-white block">Platform Engine v3.4</span>
          <p className="text-[10px] text-slate-400">OpenStreetMap &bull; Esri Hybrid &bull; NH 16</p>
        </div>
      </aside>

      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* 2. MAIN VIEW CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-5 sm:px-8 py-3.5 border-b border-[#121f36] flex items-center justify-between gap-4 sticky top-0 z-30 bg-[#060b14]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-[#0c2825] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/40 shrink-0">
              <SettingsIcon className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                Platform Settings &amp; Preferences
              </h1>
              <p className="text-[11px] text-slate-400">
                Configure FASTag integration, routing thresholds, and vehicle telemetry parameters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav('route-optimization')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091f24] border border-emerald-500/30"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Back to Map</span>
            </button>
          </div>
        </header>

        <main className="p-5 sm:p-8 max-w-[1200px] w-full mx-auto space-y-6">
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-in fade-in shadow-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Settings and routing preferences successfully saved and synchronized with fleet devices.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Corridor Defaults */}
            <div className="rounded-3xl bg-[#091322] border border-[#162744] p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-[#14233c] pb-4">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-black text-white">Corridor &amp; Fleet Routing Defaults</h3>
                  <p className="text-[11px] text-slate-400">Default starting parameters for Route Optimization and Route Risk Meter</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Fleet Organization Name</label>
                  <input
                    type="text"
                    value={fleetName}
                    onChange={(e) => setFleetName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Default Primary Corridor</label>
                  <select
                    value={defaultCorridor}
                    onChange={(e) => setDefaultCorridor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Vijayawada to Guntur (NH 16)">Vijayawada to Guntur (NH 16)</option>
                    <option value="Amaravati to Guntur">Amaravati to Guntur</option>
                    <option value="Vijayawada to Mangalagiri">Vijayawada to Mangalagiri</option>
                    <option value="Hyderabad to Vijayawada (NH 65)">Hyderabad to Vijayawada (NH 65)</option>
                    <option value="Chennai to Nellore (NH 16)">Chennai to Nellore (NH 16)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Routing Optimization Algorithm</label>
                  <select
                    value={ecoRoutingLevel}
                    onChange={(e) => setEcoRoutingLevel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Maximum Green (Strict CO2 Minimization)">Maximum Green (Strict CO₂ Minimization)</option>
                    <option value="Balanced (Fuel Efficiency + Lowest Tolls)">Balanced (Fuel Efficiency + Lowest Tolls)</option>
                    <option value="Fastest Corridor with High EV Priority">Fastest Corridor with High EV Priority</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Weekly CO₂ Reduction Target (kg)</label>
                  <input
                    type="number"
                    value={co2TargetKg}
                    onChange={(e) => setCo2TargetKg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* FASTag Integration */}
            <div className="rounded-3xl bg-[#091322] border border-[#162744] p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-[#14233c] pb-4">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-white">FASTag &amp; Toll Gate Integration</h3>
                  <p className="text-[11px] text-slate-400">Automated toll cost calculation for Kaza Toll Plaza &amp; national highway plazas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070e1a] border border-[#182f50]">
                  <div>
                    <span className="text-xs font-bold text-white block">Auto-Debit FASTag Balance</span>
                    <span className="text-[10px] text-slate-400">Automatically sync with NPCI / NHAI FASTag wallet</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={fastagAutoRecharge}
                    onChange={(e) => setFastagAutoRecharge(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Low Balance Warning Threshold</label>
                  <input
                    type="text"
                    value={fastagThreshold}
                    onChange={(e) => setFastagThreshold(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] focus:border-emerald-500 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Map Telematics */}
            <div className="rounded-3xl bg-[#091322] border border-[#162744] p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-[#14233c] pb-4">
                <Globe className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="text-sm font-black text-white">Maps &amp; Live Telematics</h3>
                  <p className="text-[11px] text-slate-400">OpenStreetMap &amp; Esri World Imagery configuration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070e1a] border border-[#182f50]">
                  <div>
                    <span className="text-xs font-bold text-white block">Esri Hybrid Satellite Overlay</span>
                    <span className="text-[10px] text-slate-400">Render highway lines, place labels &amp; satellite photo tiles</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={satelliteHybridMap}
                    onChange={(e) => setSatelliteHybridMap(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070e1a] border border-[#182f50]">
                  <div>
                    <span className="text-xs font-bold text-white block">Live Traffic &amp; Weather Alerts</span>
                    <span className="text-[10px] text-slate-400">Show dynamic congestion &amp; road risk scores</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={liveTrafficAlerts}
                    onChange={(e) => setLiveTrafficAlerts(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFleetName('GreenFleet Andhra Logistics');
                  setDefaultCorridor('Vijayawada to Guntur (NH 16)');
                  setFastagAutoRecharge(true);
                  setFastagThreshold('₹1,500');
                  setSavedSuccess(false);
                }}
                className="px-5 py-2.5 rounded-2xl bg-[#070e1a] border border-[#182f50] hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
