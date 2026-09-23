import React, { useState } from 'react';
import { Sparkles, Award, Shield, CheckCircle, Flame, Drum } from 'lucide-react';
import { PackSize, FormulaOption } from '../types';
import { sound } from '../utils/audio';

interface WashingPowderPacketProps {
  packSize: PackSize;
  formula: FormulaOption;
  selectedStainsCount: number;
  onPacketClick?: () => void;
}

/**
 * Cartoon Modi Washing Powder Packet Component.
 * Visually mimics the iconic packet from the parody video:
 * - Vibrant orange-saffron pouch with comic starburst
 * - "NEW" banner
 * - Stylized Hindi typography: "मोदी वाशिंग पाउडर"
 * - Slogan: "सारे भ्रष्टाचार चुटकियों में घुले"
 * - Bottom guarantee: "हर घोटालेबाज़ को मंत्री बनाने की गारंटी"
 * - Lemon, mint leaves, and detergent pearls
 */
export const WashingPowderPacket: React.FC<WashingPowderPacketProps> = ({
  packSize,
  formula,
  selectedStainsCount,
  onPacketClick,
}) => {
  const [isWobbling, setIsWobbling] = useState(false);

  // Trigger playful bounce and laughable drum sound on interaction
  const handleInteract = () => {
    setIsWobbling(true);
    sound.playLaughableModiGroove();
    sound.playBubblePop();
    setTimeout(() => setIsWobbling(false), 800);
    if (onPacketClick) {
      onPacketClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Floating Sparkles & Bubble Ornaments */}
      <div className="absolute -top-6 -left-6 z-20 animate-bounce">
        <span className="bg-yellow-300 text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-full cartoon-card-sm flex items-center gap-1 rotate-[-12deg]">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
          CHAKACHAK WHITE!
        </span>
      </div>

      <div className="absolute -top-3 -right-5 z-20">
        <span className="bg-emerald-400 text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-full cartoon-card-sm flex items-center gap-1 rotate-[8deg]">
          <Shield className="w-3.5 h-3.5 text-emerald-800" />
          ED / CBI PROOF
        </span>
      </div>

      {/* Main Packet Wrapper with Cartoon Neo-brutalist border */}
      <div
        id="modi-packet-container"
        onClick={handleInteract}
        className={`relative w-72 sm:w-84 md:w-92 h-[480px] sm:h-[510px] rounded-2xl p-4 cursor-pointer cartoon-card-lg transition-transform duration-200 overflow-hidden ${
          isWobbling ? 'scale-105 rotate-1' : 'hover:scale-[1.02]'
        } bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600`}
        style={{
          boxShadow: '10px 10px 0px #0f172a',
        }}
      >
        {/* Cartoon Sunburst Background Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'repeating-conic-gradient(#fff 0deg 15deg, transparent 15deg 30deg)',
            }}
          />
        </div>

        {/* Top Header Row: "NEW" tag & Medical Plus symbol */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-red-600 text-white font-bungee text-sm px-3 py-1 rounded-md cartoon-card-sm rotate-[-4deg] tracking-wider animate-pulse">
            NEW
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-0.5 rounded-full cartoon-card-sm">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">
              +
            </div>
            <span className="text-[11px] font-bold text-blue-900 uppercase">
              100% Swaach
            </span>
          </div>
        </div>

        {/* Central Modi Character Illustration & Radial Aura */}
        <div className="relative mt-2 flex flex-col items-center justify-center">
          {/* Halftone circular glowing backdrop */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-white cartoon-card flex items-center justify-center overflow-hidden shadow-inner">
            {/* Golden Starburst behind portrait */}
            <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-spin [animation-duration:20s]" />

            {/* Cartoonized Portrait representation */}
            <div className="relative z-10 flex flex-col items-center">
              {/* White Hair & Beard Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 overflow-hidden bg-orange-100 shadow-md flex items-center justify-center">
                {/* SVG Character Representation matching the meme */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Face background */}
                  <circle cx="50" cy="50" r="48" fill="#fed7aa" />
                  {/* Saffron Kurta / Nehru Jacket */}
                  <path d="M20,95 Q50,75 80,95 L85,100 L15,100 Z" fill="#ea580c" stroke="#1e293b" strokeWidth="3" />
                  <path d="M40,78 L60,78 L58,100 L42,100 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
                  {/* Hair */}
                  <path d="M22,46 Q24,20 50,18 Q76,20 78,46 Q80,55 76,58 Q72,32 50,30 Q28,32 24,58 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                  {/* Ears */}
                  <ellipse cx="23" cy="52" rx="4" ry="7" fill="#fdba74" stroke="#1e293b" strokeWidth="2" />
                  <ellipse cx="77" cy="52" rx="4" ry="7" fill="#fdba74" stroke="#1e293b" strokeWidth="2" />
                  {/* Eyeballs & Glasses */}
                  <rect x="29" y="44" width="18" height="13" rx="4" fill="none" stroke="#0284c7" strokeWidth="3" />
                  <rect x="53" y="44" width="18" height="13" rx="4" fill="none" stroke="#0284c7" strokeWidth="3" />
                  <line x1="47" y1="50" x2="53" y2="50" stroke="#0284c7" strokeWidth="3" />
                  <circle cx="38" cy="50" r="2.5" fill="#0f172a" />
                  <circle cx="62" cy="50" r="2.5" fill="#0f172a" />
                  {/* Eyebrows */}
                  <path d="M30,41 Q38,38 46,41" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
                  <path d="M54,41 Q62,38 70,41" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
                  {/* Nose */}
                  <path d="M50,48 Q47,56 50,58 Q53,58 51,56" fill="none" stroke="#ea580c" strokeWidth="2" />
                  {/* White Mustache & Beard */}
                  <path d="M30,62 Q50,60 70,62 Q78,78 50,86 Q22,78 30,62 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Gentle Smile */}
                  <path d="M42,67 Q50,72 58,67" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Hand in Namaste / Blessing gesture */}
                  <circle cx="78" cy="74" r="8" fill="#fdba74" stroke="#1e293b" strokeWidth="2" />
                  <path d="M72,70 L82,70" stroke="#1e293b" strokeWidth="2" />
                </svg>
              </div>

              {/* Floating Namaste / Drum icon badge */}
              <div className="absolute -bottom-2 -right-1 bg-yellow-400 p-1.5 rounded-full cartoon-card-sm text-slate-950 font-black text-xs">
                🥁
              </div>
            </div>
          </div>
        </div>

        {/* Giant Hindi Brand Typography: "मोदी" & "वाशिंग पाउडर" */}
        <div className="relative z-10 text-center mt-3">
          <div className="inline-block relative">
            {/* 3D text effect with stacked drop text */}
            <span
              className="font-bungee text-5xl sm:text-6xl tracking-tight text-white block select-none"
              style={{
                textShadow:
                  '4px 4px 0 #1e3a8a, -2px -2px 0 #1e3a8a, 2px -2px 0 #1e3a8a, -2px 2px 0 #1e3a8a, 4px 6px 0 #0f172a',
              }}
            >
              मोदी
            </span>
          </div>

          <div className="mt-[-6px]">
            <span
              className="font-black text-2xl sm:text-3xl text-blue-950 uppercase tracking-wider block"
              style={{
                textShadow: '2px 2px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff',
              }}
            >
              वाशिंग पाउडर
            </span>
          </div>
        </div>

        {/* Famous Tagline in White Pill Container: "सारे भ्रष्टाचार चुटकियों में घुले" */}
        <div className="relative z-10 mt-2 flex justify-center">
          <div className="bg-white/95 text-blue-900 font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full cartoon-card-sm shadow-sm flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
            <span className="font-hindi tracking-wide">
              सारे &apos;भ्रष्टाचार&apos; चुटकियों में घुले
            </span>
          </div>
        </div>

        {/* Active Configuration Badges */}
        <div className="relative z-10 mt-2 flex items-center justify-center gap-2 text-[11px] font-black">
          <span className="bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-md cartoon-card-sm uppercase">
            {packSize.weight} ({packSize.name})
          </span>
          <span className="bg-sky-200 text-blue-950 px-2 py-0.5 rounded-md cartoon-card-sm truncate max-w-[130px]">
            {formula.badge}
          </span>
          {selectedStainsCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-md cartoon-card-sm flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {selectedStainsCount} Scams
            </span>
          )}
        </div>

        {/* Bottom Graphic: Blue Granules on left, Lemon & Mint on right */}
        <div className="absolute bottom-10 left-3 z-10 flex items-center gap-1">
          {/* Blue washing granules bubble cluster */}
          <div className="flex -space-x-1.5">
            <span className="w-3.5 h-3.5 bg-blue-600 rounded-full border border-white shadow-sm inline-block animate-pulse" />
            <span className="w-4 h-4 bg-sky-400 rounded-full border border-white shadow-sm inline-block" />
            <span className="w-3 h-3 bg-blue-700 rounded-full border border-white shadow-sm inline-block" />
            <span className="w-4 h-4 bg-indigo-600 rounded-full border border-white shadow-sm inline-block" />
          </div>
          <span className="text-[10px] font-black text-white/90 uppercase ml-1 drop-shadow">
            Active Blue Pearls
          </span>
        </div>

        {/* Lemon Slice & Mint Leaf Illustration */}
        <div className="absolute bottom-9 right-3 z-10 flex items-center gap-1">
          <div className="w-9 h-9 rounded-full bg-yellow-300 border-2 border-slate-900 flex items-center justify-center shadow-md relative overflow-hidden rotate-12">
            <div className="w-6 h-6 rounded-full border border-dashed border-amber-600 flex items-center justify-center">
              <span className="text-xs">🍋</span>
            </div>
          </div>
          <div className="w-6 h-6 bg-emerald-500 rounded-tl-full rounded-br-full border border-slate-900 rotate-[-25deg] flex items-center justify-center text-[10px]">
            🌿
          </div>
        </div>

        {/* Iconic Bottom Navy Guarantee Ribbon: "हर घोटालेबाज़ को मंत्री बनाने की गारंटी" */}
        <div className="absolute bottom-0 inset-x-0 bg-blue-950 text-yellow-300 py-1.5 px-2 text-center border-t-2 border-slate-900 z-10">
          <p className="font-extrabold text-[11px] sm:text-xs tracking-wider flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            &quot;हर घोटालेबाज़ को मंत्री बनाने की गारंटी&quot;
          </p>
        </div>
      </div>

      {/* Playful Clickable Drum Beat Action */}
      <button
        type="button"
        id="packet-dholak-trigger"
        onClick={handleInteract}
        className="mt-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full cartoon-btn flex items-center gap-1.5 cursor-pointer"
      >
        <Drum className="w-4 h-4 text-orange-700" />
        Tap Packet for Modi Drum Beat!
      </button>
    </div>
  );
};
