import React, { useState } from 'react';
import {
  Building2, Fuel, Award, ShieldCheck, CheckCircle2, Leaf, Download,
  Coins, TrendingUp, Sparkles, Truck, ArrowUp, ArrowDown, ChevronRight, Zap
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  viewMode?: 'simple' | 'technical';
}

export const GovernmentIncentives: React.FC<Props> = () => {
  const { t } = useLanguage();

  // Dynamic fleet performance values (can be updated or derived from backend state)
  const [fleetStats] = useState({
    ecoGrade: 'A+',
    ecoGradeLabel: 'Top Performer',
    reputationScore: 92,
    reputationLabel: 'Excellent',
    fuelSavedLiters: 2.1,
    fuelSavedPct: 18,
    co2ReducedKg: 7.8,
    co2ReducedPct: 20,
    ghgReductionKg: 9.9,
    ghgReductionPct: 21,
    isEligible: true
  });

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-slate-900 pb-12 font-sans max-w-7xl mx-auto bg-transparent min-h-screen p-4 sm:p-6 rounded-3xl">
      
      {/* 1. HERO SECTION BANNER */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        <div className="space-y-4 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-700">
            <Building2 className="w-4 h-4 text-emerald-600" />
            {t('govIncentiveProgram', 'GOVERNMENT GREEN INCENTIVE PROGRAM')}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t('greenerFleetsTitle', 'Greener Fleets.')}<br />
            <span className="text-emerald-600">{t('strongerTomorrow', 'Stronger Tomorrow.')}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {t('govIncentivesSub', 'Fleets with high eco grades and verified emission reductions are eligible for government incentives, tax rebates, and official sustainability recognition.')}
          </p>

          {/* 4 PILL BUTTONS */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <Fuel className="w-3.5 h-3.5 text-emerald-600" /> {t('fuelSubsidyEligibility', 'Fuel Subsidy Eligibility')}
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <Coins className="w-3.5 h-3.5 text-emerald-600" /> {t('greenCredits', 'Green Credits')}
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t('greenFleetCert', 'Green Fleet Certification')}
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {t('higherReputation', 'Higher Reputation')}
            </span>
          </div>
        </div>

        {/* Right Side Truck Visual Graphic */}
        <div className="w-full lg:w-72 h-44 sm:h-52 rounded-[20px] overflow-hidden border border-slate-200 shadow-sm relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
            alt="Eco Commercial Cargo Truck"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3.5">
            <span className="text-white text-xs font-black tracking-wide flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" /> {t('cleanLogisticsStandard', 'Clean Logistics Standard')}
            </span>
          </div>
        </div>

      </div>

      {/* 2. MAIN LAYOUT GRID (LEFT 2/3, RIGHT 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* YOUR FLEET PERFORMANCE CARD */}
          <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('yourFleetPerf', 'Your Fleet Performance')}</h2>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-0.5">{t('latestTripsBasis', 'Based on the latest completed trips')}</p>
              </div>

              {fleetStats.isEligible && (
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('eligibleForIncentives', 'Eligible for Incentives')}
                </span>
              )}
            </div>

            {/* FIVE CLEAN PERFORMANCE CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              
              {/* CARD 1: ECO GRADE */}
              <div className="p-4 bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm rounded-[20px] space-y-2 text-center flex flex-col justify-between">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider block">{t('ecoGrade', 'Eco Grade')}</span>
                <div>
                  <span className="text-3xl font-black text-emerald-700 block tracking-tight">{fleetStats.ecoGrade}</span>
                  <span className="text-[11px] font-extrabold text-emerald-800 block mt-0.5">{t(fleetStats.ecoGradeLabel, fleetStats.ecoGradeLabel)}</span>
                </div>
              </div>

              {/* CARD 2: FLEET REPUTATION */}
              <div className="p-4 bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm rounded-[20px] space-y-2 text-center flex flex-col justify-between">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider block">{t('fleetReputation', 'Fleet Reputation')}</span>
                <div>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-2xl font-black text-slate-900 font-mono">{fleetStats.reputationScore}</span>
                    <span className="text-[10px] text-slate-800 font-black">/100</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800 block mt-0.5">{t(fleetStats.reputationLabel, fleetStats.reputationLabel)}</span>
                </div>
              </div>

              {/* CARD 3: FUEL SAVED */}
              <div className="p-4 bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm rounded-[20px] space-y-2 text-center flex flex-col justify-between">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider block">{t('fuelSavedVal', 'Fuel Saved')}</span>
                <div>
                  <span className="text-xl font-black text-slate-900 font-mono block">{fleetStats.fuelSavedLiters} L</span>
                  <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    ≈ {fleetStats.fuelSavedPct}% vs. normal
                  </span>
                </div>
              </div>

              {/* CARD 4: CO2 REDUCED */}
              <div className="p-4 bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm rounded-[20px] space-y-2 text-center flex flex-col justify-between">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider block">{t('co2Reduced', 'CO₂ Reduced')}</span>
                <div>
                  <span className="text-xl font-black text-slate-900 font-mono block">{fleetStats.co2ReducedKg} kg</span>
                  <span className="text-[10px] font-black text-teal-900 bg-teal-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    ≈ {fleetStats.co2ReducedPct}% vs. normal
                  </span>
                </div>
              </div>

              {/* CARD 5: GHG REDUCTION */}
              <div className="p-4 bg-white/80 backdrop-blur-[12px] border border-slate-200/80 shadow-sm rounded-[20px] space-y-2 text-center flex flex-col justify-between col-span-2 sm:col-span-1">
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider block">{t('ghgReduction', 'GHG Reduction')}</span>
                <div>
                  <span className="text-xl font-black text-slate-900 font-mono block">{fleetStats.ghgReductionKg} kg</span>
                  <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    ≈ {fleetStats.ghgReductionPct}% vs. normal
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* GOVERNMENT INCENTIVE BENEFITS SECTION */}
          <div className="p-6 sm:p-7 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('govBenefitsTitle', 'Government Incentive Benefits')}</h2>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                {t('govBenefitsSub', 'As your fleet maintains a high eco grade, you can avail the following benefits:')}
              </p>
            </div>

            {/* THREE EQUAL BENEFIT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* BENEFIT 1 */}
              <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                  <Fuel className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{t('fuelSubsidyEligibility', 'Fuel Subsidy Eligibility')}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {t('fuelSubsidyDesc', 'Reduced fuel cost based on verified eco performance.')}
                  </p>
                </div>
              </div>

              {/* BENEFIT 2 */}
              <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                  <Coins className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{t('greenCredits', 'Green Credits')}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {t('greenCreditsDesc', 'Earn government eco credits for your logistics business.')}
                  </p>
                </div>
              </div>

              {/* BENEFIT 3 */}
              <div className="p-5 rounded-[20px] bg-white/50 backdrop-blur-[12px] border border-white/30 rounded-[20px] space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{t('greenFleetCert', 'Green Fleet Certification')}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                    {t('greenFleetCertDesc', 'Official recognition for sustainable logistics operations.')}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (SLIM ECO GRADE TIERS & TOGETHER FOR GREENER FUTURE) */}
        <div className="space-y-6">
          
          {/* ECO GRADE TIERS CARD */}
          <div className="p-6 rounded-[24px] bg-white/60 backdrop-blur-[12px] border border-white/20 shadow-xl shadow-slate-900/5 rounded-[28px] space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {t('ecoTiersTitle', 'Eco Grade Tiers & Benefits')}
            </h3>

            <div className="space-y-3">
              
              {/* TIER A+ */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  A+
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
                    {t('maxBenefits', 'Maximum Benefits')} <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium leading-tight">
                    {t('maxBenefitsDesc', 'Highest fuel subsidy consideration + Green Fleet Certificate')}
                  </p>
                </div>
              </div>

              {/* TIER A */}
              <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  A
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-teal-950">{t('fuelRebateEcoCredits', 'Fuel Rebate + Eco Credits')}</div>
                  <p className="text-[11px] text-teal-800 font-medium leading-tight">
                    {t('sigIncentives', 'Significant incentives')}
                  </p>
                </div>
              </div>

              {/* TIER B */}
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  B
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-blue-950">{t('smallIncentive', 'Small Incentive')}</div>
                  <p className="text-[11px] text-blue-800 font-medium leading-tight">
                    {t('limitedBenefits', 'Limited benefits')}
                  </p>
                </div>
              </div>

              {/* TIER C */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  C
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-amber-950">{t('improvementPlan', 'Improvement Plan')}</div>
                  <p className="text-[11px] text-amber-800 font-medium leading-tight">
                    {t('guidanceSupport', 'Guidance & support')}
                  </p>
                </div>
              </div>

              {/* TIER D */}
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                  D
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-rose-950">{t('noIncentive', 'No Incentive')}</div>
                  <p className="text-[11px] text-rose-800 font-medium leading-tight">
                    {t('focusImprovement', 'Focus on improvement')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* TOGETHER FOR A GREENER FUTURE CARD */}
          <div className="p-5 rounded-[24px] bg-emerald-50/90 border border-emerald-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-black text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>{t('togetherGreenerFuture', 'Together for a Greener Future')}</span>
            </div>
            <p className="text-emerald-800 leading-relaxed font-medium">
              {t('togetherGreenerSub', 'Your cleaner operations not only reduce emissions but also create real value for your fleet and the planet.')}
            </p>
          </div>

          {/* FULL-WIDTH GREEN DOWNLOAD REPORT BUTTON */}
          <button
            onClick={handleDownloadReport}
            className="w-full py-4 px-6 rounded-[20px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 group"
          >
            <Download className="w-5 h-5 text-white group-hover:translate-y-0.5 transition-transform" />
            <span>{t('downloadGovReport', 'Download Government Report')}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
