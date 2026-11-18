import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Link as LinkIcon } from 'lucide-react';
import { PhotoNode } from './nodes/PhotoNode';
import { DocumentNode } from './nodes/DocumentNode';
import { ForensicNode } from './nodes/ForensicNode';
import { NoteNode } from './nodes/NoteNode';
import { VictimNode } from './nodes/VictimNode';
import { InvestigationEdge } from './edges/InvestigationEdge';
import { useGameStore } from '../../store/useGameStore';
import { ConnectionRelationship } from '../../types/case';
import { audioEngine } from '../../engine/audioEngine';

interface BoardCanvasProps {
  caseId: string;
  onOpenEvidenceInLab: (evidenceId: string) => void;
}

export const BoardCanvas: React.FC<BoardCanvasProps> = ({ caseId, onOpenEvidenceInLab }) => {
  const { caseSessions, updateBoardNodes, updateBoardEdges, settings } = useGameStore();
  const session = caseSessions[caseId];

  // Relationship selection dialog for new connections
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);

  const nodeTypes = useMemo(() => ({
    photo: PhotoNode,
    document: DocumentNode,
    forensic: ForensicNode,
    note: NoteNode,
    victim: VictimNode,
  }), []);

  const edgeTypes = useMemo(() => ({
    investigation: InvestigationEdge,
  }), []);

  const rawNodes = session?.boardNodes || [];
  const rawEdges = session?.boardEdges || [];

  // Format nodes with handlers
  const nodes: Node[] = useMemo(() => {
    return rawNodes.map(n => ({
      ...n,
      data: {
        ...n.data,
        onInspect: (evidenceId: string) => onOpenEvidenceInLab(evidenceId),
        onUpdateText: (newText: string) => {
          const updated = rawNodes.map(node => 
            node.id === n.id ? { ...node, data: { ...node.data, snippet: newText } } : node
          );
          updateBoardNodes(caseId, updated);
        }
      }
    }));
  }, [rawNodes, caseId, updateBoardNodes, onOpenEvidenceInLab]);

  // Format edges with delete handler
  const edges: Edge[] = useMemo(() => {
    return rawEdges.map(e => ({
      ...e,
      type: 'investigation',
      data: {
        relationship: ((e as Record<string, unknown>).data as Record<string, unknown> | undefined)?.relationship || (e as Record<string, unknown>).relationship || 'related_to',
        onDelete: (edgeId: string) => {
          const updated = rawEdges.filter(ed => ed.id !== edgeId);
          updateBoardEdges(caseId, updated);
          if (settings.soundEffects) audioEngine.playStringPluck();
        }
      }
    }));
  }, [rawEdges, caseId, updateBoardEdges, settings.soundEffects]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, rawNodes as unknown as Node[]) as unknown as typeof rawNodes;
      updateBoardNodes(caseId, updatedNodes);
    },
    [rawNodes, caseId, updateBoardNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, rawEdges as unknown as Edge[]) as unknown as typeof rawEdges;
      updateBoardEdges(caseId, updatedEdges);
    },
    [rawEdges, caseId, updateBoardEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setPendingConnection(params);
    },
    []
  );

  const confirmConnection = (rel: ConnectionRelationship) => {
    if (!pendingConnection) return;
    const newEdgeId = `edge-${pendingConnection.source}-${pendingConnection.target}-${Date.now()}`;
    const newEdge = {
      id: newEdgeId,
      source: pendingConnection.source,
      target: pendingConnection.target,
      type: 'investigation',
      relationship: rel,
      data: {
        relationship: rel,
      }
    };
    const updated = [...rawEdges, newEdge];
    updateBoardEdges(caseId, updated);
    setPendingConnection(null);
  };

  const handleAddNote = () => {
    const noteId = `note-${Date.now()}`;
    const newNode = {
      id: noteId,
      type: 'note',
      position: { x: 400 + Math.random() * 60, y: 350 + Math.random() * 60 },
      data: {
        id: noteId,
        title: 'AGENT OBSERVATION',
        snippet: 'Suspect alibi does not align with forensic window.',
        category: 'note',
      }
    };
    updateBoardNodes(caseId, [...rawNodes, newNode]);
    if (settings.soundEffects) audioEngine.playStampThud();
  };

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    const evId = (node.data as { evidenceId?: string })?.evidenceId;
    if (evId) {
      onOpenEvidenceInLab(evId);
    }
  }, [onOpenEvidenceInLab]);

  return (
    <div className="w-full h-full relative bg-[#0a0c10] overflow-hidden select-none">
      {/* Floating Tactical Canvas Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-charcoal-900/90 backdrop-blur border border-charcoal-700 p-1.5 rounded shadow-2xl font-mono text-xs">
        <button
          onClick={handleAddNote}
          className="px-3 py-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-amber-300 rounded flex items-center gap-1.5 transition-colors"
          title="Pin a new Sticky Note on Board"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD NOTE</span>
        </button>

        <span className="w-px h-4 bg-charcoal-700 mx-1" />

        <div className="text-[11px] text-charcoal-400 px-2 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-evidence-red" />
          <span>DRAG HANDLES TO CONNECT CLUES</span>
        </div>
      </div>

      {/* React Flow Board */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.8}
        className="investigation-grid"
      >
        <Background color="#2a313d" gap={24} size={1.2} />
        <Controls 
          className="!bg-charcoal-900 !border-charcoal-700 !text-charcoal-200 fill-charcoal-200" 
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'victim') return '#dc2626';
            if (n.type === 'photo') return '#3b82f6';
            if (n.type === 'document') return '#eab308';
            if (n.type === 'forensic') return '#10b981';
            return '#f59e0b';
          }}
          className="!bg-charcoal-950/90 !border !border-charcoal-800 rounded overflow-hidden"
          maskColor="rgba(0, 0, 0, 0.7)"
        />
      </ReactFlow>

      {/* Relationship Selector Modal (When connecting two clues) */}
      {pendingConnection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-charcoal-900 border border-charcoal-700 rounded p-5 space-y-4 shadow-2xl font-mono text-xs">
            <div className="border-b border-charcoal-750 pb-2">
              <span className="text-[10px] text-evidence-red font-bold uppercase tracking-wider">
                TACTICAL LINK ESTABLISHED
              </span>
              <h3 className="font-display text-base font-bold text-white uppercase mt-0.5">
                SELECT CLUE CORRELATION
              </h3>
            </div>

            <div className="space-y-2">
              {(
                [
                  { id: 'supports', label: 'SUPPORTS', desc: 'Corroborates evidence or verifies statement' },
                  { id: 'contradicts', label: 'CONTRADICTS', desc: 'Refutes alibi or exposes inconsistency' },
                  { id: 'establishes_timeline', label: 'ESTABLISHES TIMELINE', desc: 'Fixes chronological sequence' },
                  { id: 'possible_motive', label: 'POSSIBLE MOTIVE', desc: 'Indicates financial or personal drive' },
                  { id: 'related_to', label: 'RELATED TO', desc: 'Circumstantial or indirect link' },
                ] as const
              ).map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => confirmConnection(rel.id)}
                  className="w-full text-left p-2.5 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 hover:border-evidence-red/60 transition-colors group"
                >
                  <div className="font-bold text-white group-hover:text-evidence-crimson">
                    {rel.label}
                  </div>
                  <div className="text-[10px] text-charcoal-400 mt-0.5">{rel.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPendingConnection(null)}
                className="px-3 py-1.5 text-charcoal-400 hover:text-white rounded"
              >
                DISCARD LINK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
