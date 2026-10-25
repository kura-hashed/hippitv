import React from 'react';
import { X, ShieldCheck, Brain, AlertTriangle, CheckCircle, Clock, HeartHandshake } from 'lucide-react';
import { HEALTHY_TIPS } from '../data/healthyTips';

export default function HealthyGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
              Parent Handbook
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Healthy Screen-Time & Gentle English
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
            How to avoid digital overstimulation while giving your child a rich English environment.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Core Principles Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HEALTHY_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center gap-2 font-black text-slate-800 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs font-bold text-emerald-800">
                  {tip.summary}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {tip.details}
                </p>
              </div>
            ))}
          </div>

          {/* Low-Stim vs High-Stim Comparison Box */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 p-3 font-black text-xs text-slate-700 uppercase tracking-wider text-center">
              Quick Comparison: Why Pacing Matters
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs">
              
              {/* Healthy Gentle */}
              <div className="p-4 bg-emerald-50/50 space-y-2">
                <span className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Healthy / Low-Stimulation
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• Scene cuts: 4 to 8+ seconds per angle</li>
                  <li>• Human faces with clear mouth movements</li>
                  <li>• Natural acoustic instruments & gentle vocals</li>
                  <li>• Prompts child to speak and wait 3-5 seconds</li>
                  <li>• Child turns off screen smoothly without meltdown</li>
                </ul>
              </div>

              {/* Overstimulating */}
              <div className="p-4 bg-rose-50/50 space-y-2">
                <span className="font-extrabold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Overstimulating / Frenetic
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• Fast scene cuts (under 2 seconds)</li>
                  <li>• Hyper-saturated flashing neon visuals</li>
                  <li>• Constant synthesized upbeat sound effects</li>
                  <li>• Passive hypnotic stare / trance-like state</li>
                  <li>• Frantic crying or screaming when screen turns off</li>
                </ul>
              </div>

            </div>
          </div>

          {/* AAP Recommended Limits Table */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
            <span className="font-black text-xs text-amber-950 uppercase tracking-wider block">
              Official AAP & WHO Screen Limits by Age:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] text-slate-400 font-bold block">0 - 18 Mo</span>
                <span className="font-black text-amber-900 block mt-0.5">0 Screen Time</span>
                <span className="text-[10px] text-slate-500">(FaceTime OK)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] text-slate-400 font-bold block">Age 2</span>
                <span className="font-black text-amber-900 block mt-0.5">Max 20 mins</span>
                <span className="text-[10px] text-slate-500">Must co-watch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] text-slate-400 font-bold block">Age 3</span>
                <span className="font-black text-amber-900 block mt-0.5">Max 30 mins</span>
                <span className="text-[10px] text-slate-500">Gentle shows</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                <span className="text-[10px] text-slate-400 font-bold block">Age 4-5</span>
                <span className="font-black text-amber-900 block mt-0.5">Max 45-60 mins</span>
                <span className="text-[10px] text-slate-500">Phonics & apps</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors cursor-pointer"
          >
            I understand
          </button>
        </div>

      </div>

    </div>
  );
}
