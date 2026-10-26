import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check, Heart, ShieldCheck } from 'lucide-react';

export default function ContentRow({
  title,
  subtitle,
  badge,
  items,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite,
  watchHistory = {}
}) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction) => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScroll, 400);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3 relative group/row">
      
      {/* Row Header */}
      <div className="flex items-baseline justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {badge}
            </span>
          )}
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
              — {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative">
        
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-r from-slate-950/90 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
            aria-label="Scroll left"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center border border-white/20">
              <ChevronLeft className="w-5 h-5" />
            </div>
          </button>
        )}

        {/* Scrolling Items */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth-touch px-4 sm:px-6 lg:px-8 py-2"
        >
          {items.map((item) => {
            const isSaved = isFavorite(item.id);
            const historyRecord = watchHistory[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onPlay(item)}
                className="shrink-0 w-64 sm:w-72 md:w-80 group/card cursor-pointer relative transition-transform duration-300 hover:scale-[1.03] hover:z-20"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-md group-hover/card:border-amber-400/60 transition-colors">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover/card:opacity-40 transition-opacity" />

                  {/* Age & Real Person Badges (Top Left) */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm">
                      {item.ageDisplay}
                    </span>
                    {(item.isRealPerson || (item.tags && item.tags.includes('Real Person'))) && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-sky-500 text-white shadow-sm flex items-center gap-0.5">
                        <span>🇺🇸 Real</span>
                      </span>
                    )}
                  </div>

                  {/* Stimulation (Top Right) */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-950/70 backdrop-blur-xs text-emerald-400 border border-emerald-400/30">
                    {item.stimulation}
                  </span>

                  {/* Play Overlay Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-xl transform scale-90 group-hover/card:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>

                  {/* Duration & Watch Progress (Bottom Right / Left) */}
                  {historyRecord && historyRecord.percent > 0 && (
                    <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-black bg-red-600 text-white shadow-sm">
                      {historyRecord.percent >= 90 ? 'Watched' : `${historyRecord.percent}%`}
                    </span>
                  )}

                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-slate-300">
                    {item.duration}
                  </span>

                  {/* YouTube Red Progress Bar along bottom */}
                  {historyRecord && historyRecord.percent > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/80 overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(5, historyRecord.percent))}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Card Title & Info underneath */}
                <div className="mt-2 px-0.5 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover/card:text-amber-300 transition-colors line-clamp-1 leading-snug">
                      {item.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 shrink-0 p-1 -mr-1"
                      title={isSaved ? 'Remove from My List' : 'Add to My List'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    {item.creator} • <span className="text-emerald-400">{item.matchScore} Match</span>
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-30 w-12 bg-gradient-to-l from-slate-950/90 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
            aria-label="Scroll right"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center border border-white/20">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        )}

      </div>

    </div>
  );
}
