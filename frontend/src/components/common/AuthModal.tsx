import React, { useState, useEffect } from 'react';
import {
  X, Search, Volume2, User, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin, Globe,
  Mail, Phone, Lock, UserPlus, LogIn, Leaf
} from 'lucide-react';
import { useLanguage, SupportedLanguage } from '../../context/LanguageContext';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  language: string;
  state?: string;
  district?: string;
  town?: string;
  vehicleType?: string;
  fleetSize?: string;
  signedInAt: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
  initialStep?: 'language' | 'signin' | 'signup';
}

const LANGUAGES = [
  { code: 'EN', name: 'English', native: 'English', icon: '🌐' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', icon: '🇮🇳' },
  { code: 'TE', name: 'Telugu', native: 'తెలుగు', icon: '🌾' },
  { code: 'TA', name: 'Tamil', native: 'தமிழ்', icon: '🇮🇳' },
  { code: 'KN', name: 'Kannada', native: 'ಕನ್ನಡ', icon: '🇮🇳' },
  { code: 'ML', name: 'Malayalam', native: 'മലയാളം', icon: '🇮🇳' },
  { code: 'GU', name: 'Gujarati', native: 'ગુજરાતી', icon: '🇮🇳' },
  { code: 'MR', name: 'Marathi', native: 'मराठी', icon: '🇮🇳' },
  { code: 'BN', name: 'Bengali', native: 'বাংলা', icon: '🇮🇳' },
  { code: 'PA', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', icon: '🇮🇳' },
  { code: 'OR', name: 'Odia', native: 'ଓଡ଼ିଆ', icon: '🇮🇳' },
  { code: 'AS', name: 'Assamese', native: 'অসমীয়া', icon: '🇮🇳' },
];

const FLEET_ROLES = [
  'Fleet Manager (Live Corridors & QAOA Optimizer)',
  'Fleet Owner / Logistics Operator',
  'Commercial Heavy Vehicle Driver',
  'Green Sustainability Auditor',
  'Government Incentive Coordinator'
];

const PRE_REGISTERED_USERS: UserProfile[] = [
  {
    id: 'usr_1',
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@greenfleet.io',
    mobile: '+91 98765-43210',
    role: 'Fleet Manager (Live Corridors & QAOA Optimizer)',
    language: 'English',
    state: 'Andhra Pradesh',
    vehicleType: 'Heavy Diesel Truck',
    signedInAt: new Date().toISOString()
  },
  {
    id: 'usr_2',
    fullName: 'Sunil Sharma',
    email: 'sunil.sharma@greenfleet.io',
    mobile: '+91 98123-45678',
    role: 'Fleet Owner / Logistics Operator',
    language: 'Gujarati',
    state: 'Gujarat',
    vehicleType: 'Electric Delivery Van',
    signedInAt: new Date().toISOString()
  },
  {
    id: 'usr_3',
    fullName: 'Priya Verma',
    email: 'priya.verma@greenfleet.io',
    mobile: '+91 99887-76655',
    role: 'Green Sustainability Auditor',
    language: 'Hindi',
    state: 'Maharashtra',
    vehicleType: 'CNG Freight Carrier',
    signedInAt: new Date().toISOString()
  }
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialStep = 'language'
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  
  // Navigation Flow State: 'language' -> 'auth'
  const [step, setStep] = useState<'language' | 'auth'>(
    initialStep === 'signin' || initialStep === 'signup' ? 'auth' : 'language'
  );
  const [authTab, setAuthTab] = useState<'signup' | 'signin'>(
    initialStep === 'signin' ? 'signin' : 'signup'
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentLanguage);
  const [searchLang, setSearchLang] = useState('');

  // Create Account Form State
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@greenfleet.io');
  const [mobile, setMobile] = useState('+91 98765-43210');
  const [role, setRole] = useState(FLEET_ROLES[0]);
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');

  // Sign In Form State
  const [signinEmail, setSigninEmail] = useState('alex.rivera@greenfleet.io');
  const [signinPassword, setSigninPassword] = useState('password123');
  const [selectedPreUserId, setSelectedPreUserId] = useState(PRE_REGISTERED_USERS[0].id);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
    if (isOpen) {
      if (initialStep === 'signup') {
        setStep('auth');
        setAuthTab('signup');
      } else if (initialStep === 'signin') {
        setStep('auth');
        setAuthTab('signin');
      } else {
        setStep('language');
      }
      setErrorMessage(null);
    }
  }, [currentLanguage, isOpen, initialStep]);

  if (!isOpen) return null;

  // Speak out language name
  const speakLanguage = (name: string, native: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${name}, ${native}`);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectLanguage = (langName: string, nativeName: string) => {
    setSelectedLanguage(langName);
    setLanguage(langName as SupportedLanguage);
    speakLanguage(langName, nativeName);
  };

  // Create Account Submit
  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      return;
    }

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      mobile,
      role,
      language: selectedLanguage,
      signedInAt: new Date().toISOString()
    };

    setLanguage(selectedLanguage as SupportedLanguage);
    localStorage.setItem('GREENFLEET_USER_PROFILE', JSON.stringify(newProfile));
    onSuccess(newProfile);
  };

  // Sign In Submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signinEmail.trim()) {
      setErrorMessage('Please enter your email or mobile phone.');
      return;
    }

    // Match pre-registered user or create user session
    const existing = PRE_REGISTERED_USERS.find(u => u.id === selectedPreUserId) || {
      id: `usr_${Date.now()}`,
      fullName: signinEmail.split('@')[0] || 'Fleet Operator',
      email: signinEmail,
      mobile: '+91 98765-43210',
      role: FLEET_ROLES[0],
      language: selectedLanguage,
      signedInAt: new Date().toISOString()
    };

    const signedInProfile: UserProfile = {
      ...existing,
      language: selectedLanguage,
      signedInAt: new Date().toISOString()
    };

    setLanguage(selectedLanguage as SupportedLanguage);
    localStorage.setItem('GREENFLEET_USER_PROFILE', JSON.stringify(signedInProfile));
    onSuccess(signedInProfile);
  };

  const filteredLanguages = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(searchLang.toLowerCase()) ||
    l.native.toLowerCase().includes(searchLang.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-[28px] bg-slate-50 border border-slate-200/90 shadow-2xl p-6 sm:p-8 text-slate-900 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white transition-all shadow-sm"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: CHOOSE LANGUAGE FIRST */}
        {step === 'language' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                <Leaf className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-900">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>STEP 1 OF 2 • LANGUAGE SELECTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('chooseLanguage', 'Choose Your Language')}
              </h2>
              <p className="text-xs text-slate-600 font-bold max-w-md mx-auto">
                {t('chooseLangSub', 'Select your preferred language for GreenFleet UI, Voice Directives, and AI Reports.')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search language..."
                value={searchLang}
                onChange={(e) => setSearchLang(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:border-emerald-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Language Selection Grid (12 Languages) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
              {filteredLanguages.map((lang) => {
                const isSelected = selectedLanguage === lang.name;
                return (
                  <div
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.name, lang.native)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                      isSelected
                        ? 'bg-emerald-100 border-2 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-800 uppercase">
                        <span>{lang.icon}</span>
                        <span>{lang.code}</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900">{lang.native}</h4>
                      <p className="text-[10px] text-slate-600 font-bold">{lang.name}</p>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakLanguage(lang.name, lang.native);
                        }}
                        className="p-1 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 transition-colors"
                        title="Pronunciation audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Step Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('auth');
                  setAuthTab('signup');
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create New Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('auth');
                  setAuthTab('signin');
                }}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <LogIn className="w-4 h-4 text-emerald-700" />
                <span>Sign In Existing User</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CREATE ACCOUNT & SIGN IN (MATCHING USER MOCKUP!) */}
        {step === 'auth' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header Brand Badge */}
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                <Leaf className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-3xl font-black text-emerald-950 tracking-tight flex items-center justify-center gap-1">
                <span>GreenFleet</span>
              </h2>
              <p className="text-xs text-slate-600 font-bold">Clean & Green Fleet Optimization</p>
            </div>

            {/* Tab Switcher Pills */}
            <div className="p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 grid grid-cols-2 gap-1 text-xs font-black">
              <button
                type="button"
                onClick={() => setAuthTab('signup')}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authTab === 'signup'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthTab('signin')}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authTab === 'signin'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold text-center">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* TAB 1: CREATE ACCOUNT FORM */}
            {authTab === 'signup' && (
              <form onSubmit={handleCreateAccountSubmit} className="space-y-4 text-xs font-bold">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex.rivera@greenfleet.io"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Mobile Phone (for OTP Verification & SMS Directives)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +91 98765-43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Fleet Operational Role */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Fleet Operational Role</label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs cursor-pointer appearance-none"
                    >
                      {FLEET_ROLES.map((r, idx) => (
                        <option key={idx} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password & Confirm Password Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Create Account Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 mt-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account & Enter Fleet</span>
                </button>

                {/* Switch to Sign In link */}
                <div className="text-center pt-2 text-slate-600 font-bold text-xs">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setAuthTab('signin')}
                    className="text-emerald-700 hover:text-emerald-800 font-black hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: SIGN IN FORM */}
            {authTab === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs font-bold">
                {/* Email Address / Phone */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Email Address or Mobile Phone</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                      placeholder="e.g. alex.rivera@greenfleet.io"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-slate-700 uppercase tracking-wider block text-[11px]">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-extrabold focus:border-emerald-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Quick Pre-Registered Demo Account Picker */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="text-slate-600 text-[10px] font-bold block uppercase">Quick Sign-In Demo Profile</span>
                  <select
                    value={selectedPreUserId}
                    onChange={(e) => {
                      setSelectedPreUserId(e.target.value);
                      const u = PRE_REGISTERED_USERS.find(user => user.id === e.target.value);
                      if (u) {
                        setSigninEmail(u.email);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-extrabold text-xs focus:border-emerald-600 focus:outline-none shadow-xs"
                  >
                    {PRE_REGISTERED_USERS.map((u) => (
                      <option key={u.id} value={u.id}>
                        👤 {u.fullName} ({u.role.split(' ')[0]}) • {u.state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sign In Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In & Access Fleet</span>
                </button>

                {/* Switch to Create Account link */}
                <div className="text-center pt-2 text-slate-600 font-bold text-xs">
                  <span>Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setAuthTab('signup')}
                    className="text-emerald-700 hover:text-emerald-800 font-black hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}

            {/* Back to Language Step Button */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setStep('language')}
                className="text-xs font-extrabold text-slate-600 hover:text-emerald-800 flex items-center justify-center gap-1 mx-auto"
              >
                <span>← Change Language (Active: {selectedLanguage})</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
