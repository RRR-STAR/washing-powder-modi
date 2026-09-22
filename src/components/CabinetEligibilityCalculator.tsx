import React, { useState } from 'react';
import { Calculator, Award, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface CabinetEligibilityCalculatorProps {
  onApplyPreset: (packIndex: number) => void;
}

export const CabinetEligibilityCalculator: React.FC<CabinetEligibilityCalculatorProps> = ({
  onApplyPreset,
}) => {
  const [scamAmount, setScamAmount] = useState<number>(25000);
  const [firCount, setFirCount] = useState<number>(8);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScamAmount(Number(e.target.value));
  };

  const handleFirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirCount(Number(e.target.value));
  };

  // Determine ministry recommendation based on scam value
  let recommendedPortfolio = 'Ward Councillor / Municipal Standing Committee Chair';
  let recommendedPackIndex = 0;
  let requiredScoops = 'Half Scoop (Chutki)';
  let cleanTime = '12 Hours';

  if (scamAmount >= 50000) {
    recommendedPortfolio = 'Hon’ble Deputy Chief Minister + Home & Finance Ministries';
    recommendedPackIndex = 2; // 5kg or 50kg
    requiredScoops = '3 Full Industrial Buckets';
    cleanTime = '5:00 AM Midnight Oath Ceremony';
  } else if (scamAmount >= 15000) {
    recommendedPortfolio = 'Union Cabinet Minister for Heavy Industries & Civil Aviation';
    recommendedPackIndex = 1; // 1kg
    requiredScoops = '1 Large Family Scoop';
    cleanTime = '24 Hours (Guwahati Resort Soak)';
  } else if (scamAmount >= 2000) {
    recommendedPortfolio = 'State Minister of State with Red Beacon Car & Police Escort';
    recommendedPackIndex = 1;
    requiredScoops = '1 Standard Scoop with Neebu';
    cleanTime = '48 Hours';
  }

  return (
    <div className="bg-gradient-to-br from-amber-200 via-orange-100 to-amber-300 p-5 sm:p-7 rounded-3xl cartoon-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="bg-blue-600 text-white font-bungee text-xs px-2.5 py-0.5 rounded-full cartoon-card-sm inline-block">
            CALCULATE YOUR MINISTRY
          </span>
          <h3 className="font-bungee text-xl sm:text-3xl text-slate-900 tracking-tight mt-1">
            Scam Magnitude vs. Ministerial Eligibility
          </h3>
        </div>
        <div className="bg-white px-3 py-1 rounded-full cartoon-card-sm text-xs font-black text-slate-800">
          Formula: More Scams = Higher Cabinet Rank
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Sliders Input */}
        <div className="md:col-span-6 space-y-4 bg-white/80 p-4 rounded-2xl cartoon-card-sm">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs font-black text-slate-900 uppercase">
                Estimated Scam Magnitude:
              </label>
              <span className="font-bungee text-base sm:text-lg text-orange-600">
                ₹{scamAmount.toLocaleString('en-IN')} Crores
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="75000"
              step="500"
              value={scamAmount}
              onChange={handleSliderChange}
              className="w-full accent-orange-600 h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
              <span>₹100 Cr (Petty Bribes)</span>
              <span>₹35,000 Cr</span>
              <span>₹75,000 Cr+ (Legendary)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs font-black text-slate-900 uppercase">
                Active FIRs &amp; CBI Notices:
              </label>
              <span className="font-bungee text-base sm:text-lg text-blue-600">
                {firCount} Charge Sheets
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={firCount}
              onChange={handleFirChange}
              className="w-full accent-blue-600 h-2.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
              <span>1 FIR (Beginner)</span>
              <span>25 FIRs (Seasoned Politician)</span>
              <span>50 FIRs (Senior Veteran)</span>
            </div>
          </div>
        </div>

        {/* Output Result Card */}
        <div className="md:col-span-6 bg-white p-4 sm:p-5 rounded-2xl cartoon-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
              Calculated Ministerial Entitlement:
            </span>

            <h4 className="font-bungee text-lg sm:text-xl text-slate-900 mt-1.5 leading-snug">
              🏛️ {recommendedPortfolio}
            </h4>

            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] font-bold text-slate-500 block">Required Dosage:</span>
                <span className="font-black text-slate-900">{requiredScoops}</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="text-[10px] font-bold text-slate-500 block">Sanitisation Speed:</span>
                <span className="font-black text-orange-600">{cleanTime}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onApplyPreset(recommendedPackIndex);
            }}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-400 text-white font-bungee text-xs sm:text-sm py-2.5 px-4 rounded-xl cartoon-btn flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Apply Recommended Pack Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
