import React, { useState } from 'react';
import { 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { TimelineEvent } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { evaluateTimelineOrder } from '../../engine/timelineEngine';
import { audioEngine } from '../../engine/audioEngine';

interface TimelineBoardProps {
  caseId: string;
  initialEvents: TimelineEvent[];
}

export const TimelineBoard: React.FC<TimelineBoardProps> = ({ caseId, initialEvents }) => {
  const { caseSessions, updateTimelineOrder, settings } = useGameStore();
  const session = caseSessions[caseId];

  // User ordering from session or default initialEvents
  const [orderedIds, setOrderedIds] = useState<string[]>(
    session?.timelineOrder && session.timelineOrder.length > 0
      ? session.timelineOrder
      : initialEvents.map(e => e.id)
  );

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'victim' | 'suspect' | 'police' | 'forensic'>('all');

  const orderedEvents = orderedIds
    .map(id => initialEvents.find(e => e.id === id))
    .filter((e): e is TimelineEvent => !!e);

  const validation = evaluateTimelineOrder(initialEvents, orderedIds);

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedIds.length) return;

    const newOrder = [...orderedIds];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setOrderedIds(newOrder);
    updateTimelineOrder(caseId, newOrder);
    if (settings.soundEffects) audioEngine.playTypewriterKey();
  };

  const resetToChronological = () => {
    const sorted = [...initialEvents]
      .sort((a, b) => a.timestampMinutes - b.timestampMinutes)
      .map(e => e.id);
    setOrderedIds(sorted);
    updateTimelineOrder(caseId, sorted);
    if (settings.soundEffects) audioEngine.playStampThud();
  };

  const filteredEvents = orderedEvents.filter(e => 
    activeCategoryFilter === 'all' || e.category === activeCategoryFilter
  );

  return (
    <div className="w-full h-full bg-[#0a0c10] p-4 sm:p-6 overflow-y-auto space-y-6 font-mono text-xs text-charcoal-200">
      {/* Top Header & Validation Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-charcoal-900 p-4 rounded border border-charcoal-750">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-terminal-amber" />
            <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              CHRONOLOGICAL TIMELINE RECONSTRUCTION
            </h2>
          </div>
          <p className="text-[11px] text-charcoal-400 font-sans mt-0.5">
            Arrange forensic timestamps and suspect statements into a coherent chronological sequence. Expose false alibis and time gaps.
          </p>
        </div>

        {/* Validation Score Pill */}
        <div className="flex items-center gap-3 bg-charcoal-950 p-2.5 rounded border border-charcoal-800">
          <div className="text-right">
            <div className="text-[9px] text-charcoal-500 uppercase">CHRONOLOGICAL INTEGRITY</div>
            <div className={`font-display text-lg font-bold ${
              validation.score >= 80 ? 'text-emerald-400' : validation.score >= 50 ? 'text-terminal-amber' : 'text-evidence-red'
            }`}>
              {validation.score}% ACCURACY
            </div>
          </div>
          <button
            onClick={resetToChronological}
            className="p-2 rounded bg-charcoal-850 hover:bg-charcoal-800 text-charcoal-400 hover:text-white border border-charcoal-750"
            title="Auto-Align to Verified Timestamps"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'victim', 'suspect', 'forensic', 'police'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
              activeCategoryFilter === cat
                ? 'bg-charcoal-750 text-white border border-charcoal-600'
                : 'bg-charcoal-900 text-charcoal-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'ALL TRACKS' : `${cat.toUpperCase()} TRACK`}
          </button>
        ))}
      </div>

      {/* Timeline Sequence List */}
      <div className="relative border-l-2 border-charcoal-800 ml-4 sm:ml-8 pl-4 sm:pl-8 space-y-4">
        {filteredEvents.map((evt, idx) => {
          const originalIndex = orderedIds.indexOf(evt.id);
          const isContradiction = evt.isContradiction;

          return (
            <div
              key={evt.id}
              className={`p-4 rounded border relative transition-all group ${
                isContradiction
                  ? 'bg-evidence-burgundy/20 border-evidence-red/60 shadow-[0_0_12px_rgba(185,28,28,0.2)]'
                  : 'bg-charcoal-900/90 border-charcoal-750 hover:border-charcoal-600'
              }`}
            >
              {/* Timeline Pin Node on the line */}
              <div className="absolute -left-[25px] sm:-left-[41px] top-5 w-4 h-4 rounded-full bg-charcoal-950 border-2 border-evidence-red flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-evidence-red" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Event Time & Title */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-charcoal-800 border border-charcoal-700 text-terminal-amber font-mono text-[11px] font-bold">
                      {evt.timeString} HRS
                    </span>
                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                      evt.category === 'victim' ? 'bg-red-950 text-red-300' :
                      evt.category === 'suspect' ? 'bg-purple-950 text-purple-300' : 'bg-emerald-950 text-emerald-300'
                    }`}>
                      {evt.category.toUpperCase()}
                    </span>
                    {isContradiction && (
                      <span className="stamp-confidential text-[8px] py-0 px-1 border-evidence-red text-evidence-crimson">
                        CONTRADICTION DETECTED
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-sm font-sans">
                    {evt.title}
                  </h3>
                  <p className="text-charcoal-300 font-sans text-xs">
                    {evt.description}
                  </p>

                  {isContradiction && evt.contradictionNote && (
                    <div className="p-2 bg-charcoal-950 border-l-2 border-evidence-red text-[11px] text-evidence-crimson font-mono mt-2">
                      ⚠️ FORENSIC CONFLICT: {evt.contradictionNote}
                    </div>
                  )}
                </div>

                {/* Move Up / Move Down Controls */}
                <div className="flex items-center gap-1 self-end sm:self-center">
                  <button
                    onClick={() => moveEvent(originalIndex, 'up')}
                    disabled={originalIndex === 0}
                    className="p-1.5 rounded bg-charcoal-850 hover:bg-charcoal-800 disabled:opacity-30 disabled:cursor-not-allowed text-charcoal-300 hover:text-white border border-charcoal-750"
                    title="Move Chronologically Earlier"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveEvent(originalIndex, 'down')}
                    disabled={originalIndex === orderedIds.length - 1}
                    className="p-1.5 rounded bg-charcoal-850 hover:bg-charcoal-800 disabled:opacity-30 disabled:cursor-not-allowed text-charcoal-300 hover:text-white border border-charcoal-750"
                    title="Move Chronologically Later"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
