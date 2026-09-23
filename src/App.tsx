/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, BookOpen, Layers, Award, ShieldCheck, Flame, ShoppingBag } from 'lucide-react';
import { PackSize, FormulaOption, StainOption, ScamEntry } from './types';
import { PACK_SIZES, FORMULA_OPTIONS, STAIN_OPTIONS } from './data/memeData';
import { AudioJingleBar } from './components/AudioJingleBar';
import { Navbar } from './components/Navbar';
import { MemeVideoPlayer } from './components/MemeVideoPlayer';
import { WashingPowderPacket } from './components/WashingPowderPacket';
import { ProductConfigurator } from './components/ProductConfigurator';
import { WashingMachineSimulator } from './components/WashingMachineSimulator';
import { CabinetEligibilityCalculator } from './components/CabinetEligibilityCalculator';
import { HallOfFame } from './components/HallOfFame';
import { AtoZScamsModal } from './components/AtoZScamsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { sound } from './utils/audio';

export default function App() {
  // State for active washing powder configuration
  const [selectedPack, setSelectedPack] = useState<PackSize>(PACK_SIZES[1]); // Default to 1kg Mantralaya Pack
  const [selectedFormula, setSelectedFormula] = useState<FormulaOption>(FORMULA_OPTIONS[0]); // Default to Neebu & Mint
  const [selectedStains, setSelectedStains] = useState<StainOption[]>([STAIN_OPTIONS[0]]); // Pre-select Panama Papers

  // Modal dialog states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAtoZOpen, setIsAtoZOpen] = useState<boolean>(false);

  // Toggle selected stains in the configurator
  const handleToggleStain = (stain: StainOption) => {
    if (selectedStains.some((s) => s.id === stain.id)) {
      setSelectedStains(selectedStains.filter((s) => s.id !== stain.id));
    } else {
      setSelectedStains([...selectedStains, stain]);
    }
  };

  // Smooth scroll helpers for quick navigation
  const scrollToWashingMachine = () => {
    const el = document.getElementById('washing-machine-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReviews = () => {
    const el = document.getElementById('hall-of-fame-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler when user applies a preset from the Scam Calculator
  const handleApplyPreset = (packIndex: number) => {
    if (PACK_SIZES[packIndex]) {
      setSelectedPack(PACK_SIZES[packIndex]);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Handler when a scam is selected from the A to Z Modal
  const handleSelectScamToWash = (scam: ScamEntry) => {
    // Scroll to the washing simulator so user can see it being processed
    scrollToWashingMachine();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-slate-900 comic-dots-bg relative overflow-x-hidden">
      {/* Cartoon floating background bubble decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute w-8 h-8 rounded-full border-2 border-orange-400 bg-orange-200/40 left-[10%] bottom-0 animate-float-bubble [animation-duration:12s]" />
        <div className="absolute w-12 h-12 rounded-full border-2 border-sky-400 bg-sky-200/40 left-[25%] bottom-0 animate-float-bubble [animation-duration:16s] [animation-delay:2s]" />
        <div className="absolute w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-200/40 left-[60%] bottom-0 animate-float-bubble [animation-duration:10s] [animation-delay:4s]" />
        <div className="absolute w-14 h-14 rounded-full border-2 border-blue-400 bg-blue-200/40 left-[85%] bottom-0 animate-float-bubble [animation-duration:14s] [animation-delay:1s]" />
      </div>

      {/* Top Interactive Jingle Bar with Modi Drum Beat Solo & Karaoke lyrics */}
      <AudioJingleBar />

      {/* Main Cartoon Navbar */}
      <Navbar
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenAtoZModal={() => setIsAtoZOpen(true)}
        onScrollToWashingMachine={scrollToWashingMachine}
        onScrollToReviews={scrollToReviews}
        cartItemCount={1}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 relative z-10">
        {/* Cartoon Header / Promo Ribbon */}
        <section className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full cartoon-card-sm rotate-[-1deg]">
            <Sparkles className="w-4 h-4 text-orange-600 fill-orange-500" />
            <span>INDIA&apos;S #1 POLITICAL CLEAN-CHIT LAUNDRY POWDER</span>
            <span className="hidden sm:inline bg-orange-600 text-white text-[10px] px-2 py-0.5 rounded-full">
              56&quot; EXTRA WHITENING
            </span>
          </div>

          <h1 className="font-bungee text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-none">
            WASHING POWDER <span className="text-orange-600 underline decoration-yellow-400 decoration-wavy decoration-3">MODI</span>
          </h1>

          <p className="font-hindi text-lg sm:text-2xl text-blue-900 font-extrabold max-w-2xl mx-auto">
            दूध सी सफेदी, खादी में आए • रंग-बिरंगे घोटाले सब धुल जाए!
          </p>

          <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xl mx-auto">
            Order your personalized washing powder pack, dissolve any pending CBI or ED inquiry, and claim your guaranteed ministerial portfolio!
          </p>
        </section>

        {/* VIRAL MEME VIDEO PLAYER - Placed directly at the home before the selected configurator div */}
        <section id="meme-video-section" className="w-full max-w-3xl mx-auto">
          <MemeVideoPlayer />
        </section>

        {/* HERO CONFIGURATOR SECTION: Packet Live Visual + Options */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Packet (Sticky on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
            <WashingPowderPacket
              packSize={selectedPack}
              formula={selectedFormula}
              selectedStainsCount={selectedStains.length}
              onPacketClick={() => sound.playLaughableModiGroove()}
            />

            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full cartoon-card-sm">
                👆 Interactive cartoon packet • Tap to hear Modi play the dholak!
              </span>
            </div>
          </div>

          {/* Right Column: Customizer & Checkout Trigger */}
          <div className="lg:col-span-7">
            <ProductConfigurator
              selectedPack={selectedPack}
              onSelectPack={setSelectedPack}
              selectedFormula={selectedFormula}
              onSelectFormula={setSelectedFormula}
              selectedStains={selectedStains}
              onToggleStain={handleToggleStain}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onScrollToWashingMachine={scrollToWashingMachine}
            />
          </div>
        </section>

        {/* INTERACTIVE SCAM MAGNITUDE CALCULATOR */}
        <section>
          <CabinetEligibilityCalculator onApplyPreset={handleApplyPreset} />
        </section>

        {/* A TO Z SCAMS BANNER CTA */}
        <section className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-5 sm:p-7 cartoon-card text-white flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="bg-white text-red-600 font-bungee text-xs px-2.5 py-0.5 rounded-full inline-block">
              FEATURED IN THE VIDEO
            </span>
            <h3 className="font-bungee text-2xl sm:text-3xl text-white">
              The Famous &quot;A to Z of Scams&quot; Chart
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-100 max-w-xl">
              From Adani Power, Balco, Chikki, to Vyapam and Zubin land — explore all 26 scandals and see how easily Modi Washing Powder dissolves them!
            </p>
          </div>

          <button
            type="button"
            id="open-atoz-banner-btn"
            onClick={() => {
              sound.playBubblePop();
              setIsAtoZOpen(true);
            }}
            className="bg-white hover:bg-yellow-300 text-slate-950 font-bungee text-xs sm:text-sm px-6 py-3 rounded-2xl cartoon-btn flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-red-600" />
            EXPLORE A TO Z DIRECTORY
          </button>
        </section>

        {/* INTERACTIVE WASHING MACHINE SIMULATOR */}
        <section>
          <WashingMachineSimulator />
        </section>

        {/* POLITICIAN TESTIMONIALS & BEFORE / AFTER HALL OF FAME */}
        <section>
          <HallOfFame />
        </section>
      </main>

      {/* Cart & Checkout Modal with Animated Payment and Clean-Chit Certificate */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        packSize={selectedPack}
        formula={selectedFormula}
        selectedStains={selectedStains}
      />

      {/* A to Z Scams Interactive Directory Modal */}
      <AtoZScamsModal
        isOpen={isAtoZOpen}
        onClose={() => setIsAtoZOpen(false)}
        onSelectScamToWash={handleSelectScamToWash}
      />

      {/* Cartoon Parody Footer */}
      <Footer />
    </div>
  );
}
