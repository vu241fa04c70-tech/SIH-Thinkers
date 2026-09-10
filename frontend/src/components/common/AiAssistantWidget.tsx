import React, { useState, useRef, useEffect } from 'react';
import { aiChatService, ChatMessage } from '../../services/aiChatService';
import { Bot, Send, X, Sparkles, Key, Check, Mic, MicOff, Volume2, VolumeX, Radio, Navigation, Sparkle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AiAssistantWidgetProps {
  onNavigate?: (tab: string) => void;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ onNavigate }) => {
  const { currentLanguage, speechCode, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState(aiChatService.getApiKey());
  const [savedKeySuccess, setSavedKeySuccess] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Voice Assistant State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoReadAloud, setAutoReadAloud] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '🎙️ **Voice Assistant Active!** Ask me anything verbally or type your request. Try saying *"Go to Best Route"* or *"How can I save fuel?"*',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API & Event Listeners
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check Speech Recognition Browser Support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechCode; // Use active language speech code

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice('🎙️ Listening... Speak your prompt now!');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceNotice('⚠️ Microphone access denied. Please allow microphone access in browser settings.');
        } else {
          setVoiceNotice(`⚠️ Mic notice: ${event.error}`);
        }
        setTimeout(() => setVoiceNotice(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice(null);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition init error:', err);
      setSpeechSupported(false);
    }
  }, []);

  // Listen for global open event from Header or other dashboard buttons
  useEffect(() => {
    const handleGlobalVoiceOpen = (e: any) => {
      setIsOpen(true);
      if (e.detail?.startListening && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.warn('Recognition already running');
        }
      }
    };

    window.addEventListener('greenfleet:open-voice-assistant', handleGlobalVoiceOpen as EventListener);
    return () => window.removeEventListener('greenfleet:open-voice-assistant', handleGlobalVoiceOpen as EventListener);
  }, []);

  // Speech-to-Text (Start / Stop Mic)
  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInput('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Error starting speech recognition:', err);
      }
    }
  };

  // Text-to-Speech (Read Aloud)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    // Clean markdown symbols for natural speech
    const cleanText = text.replace(/[*_#`~•]/g, '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Voice Navigation Command Router
  const checkVoiceNavigationCommands = (prompt: string): string | null => {
    const lower = prompt.toLowerCase();
    
    if (lower.includes('best route') || lower.includes('optimize route') || lower.includes('route optimization') || lower.includes('find route')) {
      if (onNavigate) onNavigate('optimization');
      return '🧭 Navigating you directly to the **Best Route Optimizer** page!';
    }
    if (lower.includes('plan a trip') || lower.includes('trip planner') || lower.includes('plan trip') || lower.includes('predict fuel')) {
      if (onNavigate) onNavigate('predictions');
      return '📍 Navigating you to the **Plan a Trip & Fuel Predictor** page!';
    }
    if (lower.includes('my vehicles') || lower.includes('fleet list') || lower.includes('vehicle list') || lower.includes('fleet management')) {
      if (onNavigate) onNavigate('predictions');
      return '🚚 Directing you to **Plan a Trip & Predictions**!';
    }
    if (lower.includes('savings') || lower.includes('analytics') || lower.includes('report')) {
      if (onNavigate) onNavigate('analytics');
      return '💰 Opening **My Savings & Performance Analytics** report!';
    }
    if (lower.includes('home') || lower.includes('landing')) {
      if (onNavigate) onNavigate('landing');
      return '🏠 Navigating to **GreenFleet Home Dashboard**!';
    }
    if (lower.includes('about')) {
      if (onNavigate) onNavigate('about');
      return 'ℹ️ Opening **About GreenFleet** page!';
    }
    return null;
  };

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

    // Stop active mic if listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    // 1. Check Voice Navigation Command Shortcuts
    const navResponse = checkVoiceNavigationCommands(prompt);
    if (navResponse) {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: navResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      if (autoReadAloud) speakText(navResponse);
      return;
    }

    // 2. Fetch AI Response
    try {
      const reply = await aiChatService.sendMessage(prompt, messages);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Read aloud if voice output is enabled
      if (autoReadAloud) {
        speakText(reply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-2xl transition-all transform hover:scale-105 border-2 border-emerald-400 group"
          title="Open GreenFleet Voice & Chat Assistant"
        >
          <div className="relative flex items-center">
            <Mic className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
          </div>
          <span className="flex items-center gap-1">
            <span>{t('voiceAssistant')}</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-[10px] font-mono text-amber-200">
              🎙️ ON
            </span>
          </span>
        </button>
      )}

      {/* Expanded Voice Assistant Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[560px] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900 animate-in fade-in slide-in-from-bottom-4">
          {/* Top Bar Header */}
          <div className="p-4 bg-emerald-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 relative">
                <Bot className="w-5 h-5 text-white" />
                {isListening && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping" />
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Voice & AI Assistant</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </h3>
                <p className="text-[10px] text-emerald-100 font-bold flex items-center gap-1">
                  <span>🎙️ Hands-Free Speech Navigation</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Toggle Auto Speech Readout */}
              <button
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setAutoReadAloud(!autoReadAloud);
                }}
                className={`p-1.5 rounded-lg transition-colors text-xs font-bold flex items-center gap-1 ${
                  autoReadAloud ? 'bg-emerald-800 text-amber-300 border border-emerald-500' : 'bg-emerald-900/40 text-emerald-200'
                }`}
                title={autoReadAloud ? 'Voice Output ON (Click to Mute)' : 'Voice Output OFF (Click to Enable)'}
              >
                {autoReadAloud ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-emerald-100"
                title="Configure API Key"
              >
                <Key className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  stopSpeaking();
                  if (isListening && recognitionRef.current) recognitionRef.current.stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Voice Status & Live Mic Recording Overlay */}
          {isListening && (
            <div className="p-3 bg-red-600 text-white text-xs font-bold flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-white animate-spin" />
                <span>🎙️ Listening to your voice... Speak now!</span>
              </div>
              <button
                onClick={toggleListening}
                className="px-2 py-0.5 rounded bg-white text-red-700 text-[10px] font-black uppercase"
              >
                Stop Mic
              </button>
            </div>
          )}

          {/* Active Speaking Indicator Bar */}
          {isSpeaking && (
            <div className="p-2.5 bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 animate-bounce text-slate-950" />
                <span>🔊 Voice Assistant is speaking aloud...</span>
              </div>
              <button
                onClick={stopSpeaking}
                className="px-2.5 py-0.5 rounded bg-slate-900 text-amber-300 text-[10px] font-bold"
              >
                Stop Speech
              </button>
            </div>
          )}

          {/* Optional Voice Notice */}
          {voiceNotice && !isListening && (
            <div className="px-3 py-1.5 bg-amber-50 border-b border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-2">
              <span>{voiceNotice}</span>
            </div>
          )}

          {/* API Key Configuration Form */}
          {showKeyInput && (
            <form onSubmit={handleSaveKey} className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>OpenAI API Key (Optional)</span>
                <span className="text-[10px] text-slate-700 font-normal">Stored locally</span>
              </div>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono focus:border-emerald-500 text-xs"
              />
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-700 font-medium">
                  {apiKey ? 'Custom OpenAI key active.' : 'Default GreenFleet Voice Engine active.'}
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

          {/* Preset Voice Quick Command Chips */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] font-extrabold text-slate-700">
            <button
              onClick={() => handleSend('Go to Best Route')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 shrink-0 shadow-sm flex items-center gap-1 text-emerald-700"
            >
              <Navigation className="w-3 h-3" /> 🧭 Go to Best Route
            </button>
            <button
              onClick={() => handleSend('How can I save 20% fuel on my truck?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-teal-50 hover:border-teal-300 shrink-0 shadow-sm"
            >
              💡 Save 20% Fuel
            </button>
            <button
              onClick={() => handleSend('What is today diesel price in Maharashtra?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-300 shrink-0 shadow-sm"
            >
              ⛽ State Fuel Tariffs
            </button>
            <button
              onClick={() => handleSend('Show my vehicles')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:bg-cyan-50 hover:border-cyan-300 shrink-0 shadow-sm text-cyan-700"
            >
              🚚 My Vehicles
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl relative ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200 font-medium whitespace-pre-wrap leading-relaxed'
                  }`}
                >
                  {msg.text}

                  {/* Read Aloud Button for AI Messages */}
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="mt-2 text-[10px] font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                      title="Read out message aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Read Aloud 🔊
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-700 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-700 text-xs italic p-2">
                <Bot className="w-4 h-4 animate-spin text-emerald-600" />
                <span>GreenFleet Voice Engine is processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar with Voice Mic Button */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Speech Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-red-600 text-white border-red-500 animate-bounce shadow-md'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}
                title={isListening ? 'Click to Stop Listening' : 'Click to Speak (Speech-to-Text)'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                placeholder={isListening ? 'Listening to your voice...' : 'Type or speak your request...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-xs font-medium focus:border-emerald-500 ${
                  isListening ? 'border-red-400 bg-red-50/40 font-bold' : 'border-slate-300'
                }`}
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

