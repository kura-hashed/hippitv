import React from 'react';
import { Home, Sparkles, Clock, Heart, Baby, UserCheck } from 'lucide-react';

export default function BottomNav({
  selectedAge,
  onSelectAge,
  onOpenHistory,
  onOpenMyList,
  historyCount,
  favoritesCount
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-1 safe-area-pb shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* Home (All) */}
        <button
          onClick={() => {
            onSelectAge('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all active:scale-90 cursor-pointer ${
            selectedAge === 'all'
              ? 'text-amber-400 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
          {selectedAge === 'all' && (
            <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* 2 Years Old (Toddler) */}
        <button
          onClick={() => {
            onSelectAge('2');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all active:scale-90 cursor-pointer relative ${
            selectedAge === '2'
              ? 'text-amber-400 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-base leading-none mb-0.5 select-none">🧸</span>
          <span className="text-[10px] tracking-tight">2 Years</span>
          {selectedAge === '2' && (
            <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* Real People American */}
        <button
          onClick={() => {
            onSelectAge('real');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all active:scale-90 cursor-pointer relative ${
            selectedAge === 'real'
              ? 'text-sky-400 font-black'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="text-base leading-none mb-0.5 select-none">👩‍🏫</span>
          <span className="text-[10px] tracking-tight">Real 🇺🇸</span>
          {selectedAge === 'real' && (
            <span className="w-1 h-1 rounded-full bg-sky-400 mt-0.5" />
          )}
        </button>

        {/* Watch History */}
        <button
          onClick={onOpenHistory}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all active:scale-90 cursor-pointer relative"
        >
          <div className="relative">
            <Clock className="w-5 h-5 mb-0.5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">History</span>
        </button>

        {/* My List */}
        <button
          onClick={onOpenMyList}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200 transition-all active:scale-90 cursor-pointer relative"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 mb-0.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">My List</span>
        </button>

      </div>
    </nav>
  );
}
