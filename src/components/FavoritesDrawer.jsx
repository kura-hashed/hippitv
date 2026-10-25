import React from 'react';
import { X, Heart, Trash2, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  allContents,
  onRemoveFavorite,
  onClearFavorites,
  onSelectDetail
}) {
  if (!isOpen) return null;

  const favoriteItems = allContents.filter(item => favorites.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-amber-100">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-white text-white" />
              <div>
                <h3 className="font-black text-base">Your Saved Playlist</h3>
                <p className="text-xs text-rose-100">
                  {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'} saved for daily parenting
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteItems.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-2xl">
                  💖
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">No saved items yet</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any card to save your favorite songs, shows, and books for quick daily access.
                </p>
              </div>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex items-center gap-3 group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => onSelectDetail(item)}
                  />

                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelectDetail(item)}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                        {item.ageDisplay}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 capitalize">
                        {item.category}
                      </span>
                    </div>
                    <h5 className="text-xs font-black text-slate-800 truncate group-hover:text-amber-600">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.creator}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectDetail(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                      title="View details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {favoriteItems.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={onClearFavorites}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear all saved
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black transition-colors cursor-pointer"
              >
                Close Playlist
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
