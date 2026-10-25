import React, { useState } from 'react';
import { X, Calendar, Sun, Moon, Sparkles, CheckCircle2, Clock, Share2 } from 'lucide-react';
import { DAILY_ROUTINE_PLANS } from '../data/healthyTips';

export default function RoutinePlannerModal({ initialAge = '2', onClose }) {
  const [selectedAge, setSelectedAge] = useState(initialAge === 'all' || !DAILY_ROUTINE_PLANS[initialAge] ? '2' : initialAge);
  const [completedSteps, setCompletedSteps] = useState({});

  const routines = DAILY_ROUTINE_PLANS[selectedAge] || DAILY_ROUTINE_PLANS['2'];

  const toggleCheck = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [`${selectedAge}-${idx}`]: !prev[`${selectedAge}-${idx}`]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-100">
              Parent Routine Assistant
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            Balanced Daily English Flow
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
            A healthy rhythm mixing songs, active tactile play, gentle media, and cozy bedtime stories.
          </p>

          {/* Age Switcher */}
          <div className="flex gap-2 pt-4">
            {['2', '3', '4'].map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedAge === age
                    ? 'bg-white text-amber-900 shadow-sm scale-102'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                Age {age} Routine
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Daily Rhythm Checklist (Click to complete)
          </div>

          <div className="space-y-3">
            {routines.map((routine, idx) => {
              const isChecked = !!completedSteps[`${selectedAge}-${idx}`];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                  }`}
                >
                  <button
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-slate-300 text-transparent hover:border-amber-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-xs font-black text-amber-700">
                        {routine.time}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        {routine.duration}
                      </span>
                    </div>

                    <h4 className={`text-sm font-extrabold ${isChecked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {routine.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {routine.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Golden Rule Tip */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-medium space-y-1">
            <span className="font-extrabold flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              The Digital Sunset Rule:
            </span>
            <p>
              Remember to stop all screens at least 60 minutes before bedtime. Replace with physical books and acoustic lullabies to protect restorative sleep.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
}
