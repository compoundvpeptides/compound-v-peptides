/**
 * products.ts — product catalogue only.
 * Types and helpers live in product-types.ts
 * Protocols live in protocols.ts
 */
export type { PricingTier, Variant, Product } from "./product-types";
export { CATEGORIES, tiers } from "./product-types";
export { protocols } from "./protocols";

import type { Product } from "./product-types";
import { tiers } from "./product-types";

export const products: Product[] = [
  // ─── Fat Loss & Metabolic ─────────────────────────────────────────────────
  {
    id: "retatrutide",
    name: "Retatrutide",
    descriptor: "Aggressive fat loss. Metabolic reset. Visible in weeks.",
    category: "fat-loss-metabolic",
    categoryColor: "#b060ff",
    description:
      "Retatrutide is a novel triagonist peptide targeting GIP, GLP-1, and glucagon receptors simultaneously. Research demonstrates exceptional metabolic effects including significant adipose reduction and glycaemic regulation.",
    usageNotes: "",
    purity: ">99%",
    badge: "POPULAR",
    variants: [
      { name: "Retatrutide 10mg", pricing: tiers(4200, 19500, 35700), image: "/retatrutide-10mg.webp" },
      { name: "Retatrutide 20mg", pricing: tiers(7000, 32050, 59650), image: "/retatrutide-20mg.webp" },
      { name: "Retatrutide 30mg", pricing: tiers(8500, 39950, 72400), image: "/retatrutide-30mg.webp" },
    ],
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    descriptor: "Skin, tendon, and tissue renewal. Nature's repair signal.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "GHK-Cu (Glycyl-L-histidyl-L-lysine copper II) is a naturally occurring plasma copper-binding peptide. Research indicates roles in collagen synthesis, wound healing, anti-inflammatory activity, and antioxidant gene expression.",
    usageNotes: "",
    molecularWeight: "340.38 Da",
    purity: ">99%",
    badge: "POPULAR",
    variants: [
      { name: "GHK-Cu 100mg", pricing: tiers(3299, 15670, 28999), image: "/ghk-cu-100mg.webp" },
    ],
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    descriptor: "Aggressive fat loss. Metabolic reset. Visible in weeks.",
    category: "fat-loss-metabolic",
    categoryColor: "#b060ff",
    description:
      "Tirzepatide is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. Research focuses on glycaemic control and significant body weight reduction.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "Tirzepatide 30mg", pricing: tiers(4500, 20800, 38300), image: "/tirzepatide-30mg.webp" },
    ],
  },
  {
    id: "aod-1295",
    name: "AOD-1295",
    descriptor: "GH fragment analogue — lipolytic research compound",
    category: "fat-loss-metabolic",
    categoryColor: "#b060ff",
    description:
      "AOD-1295 is a synthetic analogue of the C-terminal fragment of human growth hormone. Research focuses on selective lipolytic activity and metabolic modulation.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "AOD-1295 5mg", pricing: tiers(4499, 21370, 38241), image: "/aod-1295-5mg.webp" },
      { name: "AOD-1295 10mg", pricing: tiers(8199, 38945, 69691), image: "/aod-1295-10mg.webp" },
    ],
  },

  // ─── GH Peptides ──────────────────────────────────────────────────────────
  {
    id: "tesamorelin",
    name: "Tesamorelin",
    descriptor: "Targeted visceral fat reduction. GH axis, activated.",
    category: "gh-peptides",
    categoryColor: "#00c8ff",
    description:
      "Tesamorelin is a synthetic peptide analogue of GHRH consisting of the full 44-amino acid sequence with a trans-3-hexenoic acid group. Research focuses on GH stimulation and visceral adipose tissue reduction.",
    usageNotes: "",
    molecularWeight: "5135.14 Da",
    purity: ">99%",
    variants: [
      { name: "Tesamorelin 10mg", pricing: tiers(6500, 30875, 55250), image: "/tesamorelin-10mg.webp" },
      { name: "Tesamorelin 20mg", pricing: tiers(9800, 46550, 83300), image: "/tesamorelin-20mg.webp" },
    ],
  },
  {
    id: "igf-1-lr3",
    name: "IGF-1 LR3",
    descriptor: "Long-arginine-3 IGF-1 analogue — cell growth & anabolic research",
    category: "gh-peptides",
    categoryColor: "#00c8ff",
    description:
      "IGF-1 LR3 is a recombinant analogue of insulin-like growth factor 1, modified with an arginine substitution at position 3 and a 13 amino acid extension. The modification extends plasma half-life and increases potency versus native IGF-1.",
    usageNotes: "",
    molecularWeight: "9111.46 Da",
    purity: ">99%",
    inquireOnly: true,
    variants: [
      { name: "IGF-1 LR3 1mg", pricing: tiers(6550, 30250, 56000), image: "/igf-1-lr3-1mg.webp" },
    ],
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    descriptor: "Clean GH pulse. Deep sleep. Lean recovery.",
    category: "gh-peptides",
    categoryColor: "#00c8ff",
    description:
      "Sermorelin is a synthetic analogue of growth hormone-releasing hormone (GHRH). Research indicates it stimulates the pituitary gland to produce and release endogenous growth hormone in a physiological pattern.",
    usageNotes: "",
    molecularWeight: "3357.88 Da",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH₂",
    purity: ">99%",
    variants: [
      { name: "Sermorelin 5mg",  pricing: tiers(4850, 21950, 32300), image: "/sermorelin-5mg.webp" },
      { name: "Sermorelin 10mg", pricing: tiers(4900, 22000, 31000), image: "/sermorelin-10mg.webp" },
    ],
  },
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    descriptor: "Clean GH pulse. Deep sleep. Lean recovery.",
    category: "gh-peptides",
    categoryColor: "#00c8ff",
    description:
      "Ipamorelin is a pentapeptide GH secretagogue and ghrelin receptor agonist. Research shows high selectivity for GH release with minimal cortisol or prolactin elevation compared to other secretagogues.",
    usageNotes: "",
    molecularWeight: "711.87 Da",
    sequence: "Aib-His-D-2Nal-D-Phe-Lys-NH₂",
    purity: ">99%",
    variants: [
      { name: "Ipamorelin 10mg", pricing: tiers(3500, 16625, 29750), image: "/ipamorelin-10mg.webp" },
    ],
  },
  {
    id: "cjc-1295",
    name: "CJC-1295 (No DAC)",
    descriptor: "Clean GH pulse. Deep sleep. Lean recovery.",
    category: "gh-peptides",
    categoryColor: "#00c8ff",
    description:
      "CJC-1295 without DAC (also known as Modified GRF 1-29) is a shorter-acting GHRH analogue. Unlike the DAC version, it produces a more natural pulsatile GH release, making it a common research subject in combination protocols.",
    usageNotes: "",
    molecularWeight: "3367.97 Da",
    purity: ">99%",
    badge: "POPULAR",
    variants: [
      { name: "CJC-1295 (No DAC) 10mg", pricing: tiers(6400, 27200, 48000), image: "/cjc-1295-10mg.webp" },
    ],
  },

  // ─── Healing & Recovery ───────────────────────────────────────────────────
  {
    id: "bpc-157",
    name: "BPC-157",
    descriptor: "Full tissue repair. Faster recovery. Zero downtime.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "BPC-157 (Body Protection Compound 157) is a synthetic 15-amino acid peptide derived from human gastric juice. Extensive research demonstrates accelerated healing across tendon, ligament, muscle, and gastrointestinal tissues.",
    usageNotes: "",
    molecularWeight: "1419.53 Da",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    purity: ">99%",
    badge: "BESTSELLER",
    variants: [
      { name: "BPC-157 10mg", pricing: tiers(3700, 17575, 31450), image: "/bpc-157-10mg.webp" },
    ],
  },
  {
    id: "tb-500",
    name: "TB-500",
    descriptor: "Heal what training breaks. Come back stronger.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "TB-500 is a synthetic peptide based on the active region of Thymosin Beta-4. Research demonstrates roles in actin regulation, angiogenesis, wound healing, and anti-inflammatory response.",
    usageNotes: "",
    molecularWeight: "4963.44 Da",
    purity: ">99%",
    variants: [
      { name: "TB-500 10mg", pricing: tiers(5200, 24700, 44200), image: "/tb-500-10mg.webp" },
    ],
  },
  {
    id: "bb10",
    name: "BB10",
    descriptor: "The full repair stack. BPC and TB, together.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "BB10 is a pre-blended combination of BPC-157 (5mg) and TB-500 (5mg) in a single lyophilized vial. Research on combined administration suggests complementary mechanisms — TB-500 acting systemically on actin regulation while BPC-157 provides localised and systemic repair signalling.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "BB10 (BPC-157 5mg + TB-500 5mg)", pricing: tiers(5200, 24700, 48360), image: "/bb10.webp" },
    ],
  },
  {
    id: "bb20",
    name: "BB20",
    descriptor: "The full repair stack. BPC and TB, together.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "BB20 is a high-dose pre-blended combination of BPC-157 (10mg) and TB-500 (10mg) in a single lyophilized vial. Designed for research protocols requiring higher compound concentrations with the same synergistic repair mechanism as BB10.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "BB20 (BPC-157 10mg + TB-500 10mg)", pricing: tiers(7700, 36575, 65450), image: "/bb20-blend.webp" },
    ],
  },

  {
    id: "klow-blend",
    name: "KLOW Blend",
    descriptor: "The complete recovery blend. One vial, four signals.",
    category: "healing-recovery",
    categoryColor: "#00ffb3",
    description:
      "KLOW is a proprietary multi-peptide blend combining four synergistic research compounds: GHK-Cu (tissue remodelling), BPC-157 (regeneration), TB-500 (systemic healing), and KPV (anti-inflammatory). Designed for comprehensive repair-focused research protocols.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "KLOW 80mg (GHK-Cu + BPC + TB + KPV)", pricing: tiers(6400, 30400, 59250), image: "/klow-80mg.webp" },
    ],
  },

  // ─── Cognitive & Nootropics ───────────────────────────────────────────────
  {
    id: "mots-c",
    name: "MOTS-c",
    descriptor: "Metabolic flexibility. Performance that compounds over time.",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "MOTS-c is a mitochondria-derived peptide encoded in the 12S rRNA gene. Research highlights roles in regulating insulin sensitivity, mitochondrial function, metabolic homeostasis, and exercise-induced adaptive responses.",
    usageNotes: "",
    molecularWeight: "2174.5 Da",
    purity: ">99%",
    variants: [
      { name: "Mots-C 40mg", pricing: tiers(6500, 30875, 55250), image: "/mots-c-40mg.webp" },
    ],
  },
  {
    id: "semax",
    name: "Semax",
    descriptor: "Sharper focus. Faster recall. Cognitive edge, unlocked.",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Semax is a synthetic heptapeptide derived from ACTH(4-7). Research demonstrates nootropic, neuroprotective, and anxiolytic properties. Modulates BDNF, serotonin, and dopamine receptor systems.",
    usageNotes: "",
    molecularWeight: "813.96 Da",
    sequence: "Met-Glu-His-Phe-Pro-Gly-Pro",
    purity: ">99%",
    variants: [
      { name: "Semax 10mg", pricing: tiers(3200, 15200, 27200), image: "/semax-10mg.webp" },
    ],
  },
  {
    id: "selank",
    name: "Selank",
    descriptor: "Calm without sedation. Anxiety resolved at the signal level.",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Selank is a synthetic analogue of the human tetrapeptide Tuftsin. Research demonstrates anxiolytic effects without sedation, alongside cognitive enhancement and immune-modulating properties.",
    usageNotes: "",
    molecularWeight: "751.86 Da",
    purity: ">99%",
    variants: [
      { name: "Selank 10mg", pricing: tiers(3200, 15200, 27200), image: "/selank-10mg.webp" },
    ],
  },
  {
    id: "slu-pp-332",
    name: "SLU-PP-332",
    descriptor: "ERR agonist — exercise mimetic and metabolic research",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "SLU-PP-332 is a potent agonist of the oestrogen-related receptor (ERR) family. Research in animal models demonstrates significant increases in endurance, mitochondrial biogenesis, and metabolic rate — described as an 'exercise mimetic.'",
    usageNotes: "",
    purity: ">99%",
    badge: "NEW",
    variants: [
      { name: "SLU-PP-332 5mg", pricing: tiers(3450, 14650, 25900), image: "/slu-pp-332-5mg.webp" },
    ],
  },
  {
    id: "kisspeptin",
    name: "Kisspeptin",
    descriptor: "Hypothalamic neuropeptide — reproductive axis & LH research",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Kisspeptin is an endogenous neuropeptide that acts as a key regulator of the hypothalamic-pituitary-gonadal (HPG) axis. Research examines its role in triggering LH and FSH pulses, reproductive function, and neuroendocrine signalling.",
    usageNotes: "",
    purity: ">99%",
    variants: [
      { name: "Kisspeptin 10mg", pricing: tiers(6500, 21700, 38250), image: "/kisspeptin-10mg.webp" },
    ],
  },
  {
    id: "dsip",
    name: "DSIP",
    descriptor: "Delta sleep-inducing peptide — sleep & neuroendocrine research",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Delta sleep-inducing peptide (DSIP) is a neuropeptide that modulates slow-wave sleep, stress response, and various neuroendocrine functions. Research examines its role in sleep architecture and neuroprotection.",
    usageNotes: "",
    molecularWeight: "848.96 Da",
    purity: ">99%",
    variants: [
      { name: "DSIP 10mg", pricing: tiers(3200, 15200, 27200), image: "/dsip-10mg.webp" },
    ],
  },
  {
    id: "vip",
    name: "VIP",
    descriptor: "Vasoactive intestinal peptide — neuroimmune & anti-inflammatory",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Vasoactive intestinal peptide (VIP) is a 28-amino acid neuropeptide with potent vasodilatory, immunomodulatory, and anti-inflammatory properties. Research examines its roles in inflammatory bowel, pulmonary, and neuroendocrine conditions.",
    usageNotes: "",
    molecularWeight: "3326.0 Da",
    purity: ">99%",
    variants: [
      { name: "VIP 10mg", pricing: tiers(3200, 15200, 27200), image: "/vip-10mg.webp" },
    ],
  },
  {
    id: "pinealon",
    name: "Pinealon",
    descriptor: "Pineal tripeptide — neuroprotective & circadian research",
    category: "cognitive",
    categoryColor: "#ffd700",
    description:
      "Pinealon is a synthetic tripeptide (Glu-Asp-Arg) derived from the pineal gland. Research demonstrates neuroprotective effects, antioxidant properties, and potential roles in circadian rhythm modulation.",
    usageNotes: "",
    molecularWeight: "418.4 Da",
    purity: ">99%",
    variants: [
      { name: "Pinealon 10mg", pricing: tiers(3200, 15200, 27200), image: "/pinealon-10mg.webp" },
    ],
  },

  // ─── Anti-Aging & Wellness ────────────────────────────────────────────────
  {
    id: "epithalon",
    name: "Epithalon",
    descriptor: "Longevity at the cellular level. The clock, slowed.",
    category: "anti-aging",
    categoryColor: "#00e5a0",
    description:
      "Epithalon (Epitalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) based on Epithalamin from the pineal gland. Research demonstrates telomerase activation, telomere elongation, antioxidant activity, and extended lifespan in multiple model organisms.",
    usageNotes: "",
    molecularWeight: "390.35 Da",
    sequence: "Ala-Glu-Asp-Gly",
    purity: ">99%",
    variants: [
      { name: "Epithalon 10mg", pricing: tiers(4200, 20370, 31500), image: "/epithalon-10mg.webp" },
    ],
  },
  {
    id: "ss-31",
    name: "SS-31",
    descriptor: "Mitochondrial rescue. Energy from the inside out.",
    category: "anti-aging",
    categoryColor: "#00e5a0",
    description:
      "SS-31 (Elamipretide) is a mitochondria-targeted tetrapeptide that selectively concentrates in the inner mitochondrial membrane. Research demonstrates protection of cardiolipin structure, reduces ROS, and restores bioenergetics in aged tissues.",
    usageNotes: "",
    molecularWeight: "639.81 Da",
    sequence: "D-Arg-2,6-Dmt-Lys-Phe-NH₂",
    purity: ">99%",
    badge: "PREMIUM",
    variants: [
      { name: "SS-31 10mg", pricing: tiers(4100, 16050, 24000), image: "/ss-31-10mg.webp" },
    ],
  },
  {
    id: "kpv",
    name: "KPV",
    descriptor: "Inflammation resolved. Gut and immune system, recalibrated.",
    category: "anti-aging",
    categoryColor: "#00e5a0",
    description:
      "KPV is a C-terminal tripeptide fragment of alpha-melanocyte stimulating hormone (α-MSH). Research highlights potent anti-inflammatory and antimicrobial properties, with particular interest in gut inflammation and wound healing models.",
    usageNotes: "",
    molecularWeight: "356.42 Da",
    sequence: "Lys-Pro-Val",
    purity: ">99%",
    variants: [
      { name: "KPV 10mg", pricing: tiers(4200, 19950, 35700), image: "/kpv-10mg.webp" },
    ],
  },
  {
    id: "ara290",
    name: "ARA290",
    descriptor: "Erythropoietin-derived peptide — neuroprotective & anti-inflammatory",
    category: "anti-aging",
    categoryColor: "#00e5a0",
    description:
      "ARA290 is an 11-amino acid peptide derived from the erythropoietin helix-B surface. Research focuses on neuropathic pain, inflammation, and tissue protection via the innate repair receptor.",
    usageNotes: "",
    molecularWeight: "1282.5 Da",
    purity: ">99%",
    variants: [
      { name: "ARA290 10mg", pricing: tiers(3500, 16625, 29750), image: "/ara290-10mg.webp" },
    ],
  },
  {
    id: "thymosin-alpha",
    name: "Thymosin Alpha",
    descriptor: "Immunomodulatory thymic peptide — immune activation research",
    category: "anti-aging",
    categoryColor: "#00e5a0",
    description:
      "Thymosin Alpha-1 is a 28-amino acid peptide derived from the thymic hormone prothymosin alpha. Research demonstrates potent immunostimulatory effects, enhancing T-cell function and natural killer cell activity.",
    usageNotes: "",
    molecularWeight: "3108.4 Da",
    purity: ">99%",
    variants: [
      { name: "Thymosin Alpha 10mg", pricing: tiers(3500, 16625, 29750), image: "/thymosin-alpha1-5mg.webp" },
    ],
  },

  // ─── HGH ──────────────────────────────────────────────────────────────────
  {
    id: "hgh",
    name: "HGH",
    descriptor: "The foundation. Everything works better with it.",
    category: "hgh",
    categoryColor: "#00c8ff",
    description:
      "Recombinant human growth hormone (rHGH) consists of the complete 191 amino acid sequence identical to endogenous pituitary-derived HGH. Research applications include IGF-1 axis modulation, body composition, and recovery studies.",
    usageNotes: "",
    molecularWeight: "22124 Da",
    purity: ">99%",
    inquireOnly: true,
    variants: [
      { name: "HGH 10iu",  pricing: tiers(3200, 14500, 21000) },
      { name: "HGH 15iu",  pricing: tiers(3600, 16000, 23000) },
      { name: "HGH 24iu",  pricing: tiers(4200, 19000, 27000) },
      { name: "HGH 36iu",  pricing: tiers(9800, 44000, 63000) },
      { name: "HGH 40iu",  pricing: tiers(12800, 58000, 82000) },
    ],
  },
  {
    id: "hgh-somatropin-28iu",
    name: "HGH Somatropin 28 IU",
    descriptor: "The foundation. Everything works better with it.",
    category: "hgh",
    categoryColor: "#00c8ff",
    description:
      "Recombinant human somatropin in a 28 IU configuration. Full 191 amino acid sequence, third-party tested, certificate of analysis included.",
    usageNotes: "",
    purity: ">99%",
    inquireOnly: true,
    variants: [
      { name: "HGH Somatropin 28 IU", pricing: tiers(6500, 30875, 55250), image: "/hgh-somatropin-28iu.webp" },
    ],
  },

  // ─── NAD+ ─────────────────────────────────────────────────────────────────
  {
    id: "nad-plus",
    name: "NAD+",
    descriptor: "Cellular energy. Cognitive clarity. Restored from within.",
    category: "nad",
    categoryColor: "#00e5a0",
    description:
      "NAD+ is an essential coenzyme found in all living cells, critical for energy metabolism and DNA repair via sirtuin and PARP activation. Research on administration explores mitochondrial restoration, senescence pathways, and longevity mechanisms.",
    usageNotes: "",
    molecularWeight: "663.43 Da",
    purity: ">99%",
    variants: [
      { name: "NAD+ 500mg",  pricing: tiers(4700, 20000, 35250), image: "/nad-plus-500mg.webp" },
      { name: "NAD+ 1000mg", pricing: tiers(7600, 36100, 64600), image: "/nad-plus-1000mg.webp" },
    ],
  },

  // ─── BAC Water ────────────────────────────────────────────────────────────
  {
    id: "bac-water",
    name: "BAC Water",
    descriptor: "Bacteriostatic water — peptide reconstitution solvent",
    category: "bac-water",
    categoryColor: "#7a9bb5",
    description:
      "Bacteriostatic water (0.9% benzyl alcohol in water for injection) is the standard solvent for reconstituting lyophilized peptides. The benzyl alcohol preservative inhibits bacterial growth, allowing multi-use vials to remain sterile.",
    usageNotes: "",
    purity: "USP Grade",
    variants: [
      {
        // Indian 10ml — default shown in FBT / DontForget
        name: "BAC Water 10ml (Indian)",
        image: "/bac-water-indian.webp",
        pricing: [
          { label: "1 Unit",   qty: "1 vial",   inr: 750, usd: 0 },
          { label: "5 Units",  qty: "5 vials",  inr: 0,   usd: 0 },
          { label: "10 Units", qty: "10 vials", inr: 0,   usd: 0 },
        ],
      },
      {
        // Imported 3ml
        name: "BAC Water 3ml (Imported)",
        image: "/bac-water-3ml-imported.webp",
        pricing: [
          { label: "1 Unit",   qty: "1 vial",   inr: 500,  usd: 0 },
          { label: "5 Units",  qty: "5 vials",  inr: 2375, usd: 0 },
          { label: "10 Units", qty: "10 vials", inr: 4400, usd: 0 },
        ],
      },
      {
        // Imported 10ml
        name: "BAC Water 10ml (Imported)",
        image: "/bac-water-10ml-imported.webp",
        pricing: [
          { label: "1 Unit",   qty: "1 vial",   inr: 1250, usd: 0 },
          { label: "5 Units",  qty: "5 vials",  inr: 4200, usd: 0 },
          { label: "10 Units", qty: "10 vials", inr: 6800, usd: 0 },
        ],
      },
    ],
  },
];

/** Alias for any code still importing inStockProducts */
export const inStockProducts = products;
