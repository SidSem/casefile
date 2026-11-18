import { TimelineEvent } from '../types/case';

export interface TimelineValidationResult {
  score: number; // 0-100
  isCorrectOrder: boolean;
  detectedContradictions: {
    eventId: string;
    description: string;
  }[];
  unplacedCount: number;
}

export function evaluateTimelineOrder(
  events: TimelineEvent[],
  userOrderedIds: string[]
): TimelineValidationResult {
  if (userOrderedIds.length === 0) {
    return {
      score: 50,
      isCorrectOrder: false,
      detectedContradictions: [],
      unplacedCount: events.length
    };
  }

  // Check correct sorted order by timestampMinutes
  const sortedExpectedIds = [...events]
    .sort((a, b) => a.timestampMinutes - b.timestampMinutes)
    .map(e => e.id);

  let correctPairs = 0;
  let totalPairs = 0;

  for (let i = 0; i < userOrderedIds.length - 1; i++) {
    const currentId = userOrderedIds[i];
    const nextId = userOrderedIds[i + 1];

    const currentEvent = events.find(e => e.id === currentId);
    const nextEvent = events.find(e => e.id === nextId);

    if (currentEvent && nextEvent) {
      totalPairs++;
      if (currentEvent.timestampMinutes <= nextEvent.timestampMinutes) {
        correctPairs++;
      }
    }
  }

  const detectedContradictions: { eventId: string; description: string }[] = [];
  events.forEach(e => {
    if (e.isContradiction && e.contradictionNote) {
      detectedContradictions.push({
        eventId: e.id,
        description: e.contradictionNote
      });
    }
  });

  const orderRatio = totalPairs > 0 ? (correctPairs / totalPairs) : 1;
  const placementRatio = userOrderedIds.length / events.length;
  const score = Math.round((orderRatio * 0.7 + placementRatio * 0.3) * 100);

  return {
    score: Math.max(20, Math.min(100, score)),
    isCorrectOrder: orderRatio >= 0.9,
    detectedContradictions,
    unplacedCount: Math.max(0, events.length - userOrderedIds.length)
  };
}
