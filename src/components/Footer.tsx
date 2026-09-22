import React from 'react';
import { Drum, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white border-t-4 border-slate-950 mt-16 pt-10 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Comic Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bungee text-2xl text-amber-400">
                MODI WASHING POWDER
              </span>
              <span className="bg-orange-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full">
                PARODY EDITION
              </span>
            </div>
            <p className="font-hindi text-sm text-slate-300 mt-1">
              &quot;सारे भ्रष्टाचार चुटकियों में घुले • हर घोटालेबाज़ को मंत्री बनाने की गारंटी&quot;
            </p>
          </div>

          <button
            type="button"
            onClick={() => sound.playDrumPattern()}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bungee text-xs px-4 py-2 rounded-full cartoon-btn flex items-center gap-1.5 cursor-pointer"
          >
            <Drum className="w-4 h-4 text-orange-700" />
            Play Modi Drum Beat Again!
          </button>
        </div>

        {/* Disclaimer Warning Box */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border-2 border-slate-700 flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 uppercase block mb-0.5">
              Satire &amp; Meme Disclaimer:
            </span>
            This application is an artistic parody and cartoon shopping experience inspired by the political meme video &quot;Washing Powder Modi&quot;. No real financial transactions, legal immunity waivers, party defections, or cabinet swearing-in affidavits are conducted or processed. All names and references are purely satirical commentary.
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 text-center">
          <p>
            Crafted for fun, political satire, and playful checkout animations.
          </p>
          <div className="flex items-center gap-1 text-slate-300 font-bold">
            <span>Detergent Power Level:</span>
            <span className="text-orange-400 font-mono font-black">56-INCH TURBO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
