import React from 'react';
import { Sparkles, Shield, Heart, Volume2, BookOpen, Smile, ChevronRight } from 'lucide-react';

export default function HeroBanner({ selectedAge, onSelectAge, onOpenHealthyGuide, onOpenMilestones }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-transparent">
      {/* Playful background decorative shapes */}
      <div className="absolute top-2 left-6 w-24 h-24 bg-yellow-200/40 rounded-full blur-2xl -z-10" />
      <div className="absolute top-12 right-10 w-36 h-36 bg-emerald-200/40 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-4 left-1/3 w-32 h-32 bg-sky-200/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-200/80 shadow-sm text-xs font-bold text-amber-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Pediatric & Speech-Language Approved</span>
            <span className="text-amber-300">•</span>
            <span className="text-slate-600 font-semibold">Zero Overstimulation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Gentle & Healthy English for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
              Little Learners
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Discover curated songs, calm videos, tactile books, and speech-boosting games tailored for each stage of language acquisition.
          </p>

          {/* Key Value Props Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Low-stimulation & calm pacing</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-2xs">
              <Smile className="w-3.5 h-3.5 text-amber-600" />
              <span>Actionable parent prompts</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Filtered by child’s exact age</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
