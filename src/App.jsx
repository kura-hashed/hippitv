import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import BillboardHero from './components/BillboardHero';
import ContentRow from './components/ContentRow';
import VideoPlayerModal from './components/VideoPlayerModal';
import MyListDrawer from './components/MyListDrawer';
import { CONTENTS, SHELVES, AGE_TABS } from './data/contents';
import { Play, Sparkles, Heart, RotateCcw, ShieldCheck } from 'lucide-react';

export default function App() {
  const [selectedAge, setSelectedAge] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Favorites saved in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ykid_favorites');
      return saved ? JSON.parse(saved) : ['ms-rachel-first-words', 'bluey-conversations', 'super-simple-songs-baby'];
    } catch {
      return ['ms-rachel-first-words', 'bluey-conversations', 'super-simple-songs-baby'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ykid_favorites', JSON.stringify(favorites));
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

  // Video Player Modal state
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMyListOpen, setIsMyListOpen] = useState(false);

  // Billboard Featured Items depending on selected age
  const featuredItems = useMemo(() => {
    if (selectedAge === 'all') {
      return CONTENTS.filter(item => ['ms-rachel-first-words', 'bluey-conversations', 'super-simple-songs-baby', 'trash-truck-show'].includes(item.id));
    }
    const ageSpecific = CONTENTS.filter(item => item.targetAges.includes(selectedAge));
    return ageSpecific.length > 0 ? ageSpecific.slice(0, 4) : CONTENTS.slice(0, 3);
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

  // Dynamic Shelves based on selected age
  const activeShelves = useMemo(() => {
    if (selectedAge === 'all') {
      return SHELVES.map(shelf => ({
        ...shelf,
        items: CONTENTS.filter(shelf.filterFn)
      }));
    }

    // When an age is selected (e.g. 2 Years), build age-dedicated rows
    const ageItems = CONTENTS.filter(item => item.targetAges.includes(selectedAge));
    const ultraGentle = ageItems.filter(item => item.stimulation === 'Calm' && (item.tags.includes('Zero Scares') || item.tags.includes('Emotional Security') || item.tags.includes('Cuddly') || item.tags.includes('Low Stimulation')));
    const calmItems = ageItems.filter(item => item.stimulation === 'Calm');
    const songItems = ageItems.filter(item => item.category === 'song');
    const storyItems = ageItems.filter(item => item.category === 'book' || item.category === 'video');

    const result = [];

    // For 2 Years: Showcase the ultra-gentle, non-scary cozy row right at the very top!
    if (selectedAge === '2' && ultraGentle.length > 0) {
      result.push({
        id: `age-2-ultra-gentle`,
        title: '🐰 Ultra-Gentle & Cozy (Zero Scares, 100% Cuddly)',
        subtitle: 'Soft bunnies, gentle ducks, warm hugs, and zero loud surprises',
        badge: 'ZERO SCARES',
        items: ultraGentle
      });
    }

    result.push({
      id: `age-${selectedAge}-top`,
      title: `★ Top Picks for ${AGE_TABS.find(t => t.id === selectedAge)?.label || 'This Age'}`,
      subtitle: 'Curated gentle and speech-boosting favorites',
      badge: 'TOP PICKS',
      items: ageItems
    });

    if (calmItems.length > 0 && selectedAge !== '2') {
      result.push({
        id: `age-${selectedAge}-calm`,
        title: '🌿 Low-Stimulation & Calm Pacing',
        subtitle: 'Zero fast cuts, acoustic sound, and speech modeling',
        badge: 'CALM',
        items: calmItems
      });
    }

    if (songItems.length > 0) {
      result.push({
        id: `age-${selectedAge}-songs`,
        title: '🎵 Rhymes & Action Songs',
        subtitle: 'Melodic repetition for auditory learning',
        badge: 'MUSIC',
        items: songItems
      });
    }

    if (storyItems.length > 0) {
      result.push({
        id: `age-${selectedAge}-stories`,
        title: '📖 Stories & Gentle Shows',
        subtitle: 'Character dialogue and rich vocabulary',
        badge: 'STORIES',
        items: storyItems
      });
    }

    return result;
  }, [selectedAge]);

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
      
      {/* Top Navbar */}
      <Navbar
        selectedAge={selectedAge}
        onSelectAge={setSelectedAge}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        onOpenMyList={() => setIsMyListOpen(true)}
      />

      <main className="flex-1 pb-16">
        
        {/* If searching, show direct search results grid */}
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Search</span>
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveVideo(item)}
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
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950">
                        {item.ageDisplay}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-slate-300">
                        {item.duration}
                      </span>
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
                ))}
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
              onPlay={(item) => setActiveVideo(item)}
              onMoreInfo={(item) => setActiveVideo(item)}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            {/* Rails / Shelves */}
            <div className="space-y-8 sm:space-y-10 -mt-8 relative z-20">
              {activeShelves.map((shelf) => (
                <ContentRow
                  key={shelf.id}
                  title={shelf.title}
                  subtitle={shelf.subtitle}
                  badge={shelf.badge}
                  items={shelf.items}
                  onPlay={(item) => setActiveVideo(item)}
                  onMoreInfo={(item) => setActiveVideo(item)}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </>
        )}

      </main>

      {/* Sleek Minimal Streaming Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
          <span>🐣 YKidTV</span>
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

      {/* Video Player Modal (Plays directly inside the app!) */}
      {activeVideo && (
        <VideoPlayerModal
          item={activeVideo}
          onClose={() => setActiveVideo(null)}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectRelated={(related) => setActiveVideo(related)}
          relatedItems={relatedItems}
        />
      )}

      {/* My List Drawer */}
      <MyListDrawer
        isOpen={isMyListOpen}
        onClose={() => setIsMyListOpen(false)}
        favorites={favorites}
        allContents={CONTENTS}
        onPlayItem={(item) => setActiveVideo(item)}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
      />

    </div>
  );
}
