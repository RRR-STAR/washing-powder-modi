/**
 * Types and interfaces for the Modi Washing Powder Cartoony E-Commerce Experience.
 */

export interface PackSize {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  tag?: string;
  description: string;
  recommendedFor: string;
  immunityLevel: string;
}

export interface FormulaOption {
  id: string;
  name: string;
  tagline: string;
  scent: string;
  cleansingPower: string;
  bgGradient: string;
  accentColor: string;
  badge: string;
}

export interface StainOption {
  id: string;
  name: string;
  category: string;
  extraCost: number;
  recommendedDip: string;
  washSeverity: 'Mild' | 'Severe' | 'National Headline' | 'Parliamentary Crisis';
}

export interface PoliticianProfile {
  name: string;
  constituency: string;
  currentParty: string;
  desiredMinistry: string;
  pendingFIRs: number;
  estimatedScamValue: string;
}

export interface PaymentOption {
  id: string;
  name: string;
  subtext: string;
  iconName: string;
  perk: string;
  processingMsg: string;
}

export interface ScamEntry {
  letter: string;
  name: string;
  shortDesc: string;
  category: string;
  washability: string;
}

export interface PoliticianTestimonial {
  id: string;
  name: string;
  titleBefore: string;
  titleAfter: string;
  quote: string;
  scamCleared: string;
  avatarBg: string;
  stars: number;
}
