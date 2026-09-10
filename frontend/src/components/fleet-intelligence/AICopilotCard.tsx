import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Send, 
  Cpu, 
  CornerDownLeft, 
  Flame, 
  Lightbulb,
  Zap,
  TrendingDown,
  Clock
} from 'lucide-react';
import { CopilotRecommendation, ChatMessage, FleetVehicle } from './dummyData';

interface AICopilotCardProps {
  recommendations: CopilotRecommendation[];
  onApplyRecommendation: (id: string) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const AICopilotCard: React.FC<AICopilotCardProps> = ({
  recommendations,
  onApplyRecommendation,
  chatMessages,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const promptChips = [
    '🚦 Reroute AP 07 TA 1155',
    '⚡ Dispatch AP 16 TH 3314',
    '🌱 Compare Original vs Green Route',
    '🔋 Mangalagiri EV Charging'
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (chip: string) => {
    onSendMessage(chip.replace(/^[^\w]+/, ''));
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-indigo-900/40 p-5 shadow-2xl shadow-indigo-950/40 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">AI Fleet Copilot</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-950/80 border border-purple-700/50 text-purple-300">
                v4.2 Neural
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous multi-objective route & carbon agent</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[10px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </div>
      </div>

      {/* Proactive Recommendations Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Autonomous Actions
          </span>
          <span className="text-[11px] text-purple-400 font-mono">
            {recommendations.filter(r => !r.applied).length} pending
          </span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-3 rounded-2xl border transition-all ${
                rec.applied
                  ? 'bg-emerald-950/20 border-emerald-900/40 opacity-75'
                  : 'bg-slate-950/80 border-slate-800/80 hover:border-indigo-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  rec.applied
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                }`}>
                  {rec.applied ? 'Applied' : rec.badge}
                </span>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" /> {rec.carbon_savings}
                  </span>
                  <span className="text-cyan-400 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {rec.time_savings}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-white mt-1.5">{rec.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{rec.description}</p>

              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Target: {rec.targetVehicleId}</span>
                <button
                  disabled={rec.applied}
                  onClick={() => onApplyRecommendation(rec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    rec.applied
                      ? 'bg-emerald-900/40 text-emerald-300 cursor-default'
                      : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {rec.applied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Optimized</span>
                    </>
                  ) : (
                    <>
                      <span>{rec.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
          Suggested Copilot Queries
        </div>
        <div className="flex flex-wrap gap-1.5">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="px-2.5 py-1 rounded-xl bg-slate-950/70 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-white transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Copilot Dialogue Stream */}
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'ai'
                ? 'bg-slate-950/90 border border-indigo-900/30 text-slate-200'
                : 'bg-blue-600/20 border border-blue-500/40 text-cyan-200 ml-6'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span className="font-semibold text-slate-400">
                {msg.sender === 'ai' ? '🤖 GreenFleet Copilot' : '👤 Dispatcher'}
              </span>
              <span>{msg.timestamp}</span>
            </div>
            <p>{msg.text}</p>

            {msg.metrics && msg.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-slate-800 text-center">
                {msg.metrics.map((m, i) => (
                  <div key={i} className="p-1 rounded-lg bg-slate-900">
                    <span className="text-[9px] text-slate-400 block">{m.label}</span>
                    <span className="text-[10px] font-bold text-cyan-300 font-mono">{m.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative pt-1">
        <input
          type="text"
          placeholder="Ask Copilot (e.g., 'Predict weather delay impact')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full pl-3.5 pr-10 py-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
