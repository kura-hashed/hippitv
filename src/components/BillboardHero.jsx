import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Info, ShieldCheck, Sparkles } from 'lucide-react';

export default function BillboardHero({
  featuredItems,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate hero spotlight every 8 seconds
  useEffect(() => {
    if (!featuredItems || featuredItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredItems]);

  const currentItem = featuredItems[currentIndex] || featuredItems[0];
  if (!currentItem) return null;

  const isSaved = isFavorite(currentItem.id);

  return (
    <section className="relative w-full h-[68vh] min-h-[440px] max-h-[620px] overflow-hidden bg-slate-950 flex items-end">
      
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentItem.backdrop || currentItem.thumbnail}
          alt={currentItem.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
        />
        {/* Cinematic Netflix-style Dark Gradient Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/70 to-transparent w-full md:w-3/4" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-black">
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
              {currentItem.ageDisplay}
            </span>
            {(currentItem.isRealPerson || (currentItem.tags && currentItem.tags.includes('Real Person'))) && (
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white uppercase tracking-wider font-black">
                🇺🇸 Real Person
              </span>
            )}
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {currentItem.stimulation === 'Calm' ? '🌿 Low-Stimulation' : '☁️ Gentle Pacing'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-bold">{currentItem.duration}</span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-400 font-bold">{currentItem.creator}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {currentItem.title}
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-slate-200 line-clamp-2 leading-relaxed font-medium drop-shadow-xs max-w-xl">
            {currentItem.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            
            {/* Play Button */}
            <button
              onClick={() => onPlay(currentItem)}
              className="flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-black text-sm transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Watch Now</span>
            </button>

            {/* My List Button */}
            <button
              onClick={() => onToggleFavorite(currentItem.id)}
              className="flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm backdrop-blur-md transition-all cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>My List</span>
                </>
              )}
            </button>

            {/* More Info */}
            <button
              onClick={() => onMoreInfo(currentItem)}
              className="flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-bold text-sm backdrop-blur-md transition-all cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Details</span>
            </button>

          </div>

        </div>

        {/* Carousel Indicator Dots */}
        {featuredItems.length > 1 && (
          <div className="flex items-center gap-2 pt-6">
            {featuredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>

    </section>
  );
}
