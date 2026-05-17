/**
 * upsell-pairings.ts
 * Hardcoded "Frequently Bought Together" pairings.
 * BAC Water always appears first in every row.
 * Each product lists up to 5 additional companions (bac-water + 4-5 others = 5-6 total shown).
 */

export const upsellPairings: Record<string, string[]> = {
  retatrutide:           ["bac-water", "nad-plus", "ss-31", "bpc-157", "mots-c"],
  tirzepatide:           ["bac-water", "nad-plus", "bpc-157", "ss-31", "mots-c"],
  "bpc-157":             ["bac-water", "tb-500", "bb20", "ghk-cu", "kpv", "klow-blend"],
  "tb-500":              ["bac-water", "bpc-157", "bb20", "ghk-cu", "klow-blend", "kpv"],
  bb10:                  ["bac-water", "ghk-cu", "kpv", "klow-blend", "nad-plus"],
  bb20:                  ["bac-water", "ghk-cu", "kpv", "klow-blend", "nad-plus"],
  tesamorelin:           ["bac-water", "ipamorelin", "cjc-1295", "nad-plus", "ss-31"],
  ipamorelin:            ["bac-water", "cjc-1295", "tesamorelin", "nad-plus", "ghk-cu"],
  "cjc-1295":            ["bac-water", "ipamorelin", "tesamorelin", "nad-plus"],
  hgh:                   ["bac-water", "ipamorelin", "nad-plus", "ss-31", "mots-c"],
  "hgh-somatropin-28iu": ["bac-water", "ipamorelin", "nad-plus", "ss-31", "mots-c"],
  "nad-plus":            ["bac-water", "ss-31", "epithalon", "mots-c", "selank"],
  semax:                 ["bac-water", "selank", "nad-plus", "epithalon", "pinealon"],
  selank:                ["bac-water", "semax", "nad-plus", "epithalon", "pinealon"],
  epithalon:             ["bac-water", "nad-plus", "ss-31", "mots-c", "pinealon"],
  "ss-31":               ["bac-water", "nad-plus", "epithalon", "mots-c", "ghk-cu"],
  "mots-c":              ["bac-water", "nad-plus", "ss-31", "epithalon", "ipamorelin"],
  "ghk-cu":              ["bac-water", "bpc-157", "tb-500", "kpv", "klow-blend"],
  "klow-blend":          ["bac-water", "ghk-cu", "bpc-157", "kpv", "bb20"],
  kpv:                   ["bac-water", "bpc-157", "ghk-cu", "klow-blend", "bb10"],
  sermorelin:            ["bac-water", "ipamorelin", "nad-plus", "mots-c", "ss-31"],
};

/** Fallback for any product not explicitly listed */
export const defaultUpsells: string[] = ["bac-water", "nad-plus", "bpc-157", "ss-31", "ghk-cu"];

export function getUpsells(productId: string): string[] {
  return upsellPairings[productId] ?? defaultUpsells;
}
