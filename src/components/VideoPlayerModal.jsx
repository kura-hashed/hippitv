import React from 'react';
import { X, Heart, ExternalLink, ShieldCheck, Sparkles, Volume2, Play } from 'lucide-react';

export default function VideoPlayerModal({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRelated,
  relatedItems
}) {
  if (!item) return null;

  const isSaved = isFavorite(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Top Video Player (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-black shrink-0">
          {item.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={item.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
              <img
                src={item.backdrop || item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 max-w-md">{item.tagline}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open on {item.platform}</span>
                </a>
              </div>
            </div>
          )}

          {/* Close Button on Top Right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer z-20 backdrop-blur-xs"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Information Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Header Row: Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-black">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                  {item.ageDisplay}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {item.stimulation === 'Calm' ? '🌿 Low-Stimulation' : '☁️ Gentle Pacing'}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">{item.duration}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400 font-medium">{item.creator}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved in My List' : 'Add to My List'}</span>
              </button>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors"
              >
                <span>{item.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Description & Parent Tip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left Col: Overview & Parent Tip */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Actionable Parent Prompt */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 space-y-1">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Parent Interaction Tip:
                </span>
                <p className="text-xs text-amber-100 font-medium italic">
                  "{item.parentTip}"
                </p>
              </div>
            </div>

            {/* Right Col: Target English Vocabulary */}
            <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Target Vocabulary:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.keyVocabulary.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs font-bold bg-white/10 text-white border border-white/10"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Related Recommendations Row */}
          {relatedItems && relatedItems.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-2">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                More Like This ({item.ageDisplay})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedItems.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group/rel cursor-pointer space-y-1"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-white/10 group-hover/rel:border-amber-400/60 transition-colors">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/rel:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-white group-hover/rel:text-amber-300 truncate">
                      {rel.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
