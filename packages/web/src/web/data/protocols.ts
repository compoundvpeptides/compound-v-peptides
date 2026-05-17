export type Protocol = {
  id: string;
  codename: string;
  name: string;
  classification: string;
  description: string;
  compounds: string[];
  duration: string;
  clearance: string;
};

export const protocols: Protocol[] = [
  {
    id: "recovery-stack",
    codename: "PROTOCOL-R7",
    name: "Recovery Stack",
    classification: "TISSUE REPAIR",
    description: "Advanced musculoskeletal repair and anti-inflammatory protocol combining synergistic peptides for accelerated tissue remodelling.",
    compounds: ["BPC-157", "TB-500", "GHK-Cu"],
    duration: "8–12 weeks",
    clearance: "RESEARCH USE ONLY",
  },
  {
    id: "body-composition-stack",
    codename: "PROTOCOL-BC4",
    name: "Body Composition Stack",
    classification: "METABOLIC",
    description: "Dual-axis approach targeting growth hormone secretion and selective lipolysis for research into lean mass accretion and fat mobilisation.",
    compounds: ["CJC-1295", "Ipamorelin", "Retatrutide"],
    duration: "12–16 weeks",
    clearance: "RESEARCH USE ONLY",
  },
  {
    id: "longevity-stack",
    codename: "PROTOCOL-L9",
    name: "Longevity Stack",
    classification: "SENESCENCE",
    description: "Cutting-edge longevity research protocol addressing cellular energy, telomere dynamics, and mitochondrial function through complementary mechanisms.",
    compounds: ["Epithalon", "NAD+", "SS-31"],
    duration: "6 weeks on / 4 weeks off",
    clearance: "ADVANCED RESEARCH",
  },
];
