import React from 'react';

export const StatisticsSection: React.FC = () => {
  const stats = [
    { value: "20%", label: "Less Fuel Consumption", subtext: "On Every Smart Trip", color: "text-emerald-700" },
    { value: "₹1,00,000+", label: "Saved Monthly per Fleet", subtext: "Direct Cash Savings", color: "text-teal-700" },
    { value: "500 Trees", label: "Clean Air Equivalent", subtext: "Smoke Emissions Saved", color: "text-amber-700" },
    { value: "< 1 Sec", label: "Instant Route Answer", subtext: "Fast & Super Easy", color: "text-purple-700" }
  ];

  return (
    <div className="py-8 px-6 sm:px-8 rounded-3xl bg-white border border-slate-200 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, idx) => (
          <div key={idx} className="space-y-2 text-center sm:text-left">
            <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${s.color}`}>
              {s.value}
            </div>
            <div className="text-sm font-bold text-slate-900">{s.label}</div>
            <div className="text-xs text-slate-500 font-medium">{s.subtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
