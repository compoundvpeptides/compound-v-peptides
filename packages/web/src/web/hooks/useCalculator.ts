import { useState } from "react";

export type SyringeSize = "0.4ml" | "1ml" | "";

export interface CalculatorState {
  syringe:     SyringeSize;
  vialSel:     string;
  vialCustom:  string;
  waterSel:    string;
  waterCustom: string;
  doseSel:     string;
  doseCustom:  string;
}

export interface CalculatorResult {
  syringeMl:            number | null;
  syringeUnitsMax:      number;
  vialMg:               number;
  bacWaterMl:           number;
  desiredMcg:           number;
  totalMcg:             number;
  concentrationPerMl:   number;
  volumeNeededMl:       number;
  resultUnits:          number;
  allFilled:            boolean;
  overCapacity:         boolean;
}

export function useCalculator() {
  const [syringe,     setSyringe]     = useState<SyringeSize>("");
  const [vialSel,     setVialSel]     = useState("");
  const [vialCustom,  setVialCustom]  = useState("");
  const [waterSel,    setWaterSel]    = useState("");
  const [waterCustom, setWaterCustom] = useState("");
  const [doseSel,     setDoseSel]     = useState("");
  const [doseCustom,  setDoseCustom]  = useState("");

  const syringeMl       = syringe === "0.4ml" ? 0.4 : syringe === "1ml" ? 1.0 : null;
  const syringeUnitsMax = syringe === "0.4ml" ? 40 : 100;

  const vialMg      = vialSel  === "Other" ? parseFloat(vialCustom)  : vialSel  ? parseFloat(vialSel)  : NaN;
  const bacWaterMl  = waterSel === "Other" ? parseFloat(waterCustom) : waterSel ? parseFloat(waterSel) : NaN;
  const desiredMcg  = doseSel  === "Other" ? parseFloat(doseCustom)  : doseSel  ? parseFloat(doseSel)  : NaN;

  const totalMcg           = vialMg * 1000;
  const concentrationPerMl = totalMcg / bacWaterMl;
  const volumeNeededMl     = desiredMcg / concentrationPerMl;
  const resultUnits        = syringeMl ? Math.round((volumeNeededMl / syringeMl) * syringeUnitsMax) : NaN;

  const allFilled =
    syringeMl !== null &&
    !isNaN(vialMg)     && vialMg     > 0 &&
    !isNaN(bacWaterMl) && bacWaterMl > 0 &&
    !isNaN(desiredMcg) && desiredMcg > 0;

  const overCapacity = allFilled && resultUnits > syringeUnitsMax;

  const reset = () => {
    setSyringe(""); setVialSel(""); setVialCustom("");
    setWaterSel(""); setWaterCustom(""); setDoseSel(""); setDoseCustom("");
  };

  return {
    // state
    syringe, setSyringe,
    vialSel, setVialSel, vialCustom, setVialCustom,
    waterSel, setWaterSel, waterCustom, setWaterCustom,
    doseSel, setDoseSel, doseCustom, setDoseCustom,
    // computed
    syringeMl, syringeUnitsMax,
    vialMg, bacWaterMl, desiredMcg,
    totalMcg, concentrationPerMl, volumeNeededMl,
    resultUnits, allFilled, overCapacity,
    // actions
    reset,
  };
}
