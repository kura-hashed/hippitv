import React from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Heart, 
  Brain, 
  Calendar, 
  ShieldCheck, 
  X 
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  favoritesCount,
  onOpenFavorites,
  onOpenMilestones,
  onOpenHealthyGuide,
  onOpenRoutine
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 flex items-center justify-center shadow-md shadow-amber-200/50 group-hover:scale-105 transition-transform">
              <span className="text-2xl select-none">🐣</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-800">
                  YKid <span className="text-amber-500 font-extrabold">English</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Healthy & Gentle
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                Curated learning & low-stimulation content for babies & toddlers
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search songs, books, Ms Rachel, Bluey, phonics..."
                className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-100/90 border border-transparent focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Nav Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenMilestones}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Brain className="w-4 h-4 text-purple-600" />
              Speech Milestones
            </button>

            <button
              onClick={onOpenHealthyGuide}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Screen Time Guide
            </button>

            <button
              onClick={onOpenRoutine}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              Daily Routine
            </button>

            {/* Saved Favorites button */}
            <button
              onClick={onOpenFavorites}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-amber-700'}`} />
              <span className="hidden sm:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-extrabold flex items-center justify-center -ml-0.5 animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search songs, books, Ms Rachel, Bluey..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-sm bg-slate-100 border border-transparent focus:bg-white focus:border-amber-400 outline-none text-slate-700"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
