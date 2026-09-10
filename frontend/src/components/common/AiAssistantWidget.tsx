import React, { useState, useRef, useEffect } from 'react';
import { aiChatService, ChatMessage } from '../../services/aiChatService';
import { Bot, Send, X, Sparkles, Key, Check, HelpCircle, MessageSquare } from 'lucide-react';

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState(aiChatService.getApiKey());
  const [savedKeySuccess, setSavedKeySuccess] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '👋 Hi! I am your GreenFleet AI Assistant. Ask me anything about fuel savings, weather impact, or route options!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    aiChatService.setApiKey(apiKey);
    setSavedKeySuccess(true);
    setTimeout(() => {
      setSavedKeySuccess(false);
      setShowKeyInput(false);
    }, 1500);
  };

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const reply = await aiChatService.sendMessage(prompt, messages);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-2xl transition-all transform hover:scale-105 border-2 border-emerald-400 group"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <span>Ask GreenFleet AI 💬</span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1">
                  <span>GreenFleet AI Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[10px] text-emerald-100 font-medium">Powered by OpenAI & GreenFleet Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-emerald-100"
                title="Configure OpenAI API Key"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Optional API Key Input Overlay */}
          {showKeyInput && (
            <form onSubmit={handleSaveKey} className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>OpenAI API Key (Optional)</span>
                <span className="text-[10px] text-slate-500 font-normal">Stored locally</span>
              </div>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono focus:border-emerald-500 text-xs"
              />
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 font-medium">
                  {apiKey ? 'Custom OpenAI key active.' : 'Default GreenFleet AI rules enabled.'}
                </p>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                >
                  {savedKeySuccess ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : 'Save Key'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold text-slate-700">
            <button
              onClick={() => handleSend('How can I save fuel on my truck trip?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 shrink-0 shadow-sm"
            >
              💡 Save Fuel Tips
            </button>
            <button
              onClick={() => handleSend('How does rain or wind affect my fuel consumption?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-teal-50 hover:border-teal-300 shrink-0 shadow-sm"
            >
              🌦️ Weather Impact
            </button>
            <button
              onClick={() => handleSend('Compare Diesel vs LNG costs')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-300 shrink-0 shadow-sm"
            >
              ⛽ Fuel Comparison
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200 font-medium whitespace-pre-wrap leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                <Bot className="w-4 h-4 animate-spin text-emerald-600" />
                <span>GreenFleet AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about weather, routes, or fuel..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:border-emerald-500 text-xs font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors disabled:opacity-50 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
