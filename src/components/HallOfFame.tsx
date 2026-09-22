import React, { useState } from 'react';
import { Star, Award, Sparkles, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { POLITICIAN_TESTIMONIALS } from '../data/memeData';
import { sound } from '../utils/audio';

export const HallOfFame: React.FC = () => {
  const [showCleanMode, setShowCleanMode] = useState<boolean>(true);

  const handleToggle = () => {
    sound.playBubblePop();
    setShowCleanMode(!showCleanMode);
  };

  return (
    <div id="hall-of-fame-section" className="bg-white p-5 sm:p-8 rounded-3xl cartoon-card space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="bg-amber-400 text-slate-900 font-bungee text-xs px-3 py-1 rounded-full cartoon-card-sm inline-block rotate-[-2deg] mb-1.5">
            5-STAR REVIEWS FROM REAL BENEFICIARIES
          </span>
          <h3 className="font-bungee text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Ministerial Hall of Clean Chits
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            See how one wash transformed accused scamsters into respected Deputy Chief Ministers and Cabinet Leaders!
          </p>
        </div>

        {/* Before / After Filter Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-900 self-start md:self-auto">
          <button
            type="button"
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              !showCleanMode
                ? 'bg-red-500 text-white cartoon-card-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BEFORE WASH (Accused)
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              showCleanMode
                ? 'bg-emerald-500 text-white cartoon-card-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AFTER WASH (Hon’ble Minister ✨)
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {POLITICIAN_TESTIMONIALS.map((politician) => {
          return (
            <div
              key={politician.id}
              className={`p-4 rounded-2xl border-3 border-slate-900 transition-all flex flex-col justify-between ${
                showCleanMode
                  ? 'bg-gradient-to-b from-amber-50 to-white shadow-[4px_4px_0px_#059669]'
                  : 'bg-gradient-to-b from-red-50 to-white shadow-[4px_4px_0px_#dc2626]'
              }`}
            >
              <div>
                {/* Header Row: Politician Avatar + Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-xl font-bungee text-white shadow-sm ${
                        politician.avatarBg
                      }`}
                    >
                      {politician.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bungee text-base text-slate-900 leading-tight">
                        {politician.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Verified Clean Chit Customer
                      </span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(politician.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Before vs After Badge */}
                <div className="mt-3">
                  {showCleanMode ? (
                    <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                      <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-200 px-1.5 py-0.2 rounded inline-block">
                        Current Designation:
                      </span>
                      <p className="font-black text-xs text-emerald-950 mt-1">
                        🏛️ {politician.titleAfter}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-100 p-2.5 rounded-xl border border-red-300">
                      <span className="text-[9px] font-black uppercase text-red-800 bg-red-200 px-1.5 py-0.2 rounded inline-block">
                        Previous Status Under Probe:
                      </span>
                      <p className="font-extrabold text-xs text-red-950 mt-1">
                        ⚠️ {politician.titleBefore}
                      </p>
                    </div>
                  )}
                </div>

                {/* Quote */}
                <p className="text-xs font-semibold text-slate-700 italic mt-3 bg-white p-2.5 rounded-xl border border-slate-200">
                  &quot;{politician.quote}&quot;
                </p>
              </div>

              {/* Footer item */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-500">Scam Dissolved:</span>
                <span className="font-black text-slate-900 bg-amber-100 px-2 py-0.5 rounded-md">
                  {politician.scamCleared}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-100/80 p-3.5 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span className="font-extrabold text-slate-900">
            Over 50+ Senior Lawmakers sanitised across Maharashtra, Assam, Madhya Pradesh and Goa!
          </span>
        </div>
        <span className="font-hindi font-black text-sm text-orange-700 shrink-0">
          हर घोटालेबाज़ को मंत्री बनाने की गारंटी
        </span>
      </div>
    </div>
  );
};
