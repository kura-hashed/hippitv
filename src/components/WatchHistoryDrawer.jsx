import React from 'react';
import { X, Play, RotateCcw, Trash2, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WatchHistoryDrawer({
  isOpen,
  onClose,
  watchHistory,
  allContents,
  onResumeVideo,
  onRemoveHistoryItem,
  onClearHistory
}) {
  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Build sorted list of watched items with their content metadata
  const historyList = Object.entries(watchHistory)
    .map(([id, record]) => {
      const content = allContents.find(c => c.id === id);
      return {
        ...record,
        content
      };
    })
    .filter(item => !!item.content)
    .sort((a, b) => (b.lastWatchedAt || 0) - (a.lastWatchedAt || 0));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-white text-base">Watch History</h3>
                <p className="text-xs text-slate-400">
                  {historyList.length} {historyList.length === 1 ? 'video' : 'videos'} with saved progress
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
            {historyList.length === 0 ? (
              <div className="py-24 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-2xl">
                  🕒
                </div>
                <h4 className="font-bold text-white text-base">No Watch History Yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Start watching any video on HippiTV, and your exact watch progress will automatically be tracked here like YouTube.
                </p>
              </div>
            ) : (
              historyList.map(({ id, watchedSeconds, totalSeconds, percent, lastWatchedAt, completed, content }) => {
                const isFinished = completed || percent >= 90;
                return (
                  <div
                    key={id}
                    onClick={() => {
                      onResumeVideo(content, isFinished ? 0 : watchedSeconds);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group cursor-pointer"
                  >
                    {/* Thumbnail with YouTube Red Progress Bar */}
                    <div className="relative w-full sm:w-36 aspect-video rounded-xl overflow-hidden bg-black shrink-0">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />

                      {/* Play overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Age tag */}
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400 text-slate-950">
                        {content.ageDisplay}
                      </span>

                      {/* YouTube Red Progress Bar along bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60 overflow-hidden">
                        <div
                          className="h-full bg-red-600 transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(5, percent || 0))}%` }}
                        />
                      </div>
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0 space-y-1 w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold">
                          {content.creator}
                        </span>
                        {isFinished ? (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] text-red-400 font-extrabold">
                            {formatTime(watchedSeconds)} / {formatTime(totalSeconds)} ({percent}%)
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1 transition-colors">
                        {content.title}
                      </h4>

                      {/* Action pill: Resume vs Restart */}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:underline">
                          <Play className="w-3 h-3 fill-amber-400" />
                          <span>{isFinished ? 'Watch Again' : `Resume at ${formatTime(watchedSeconds)}`}</span>
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveHistoryItem(id);
                          }}
                          className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Clear All */}
          {historyList.length > 0 && (
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onClearHistory}
                className="text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Watch History</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-black hover:bg-slate-200 transition-colors cursor-pointer"
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
