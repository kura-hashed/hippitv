import React, { useState } from 'react';
import { Search, Heart, X, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { AGE_TABS } from '../data/contents';

export default function Navbar({
  selectedAge,
  onSelectAge,
  searchTerm,
  setSearchTerm,
  favoritesCount,
  onOpenMyList
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() => {
              onSelectAge('all');
              setSearchTerm('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl select-none">🐣</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                YKid<span className="text-amber-400">TV</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                Kids Stream
              </span>
            </div>
          </div>

          {/* Age Selector Filter Tabs (Netflix / Apple TV Category Pills) */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1">
            {AGE_TABS.map((tab) => {
              const isActive = selectedAge === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectAge(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Search & My List */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search video, Ms Rachel, Bluey..."
                  className="w-36 sm:w-60 pl-8 pr-7 py-1.5 rounded-full text-xs bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:border-amber-400 focus:w-48 sm:focus:w-72 transition-all font-medium"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 text-slate-400 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* My List / Favorites Button */}
            <button
              onClick={onOpenMyList}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/10 transition-all cursor-pointer active:scale-95"
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
              <span className="hidden sm:inline">My List</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Age Pills Bar */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar border-t border-white/5">
          {AGE_TABS.map((tab) => {
            const isActive = selectedAge === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectAge(tab.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-extrabold shrink-0 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
