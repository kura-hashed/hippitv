import React from 'react';
import { 
  Heart, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Tv, 
  Music, 
  BookOpen, 
  Smile, 
  Smartphone, 
  Star, 
  ChevronRight,
  MessageCircleQuestion
} from 'lucide-react';

export default function ContentCard({
  item,
  isFavorite,
  onToggleFavorite,
  onSelectDetail
}) {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'video': return <Tv className="w-3.5 h-3.5 text-blue-600" />;
      case 'song': return <Music className="w-3.5 h-3.5 text-pink-600" />;
      case 'book': return <BookOpen className="w-3.5 h-3.5 text-emerald-600" />;
      case 'play': return <Smile className="w-3.5 h-3.5 text-purple-600" />;
      case 'app': return <Smartphone className="w-3.5 h-3.5 text-orange-600" />;
      default: return null;
    }
  };

  const getStimulationBadge = (level) => {
    switch (level) {
      case 'calm':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
            🌿 Low-Stimulation
          </span>
        );
      case 'gentle':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200">
            ☁️ Gentle Pacing
          </span>
        );
      case 'interactive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
            🎈 Interactive Movement
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-amber-300 shadow-sm hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Top Media Header */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Age Tag (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-sm flex items-center gap-1">
            <span>🧸</span>
            <span>{item.ageDisplay}</span>
          </span>
        </div>

        {/* Favorite Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md transition-transform active:scale-90 cursor-pointer"
          title={isFavorite ? 'Remove from saved' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400 hover:text-rose-500'}`} />
        </button>

        {/* Category Pill Overlaid at bottom */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-xs">
            {getCategoryIcon(item.category)}
            <span className="capitalize">{item.category}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
            <Clock className="w-3 h-3" />
            {item.recommendedDuration}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Stimulation Badge & Platform */}
          <div className="flex items-center justify-between gap-2">
            <div>{getStimulationBadge(item.stimulationLevel)}</div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {item.platform}
            </span>
          </div>

          {/* Title & Creator */}
          <div>
            <h3 
              onClick={() => onSelectDetail(item)}
              className="text-base sm:text-lg font-black text-slate-800 hover:text-amber-600 transition-colors cursor-pointer leading-snug line-clamp-2"
            >
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              by {item.creator}
            </p>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {item.summary}
          </p>

          {/* Healthy Box Callout */}
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-emerald-950 text-xs">
            <div className="font-extrabold flex items-center gap-1.5 mb-1 text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Why Speech Specialists Love It:</span>
            </div>
            <p className="line-clamp-2 text-emerald-900/90 leading-normal font-medium">
              {item.whyHealthy}
            </p>
          </div>

          {/* Target Vocabulary Chips */}
          <div>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Target English:
            </span>
            <div className="flex flex-wrap gap-1">
              {item.keyVocabulary.slice(0, 4).map((word, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60"
                >
                  {word}
                </span>
              ))}
              {item.keyVocabulary.length > 4 && (
                <span className="px-1.5 py-0.5 text-[11px] font-semibold text-slate-400">
                  +{item.keyVocabulary.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-slate-800">{item.rating}</span>
            <span className="text-[11px] text-slate-400">({item.reviewsCount.toLocaleString()})</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectDetail(item)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <span>Parent Guide</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
