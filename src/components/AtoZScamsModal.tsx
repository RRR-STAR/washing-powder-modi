import React, { useState } from 'react';
import { X, Search, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { ATOZ_SCAMS } from '../data/memeData';
import { ScamEntry } from '../types';
import { sound } from '../utils/audio';

interface AtoZScamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScamToWash?: (scam: ScamEntry) => void;
}

export const AtoZScamsModal: React.FC<AtoZScamsModalProps> = ({
  isOpen,
  onClose,
  onSelectScamToWash,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<ScamEntry>(ATOZ_SCAMS[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const filteredScams = ATOZ_SCAMS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.letter.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        id="atoz-scams-modal"
        className="relative w-full max-w-4xl bg-amber-50 rounded-3xl cartoon-card-lg overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Banner */}
        <div className="bg-red-600 text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🔤</span>
            <div>
              <h3 className="font-bungee text-lg sm:text-2xl text-white tracking-wide">
                A TO Z OF SCAMS DIRECTORY
              </h3>
              <p className="text-xs text-red-100 font-bold">
                From &quot;A&quot; for Adani to &quot;Z&quot; for Zubin — Everything dissolves in 1 scoop!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white text-slate-900 border-2 border-slate-900 flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Search & Subtitle */}
        <div className="p-4 border-b border-amber-200 bg-amber-100/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search letter or scam..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-xs font-bold pl-9 pr-3 py-2 rounded-xl border-2 border-slate-900 focus:outline-none"
            />
          </div>

          <div className="text-xs font-bold text-slate-700">
            Click any alphabet card to view washability profile
          </div>
        </div>

        {/* Main Body: Grid of Alphabets + Selected Detail Drawer */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: 26 Alphabet Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {filteredScams.map((entry) => {
                const isSelected = selectedEntry.letter === entry.letter;
                return (
                  <div
                    key={entry.letter}
                    onClick={() => {
                      sound.playBubblePop();
                      setSelectedEntry(entry);
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border-2 text-center flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-orange-500 text-white border-slate-900 shadow-[3px_3px_0px_#0f172a]'
                        : 'bg-white hover:bg-amber-100 border-slate-300'
                    }`}
                  >
                    <span className="font-bungee text-2xl leading-none">
                      {entry.letter}
                    </span>
                    <span
                      className={`text-[10px] font-black mt-1 line-clamp-1 ${
                        isSelected ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      {entry.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Scam Dossier Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white p-5 rounded-2xl cartoon-card flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-orange-600 text-white font-bungee text-2xl flex items-center justify-center border-2 border-slate-900">
                      {selectedEntry.letter}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Category: {selectedEntry.category}
                      </span>
                      <h4 className="font-bungee text-base sm:text-lg text-slate-900 leading-tight">
                        {selectedEntry.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      Investigation Allegation Summary:
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {selectedEntry.shortDesc}
                    </p>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-black uppercase text-emerald-800 block">
                      Modi Washing Powder Formula Reaction:
                    </span>
                    <p className="text-xs font-black text-emerald-700 mt-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                      {selectedEntry.washability}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playVictoryChime();
                    if (onSelectScamToWash) {
                      onSelectScamToWash(selectedEntry);
                    }
                    onClose();
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bungee text-xs sm:text-sm py-2.5 rounded-xl cartoon-btn cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  WASH THIS SCAM NOW
                </button>
                <p className="text-[10px] font-bold text-slate-500 text-center">
                  Guaranteed removal from all pending parliamentary debate questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
