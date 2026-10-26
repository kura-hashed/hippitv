import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, ExternalLink, ShieldCheck, Sparkles, Volume2, Play, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

export default function VideoPlayerModal({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectRelated,
  relatedItems,
  existingHistory,
  initialStartSeconds = 0,
  onUpdateProgress
}) {
  if (!item) return null;

  const isSaved = isFavorite(item.id);

  // Parse duration string like "15 min" or "5 min" to total seconds
  const parseTotalSeconds = (dur) => {
    if (!dur) return 600;
    const match = dur.match(/\d+/);
    return match ? parseInt(match[0], 10) * 60 : 600;
  };

  const totalSeconds = parseTotalSeconds(item.duration);

  // Starting playback position
  const [startSeconds, setStartSeconds] = useState(initialStartSeconds || (existingHistory?.watchedSeconds && existingHistory.percent < 90 ? existingHistory.watchedSeconds : 0));
  const [currentWatched, setCurrentWatched] = useState(existingHistory?.watchedSeconds || initialStartSeconds || 0);
  const [hasPromptResume, setHasPromptResume] = useState(
    existingHistory && existingHistory.watchedSeconds > 15 && existingHistory.percent < 90 && initialStartSeconds === 0
  );

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Lock body scroll while modal is open on mobile and desktop
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Timer simulation to track watch progress while video player is open
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWatched((prev) => {
        const next = Math.min(totalSeconds, prev + 2);
        const percent = Math.min(100, Math.round((next / totalSeconds) * 100));
        if (onUpdateProgress) {
          onUpdateProgress(item.id, next, totalSeconds, percent);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [item.id, totalSeconds, onUpdateProgress]);

  const percent = Math.min(100, Math.round((currentWatched / totalSeconds) * 100));

  const handleResumeAtPrevious = () => {
    if (existingHistory?.watchedSeconds) {
      setStartSeconds(existingHistory.watchedSeconds);
      setCurrentWatched(existingHistory.watchedSeconds);
    }
    setHasPromptResume(false);
  };

  const handleStartOver = () => {
    setStartSeconds(0);
    setCurrentWatched(0);
    setHasPromptResume(false);
    if (onUpdateProgress) {
      onUpdateProgress(item.id, 0, totalSeconds, 0);
    }
  };

  const handleMarkAsWatched = () => {
    setCurrentWatched(totalSeconds);
    if (onUpdateProgress) {
      onUpdateProgress(item.id, totalSeconds, totalSeconds, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 md:p-6 bg-slate-950 sm:bg-slate-950/85 sm:backdrop-blur-md animate-fadeIn">
      
      {/* Click outside to close (desktop only) */}
      <div className="hidden sm:block fixed inset-0" onClick={onClose} />

      {/* Modal Container: Fullscreen on mobile, rounded card on tablet/desktop */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-slate-900 border-0 sm:border sm:border-white/10 rounded-none sm:rounded-3xl shadow-2xl flex flex-col text-white z-10 overflow-hidden">
        
        {/* Top Video Player (16:9 Aspect Ratio) - Sticky on mobile */}
        <div className="relative aspect-video w-full bg-black shrink-0 sticky top-0 z-30 shadow-md">
          {item.youtubeId ? (
            <iframe
              key={`${item.youtubeId}-${startSeconds}`}
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1${startSeconds > 0 ? `&start=${startSeconds}` : ''}`}
              title={item.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
              <img
                src={item.backdrop || item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 max-w-md">{item.tagline}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open on {item.platform}</span>
                </a>
              </div>
            </div>
          )}

          {/* Close Button on Top Right (44px min touch target) */}
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer z-30 backdrop-blur-md active:scale-95 shadow-lg"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* YouTube Red Progress Bar along bottom of video player */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/80 overflow-hidden z-20">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(3, percent))}%` }}
            />
          </div>
        </div>

        {/* Previous Progress Resume Banner */}
        {hasPromptResume && (
          <div className="bg-gradient-to-r from-red-950/90 to-amber-950/90 border-b border-red-500/30 px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-slate-200">
                Watched up to <strong className="text-white">{formatTime(existingHistory.watchedSeconds)}</strong> ({existingHistory.percent}%).
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResumeAtPrevious}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Resume from {formatTime(existingHistory.watchedSeconds)}</span>
              </button>
              <button
                onClick={handleStartOver}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer active:scale-95"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Information Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Header Row: Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-black">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                  {item.ageDisplay}
                </span>
                {(item.isRealPerson || (item.tags && item.tags.includes('Real Person'))) && (
                  <span className="px-2 py-0.5 rounded bg-sky-500 text-white uppercase tracking-wider font-black">
                    🇺🇸 Real Person
                  </span>
                )}
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {item.stimulation === 'Calm' ? '🌿 Low-Stimulation' : '☁️ Gentle Pacing'}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">{item.duration}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400 font-medium">{item.creator}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved in My List' : 'Add to My List'}</span>
              </button>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-colors"
              >
                <span>{item.platform}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* YouTube Watch Progress Tracker Bar */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>Watch Progress:</span>
                <strong className="text-white">{formatTime(currentWatched)}</strong> / {formatTime(totalSeconds)} ({percent}%)
              </span>
              <div className="flex items-center gap-2">
                {percent >= 90 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={handleMarkAsWatched}
                    className="text-[11px] font-bold text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    Mark as Watched
                  </button>
                )}
                {percent > 0 && (
                  <button
                    onClick={handleStartOver}
                    className="text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Red Progress Track */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(2, percent))}%` }}
              />
            </div>
          </div>

          {/* Description & Parent Tip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left Col: Overview & Parent Tip */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Actionable Parent Prompt */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 space-y-1">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Parent Interaction Tip:
                </span>
                <p className="text-xs text-amber-100 font-medium italic">
                  "{item.parentTip}"
                </p>
              </div>
            </div>

            {/* Right Col: Target English Vocabulary */}
            <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Target Vocabulary:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.keyVocabulary.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-md text-xs font-bold bg-white/10 text-white border border-white/10"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Related Recommendations Row */}
          {relatedItems && relatedItems.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-2">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                More Like This ({item.ageDisplay})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedItems.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group/rel cursor-pointer space-y-1"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-white/10 group-hover/rel:border-amber-400/60 transition-colors">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/rel:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-white group-hover/rel:text-amber-300 truncate">
                      {rel.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
