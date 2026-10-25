import React, { useState } from 'react';
import { X, Brain, CheckCircle2, MessageCircleHeart, Sparkles, BookOpen } from 'lucide-react';
import { AGE_MILESTONES } from '../data/ageMilestones';

export default function SpeechMilestonesModal({ initialAge = '2', onClose }) {
  const [activeTab, setActiveTab] = useState(initialAge === 'all' ? '2' : initialAge);
  const data = AGE_MILESTONES[activeTab] || AGE_MILESTONES['2'];

  const tabs = [
    { id: '0-1', label: '0-1 Yr (Infant)' },
    { id: '2', label: '2 Yrs (Toddler)' },
    { id: '3', label: '3 Yrs (Preschool)' },
    { id: '4', label: '4 Yrs (Pre-K)' },
    { id: '5', label: '5+ Yrs (Kindergarten)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-white/15 backdrop-blur-xs">
              <Brain className="w-5 h-5 text-purple-200" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-200">
              Speech & Language Roadmap
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            English Speech Milestones by Age
          </h3>
          <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
            Evidence-based guide to normal language acquisition and parent support.
          </p>

          {/* Age Switcher Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pt-4 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-900 shadow-sm scale-102'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Stage Overview Banner */}
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-black text-slate-800 text-base">
                {data.title}
              </h4>
              <p className="text-xs text-purple-900 font-semibold mt-0.5">
                {data.subheading}
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 shadow-2xs text-xs font-extrabold text-purple-700 shrink-0">
              Expected Vocab: {data.vocabularySize}
            </div>
          </div>

          {/* Key Milestones Checklist */}
          <div>
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
              Typical Milestones to Watch For
            </h5>
            <div className="space-y-2">
              {data.keyMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{milestone}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Everyday English Phrases to Say to Your Child Today */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm">
              <MessageCircleHeart className="w-4 h-4 text-amber-600" />
              <span>4 Natural Phrases to Say at Home Today:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {data.parentPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/90 border border-amber-200 text-xs font-bold text-amber-900 italic shadow-2xs"
                >
                  {phrase}
                </div>
              ))}
            </div>
          </div>

          {/* Healthy Exposure Advice */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
            <span className="font-extrabold block text-emerald-900">
              🌱 Pediatric Screen & Learning Recommendation:
            </span>
            <p className="leading-relaxed font-medium">
              {data.healthyExposureTip}
            </p>
          </div>

          {/* Reassurance Footer Note */}
          <p className="text-[11px] text-slate-400 text-center italic">
            Note: Every child’s speech journey is unique! Bilingual children may speak slightly later but understand both languages with high proficiency.
          </p>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-extrabold transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>

      </div>

    </div>
  );
}
