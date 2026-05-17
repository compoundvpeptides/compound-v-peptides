import { motion } from "framer-motion";
import type { Product, Variant } from "../data/product-types";

const categoryLabels: Record<string, string> = {
  "gh-peptides":        "GH Peptides",
  "healing-recovery":   "Healing & Recovery",
  "fat-loss-metabolic": "Fat Loss & Metabolic",
  "cognitive":          "Cognitive & Nootropics",
  "anti-aging":         "Anti-Aging & Wellness",
  "hgh":                "HGH",
  "nad":                "NAD+",
  "bac-water":          "BAC Water",
};

interface Props {
  product: Product;
  selectedVariant: Variant | null;
  tokens: {
    bgCard: string;
    bgDefault: string;
    textPrimary: string;
    textSecondary: string;
    borderStrong: string;
  };
}

export function ProductVisual({ product, selectedVariant, tokens }: Props) {
  const currentImage = selectedVariant?.image ?? null;

  return (
    <div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
        className="relative w-full flex items-center justify-center"
        style={{ background: tokens.bgCard, border: `1px solid ${product.categoryColor}30`,
          boxShadow: `0 0 40px ${product.categoryColor}10`, borderRadius: "14px",
          aspectRatio: "2/3", padding: "24px 20px" }}>
        {currentImage ? (
          <motion.img key={currentImage} src={currentImage} alt={selectedVariant?.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
            width={400} height={600}
            style={{ width: "auto", height: "100%", maxWidth: "100%", objectFit: "contain", objectPosition: "center", borderRadius: "8px" }} />
        ) : (
          <>
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{
              backgroundImage: `linear-gradient(${product.categoryColor}20 1px, transparent 1px), linear-gradient(90deg, ${product.categoryColor}20 1px, transparent 1px)`,
              backgroundSize: "30px 30px", borderRadius: "14px",
            }} />
            <svg viewBox="0 0 300 300" className="w-3/4 h-3/4 opacity-30" fill="none" stroke={product.categoryColor} strokeWidth="1">
              <circle cx="150" cy="150" r="12" />
              <circle cx="80" cy="90" r="8" /><circle cx="220" cy="90" r="8" />
              <circle cx="220" cy="210" r="8" /><circle cx="80" cy="210" r="8" />
              <circle cx="30" cy="150" r="6" /><circle cx="270" cy="150" r="6" />
              <circle cx="150" cy="40" r="6" /><circle cx="150" cy="260" r="6" />
              <circle cx="50" cy="50" r="5" /><circle cx="250" cy="50" r="5" />
              <circle cx="50" cy="250" r="5" /><circle cx="250" cy="250" r="5" />
              <line x1="150" y1="150" x2="80" y2="90" /><line x1="150" y1="150" x2="220" y2="90" />
              <line x1="150" y1="150" x2="220" y2="210" /><line x1="150" y1="150" x2="80" y2="210" />
              <line x1="80" y1="90" x2="30" y2="150" /><line x1="220" y1="90" x2="270" y2="150" />
              <line x1="80" y1="90" x2="150" y2="40" /><line x1="220" y1="90" x2="150" y2="40" />
              <line x1="80" y1="210" x2="150" y2="260" /><line x1="220" y1="210" x2="150" y2="260" />
              <line x1="30" y1="150" x2="80" y2="210" /><line x1="270" y1="150" x2="220" y2="210" />
              <line x1="80" y1="90" x2="50" y2="50" /><line x1="220" y1="90" x2="250" y2="50" />
              <line x1="80" y1="210" x2="50" y2="250" /><line x1="220" y1="210" x2="250" y2="250" />
              <circle cx="150" cy="150" r="50" strokeDasharray="8 4" opacity="0.4" />
              <circle cx="150" cy="150" r="100" strokeDasharray="4 8" opacity="0.2" />
            </svg>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif", color: `${product.categoryColor}80` }}>
                Molecular Structure // Placeholder
              </span>
            </div>
          </>
        )}
        <div className="absolute top-4 right-4 px-3 py-1.5"
          style={{ border: "1px solid rgba(220,50,50,0.4)", background: "rgba(220,50,50,0.08)", borderRadius: "8px" }}>
          <span className="text-[9px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,150,150,0.8)" }}>
            Research Use Only
          </span>
        </div>
      </motion.div>


    </div>
  );
}
