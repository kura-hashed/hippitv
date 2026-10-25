import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { AGE_GROUPS } from '../data/contents';

export default function Footer({ onSelectAge, onOpenHealthyGuide, onOpenMilestones, onOpenRoutine }) {
  return (
    <footer className="mt-20 bg-white border-t border-amber-100 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐣</span>
              <span className="text-xl font-black text-slate-800">
                YKid <span className="text-amber-500 font-extrabold">English</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Curated, low-stimulation, speech-positive English resources for babies, toddlers, and young minds.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pediatric Pacing Standards</span>
            </div>
          </div>

          {/* Jump to Age Col */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
              Browse by Age
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              {AGE_GROUPS.filter(g => g.id !== 'all').map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => {
                      onSelectAge(g.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-600 transition-colors cursor-pointer text-left"
                  >
                    {g.label} ({g.subtitle})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Parent Toolkits */}
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">
              Parent Guidance
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li>
                <button onClick={onOpenMilestones} className="hover:text-amber-600 transition-colors cursor-pointer text-left">
                  English Speech Milestones (0 - 5+ Yrs)
                </button>
              </li>
              <li>
                <button onClick={onOpenHealthyGuide} className="hover:text-amber-600 transition-colors cursor-pointer text-left">
                  Healthy Screen-Time & Low-Stimulation
                </button>
              </li>
              <li>
                <button onClick={onOpenRoutine} className="hover:text-amber-600 transition-colors cursor-pointer text-left">
                  Daily English Routine Template
                </button>
              </li>
              <li>
                <a href="https://www.aap.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
                  American Academy of Pediatrics (AAP) Media Advice ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Healthy Note Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2 text-xs">
            <span className="font-extrabold text-amber-900 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              A Note on Early Language:
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              No digital media can replace genuine, face-to-face smiles, hugs, and live talk with caring parents. Digital content works best when co-watched and reinforced in real life!
            </p>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} YKid English. Built for mindful parents raising curious kids.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for little explorers.
          </p>
        </div>

      </div>
    </footer>
  );
}
