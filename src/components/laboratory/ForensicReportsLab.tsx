import React, { useState } from 'react';
import { Microscope, Activity, Dna, CheckCircle2, AlertOctagon, Sliders } from 'lucide-react';
import { ForensicData } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface ForensicReportsLabProps {
  forensicReport: ForensicData;
  evidenceTitle: string;
}

export const ForensicReportsLab: React.FC<ForensicReportsLabProps> = ({
  forensicReport,
  evidenceTitle,
}) => {
  const { settings, unlockAchievement } = useGameStore();
  const [sliderVal, setSliderVal] = useState(50);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzed(true);
    if (settings.soundEffects) {
      audioEngine.playContradictionStinger();
    }
    unlockAchievement('forensic_prodigy');
  };

  return (
    <div className="space-y-5 font-mono text-xs text-charcoal-200">
      {/* Header */}
      <div className="flex items-center justify-between bg-charcoal-900 p-3 rounded border border-charcoal-750">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white uppercase tracking-wider">
            FORENSIC WORKSTATION // {forensicReport.type.toUpperCase()} ANALYSIS
          </span>
        </div>
        <span className="stamp-verified text-[9px] py-0 px-1 border-emerald-500 text-emerald-400">
          CHAIN CERTIFIED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Visual Forensic Instrument Area */}
        <div className="bg-charcoal-950 p-4 rounded border border-charcoal-800 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
            <span className="text-[10px] text-charcoal-400 font-bold uppercase">
              SPECIMEN IMAGING INTERFACE
            </span>
            <span className="text-[10px] text-emerald-400 animate-pulse">● SENSOR ONLINE</span>
          </div>

          {/* DNA Gel Electrophoresis Visualization */}
          {forensicReport.type === 'dna' && (
            <div className="space-y-3">
              <div className="h-44 bg-[#0a1012] border border-cyan-900/60 rounded p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="text-[10px] text-cyan-400/80 flex justify-between font-mono">
                  <span>[-] CATHODE</span>
                  <span>AGAROSE GEL 1.8%</span>
                  <span>[+] ANODE</span>
                </div>

                {/* Gel lanes */}
                <div className="grid grid-cols-4 gap-4 h-28 my-auto border-t border-b border-cyan-900/40 py-2">
                  <div className="border-r border-cyan-950 flex flex-col justify-around items-center">
                    <span className="text-[8px] text-charcoal-500">LADDER</span>
                    <div className="w-6 h-1 bg-cyan-400/80 rounded" />
                    <div className="w-6 h-1 bg-cyan-400/80 rounded" />
                    <div className="w-6 h-1 bg-cyan-400/80 rounded" />
                  </div>
                  <div className="border-r border-cyan-950 flex flex-col justify-around items-center">
                    <span className="text-[8px] text-charcoal-500">VICTIM</span>
                    <div className="w-6 h-1 bg-emerald-500/80 rounded" />
                    <div className="w-6 h-1 bg-emerald-500/80 rounded" />
                  </div>
                  <div className="border-r border-cyan-950 flex flex-col justify-around items-center bg-cyan-950/20">
                    <span className="text-[8px] text-cyan-300 font-bold">SPECIMEN</span>
                    {forensicReport.gelBands?.map((b, i) => (
                      <div key={i} className="w-6 h-1 bg-cyan-300 shadow-[0_0_8px_#22d3ee] rounded" />
                    )) || (
                      <>
                        <div className="w-6 h-1 bg-cyan-300 rounded" />
                        <div className="w-6 h-1 bg-cyan-300 rounded" />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col justify-around items-center">
                    <span className="text-[8px] text-evidence-crimson font-bold">SUSPECT</span>
                    <div className="w-6 h-1 bg-evidence-red shadow-[0_0_8px_#ef4444] rounded" />
                    <div className="w-6 h-1 bg-evidence-red shadow-[0_0_8px_#ef4444] rounded" />
                  </div>
                </div>

                <div className="text-[9px] text-cyan-400 font-mono text-center">
                  MATCH PROBABILITY RATIO: 1 IN 4.8 BILLION
                </div>
              </div>
            </div>
          )}

          {/* Fingerprint / Ballistics Comparison Slider */}
          {(forensicReport.type === 'fingerprint' || forensicReport.type === 'ballistics') && (
            <div className="space-y-3">
              <div className="h-44 bg-charcoal-900 border border-charcoal-750 rounded p-2 relative flex items-center justify-center overflow-hidden">
                {/* Left specimen */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-neutral-900 flex items-center justify-center border-r border-evidence-red overflow-hidden"
                  style={{ width: `${sliderVal}%` }}
                >
                  <div className="text-center p-4">
                    <div className="font-mono text-[9px] text-emerald-400 font-bold mb-1">
                      [CRIME SCENE LIFT]
                    </div>
                    <div className="w-20 h-28 border border-dashed border-emerald-500/50 rounded flex items-center justify-center mx-auto bg-black/60">
                      <Microscope className="w-8 h-8 text-emerald-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Right comparison */}
                <div className="absolute right-0 top-0 bottom-0 left-0 -z-0 bg-neutral-950 flex items-center justify-end p-4">
                  <div className="text-center pr-6">
                    <div className="font-mono text-[9px] text-evidence-crimson font-bold mb-1">
                      [REFERENCE CARD]
                    </div>
                    <div className="w-20 h-28 border border-dashed border-evidence-red/50 rounded flex items-center justify-center mx-auto bg-black/60">
                      <Activity className="w-8 h-8 text-evidence-crimson" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-charcoal-400">
                  <span>Comparison Overlay Split</span>
                  <span>{sliderVal}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="w-full accent-evidence-red bg-charcoal-800 h-1 rounded"
                />
              </div>
            </div>
          )}

          {/* Toxicology / Autopsy View */}
          {(forensicReport.type === 'toxicology' || forensicReport.type === 'autopsy') && (
            <div className="h-44 bg-[#0d1217] border border-amber-900/50 rounded p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-terminal-amber font-mono">
                <span>CHROMATOGRAPHY HPLC PEAK</span>
                <span>RETENTION: 4.82 MIN</span>
              </div>

              {/* Simulated Spectral Chart */}
              <div className="flex items-end gap-1.5 h-24 border-b border-amber-900/60 pb-1">
                <div className="w-3 bg-amber-500/20 h-4 rounded-t" />
                <div className="w-3 bg-amber-500/30 h-6 rounded-t" />
                <div className="w-3 bg-amber-500/40 h-8 rounded-t" />
                <div className="w-4 bg-evidence-red h-20 rounded-t shadow-[0_0_8px_#ef4444]" />
                <div className="w-3 bg-amber-500/40 h-10 rounded-t" />
                <div className="w-3 bg-amber-500/20 h-5 rounded-t" />
                <div className="w-3 bg-amber-500/10 h-3 rounded-t" />
              </div>

              <div className="text-[10px] text-charcoal-400 flex justify-between">
                <span>COMPOUND: <strong className="text-white">{forensicReport.chemicalCompound || 'Digoxin Glycoside'}</strong></span>
                <span className="text-evidence-red font-bold">FATAL DOSE EXCEEDED</span>
              </div>
            </div>
          )}

          {/* Action Trigger */}
          <button
            onClick={handleRunAnalysis}
            className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 rounded font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>EXECUTE SPECTRAL VERIFICATION</span>
          </button>
        </div>

        {/* Forensic Metrics Readout */}
        <div className="bg-charcoal-900 p-4 rounded border border-charcoal-750 space-y-4">
          <div className="border-b border-charcoal-800 pb-2">
            <span className="text-[10px] text-evidence-red font-bold uppercase tracking-wider">
              QUANTITATIVE FINDINGS
            </span>
            <div className="font-bold text-white text-sm mt-0.5">{evidenceTitle}</div>
          </div>

          <p className="text-charcoal-300 font-sans text-xs leading-relaxed bg-charcoal-950 p-2.5 rounded border border-charcoal-800">
            {forensicReport.summary}
          </p>

          <div className="space-y-2">
            {forensicReport.metrics.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-charcoal-850 border border-charcoal-750"
              >
                <span className="text-charcoal-400 text-[11px]">{m.label}</span>
                <span className="font-mono font-bold text-white text-[11px] flex items-center gap-1.5">
                  {m.match && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {forensicReport.rawDetails && (
            <div className="space-y-1 pt-1">
              {forensicReport.rawDetails.map((d, i) => (
                <div key={i} className="text-[10px] text-charcoal-400 flex items-start gap-1.5">
                  <span className="text-emerald-400">▪</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
