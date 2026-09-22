import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Award, CheckCircle, FileText, Shirt, Shield, Play } from 'lucide-react';
import { sound } from '../utils/audio';

interface WashItem {
  id: string;
  name: string;
  beforeLabel: string;
  afterLabel: string;
  beforeStatus: string;
  afterStatus: string;
  appointedMinistry: string;
  dirtyIcon: string;
}

const WASH_ITEMS: WashItem[] = [
  {
    id: 'scam-file',
    name: '₹70,000 Crore Irrigation File',
    beforeLabel: 'Tainted Red Tape Charge Sheet',
    afterLabel: 'Golden Clean Chit Certificate',
    beforeStatus: 'Pending High Court Summons',
    afterStatus: 'File Disposed & Sealed Forever',
    appointedMinistry: 'Hon’ble Deputy Chief Minister & Finance Head',
    dirtyIcon: '📁',
  },
  {
    id: 'dirty-kurta',
    name: 'Accused Politician Kurta',
    beforeLabel: 'Splattered with Panama & Mud',
    afterLabel: 'Spotless 100% Khadi White Kurta',
    beforeStatus: 'Opposition Spokesperson Target',
    afterStatus: 'Garlanded & Welcomed on Stage',
    appointedMinistry: 'Union Cabinet Minister for Heavy Industries',
    dirtyIcon: '👔',
  },
  {
    id: 'swiss-ledger',
    name: 'Swiss Bank Passbook',
    beforeLabel: 'Undisclosed Black Money Entry',
    afterLabel: 'Declared White Philanthropy Bond',
    beforeStatus: 'Tax Department Red Alert',
    afterStatus: 'Fully Converted to National Development Donation',
    appointedMinistry: 'Minister of State for Commerce & Export',
    dirtyIcon: '📒',
  },
  {
    id: 'paper-leak',
    name: 'Vyapam Exam Answer Sheet',
    beforeLabel: 'Proxy Roll Number Irregularities',
    afterLabel: 'Merit List First Rank Award',
    beforeStatus: 'Special Task Force Scrutiny',
    afterStatus: 'Computer Server Error Declared; Closed',
    appointedMinistry: 'Hon’ble Minister for Higher Education',
    dirtyIcon: '📄',
  },
];

