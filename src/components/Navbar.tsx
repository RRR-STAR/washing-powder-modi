import React from 'react';
import { ShoppingCart, ShieldCheck, Drum, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenCheckout: () => void;
  onOpenAtoZModal: () => void;
  onScrollToWashingMachine: () => void;
  onScrollToReviews: () => void;
  cartItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckout,
  onOpenAtoZModal,
  onScrollToWashingMachine,
  onScrollToReviews,
  cartItemCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b-3 border-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div
          onClick={() => {
            sound.playDrumBeat();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-orange-500 border-2 border-slate-900 flex items-center justify-center text-white font-bungee text-xl shadow-[2px_2px_0px_#0f172a] group-hover:rotate-6 transition-transform">
            मो
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bungee text-lg sm:text-xl text-slate-900 leading-none">
                MODI WASHING POWDER
              </span>
              <span className="bg-red-500 text-white font-black text-[9px] px-1.5 py-0.2 rounded cartoon-card-sm rotate-[-4deg]">
                MEME
              </span>
            </div>
            <p className="font-hindi text-xs font-bold text-orange-600 leading-tight">
              सारे भ्रष्टाचार चुटकियों में घुले
            </p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onOpenAtoZModal();
            }}
            className="bg-amber-100 hover:bg-amber-200 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl border-2 border-slate-900 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-orange-700" />
            A to Z Scams
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onScrollToWashingMachine();
            }}
            className="bg-sky-100 hover:bg-sky-200 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl border-2 border-slate-900 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            Washing Simulator
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onScrollToReviews();
            }}
            className="bg-emerald-100 hover:bg-emerald-200 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl border-2 border-slate-900 flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Minister Reviews
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="nav-checkout-btn"
            onClick={() => {
              sound.playDrumPattern();
              onOpenCheckout();
            }}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bungee text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl cartoon-btn flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ORDER CHIT</span>
            <span className="w-5 h-5 rounded-full bg-white text-orange-600 font-black text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
