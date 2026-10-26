import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function GoogleAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [selectedAccount, setSelectedAccount] = useState('parent');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  if (!isOpen) return null;

  // Preset quick Google accounts for one-click instant testing
  const presetAccounts = [
    {
      id: 'parent',
      name: 'Loi Bui',
      email: 'loibui.dev@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Family Admin'
    },
    {
      id: 'mom',
      name: 'Sarah (Baby’s Mom)',
      email: 'sarah.mom@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Parent Mode'
    }
  ];

  const handleSelectPreset = (acc) => {
    onLoginSuccess({
      name: acc.name,
      email: acc.email,
      avatar: acc.avatar,
      googleId: `google-${acc.id}`,
      loginMethod: 'google'
    });
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    onLoginSuccess({
      name: customName.trim(),
      email: customEmail.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customName.trim())}&background=f59e0b&color=0b0f19&bold=true`,
      googleId: `google-custom-${Date.now()}`,
      loginMethod: 'google'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google 4-color SVG Logo */}
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Sign in with Google</h3>
              <p className="text-xs text-slate-400">Sync watch history & progress across devices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          
          <div className="text-xs text-slate-300 font-medium">
            Choose an account to continue to <span className="font-bold text-amber-400">HippiTV</span>:
          </div>

          {/* Preset Google Accounts */}
          <div className="space-y-2.5">
            {presetAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => handleSelectPreset(acc)}
                className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 transition-all flex items-center justify-between group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                      {acc.name}
                    </h4>
                    <p className="text-xs text-slate-400">{acc.email}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                  Sign In ➔
                </span>
              </button>
            ))}
          </div>

          {/* Custom Google Account Option */}
          {!showCustom ? (
            <button
              onClick={() => setShowCustom(true)}
              className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer text-center border-t border-white/10 pt-4"
            >
              + Use another Google account
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3 border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-slate-300 block">
                Enter your Google Account details:
              </span>
              <input
                type="text"
                placeholder="Your Full Name (e.g. Papa John)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
              <input
                type="email"
                placeholder="your.email@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCustom(false)}
                  className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-300 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-xs font-black text-slate-950 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Privacy & Security Footnote */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              HippiTV saves your child’s watch history and progress securely in your browser so you can resume videos anytime without losing your place.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
