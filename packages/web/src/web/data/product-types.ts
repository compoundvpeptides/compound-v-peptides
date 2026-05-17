export type PricingTier = {
  label: string;
  qty: string;
  inr: number;
  usd: number;
};

export type Variant = {
  name: string;
  pricing: PricingTier[];
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  descriptor: string;
  category: string;
  categoryColor: string;
  description: string;
  usageNotes: string;
  molecularWeight?: string;
  sequence?: string;
  purity: string;
  variants: Variant[];
  badge?: string;
  inquireOnly?: boolean;
};

export const CATEGORIES = [
  { id: "all",                  label: "All" },
  { id: "gh-peptides",          label: "GH Peptides" },
  { id: "healing-recovery",     label: "Healing & Recovery" },
  { id: "fat-loss-metabolic",   label: "Fat Loss & Metabolic" },
  { id: "cognitive",            label: "Cognitive & Nootropics" },
  { id: "anti-aging",           label: "Anti-Aging & Wellness" },
  { id: "hgh",                  label: "HGH" },
  { id: "nad",                  label: "NAD+" },
  { id: "bac-water",            label: "BAC Water" },
];

/** Builds standard 3-tier (1/5/10 vial) pricing from raw INR values */
export function tiers(v1: number, v5: number, v10: number): PricingTier[] {
  return [
    { label: "1 Vial",   qty: "1 vial",   inr: v1,  usd: 0 },
    { label: "5 Vials",  qty: "5 vials",  inr: v5,  usd: 0 },
    { label: "10 Vials", qty: "10 vials", inr: v10, usd: 0 },
  ];
}
