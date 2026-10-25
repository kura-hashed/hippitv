import React from 'react';
import { 
  X, 
  ExternalLink, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Tv, 
  Music, 
  BookOpen, 
  Smile, 
  Smartphone, 
  MessageSquare, 
  Volume2, 
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function DetailModal({
  item,
  onClose,
  isFavorite,
  onToggleFavorite
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header Image & Overlays */}
        <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden shrink-0">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-xs">
                🧸 {item.ageDisplay}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs text-white">
                {item.platform}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                {item.stimulationLevel === 'calm' ? '🌿 Low-Stimulation' : item.stimulationLevel === 'gentle' ? '☁️ Gentle' : '🎈 Movement'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight text-white drop-shadow-xs">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              Curated from {item.creator}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Summary */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">
              About This Content
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {item.summary}
            </p>
          </div>

          {/* Why Healthy Callout */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Why Speech Therapists & Pediatricians Recommend This:</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed font-medium">
              {item.whyHealthy}
            </p>
          </div>

          {/* Parent Action Prompt (The Co-Viewing Secret Sauce) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Parent Co-Watching & Dialogue Prompt:</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium italic">
              "{item.parentActionPrompt}"
            </p>
            <p className="text-[11px] text-amber-800/80 font-bold">
              Tip: Sitting beside your baby and pointing to the screen or real-world objects increases memory retention by 300%.
            </p>
          </div>

          {/* Key English Vocabulary List */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
              Key Target English Words & Phrases
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {item.keyVocabulary.map((word, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{word}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Usage Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 font-bold block mb-0.5">Recommended Exposure:</span>
              <span className="font-extrabold text-slate-800">{item.recommendedDuration}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 font-bold block mb-0.5">Stimulation Pacing:</span>
              <span className="font-extrabold text-slate-800 capitalize">{item.stimulationLevel} pacing</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFavorite ? 'Saved to Favorites' : 'Save for Later'}</span>
          </button>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md shadow-amber-500/25 transition-all hover:scale-102 cursor-pointer"
          >
            <span>Open Resource</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
