import React from 'react';
import { Check, Sparkles, ShieldAlert, Award, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { PackSize, FormulaOption, StainOption } from '../types';
import { PACK_SIZES, FORMULA_OPTIONS, STAIN_OPTIONS } from '../data/memeData';
import { sound } from '../utils/audio';

interface ProductConfiguratorProps {
  selectedPack: PackSize;
  onSelectPack: (pack: PackSize) => void;
  selectedFormula: FormulaOption;
  onSelectFormula: (formula: FormulaOption) => void;
  selectedStains: StainOption[];
  onToggleStain: (stain: StainOption) => void;
  onOpenCheckout: () => void;
  onScrollToWashingMachine: () => void;
}

/**
 * Interactive Product Configurator for Modi Washing Powder.
 * Allows buyers to customize size, formula, and scandal stains to wash.
 */
export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  selectedPack,
  onSelectPack,
  selectedFormula,
  onSelectFormula,
  selectedStains,
  onToggleStain,
  onOpenCheckout,
  onScrollToWashingMachine,
}) => {
  // Calculate total price including stain add-ons
  const stainsTotalCost = selectedStains.reduce((sum, s) => sum + s.extraCost, 0);
  const totalPrice = selectedPack.price + stainsTotalCost;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 cartoon-card space-y-6">
      {/* Step 1: Pack Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="font-bungee text-lg sm:text-xl text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center font-black">
              1
            </span>
            Choose Your Pack Size
          </label>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
            {selectedPack.immunityLevel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PACK_SIZES.map((pack) => {
            const isSelected = selectedPack.id === pack.id;
            return (
              <div
                key={pack.id}
                id={`pack-size-${pack.id}`}
                onClick={() => {
                  sound.playBubblePop();
                  onSelectPack(pack);
                }}
                className={`p-3.5 rounded-xl cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-amber-100 border-3 border-orange-600 shadow-[4px_4px_0px_#ea580c]'
                    : 'bg-slate-50 border-2 border-slate-300 hover:border-slate-800 hover:bg-amber-50/50'
                }`}
              >
                {pack.tag && (
                  <span className="absolute -top-2.5 right-3 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md cartoon-card-sm">
                    {pack.tag}
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                      {pack.name}
                      <span className="text-xs font-bold text-orange-600 bg-orange-100 px-1.5 py-0.2 rounded">
                        {pack.weight}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {pack.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-lg text-slate-950">₹{pack.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{pack.originalPrice}</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {pack.recommendedFor}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Formula & Fragrance */}
      <div>
        <label className="font-bungee text-lg sm:text-xl text-slate-900 flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center font-black">
            2
          </span>
          Select Cleansing Formula & Scent
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FORMULA_OPTIONS.map((formula) => {
            const isSelected = selectedFormula.id === formula.id;
            return (
              <div
                key={formula.id}
                id={`formula-${formula.id}`}
                onClick={() => {
                  sound.playBubblePop();
                  onSelectFormula(formula);
                }}
                className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'bg-orange-50 border-orange-600 shadow-[3px_3px_0px_#ea580c]'
                    : 'bg-white border-slate-300 hover:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                      {formula.badge}
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-900 mt-1">
                      {formula.name}
                    </h5>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-1.5">{formula.tagline}</p>

                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Scent:</span> {formula.scent}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Targeted Scam / Stain Treatment */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-bungee text-lg sm:text-xl text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center font-black">
              3
            </span>
            Targeted Scandal Stain Removers
          </label>
          <span className="text-xs font-bold text-slate-500">
            {selectedStains.length} selected
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Check off the specific allegations on your file. Our active enzymes dissolve FIR papers effortlessly!
        </p>

        <div className="space-y-2">
          {STAIN_OPTIONS.map((stain) => {
            const isChecked = selectedStains.some((s) => s.id === stain.id);
            return (
              <div
                key={stain.id}
                id={`stain-check-${stain.id}`}
                onClick={() => {
                  sound.playBubblePop();
                  onToggleStain(stain);
                }}
                className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between border-2 transition-all ${
                  isChecked
                    ? 'bg-amber-100/90 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${
                      isChecked ? 'bg-orange-600 border-slate-900 text-white' : 'bg-white border-slate-400'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h6 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {stain.name}
                    </h6>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {stain.category} • Severity: {stain.washSeverity}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-xs sm:text-sm text-slate-900">
                    +₹{stain.extraCost}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-bold">
                    Zero FIR Residue
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box & Order CTAs */}
      <div className="bg-amber-50 p-4 rounded-xl cartoon-card-sm border-2 border-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Total Clean-Chit Investment:</span>
              <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                100% Guaranteed Portfolio
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-bungee text-2xl sm:text-3xl text-orange-600">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500">
                (Inclusive of all CBI exemptions & tax-free immunity)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="try-washing-machine-btn"
              onClick={onScrollToWashingMachine}
              className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-3.5 py-2.5 rounded-xl cartoon-btn flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              Try Dhobi Ghat Simulator
            </button>

            <button
              type="button"
              id="checkout-cta-btn"
              onClick={() => {
                sound.playDrumPattern();
                onOpenCheckout();
              }}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bungee text-sm sm:text-base px-5 py-2.5 rounded-xl cartoon-btn flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              ORDER CLEAN CHIT
            </button>
          </div>
        </div>

        {/* Feature Badges under button */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-200 text-[11px] font-bold text-slate-700">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dispatched via Special Aircraft</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Cabinet Oath Certified</span>
          </div>
          <div className="flex items-center gap-1 col-span-2 sm:col-span-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>No Opposition Allowed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
