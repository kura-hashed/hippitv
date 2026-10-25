import React from 'react';
import { CATEGORIES, STIMULATION_LEVELS } from '../data/contents';
import { Sparkles, Tv, Music, BookOpen, Smile, Smartphone, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  selectedStimulation,
  onSelectStimulation,
  totalResultsCount,
  onResetFilters,
  isFiltered
}) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Tv': return <Tv className="w-3.5 h-3.5" />;
      case 'Music': return <Music className="w-3.5 h-3.5" />;
      case 'BookOpen': return <BookOpen className="w-3.5 h-3.5" />;
      case 'Smile': return <Smile className="w-3.5 h-3.5" />;
      case 'Smartphone': return <Smartphone className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 space-y-4">
      
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                  : 'bg-white hover:bg-slate-100/80 text-slate-700 border-slate-200/90'
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-bar: Stimulation / Pacing Filter & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-200/60">
        
        {/* Stimulation Pacing Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            Pacing:
          </span>
          {STIMULATION_LEVELS.map((stim) => {
            const isActive = selectedStimulation === stim.id;
            return (
              <button
                key={stim.id}
                onClick={() => onSelectStimulation(stim.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                }`}
                title={stim.desc || ''}
              >
                {stim.label}
              </button>
            );
          })}
        </div>

        {/* Results Count & Reset Filter */}
        <div className="flex items-center gap-3 text-xs">
          <span className="font-extrabold text-slate-600">
            Showing <span className="text-amber-600 font-black">{totalResultsCount}</span> curated {totalResultsCount === 1 ? 'item' : 'items'}
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-600 font-bold underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all filters
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
