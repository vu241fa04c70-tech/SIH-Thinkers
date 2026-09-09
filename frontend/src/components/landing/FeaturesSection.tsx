import React from 'react';
import { Calculator, HelpCircle, Leaf, MapPin, Map, DollarSign } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "1. Trip Fuel Estimator",
      description: "Know exactly how many liters of fuel or battery charge your trip will need before starting.",
      icon: Calculator,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      title: "2. Why You Save Money",
      description: "Get plain English explanations like: 'Taking Highway 4 saves 5 liters because traffic is light.'",
      icon: HelpCircle,
      color: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      title: "3. Clean Air Badge",
      description: "See how much harmful black smoke and carbon emissions your vehicles reduced.",
      icon: Leaf,
      color: "text-teal-700 bg-teal-50 border-teal-200"
    },
    {
      title: "4. Smart Route Finder",
      description: "Automatically picks the shortest, smoothest route that avoids heavy traffic jams.",
      icon: MapPin,
      color: "text-purple-700 bg-purple-50 border-purple-200"
    },
    {
      title: "5. Easy Map View",
      description: "Clear map view with simple green lines showing your drivers exactly where to drive.",
      icon: Map,
      color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      title: "6. Monthly Money Saved",
      description: "Simple total charts showing exact dollars saved on fuel bills at the end of every month.",
      icon: DollarSign,
      color: "text-cyan-700 bg-cyan-50 border-cyan-200"
    }
  ];

  return (
    <div className="py-8 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
          Simple Features
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Designed So Anyone Can Understand & Use
        </h2>
        <p className="text-sm text-slate-600 font-medium">
          No complex jargon or mathematical formulas. Just simple tools to save fuel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-lg transition-all space-y-3"
            >
              <div className={`p-3 rounded-xl w-fit ${feat.color} border shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
