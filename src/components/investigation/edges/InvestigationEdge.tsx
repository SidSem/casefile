import React from 'react';
import { 
  BaseEdge, 
  EdgeLabelRenderer, 
  getBezierPath, 
  type EdgeProps 
} from '@xyflow/react';
import { X } from 'lucide-react';
import { ConnectionRelationship } from '../../../types/case';

export interface CustomEdgeData {
  relationship?: ConnectionRelationship;
  label?: string;
  onDelete?: (id: string) => void;
}

export const InvestigationEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeData = data as CustomEdgeData | undefined;
  const relationship = edgeData?.relationship || 'related_to';

  const getBadgeColor = () => {
    switch (relationship) {
      case 'supports':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-600/70';
      case 'contradicts':
        return 'bg-red-950/90 text-red-300 border-red-600/80';
      case 'establishes_timeline':
        return 'bg-amber-950/90 text-amber-300 border-amber-600/70';
      case 'possible_motive':
        return 'bg-purple-950/90 text-purple-300 border-purple-600/70';
      default:
        return 'bg-charcoal-900/90 text-charcoal-200 border-charcoal-600';
    }
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: relationship === 'contradicts' ? '#ef4444' : '#dc2626',
          strokeWidth: selected ? 3.5 : 2.5,
          strokeDasharray: relationship === 'contradicts' ? '3 3' : '5 3',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="flex items-center gap-1 group z-20 select-none"
        >
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border shadow-md ${getBadgeColor()}`}
          >
            {relationship.replace('_', ' ')}
          </span>
          {edgeData?.onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                edgeData.onDelete?.(id);
              }}
              className="p-0.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-charcoal-400 hover:text-white hover:bg-evidence-red opacity-0 group-hover:opacity-100 transition-opacity"
              title="Sever Connection String"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
