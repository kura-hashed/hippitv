import React, { useEffect } from 'react';
import { X, Play, Trash2, Heart } from 'lucide-react';

export default function MyListDrawer({
  isOpen,
  onClose,
  favorites,
  allContents,
  onPlayItem,
  onRemoveFavorite,
  onClearFavorites
}) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const favoriteItems = allContents.filter(item => favorites.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8">
        <div className="w-screen max-w-md bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <div>
                <h3 className="font-black text-white text-base">My Saved List</h3>
                <p className="text-xs text-slate-400">
                  {favoriteItems.length} {favoriteItems.length === 1 ? 'title' : 'titles'} ready to play
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-2xl">
                  🍿
                </div>
                <h4 className="font-bold text-white text-sm">Your list is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any video or show to save it for quick daily access.
                </p>
              </div>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onPlayItem(item);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-400/40 transition-all flex items-center gap-3 group cursor-pointer"
                >
                  {/* Thumbnail with hover play icon */}
                  <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                        {item.ageDisplay}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {item.stimulation}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.creator} • {item.duration}
                    </p>
                  </div>

                  {/* Trash action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(item.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                    title="Remove from list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favoriteItems.length > 0 && (
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onClearFavorites}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors font-semibold"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-black hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
