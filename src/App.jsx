import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import AgeFilterBar from './components/AgeFilterBar';
import CategoryFilter from './components/CategoryFilter';
import ContentCard from './components/ContentCard';
import DetailModal from './components/DetailModal';
import SpeechMilestonesModal from './components/SpeechMilestonesModal';
import HealthyGuideModal from './components/HealthyGuideModal';
import RoutinePlannerModal from './components/RoutinePlannerModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import Footer from './components/Footer';
import { CONTENTS } from './data/contents';
import { Sparkles, Baby, Frown, RotateCcw } from 'lucide-react';

export default function App() {
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStimulation, setSelectedStimulation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Favorites in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ykid_favorites');
      return saved ? JSON.parse(saved) : ['ms-rachel-first-words', 'brown-bear-book'];
    } catch {
      return ['ms-rachel-first-words', 'brown-bear-book'];
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

  // Modals state
  const [detailItem, setDetailItem] = useState(null);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [milestonesAge, setMilestonesAge] = useState('2');
  const [isHealthyGuideOpen, setIsHealthyGuideOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Handlers to open modals
  const handleOpenMilestones = (age = '2') => {
    setMilestonesAge(age === 'all' ? '2' : age);
    setIsMilestonesOpen(true);
  };

  // Filtered contents
  const filteredContents = useMemo(() => {
    return CONTENTS.filter(item => {
      // Age filter
      if (selectedAge !== 'all' && !item.targetAges.includes(selectedAge)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Stimulation pacing filter
      if (selectedStimulation !== 'all' && item.stimulationLevel !== selectedStimulation) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCreator = item.creator.toLowerCase().includes(query);
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchHealthy = item.whyHealthy.toLowerCase().includes(query);
        const matchVocab = item.keyVocabulary.some(v => v.toLowerCase().includes(query));
        const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
        return matchTitle || matchCreator || matchSummary || matchHealthy || matchVocab || matchTags;
      }
      return true;
    });
  }, [selectedAge, selectedCategory, selectedStimulation, searchTerm]);

  const isFiltered = selectedAge !== 'all' || selectedCategory !== 'all' || selectedStimulation !== 'all' || searchTerm.trim() !== '';

  const handleResetFilters = () => {
    setSelectedAge('all');
    setSelectedCategory('all');
    setSelectedStimulation('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-800">
      
      {/* Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenMilestones={() => handleOpenMilestones(selectedAge)}
        onOpenHealthyGuide={() => setIsHealthyGuideOpen(true)}
        onOpenRoutine={() => setIsRoutineOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Banner */}
        <HeroBanner
          selectedAge={selectedAge}
          onSelectAge={setSelectedAge}
          onOpenHealthyGuide={() => setIsHealthyGuideOpen(true)}
          onOpenMilestones={() => handleOpenMilestones(selectedAge)}
        />

        {/* Primary Age Filter Bar */}
        <AgeFilterBar
          selectedAge={selectedAge}
          onSelectAge={setSelectedAge}
          onOpenMilestones={handleOpenMilestones}
        />

        {/* Category & Stimulation Filter Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStimulation={selectedStimulation}
          onSelectStimulation={setSelectedStimulation}
          totalResultsCount={filteredContents.length}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelectDetail={(it) => setDetailItem(it)}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center mx-auto text-3xl shadow-sm">
                🔍
              </div>
              <h3 className="text-xl font-black text-slate-800">
                No matching content found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                We couldn't find any items matching your active filters. Try broadening your age group or search terms.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer
        onSelectAge={setSelectedAge}
        onOpenHealthyGuide={() => setIsHealthyGuideOpen(true)}
        onOpenMilestones={() => handleOpenMilestones(selectedAge)}
        onOpenRoutine={() => setIsRoutineOpen(true)}
      />

      {/* Modals & Drawers */}
      {detailItem && (
        <DetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          isFavorite={favorites.includes(detailItem.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {isMilestonesOpen && (
        <SpeechMilestonesModal
          initialAge={milestonesAge}
          onClose={() => setIsMilestonesOpen(false)}
        />
      )}

      {isHealthyGuideOpen && (
        <HealthyGuideModal
          onClose={() => setIsHealthyGuideOpen(false)}
        />
      )}

      {isRoutineOpen && (
        <RoutinePlannerModal
          initialAge={selectedAge === 'all' ? '2' : selectedAge}
          onClose={() => setIsRoutineOpen(false)}
        />
      )}

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        allContents={CONTENTS}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
        onSelectDetail={(it) => {
          setIsFavoritesOpen(false);
          setDetailItem(it);
        }}
      />

    </div>
  );
}
