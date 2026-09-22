import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Award,
  Download,
  Share2,
  Copy,
  Printer,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Banknote,
  Handshake,
  Landmark,
  Plane,
  FileCheck,
} from 'lucide-react';
import { PackSize, FormulaOption, StainOption, PoliticianProfile } from '../types';
import { PAYMENT_METHODS } from '../data/memeData';
import { sound } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packSize: PackSize;
  formula: FormulaOption;
  selectedStains: StainOption[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  packSize,
  formula,
  selectedStains,
}) => {
  // Checkout flow state: 1: Profile -> 2: Payment Method -> 3: Payment Agitation -> 4: Success Certificate
  const [step, setStep] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>(PAYMENT_METHODS[0].id);

  // Politician info form
  const [profile, setProfile] = useState<PoliticianProfile>({
    name: 'Hon. Sharad Pawar Rebel Leader',
    constituency: 'Baramati / Guwahati Luxury Resort',
    currentParty: 'Opposition Alliance (Seeking Urgent Defection)',
    desiredMinistry: 'Deputy Chief Minister & Irrigation Portfolio',
    pendingFIRs: 14,
    estimatedScamValue: '₹70,000 Crore',
  });

  // Animation states for step 3
  const [processingText, setProcessingText] = useState<string>('Initiating Clean Chit Protocol...');
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [certificateId, setCertificateId] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const stainsTotalCost = selectedStains.reduce((sum, s) => sum + s.extraCost, 0);
  const grandTotal = packSize.price + stainsTotalCost;

  // Handle proceeding from payment to animation
  const handleStartPayment = () => {
    sound.playDrumBeat();
    setStep(3);
    setProcessingProgress(0);

    const stages = [
      { at: 20, text: 'Verifying anonymous Electoral Bond barcode...' },
      { at: 45, text: 'Rinsing state police records with 56-inch Ultrasonic wash...' },
      { at: 70, text: 'Informing Governor House for early morning oath ceremony...' },
      { at: 90, text: 'Sealing ED and CBI dossiers in golden vault...' },
      { at: 100, text: 'TRANSACTION APPROVED! Clean Chit is ready!' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 3;
      setProcessingProgress(Math.min(current, 100));

      const foundStage = stages.find((s) => s.at <= current && s.at > current - 4);
      if (foundStage) {
        setProcessingText(foundStage.text);
      }

      if (current >= 100) {
        clearInterval(interval);
        const randomId = `SWACHH-MANTRI-${Math.floor(100000 + Math.random() * 900000)}`;
        setCertificateId(randomId);
        setStep(4);
        sound.playVictoryChime();
        sound.playDrumPattern();

        // Celebration Confetti
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#ea580c', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e'],
          });
        } catch {
          // Ignore
        }
      }
    }, 60);
  };

  const handleCopyCertificate = () => {
    sound.playBubblePop();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `OFFICIAL MODI CLEAN CHIT\nCertificate ID: ${certificateId}\nIssued to: ${profile.name}\nDesignation: ${profile.desiredMinistry}\nStatus: 100% Spotless White Kurta Guaranteed!`
      );
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        id="cartoon-checkout-modal"
        className="relative w-full max-w-2xl bg-amber-50 rounded-3xl cartoon-card-lg overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Comic Banner */}
        <div className="bg-orange-500 text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-slate-900 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧺</span>
            <div>
              <h3 className="font-bungee text-lg sm:text-xl text-white tracking-wide">
                MODI WASHING EXPRESS CHECKOUT
              </h3>
              <p className="text-xs text-amber-100 font-bold">
                100% Tax-Free • Zero Scrutiny • Instant Ministerial Oath
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playBubblePop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white text-slate-900 border-2 border-slate-900 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* STEP 1: POLITICIAN IDENTITY FORM */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-bungee text-sm text-slate-800">
                  Step 1 of 3: Accused Politician Profile
                </span>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                  Confidential & Sealed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Candidate Full Name:
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. MLA Suresh Scam-wallah"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Constituency / Luxury Resort:
                  </label>
                  <input
                    type="text"
                    value={profile.constituency}
                    onChange={(e) => setProfile({ ...profile, constituency: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Guwahati 5-Star Suite"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Current Political Alignment:
                  </label>
                  <select
                    value={profile.currentParty}
                    onChange={(e) => setProfile({ ...profile, currentParty: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option>Opposition Alliance (Seeking Urgent Defection)</option>
                    <option>Independent MLA with 8 Pending Inquiries</option>
                    <option>Former Minister with CBI Notice on WhatsApp</option>
                    <option>Billionaire Fugitive Flying to London</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Desired Ministerial Portfolio:
                  </label>
                  <input
                    type="text"
                    value={profile.desiredMinistry}
                    onChange={(e) => setProfile({ ...profile, desiredMinistry: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Deputy CM or Civil Aviation"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Number of Pending FIRs:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={profile.pendingFIRs}
                    onChange={(e) => setProfile({ ...profile, pendingFIRs: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-800 uppercase block mb-1">
                    Estimated Black Wealth / Scam Value:
                  </label>
                  <select
                    value={profile.estimatedScamValue}
                    onChange={(e) => setProfile({ ...profile, estimatedScamValue: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold text-sm p-2.5 rounded-xl border-2 border-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option>₹500 Crore (Entry Level)</option>
                    <option>₹5,000 Crore (Mid-tier Mining & Liquor)</option>
                    <option>₹70,000 Crore (Irrigation Pro League)</option>
                    <option>Limitless Offshore Conglomerate</option>
                  </select>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-white p-3.5 rounded-xl cartoon-card-sm text-xs space-y-1.5 mt-2">
                <span className="font-extrabold text-slate-900 uppercase block">
                  Configured Washing Powder Pack:
                </span>
                <div className="flex justify-between font-bold text-slate-700">
                  <span>{packSize.name} ({packSize.weight}) - {formula.name}</span>
                  <span>₹{packSize.price}</span>
                </div>
                {selectedStains.map((stain) => (
                  <div key={stain.id} className="flex justify-between text-slate-600">
                    <span>+ {stain.name}</span>
                    <span>₹{stain.extraCost}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-orange-600">
                  <span>Total Amount Due:</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="checkout-step1-next"
                  onClick={() => {
                    sound.playBubblePop();
                    setStep(2);
                  }}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bungee text-sm px-6 py-2.5 rounded-xl cartoon-btn flex items-center gap-2 cursor-pointer"
                >
                  Choose Payment Method
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-bungee text-sm text-slate-800">
                  Step 2 of 3: Discreet Payment Method
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Zero GST • Exempt from ED Raids
                </span>
              </div>

              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <div
                      key={method.id}
                      id={`pay-method-${method.id}`}
                      onClick={() => {
                        sound.playBubblePop();
                        setSelectedPayment(method.id);
                      }}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all border-2 flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-amber-100 border-slate-900 shadow-[3px_3px_0px_#0f172a]'
                          : 'bg-white border-slate-300 hover:border-slate-800'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-orange-100 border border-orange-400 text-orange-700 shrink-0">
                        {method.id === 'electoral-bond' && <ShieldCheck className="w-5 h-5" />}
                        {method.id === 'banned-2000' && <Banknote className="w-5 h-5" />}
                        {method.id === 'party-defection' && <Handshake className="w-5 h-5" />}
                        {method.id === 'swiss-token' && <Landmark className="w-5 h-5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-sm text-slate-900">
                            {method.name}
                          </h5>
                          {isSelected && (
                            <span className="text-xs font-black text-orange-600 bg-orange-200 px-2 py-0.5 rounded-full">
                              SELECTED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{method.subtext}</p>
                        <p className="text-[11px] font-bold text-emerald-700 mt-1">
                          ✓ {method.perk}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Notice: Once submitted, your name will be automatically removed from television evening debate graphics.
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playBubblePop();
                    setStep(1);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs px-4 py-2 rounded-xl cartoon-btn flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  id="pay-and-clean-chit-btn"
                  onClick={handleStartPayment}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bungee text-sm sm:text-base px-6 py-2.5 rounded-xl cartoon-btn flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-5 h-5" />
                  PAY &amp; CLAIM CLEAN CHIT
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT PROCESSING & WASHING ANIMATION */}
          {step === 3 && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative w-28 h-28 rounded-full bg-orange-100 border-4 border-slate-900 flex items-center justify-center overflow-hidden shadow-md">
                <div
                  className="absolute inset-0 bg-orange-400/30 animate-spin"
                  style={{ animationDuration: '2s' }}
                />
                <span className="text-5xl animate-bounce">🧼</span>
              </div>

              <div className="max-w-md space-y-2">
                <h4 className="font-bungee text-xl text-slate-900">
                  Laundering Transaction in Progress...
                </h4>
                <p className="text-xs font-extrabold text-orange-600 min-h-[20px]">
                  {processingText}
                </p>
              </div>

              {/* Cartoon Striped Progress Bar */}
              <div className="w-full max-w-md bg-white p-1.5 rounded-full cartoon-card-sm">
                <div
                  className="h-5 bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-full transition-all duration-100 flex items-center justify-end pr-2 text-[10px] font-black text-white"
                  style={{ width: `${processingProgress}%` }}
                >
                  {processingProgress}%
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-500 italic">
                Please do not refresh! High-ranking cabinet portfolios are being reserved.
              </div>
            </div>
          )}

          {/* STEP 4: CELEBRATION & OFFICIAL CLEAN CHIT CERTIFICATE */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 font-extrabold text-xs px-3 py-1 rounded-full border border-emerald-400">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  PAYMENT SETTLED • CLEAN CHIT ACTIVE
                </div>
                <h3 className="font-bungee text-2xl sm:text-3xl text-slate-900">
                  Congratulations, Hon’ble Minister!
                </h3>
                <p className="text-xs text-slate-600 font-semibold">
                  All corruption allegations have vanished like foam bubbles. Welcome to the ruling washing alliance!
                </p>
              </div>

              {/* The Official Certificate Card */}
              <div
                id="clean-chit-certificate"
                className="bg-gradient-to-b from-amber-50 to-white p-5 rounded-2xl border-4 border-amber-600 relative overflow-hidden shadow-xl"
              >
                {/* Certificate Watermark Stamp */}
                <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none select-none">
                  <div className="w-36 h-36 rounded-full border-4 border-red-700 flex items-center justify-center font-bungee text-xs text-red-700 rotate-[-20deg] text-center p-2">
                    100% SWACHH CERTIFIED
                  </div>
                </div>

                {/* Certificate Top Header */}
                <div className="text-center border-b-2 border-amber-200 pb-3">
                  <span className="font-bungee text-[10px] text-amber-800 tracking-widest uppercase block">
                    Ministry of Clean Chits &amp; Detergent Affairs
                  </span>
                  <h4 className="font-bungee text-lg sm:text-xl text-slate-950 mt-0.5">
                    CERTIFICATE OF COMPLETE PURIFICATION
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500">
                    ID: {certificateId} • Under Section 56(A) Immunity Act
                  </p>
                </div>

                {/* Recipient Details */}
                <div className="py-3 text-xs space-y-2 text-slate-800">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-dashed border-amber-200 pb-1.5">
                    <span className="font-bold text-slate-500">Purified Dignitary:</span>
                    <span className="font-black text-sm text-slate-900">{profile.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-dashed border-amber-200 pb-1.5">
                    <span className="font-bold text-slate-500">Allotted Ministry:</span>
                    <span className="font-black text-emerald-800">🏛️ {profile.desiredMinistry}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-dashed border-amber-200 pb-1.5">
                    <span className="font-bold text-slate-500">Prior Scams Cleared:</span>
                    <span className="font-extrabold text-slate-900">{profile.pendingFIRs} FIRs &amp; {profile.estimatedScamValue}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-bold text-slate-500">Guaranteed Privilege:</span>
                    <span className="font-extrabold text-orange-600">Zero CBI / ED visits for full electoral term</span>
                  </div>
                </div>

                {/* Bottom Seal & Signatures */}
                <div className="mt-2 pt-2 border-t-2 border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs border border-slate-900">
                      56&quot;
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-900 block leading-tight">
                        Supreme Dhobi Ghat Seal
                      </span>
                      <span className="text-[9px] text-emerald-700 font-bold">Verified &amp; Sealed</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-hindi text-xs font-black text-slate-900 block">
                      मोदी वाशिंग पाउडर
                    </span>
                    <span className="text-[9px] text-slate-500 italic">
                      &quot;सारे भ्रष्टाचार चुटकियों में घुले&quot;
                    </span>
                  </div>
                </div>
              </div>

              {/* Helicopter Delivery Status */}
              <div className="bg-amber-100 p-3 rounded-xl cartoon-card-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-900 flex items-center justify-center text-lg shrink-0">
                  <Plane className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="font-black text-xs text-slate-900 truncate">
                    Delivery Status: Dispatched via VIP State Helicopter
                  </h6>
                  <p className="text-[11px] text-slate-600 truncate">
                    Arriving at Raj Bhavan lawn before morning oath ceremony.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Copy, Share, Close */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCertificate}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-3.5 py-2 rounded-xl cartoon-btn flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedNotification ? 'Copied Clean Chit!' : 'Copy Certificate'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playBubblePop();
                      window.print();
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs px-3 py-2 rounded-xl cartoon-btn flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playBubblePop();
                    onClose();
                  }}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bungee text-xs px-5 py-2.5 rounded-xl cartoon-btn cursor-pointer"
                >
                  Close &amp; Celebrate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
