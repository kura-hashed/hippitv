import React from 'react';
import { AGE_GROUPS } from '../data/contents';
import { AGE_MILESTONES } from '../data/ageMilestones';
import { Sparkles, Brain, Baby, Footprints, MessageCircle, BookOpen, Compass } from 'lucide-react';

export default function AgeFilterBar({ selectedAge, onSelectAge, onOpenMilestones }) {
  const activeMilestone = AGE_MILESTONES[selectedAge];

  const getAgeIcon = (id) => {
    switch (id) {
      case '0-1':
        return '🍼';
      case '2':
        return '🧸';
      case '3':
        return '🎨';
      case '4':
        return '🧩';
      case '5':
        return '🚀';
      default:
        return '✨';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <span>Filter by Child’s Age</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
              Select Age Stage
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Language pacing and brain development change dramatically every 12 months.
          </p>
        </div>

        {selectedAge !== 'all' && (
          <button
            onClick={() => onSelectAge('all')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 underline self-start sm:self-auto cursor-pointer"
          >
            Reset to All Ages
          </button>
        )}
      </div>

      {/* Age Selector Tabs / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {AGE_GROUPS.map((group) => {
          const isSelected = selectedAge === group.id;
          return (
            <button
              key={group.id}
              onClick={() => onSelectAge(group.id)}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/25 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50/60 text-slate-700 border-slate-200/80 hover:border-amber-300 shadow-2xs hover:shadow-sm'
              }`}
            >
              {/* Top Age Icon */}
              <span className={`text-2xl mb-1.5 transition-transform group-hover:scale-110 ${isSelected ? 'scale-110' : ''}`}>
                {getAgeIcon(group.id)}
              </span>

              {/* Age Label */}
              <span className={`text-sm font-extrabold tracking-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                {group.label}
              </span>

              {/* Age Subtitle */}
              <span className={`text-[11px] font-medium mt-0.5 line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                {group.subtitle}
              </span>

              {/* Active Indicator Pin */}
              {isSelected && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-600 rotate-45 rounded-2xs" />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Age Overview Insight Banner */}
      {selectedAge !== 'all' && activeMilestone && (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{getAgeIcon(selectedAge)}</span>
              <span className="font-extrabold text-sm sm:text-base text-amber-950">
                {activeMilestone.title}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white text-amber-800 font-bold border border-amber-200">
                {activeMilestone.vocabularySize}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              💡 <span className="font-bold">Healthy Screen Guideline:</span> {activeMilestone.healthyExposureTip}
            </p>
          </div>

          <button
            onClick={() => onOpenMilestones(selectedAge)}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs transition-all hover:scale-102"
          >
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            <span>View Full Age {selectedAge} Milestone Guide</span>
          </button>
        </div>
      )}

    </div>
  );
}