export const WashingMachineSimulator: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<WashItem>(WASH_ITEMS[0]);
  const [isWashing, setIsWashing] = useState<boolean>(false);
  const [washProgress, setWashProgress] = useState<number>(0);
  const [washStepText, setWashStepText] = useState<string>('Ready for wash cycle');
  const [isClean, setIsClean] = useState<boolean>(false);

  // Trigger the cartoon washing cycle
  const handleStartWash = () => {
    if (isWashing) return;
    setIsWashing(true);
    setIsClean(false);
    setWashProgress(0);
    sound.playWashingSound();
    sound.playDrumBeat();

    // Sequence of funny stages during the wash
    const steps = [
      { at: 15, text: 'Adding 1 Scoop Modi Washing Powder (Neebu Formula)...' },
      { at: 35, text: 'Agitating water... Dissolving CBI & ED notices...' },
      { at: 60, text: '56-inch Ultrasonic spin cycle wiping all FIRs...' },
      { at: 85, text: 'Rinsing with sacred Hydro-stream... Applying perfume...' },
      { at: 100, text: 'WASH COMPLETE! 100% Spotless Clean Chit Generated!' },
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setWashProgress(currentProgress);

      const step = steps.find((s) => s.at <= currentProgress && s.at > currentProgress - 3);
      if (step) {
        setWashStepText(step.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsWashing(false);
        setIsClean(true);
        sound.playVictoryChime();
        sound.playDrumPattern();

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ea580c', '#f59e0b', '#3b82f6', '#10b981'],
          });
        } catch {
          // Ignore
        }
      }
    }, 50);
  };

  const handleReset = () => {
    setIsClean(false);
    setWashProgress(0);
    setWashStepText('Ready for wash cycle');
    sound.playBubblePop();
  };

  return (
    <div id="washing-machine-section" className="bg-amber-100/70 p-5 sm:p-8 rounded-3xl cartoon-card-lg">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="bg-orange-500 text-white font-bungee text-xs px-3 py-1 rounded-full cartoon-card-sm inline-block rotate-[-2deg] mb-2">
          INTERACTIVE DHOBI GHAT 3000
        </span>
        <h3 className="font-bungee text-2xl sm:text-4xl text-slate-900 tracking-tight">
          Scam Washing Simulator
        </h3>
        <p className="text-sm font-semibold text-slate-700 mt-1">
          Pick any dirty scam or tainted file, pour Modi Washing Powder, and watch it turn into pure ministerial gold in seconds!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Choose What to Wash */}
        <div className="lg:col-span-4 space-y-3">
          <label className="font-extrabold text-sm text-slate-900 uppercase tracking-wide block">
            1. Select Tainted Item to Cleanse:
          </label>

          <div className="space-y-2">
            {WASH_ITEMS.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  id={`wash-item-select-${item.id}`}
                  onClick={() => {
                    if (isWashing) return;
                    sound.playBubblePop();
                    setSelectedItem(item);
                    setIsClean(false);
                    setWashProgress(0);
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all border-2 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-[3px_3px_0px_#0f172a]'
                      : 'bg-amber-50/80 border-amber-300 hover:border-slate-800'
                  }`}
                >
                  <span className="text-2xl p-1.5 bg-amber-200 rounded-lg border border-slate-800">
                    {item.dirtyIcon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-red-600 font-semibold truncate">
                      {item.beforeStatus}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-3 rounded-xl cartoon-card-sm text-xs space-y-1">
            <span className="font-bold text-orange-600 uppercase text-[10px] block">
              Detergent Formula Active:
            </span>
            <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Modi Washing Powder (Triple Action Enzyme)
            </p>
          </div>
        </div>

        {/* Center: The Cartoon Washing Machine */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-64 sm:w-72 bg-slate-100 rounded-3xl p-5 cartoon-card-lg flex flex-col items-center">
            {/* Top Control Panel */}
            <div className="w-full flex items-center justify-between bg-slate-800 text-white px-3 py-1.5 rounded-xl cartoon-card-sm mb-4">
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${isWashing ? 'bg-green-400 animate-ping' : 'bg-green-500'}`} />
                <span className="text-[11px] font-black tracking-wider uppercase">
                  {isWashing ? 'SPINNING...' : isClean ? 'CLEAN CHIT' : 'READY'}
                </span>
              </div>
              <span className="font-mono text-xs text-yellow-300 font-bold">
                {isWashing ? `${washProgress}%` : isClean ? '100%' : '0%'}
              </span>
            </div>

            {/* Circular Glass Drum Window */}
            <div className="relative w-48 h-48 rounded-full bg-sky-200 border-4 border-slate-900 flex items-center justify-center overflow-hidden shadow-inner">
              {/* Water & Suds level animation when washing */}
              {isWashing && (
                <div
                  className="absolute inset-0 bg-blue-500/40 transition-all duration-300 flex items-center justify-center"
                  style={{
                    animation: 'spin 1.2s linear infinite',
                  }}
                >
                  {/* Frothy detergent foam bubbles */}
                  <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center p-3 opacity-90">
                    <span className="w-6 h-6 rounded-full bg-white border border-blue-400 shadow-sm animate-bounce" />
                    <span className="w-8 h-8 rounded-full bg-white border border-blue-400 shadow-sm animate-ping" />
                    <span className="w-5 h-5 rounded-full bg-sky-100 border border-blue-400 shadow-sm" />
                    <span className="w-7 h-7 rounded-full bg-white border border-blue-400 shadow-sm" />
                  </div>
                </div>
              )}

              {/* Inside Object: Dirty vs Clean */}
              <div
                className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ${
                  isWashing ? 'animate-spin scale-90' : isClean ? 'scale-110' : 'scale-100'
                }`}
              >
                {isClean ? (
                  <div className="text-center">
                    <span className="text-5xl block animate-bounce">✨👔✨</span>
                    <span className="bg-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full cartoon-card-sm mt-1 inline-block">
                      100% PURE
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-5xl block">{selectedItem.dirtyIcon}</span>
                    <span className="bg-red-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full cartoon-card-sm mt-1 inline-block">
                      DIRTY SCAM
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Washing Machine Powder Drawer & Knobs */}
            <div className="w-full flex items-center justify-between mt-4 px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-orange-500 border border-slate-900" />
                <span className="text-[10px] font-bold text-slate-700">Detergent Injected</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-900 flex items-center justify-center text-xs font-black">
                56
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 w-full space-y-2">
              <button
                type="button"
                id="start-wash-simulator-btn"
                disabled={isWashing}
                onClick={handleStartWash}
                className={`w-full py-2.5 px-4 rounded-xl cartoon-btn font-bungee text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isWashing
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-400 text-white'
                }`}
              >
                {isWashing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    WASHING IN PROGRESS...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    WASH & PURIFY SCAM!
                  </>
                )}
              </button>

              {isClean && (
                <button
                  type="button"
                  id="reset-wash-simulator-btn"
                  onClick={handleReset}
                  className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs cartoon-btn flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Wash Another Allegation
                </button>
              )}
            </div>
          </div>

          {/* Real-time status ticker under machine */}
          <div className="mt-3 text-center">
            <p className="text-xs font-black text-slate-800 bg-white/90 px-3 py-1 rounded-full cartoon-card-sm inline-block">
              {washStepText}
            </p>
          </div>
        </div>

        {/* Right: The Sparkling Clean Outcome */}
        <div className="lg:col-span-3">
          <div
            className={`p-4 rounded-2xl cartoon-card transition-all ${
              isClean
                ? 'bg-emerald-50 border-emerald-600 shadow-[4px_4px_0px_#059669]'
                : 'bg-white/70 border-slate-300 opacity-80'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className={`w-5 h-5 ${isClean ? 'text-emerald-600 fill-emerald-500' : 'text-slate-400'}`} />
              <h5 className="font-bungee text-sm text-slate-900">
                Wash Results & Verdict
              </h5>
            </div>

            {isClean ? (
              <div className="space-y-3">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-300">
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                    ✓ Official Clean Chit Awarded
                  </span>
                  <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                    {selectedItem.afterLabel}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Status: <span className="font-bold text-emerald-700">{selectedItem.afterStatus}</span>
                  </p>
                </div>

                <div className="bg-amber-100 p-2.5 rounded-xl border border-amber-300">
                  <span className="text-[10px] font-black uppercase text-amber-800 block">
                    Allotted Ministerial Office:
                  </span>
                  <p className="font-extrabold text-xs text-slate-950 mt-0.5">
                    🏛️ {selectedItem.appointedMinistry}
                  </p>
                </div>

                <p className="text-[11px] font-bold text-slate-700 text-center italic">
                  &quot;हर घोटालेबाज़ को मंत्री बनाने की गारंटी!&quot;
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-400 flex items-center justify-center mx-auto text-lg">
                  🧺
                </div>
                <p className="text-xs font-semibold">
                  Click &apos;Wash &amp; Purify Scam&apos; to watch this allegation disappear into a clean ministerial portfolio!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
