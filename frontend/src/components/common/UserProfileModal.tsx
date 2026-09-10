import React from 'react';
import { UserProfile } from './AuthModal';
import { X, User, MapPin, Truck, Globe, LogOut, RefreshCw, ShieldCheck, Sparkles, Building2, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSwitchAccount: () => void;
  onChangeLanguage: () => void;
  onSignOut: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSwitchAccount,
  onChangeLanguage,
  onSignOut
}) => {
  const { t } = useLanguage();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-700 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Avatar & Info */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-700/20 border-2 border-emerald-500 shrink-0">
            {user.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">{user.fullName}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[10px]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{user.district}, {user.state}</span>
            </p>
          </div>
        </div>

        {/* Fleet Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> {t('vehicleType')}
            </span>
            <span className="font-extrabold text-slate-900 block text-sm">{user.vehicleType}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-teal-600" /> {t('fleetSize')}
            </span>
            <span className="font-extrabold text-slate-900 block text-sm">{user.fleetSize}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-amber-600" /> {t('townHub')}
            </span>
            <span className="font-extrabold text-slate-900 block text-sm">{user.town || 'Main Hub'}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-cyan-600" /> {t('languageLabel')}
            </span>
            <span className="font-extrabold text-slate-900 block text-sm">{user.language}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onSwitchAccount();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>{t('switchAccountBtn')}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onChangeLanguage();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-teal-50 text-teal-800 border border-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{t('changeLangBtn')}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>{t('signOutBtn')}</span>
          </button>
        </div>

        {/* Platform Badge */}
        <div className="pt-2 text-center text-[11px] text-slate-700 font-bold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> GreenFleet Smart Logistics Verified Profile
        </div>
      </div>
    </div>
  );
};

