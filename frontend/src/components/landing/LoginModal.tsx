import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('operator@greenfleet.ai');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState('operator');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-700 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Truck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">{t('loginTitle', 'Login to GreenFleet AI')}</h3>
          <p className="text-xs text-slate-700">{t('accessQuBO', 'Access Quantum QUBO Optimizer & Fleet Analytics')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">{t('selectRoleLabel', 'Select Role')}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'operator', label: t('fleetOperatorRole', 'Fleet Operator') },
                { id: 'manager', label: t('logisticsMgrRole', 'Logistics Mgr') },
                { id: 'analyst', label: t('ecoAnalystRole', 'Eco Analyst') }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all ${
                    role === r.id
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-700 hover:text-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">{t('workEmail', 'Work Email')}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-700 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">{t('passwordLabel', 'Password')}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-700 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
          >
            <span>{t('signInCmdCenter', 'Sign In to Command Center')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-700 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t('secureSso', 'Secure Enterprise Single Sign-On (SSO)')}
        </div>
      </div>
    </div>
  );
};
