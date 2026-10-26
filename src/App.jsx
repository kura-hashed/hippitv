import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import BillboardHero from './components/BillboardHero';
import ContentRow from './components/ContentRow';
import VideoPlayerModal from './components/VideoPlayerModal';
import MyListDrawer from './components/MyListDrawer';
import WatchHistoryDrawer from './components/WatchHistoryDrawer';
import GoogleAuthModal from './components/GoogleAuthModal';
import { CONTENTS, SHELVES, AGE_TABS } from './data/contents';
import { Play, Sparkles, Heart, RotateCcw, ShieldCheck, Clock } from 'lucide-react';

export default function App() {
  const [selectedAge, setSelectedAge] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // User Authentication State (Google Sign In)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hippitv_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('hippitv_user', JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('hippitv_user');
    } catch (e) {
      console.error(e);
    }
  };

  // Watch History & Progress State (YouTube Style)
  const [watchHistory, setWatchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('hippitv_history');
      return saved ? JSON.parse(saved) : {
        // Pre-fill a sample progress for instant demonstration
        'ms-rachel-first-words-baby': {
          id: 'ms-rachel-first-words-baby',
          watchedSeconds: 460,
          totalSeconds: 1500,
          percent: 31,
          lastWatchedAt: Date.now() - 3600000,
          completed: false
        },
        'sarah-and-duck-cake': {
          id: 'sarah-and-duck-cake',
          watchedSeconds: 280,
          totalSeconds: 420,
          percent: 67,
          lastWatchedAt: Date.now() - 7200000,
          completed: false
        }
      };
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hippitv_history', JSON.stringify(watchHistory));
    } catch (e) {
      console.error(e);
    }
  }, [watchHistory]);

  const updateWatchProgress = (id, watchedSeconds, totalSeconds, percent) => {
    setWatchHistory(prev => ({
      ...prev,
      [id]: {
        id,
        watchedSeconds,
        totalSeconds,
        percent,
        lastWatchedAt: Date.now(),
        completed: percent >= 90
      }
    }));
  };

  const removeHistoryItem = (id) => {
    setWatchHistory(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearHistory = () => {
    setWatchHistory({});
  };

  // Favorites saved in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('hippitv_favorites') || localStorage.getItem('ykid_favorites');
      return saved ? JSON.parse(saved) : ['ms-rachel-first-words-baby', 'bluey-keepy-uppy', 'sarah-and-duck-cake'];
    } catch {
      return ['ms-rachel-first-words-baby', 'bluey-keepy-uppy', 'sarah-and-duck-cake'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hippitv_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (id) => favorites.includes(id);

  // Modals & Drawers
  const [activeVideo, setActiveVideo] = useState(null);
  const [initialStartSeconds, setInitialStartSeconds] = useState(0);
  const [isMyListOpen, setIsMyListOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handlePlayVideo = (item, startSec = 0) => {
    setInitialStartSeconds(startSec);
    setActiveVideo(item);
  };

  // Billboard Featured Items depending on selected age
  const featuredItems = useMemo(() => {
    if (selectedAge === 'real') {
      return CONTENTS.filter(item => item.isRealPerson && item.accent === 'American').slice(0, 5);
    }
    if (selectedAge === 'all') {
      return CONTENTS.filter(item => ['ms-rachel-first-words-baby', 'ms-rachel-first-words', 'bluey-keepy-uppy', 'caities-classroom-circle-time', 'puffin-rock-shining-stones'].includes(item.id));
    }
    const ageSpecific = CONTENTS.filter(item => item.targetAges.includes(selectedAge));
    return ageSpecific.length > 0 ? ageSpecific.slice(0, 5) : CONTENTS.slice(0, 3);
  }, [selectedAge]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const query = searchTerm.toLowerCase();
    return CONTENTS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchCreator = item.creator.toLowerCase().includes(query);
      const matchTagline = item.tagline.toLowerCase().includes(query);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
      const matchVocab = item.keyVocabulary.some(v => v.toLowerCase().includes(query));
      return matchTitle || matchCreator || matchTagline || matchTags || matchVocab;
    });
  }, [searchTerm]);

  // Dynamic Shelves based on selected age with smart deduplication
  const activeShelves = useMemo(() => {
    const usedIds = new Set();

    const pickUnique = (candidates, count = 24) => {
      const fresh = candidates.filter(item => !usedIds.has(item.id));
      const chosen = fresh.slice(0, count);
      chosen.forEach(item => usedIds.add(item.id));

      if (chosen.length < count && candidates.length > chosen.length) {
        const remaining = candidates.filter(item => !chosen.some(c => c.id === item.id));
        const extra = remaining.slice(0, count - chosen.length);
        extra.forEach(item => usedIds.add(item.id));
        chosen.push(...extra);
      }
      return chosen;
    };

    // Build "Continue Watching" items from watchHistory
    const continueWatchingItems = Object.entries(watchHistory)
      .map(([id, record]) => {
        const content = CONTENTS.find(c => c.id === id);
        return { ...record, content };
      })
      .filter(item => !!item.content && item.percent > 0 && item.percent < 90)
      .sort((a, b) => (b.lastWatchedAt || 0) - (a.lastWatchedAt || 0))
      .map(item => item.content);

    if (selectedAge === 'real') {
      const realItems = CONTENTS.filter(item => item.isRealPerson === true || (item.tags && item.tags.includes('Real Person')));
      const speechItems = realItems.filter(item => (item.tags && (item.tags.includes('Speech Therapy') || item.tags.includes('Speech Delay') || item.tags.includes('Top SLP Pick') || item.tags.includes('First Words'))));
      const readAlouds = realItems.filter(item => item.category === 'book' || (item.tags && item.tags.includes('Read Aloud')));
      const musicItems = realItems.filter(item => item.category === 'song' || (item.tags && item.tags.includes('Sing Along')));
      const feelingsSocial = realItems.filter(item => item.tags && (item.tags.includes('Emotions') || item.tags.includes('Mindfulness') || item.tags.includes('Mister Rogers') || item.tags.includes('Circle Time')));

      const result = [];

      // Continue watching shelf if exists
      if (continueWatchingItems.length > 0) {
        result.push({
          id: 'continue-watching-real',
          title: '🕒 Continue Watching',
          subtitle: 'Resume right where your baby left off',
          badge: 'RESUME',
          items: continueWatchingItems.slice(0, 15)
        });
      }

      result.push(
        {
          id: 'real-speech-educators',
          title: '🇺🇸 Real People: Certified Speech Educators (Ms. Rachel & Caitie)',
          subtitle: 'Close-up mouth framing, intentional pauses, and baby sign language',
          badge: 'SPEECH THERAPY',
          items: pickUnique(speechItems.length > 0 ? speechItems : realItems, 20)
        },
        {
          id: 'real-books-teachers',
          title: '📖 Real Teachers Reading Physical Picture Books (Bri Reads)',
          subtitle: 'Clear American diction, pointing to words, and interactive page turning',
          badge: 'READ ALOUDS',
          items: pickUnique(readAlouds, 20)
        },
        {
          id: 'real-american-music',
          title: '🎵 Acoustic American Songs & Movement (Laurie Berkner & Ms. Rachel)',
          subtitle: 'Acoustic guitars, sleeping bunnies, dinosaurs, and movement games',
          badge: 'ACOUSTIC MUSIC',
          items: pickUnique(musicItems, 20)
        },
        {
          id: 'real-feelings-mindfulness',
          title: '🌱 Emotional Reassurance & Gentle Talk (Mister Rogers & Tab Time)',
          subtitle: 'Warm maternal and paternal encouragement, deep breaths, and kindness',
          badge: 'EMOTIONAL SAFETY',
          items: pickUnique(feelingsSocial, 20)
        },
        {
          id: 'real-all-catalog',
          title: '👩‍🏫 Complete Real People American Accent Library',
          subtitle: 'Every title with real human hosts and clear American English pronunciation',
          badge: 'ALL REAL HOSTS',
          items: pickUnique(realItems, 24)
        }
      );

      return result.filter(s => s.items.length > 0);
    }

    if (selectedAge === 'all') {
      const result = [];

      // Continue Watching shelf if user has history
      if (continueWatchingItems.length > 0) {
        result.push({
          id: 'continue-watching-all',
          title: '🕒 Continue Watching for Baby',
          subtitle: 'Resume right where your baby left off',
          badge: 'RESUME',
          items: continueWatchingItems.slice(0, 15)
        });
      }

      const allShelvesConfig = [
        {
          id: 'shelf-real-american',
          title: '🇺🇸 Real People • American Accent (Speech & Mimicry)',
          subtitle: 'Close-up mouth framing, baby sign language, and warm real human educators',
          badge: 'REAL EDUCATORS',
          filterFn: (item) => item.isRealPerson === true || (item.tags && item.tags.includes('Real Person'))
        },
        {
          id: 'shelf-gentle-2yo',
          title: '🐰 Ultra-Gentle & Cozy (Zero Scares, 100% Cuddly)',
          subtitle: 'Soft bunnies, gentle ducks, warm hugs, and zero loud surprises',
          badge: 'ZERO SCARES',
          filterFn: (item) => item.targetAges.includes('2') && item.stimulation === 'Calm'
        },
        {
          id: 'shelf-2yo',
          title: 'Top Picks for 2-Year-Olds',
          subtitle: 'First words, speech therapy, and gesture imitation',
          badge: 'AGE 2',
          filterFn: (item) => item.targetAges.includes('2')
        },
        {
          id: 'shelf-calm',
          title: '🌿 Low-Stimulation Classics',
          subtitle: 'Slow scene cuts, acoustic instruments, zero overstimulation',
          badge: 'LOW STIMULATION',
          filterFn: (item) => item.stimulation === 'Calm'
        },
        {
          id: 'shelf-3yo',
          title: 'Best for 3-Year-Olds',
          subtitle: 'Family dialogue, emotional regulation, and pretend play',
          badge: 'AGE 3',
          filterFn: (item) => item.targetAges.includes('3')
        },
        {
          id: 'shelf-songs',
          title: '🎵 Sing-Along & Action Rhymes',
          subtitle: 'Catchy rhythms and whole-body coordination',
          badge: 'SONGS',
          filterFn: (item) => item.category === 'song'
        },
        {
          id: 'shelf-books',
          title: '📚 Picture Books & Read-Alouds',
          subtitle: 'Bedtime stories and language pattern repetition',
          badge: 'STORIES',
          filterFn: (item) => item.category === 'book'
        },
        {
          id: 'shelf-phonics',
          title: '🧩 Phonics & Early Learning (Ages 4-5)',
          subtitle: 'Letter sounds, numbers, and early reading confidence',
          badge: 'PHONICS',
          filterFn: (item) => item.targetAges.includes('4') || item.targetAges.includes('5')
        },
        {
          id: 'shelf-science',
          title: '🚀 Science, Ocean & STEM Explorers (Age 5+)',
          subtitle: 'Marine biology, creature reports, and curious questions',
          badge: 'STEM',
          filterFn: (item) => item.targetAges.includes('5')
        },
        {
          id: 'shelf-infant',
          title: '🍼 Baby First Sounds & Lullabies (0-1 Yr)',
          subtitle: 'Gentle acoustics, soothing bedtime, and babbling imitation',
          badge: 'INFANT',
          filterFn: (item) => item.targetAges.includes('0-1')
        }
      ];

      result.push(
        ...allShelvesConfig.map(shelf => {
          const candidates = CONTENTS.filter(shelf.filterFn);
          return {
            ...shelf,
            items: pickUnique(candidates, 24)
          };
        })
      );

      return result.filter(s => s.items.length > 0);
    }

    // When an age is selected (e.g. 2 Years)
    const ageItems = CONTENTS.filter(item => item.targetAges.includes(selectedAge));
    const result = [];

    // Continue Watching for this age
    const ageContinueWatching = continueWatchingItems.filter(item => item.targetAges.includes(selectedAge));
    if (ageContinueWatching.length > 0) {
      result.push({
        id: `continue-watching-age-${selectedAge}`,
        title: '🕒 Continue Watching',
        subtitle: 'Resume right where your child left off',
        badge: 'RESUME',
        items: ageContinueWatching.slice(0, 15)
      });
    }

    if (selectedAge === '2') {
      const real2yo = ageItems.filter(item => item.isRealPerson === true || (item.tags && item.tags.includes('Real Person')));
      const chosenReal = pickUnique(real2yo, 20);
      if (chosenReal.length > 0) {
        result.push({
          id: 'age-2-real-people',
          title: '🇺🇸 Real People • American Accent (Toddler Speech & Mimicry)',
          subtitle: 'Ms. Rachel, Caitie & real educators modeling clear lips and baby signs',
          badge: 'REAL EDUCATORS',
          items: chosenReal
        });
      }

      const ultraGentle = ageItems.filter(item => item.stimulation === 'Calm' && (item.tags.includes('Zero Scares') || item.tags.includes('Emotional Security') || item.tags.includes('Cuddly') || item.tags.includes('Low Stimulation')));
      const chosenGentle = pickUnique(ultraGentle, 20);
      if (chosenGentle.length > 0) {
        result.push({
          id: 'age-2-ultra-gentle',
          title: '🐰 Ultra-Gentle & Cozy (Zero Scares, 100% Cuddly)',
          subtitle: 'Soft bunnies, gentle ducks, warm hugs, and zero loud surprises',
          badge: 'ZERO SCARES',
          items: chosenGentle
        });
      }
    }

    const topChosen = pickUnique(ageItems, 20);
    if (topChosen.length > 0) {
      result.push({
        id: `age-${selectedAge}-top`,
        title: `★ Top Picks for ${AGE_TABS.find(t => t.id === selectedAge)?.label || 'This Age'}`,
        subtitle: 'Curated speech-boosting and favorite titles',
        badge: 'TOP PICKS',
        items: topChosen
      });
    }

    const calmItems = ageItems.filter(item => item.stimulation === 'Calm');
    const calmChosen = pickUnique(calmItems, 20);
    if (calmChosen.length > 0) {
      result.push({
        id: `age-${selectedAge}-calm`,
        title: '🌿 Low-Stimulation & Calm Pacing',
        subtitle: 'Zero fast cuts, acoustic sound, and gentle speech modeling',
        badge: 'CALM',
        items: calmChosen
      });
    }

    const songItems = ageItems.filter(item => item.category === 'song');
    const songChosen = pickUnique(songItems, 20);
    if (songChosen.length > 0) {
      result.push({
        id: `age-${selectedAge}-songs`,
        title: '🎵 Rhymes & Action Songs',
        subtitle: 'Melodic repetition for auditory learning',
        badge: 'MUSIC',
        items: songChosen
      });
    }

    const storyItems = ageItems.filter(item => item.category === 'book' || item.category === 'video');
    const storyChosen = pickUnique(storyItems, 20);
    if (storyChosen.length > 0) {
      result.push({
        id: `age-${selectedAge}-stories`,
        title: '📖 Stories & Picture Books',
        subtitle: 'Character dialogue and rich vocabulary',
        badge: 'STORIES',
        items: storyChosen
      });
    }

    return result;
  }, [selectedAge, watchHistory]);

  // Related items for the currently playing video
  const relatedItems = useMemo(() => {
    if (!activeVideo) return [];
    return CONTENTS.filter(item =>
      item.id !== activeVideo.id &&
      item.targetAges.some(a => activeVideo.targetAges.includes(a))
    );
  }, [activeVideo]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navbar with Google Sign-In & Watch History */}
      <Navbar
        selectedAge={selectedAge}
        onSelectAge={setSelectedAge}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        historyCount={Object.keys(watchHistory).length}
        onOpenMyList={() => setIsMyListOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        user={user}
        onOpenGoogleLogin={() => setIsGoogleModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        
        {/* If searching, show direct search results grid with YouTube Progress Bar */}
        {searchResults !== null ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Search Results for <span className="text-amber-400">"{searchTerm}"</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Found {searchResults.length} {searchResults.length === 1 ? 'title' : 'titles'}
                </p>
              </div>
              <button
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Search</span>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((item) => {
                  const historyRecord = watchHistory[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handlePlayVideo(item, historyRecord?.watchedSeconds || 0)}
                      className="group cursor-pointer space-y-2"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10 group-hover:border-amber-400/60 transition-colors shadow-md">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-slate-950 text-slate-950 ml-0.5" />
                          </div>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950">
                            {item.ageDisplay}
                          </span>
                          {(item.isRealPerson || (item.tags && item.tags.includes('Real Person'))) && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-sky-500 text-white">
                              🇺🇸 Real
                            </span>
                          )}
                        </div>

                        {/* Duration & Watch Progress */}
                        {historyRecord && historyRecord.percent > 0 && (
                          <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-black bg-red-600 text-white shadow-sm">
                            {historyRecord.percent >= 90 ? 'Watched' : `${historyRecord.percent}%`}
                          </span>
                        )}

                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-slate-300">
                          {item.duration}
                        </span>

                        {/* YouTube Red Progress Bar */}
                        {historyRecord && historyRecord.percent > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/80 overflow-hidden">
                            <div
                              className="h-full bg-red-600 transition-all duration-300"
                              style={{ width: `${Math.min(100, Math.max(5, historyRecord.percent))}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.creator} • {item.stimulation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="text-3xl">🔍</div>
                <h3 className="font-bold text-white text-base">No titles found for "{searchTerm}"</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try searching for "Ms Rachel", "Bluey", "rhymes", "animals", or click an age filter above.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Normal Netflix/Apple TV Home Layout */
          <>
            {/* Billboard Featured Spotlight Hero */}
            <BillboardHero
              featuredItems={featuredItems}
              onPlay={(item) => handlePlayVideo(item, watchHistory[item.id]?.watchedSeconds || 0)}
              onMoreInfo={(item) => handlePlayVideo(item, watchHistory[item.id]?.watchedSeconds || 0)}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            {/* Rails / Shelves with YouTube-Style Red Progress Bars */}
            <div className="space-y-8 sm:space-y-10 -mt-8 relative z-20">
              {activeShelves.map((shelf) => (
                <ContentRow
                  key={shelf.id}
                  title={shelf.title}
                  subtitle={shelf.subtitle}
                  badge={shelf.badge}
                  items={shelf.items}
                  onPlay={(item) => handlePlayVideo(item, watchHistory[item.id]?.watchedSeconds || 0)}
                  onMoreInfo={(item) => handlePlayVideo(item, watchHistory[item.id]?.watchedSeconds || 0)}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  watchHistory={watchHistory}
                />
              ))}
            </div>
          </>
        )}

      </main>

      {/* Sleek Minimal Streaming Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
          <span>🦛 HippiTV</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Low-Stimulation English for Babies & Toddlers
          </span>
        </div>
        <p className="text-[11px] max-w-lg mx-auto text-slate-500">
          Curated for healthy speech development with slow transitions, clear articulation, and zero rapid scene cuts.
        </p>
      </footer>

      {/* Video Player Modal with YouTube-Style Resume & Live Watch Progress */}
      {activeVideo && (
        <VideoPlayerModal
          item={activeVideo}
          onClose={() => setActiveVideo(null)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectRelated={(related) => handlePlayVideo(related, watchHistory[related.id]?.watchedSeconds || 0)}
          relatedItems={relatedItems}
          existingHistory={watchHistory[activeVideo.id]}
          initialStartSeconds={initialStartSeconds}
          onUpdateProgress={updateWatchProgress}
        />
      )}

      {/* My List Drawer */}
      <MyListDrawer
        isOpen={isMyListOpen}
        onClose={() => setIsMyListOpen(false)}
        favorites={favorites}
        allContents={CONTENTS}
        onPlayItem={(item) => handlePlayVideo(item, watchHistory[item.id]?.watchedSeconds || 0)}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
      />

      {/* Watch History Drawer (YouTube Style) */}
      <WatchHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        watchHistory={watchHistory}
        allContents={CONTENTS}
        onResumeVideo={(item, startSec) => handlePlayVideo(item, startSec)}
        onRemoveHistoryItem={removeHistoryItem}
        onClearHistory={clearHistory}
      />

      {/* Google Authentication Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
