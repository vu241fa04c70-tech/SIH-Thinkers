import React from 'react';
import { Home, Truck, MapPin, Compass, DollarSign, BarChart3, HelpCircle, Info, Leaf, Building2, ShieldCheck, Trophy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'landing', label: t('home'), subtext: t('subHome', 'Control center & tools'), icon: Home },
    { id: 'predictions', label: t('planTrip'), subtext: t('subPlanTrip', 'Estimate fuel & emissions'), icon: MapPin },
    { id: 'optimization', label: t('bestRoute'), subtext: t('subBestRoute', 'Find cheapest green route'), icon: Compass },
    { id: 'passport', label: t('carbonPassport', 'Carbon Passport'), subtext: t('subCarbonPassport', 'Verified Sustainability Report'), icon: Leaf },
    { id: 'incentives', label: t('govIncentives', 'Government Incentives'), subtext: t('subGovIncentives', 'Green Subsidy & Credits'), icon: Building2 },
    { id: 'challenge', label: t('ecoChallenge', 'Eco Challenge'), subtext: t('subEcoChallenge', 'Driver Ranks, Badges & Points'), icon: Trophy },
    { id: 'risk', label: t('routeRiskMeter', 'Route Risk Meter'), subtext: t('subRouteRiskMeter', 'Safer Roads & AI Pre-trip Check'), icon: ShieldCheck },
    { id: 'analytics', label: t('mySavings'), subtext: t('subSavings', "Today's money & fuel saved"), icon: DollarSign },
    { id: 'reports', label: t('reports'), subtext: t('subReports', 'Fleet efficiency insights'), icon: BarChart3 },
    { id: 'about', label: t('about'), subtext: t('subAbout', 'How GreenFleet works'), icon: Info },
  ];

  return (
    <aside className="w-64 bg-white/60 backdrop-blur-[12px] border-r border-white/20 shadow-lg shadow-slate-900/5 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] shadow-sm sticky top-16">
      <div className="space-y-2">
        <div className="px-3 py-2 text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
          {t('menuTitle', 'GreenFleet Menu')}
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'reports' && activeTab === 'analytics');
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id === 'reports' ? 'analytics' : item.id)}
              className={`w-full flex items-start space-x-3 px-3.5 py-3 rounded-2xl text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className="font-extrabold text-sm block">{item.label}</span>
                <span className={`text-[11px] block font-normal ${isActive ? 'text-emerald-100' : 'text-slate-700'}`}>
                  {item.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2 text-xs">
        <div className="font-extrabold text-emerald-800">🌱 {t('smartAssistantTitle', 'Smart Assistant')}</div>
        <p className="text-emerald-900 leading-relaxed font-medium">
          {t('smartAssistantDesc', 'Open app → choose your trip → GreenFleet finds your savings!')}
        </p>
      </div>
    </aside>
  );
};
