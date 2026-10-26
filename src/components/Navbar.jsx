import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, X, Play, Clock, LogOut, User, ChevronDown, Check, Loader2 } from 'lucide-react';
import { AGE_TABS } from '../data/contents';

export default function Navbar({
  selectedAge,
  onSelectAge,
  searchTerm,
  setSearchTerm,
  favoritesCount,
  historyCount,
  onOpenMyList,
  onOpenHistory,
  user,
  onGoogleLogin,
  isAuthLoading,
  onLogout
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <span className="text-xl select-none">🦛</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Hippi<span className="text-amber-400">TV</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                Kids Stream
              </span>
            </div>
          </div>

          {/* Age Selector Filter Tabs */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
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

          {/* Right Tools: Search, History, My List, Google Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search video..."
                  className="w-28 focus:w-44 sm:w-48 md:w-56 sm:focus:w-56 pl-7 sm:pl-8 pr-7 py-1.5 rounded-full text-xs bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 focus:border-amber-400 transition-all duration-300 font-medium"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Watch History Button (Desktop & Tablet - on Mobile it is in BottomNav) */}
            <button
              onClick={onOpenHistory}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/10 transition-all cursor-pointer active:scale-95"
              title="Watch History & Progress"
            >
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>

            {/* My List / Favorites Button (Desktop & Tablet - on Mobile it is in BottomNav) */}
            <button
              onClick={onOpenMyList}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/10 transition-all cursor-pointer active:scale-95"
              title="Saved Playlist"
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
              <span>My List</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Google Authentication Section */}
            {user ? (
              /* Logged In Google Profile Avatar & Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=f59e0b&color=0b0f19&bold=true`}
                      alt={user.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=f59e0b&color=0b0f19&bold=true`;
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-amber-400/80"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white mr-1 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden py-1 z-50 text-white animate-fadeIn">
                    <div className="p-3 border-b border-white/10 bg-white/5 space-y-1">
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                        <Check className="w-3 h-3" />
                        <span>Google Account</span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenHistory();
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-left hover:bg-white/10 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        <span>Watch History</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                        {historyCount}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenMyList();
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-left hover:bg-white/10 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Saved List</span>
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                        {favoritesCount}
                      </span>
                    </button>

                    <div className="border-t border-white/10 my-1" />

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3.5 py-2 text-xs text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Clean Direct 1-Click Google Sign In Button */
              <button
                onClick={onGoogleLogin}
                disabled={isAuthLoading}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-75 border border-slate-200"
                title="Sign in with Google"
              >
                {isAuthLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign in</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Age Pills Bar (Fast Thumb Category Switching) */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth-touch touch-pan-x border-t border-white/5">
          {AGE_TABS.map((tab) => {
            const isActive = selectedAge === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectAge(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
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
