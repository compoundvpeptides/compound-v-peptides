import type { Product } from "../../data/products";

function getMechanismCopy(category: string, description: string): string {
  switch (category) {
    case "gh-peptides":
      return "This compound operates as a growth hormone secretagogue — binding GHRH or ghrelin receptors in the hypothalamus and pituitary to trigger pulsatile GH release through your body's own endogenous cascade. Unlike exogenous HGH, it works with your feedback loop, not around it. The BioSignal Protocol™ uses this precision to produce GH-axis stimulation without axis suppression.";
    case "healing-recovery":
      return "At the cellular level, this peptide modulates inflammatory cytokine signalling and upregulates growth factor expression directly at the site of injury. The result is accelerated tissue remodelling — not masking pain, but activating the biological machinery that drives actual repair. This is why peptide-mediated healing outperforms systemic anti-inflammatories for structural recovery.";
    case "fat-loss-metabolic":
      return "This compound engages receptor pathways governing lipolysis and thermogenesis — signalling adipocytes to release stored energy while simultaneously modulating appetite-regulating hormones. It's precision metabolic communication, not stimulant-driven caloric burn. The downstream effect is genuine fat mobilisation without the adrenal tax of conventional fat-loss compounds.";
    case "cognitive":
      return "Cognitive peptides in this class cross the blood-brain barrier to modulate neurotrophic factor expression and neurotransmitter receptor sensitivity. The mechanism is neuroplasticity signalling — enhancing synaptic efficiency rather than flooding the synapse with stimulatory molecules. This distinction is why effects build progressively rather than producing a crash cycle.";
    case "anti-aging":
      return "This compound targets longevity pathways at the cellular level — modulating mitochondrial biogenesis, NAD+ metabolism, or telomere maintenance depending on the sequence. It's upstream signalling that influences how cells replicate and repair, not surface-level intervention. The BioSignal Protocol™ positions this class as the foundation of any serious longevity stack.";
    case "hgh":
      return "This compound provides direct exogenous growth hormone activity, binding GH receptors to initiate the full downstream IGF-1 cascade and tissue anabolic signalling. The mechanism bypasses the hypothalamic-pituitary axis entirely, making it categorically distinct from secretagogues. Precise dosing and timing define whether the response is anabolic and regenerative or simply suppressive.";
    case "nad":
      return "NAD+ sits at the intersection of energy metabolism, DNA repair, and sirtuin-mediated longevity signalling. This compound replenishes intracellular NAD+ pools that decline with age and metabolic stress, restoring the substrate required for over 500 enzyme reactions. The BioSignal Protocol™ treats NAD+ repletion as the cellular prerequisite before other peptide interventions are layered.";
    default:
      return `${description.slice(0, 180)}… The mechanism is defined by precise receptor binding that initiates a targeted downstream cascade — delivering a specific biological message rather than a broad, undifferentiated physiological effect.`;
  }
}

const BEFORE_BUYING_POINTS = [
  "Results are not immediate — most compounds require 2–4 weeks of consistent protocol before effects are measurable.",
  "Proper reconstitution with bacteriostatic water is required. Incorrect preparation affects potency.",
  "Store at +4°C after reconstitution to maintain integrity.",
];

interface Props {
  product: Product;
  textSecondary: string;
}

const summaryStyle: React.CSSProperties = {
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: 700,
  fontSize: "0.72rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  padding: "12px 16px",
  cursor: "pointer",
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export function ProductAccordions({ product, textSecondary }: Props) {
  return (
    <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
      <style>{`
        .pdp-accordion summary::-webkit-details-marker { display: none; }
        .pdp-accordion[open] summary .acc-arrow { transform: rotate(180deg); }
        .pdp-accordion summary .acc-arrow { transition: transform 0.2s; display: inline-block; }
      `}</style>

      {/* Why This Compound Works */}
      <details className="pdp-accordion" style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 10 }}>
        <summary style={{ ...summaryStyle, color: "#00D4AA" }}>
          Why This Compound Works
          <span className="acc-arrow" style={{ color: "#00D4AA", fontSize: 14 }}>▾</span>
        </summary>
        <div style={{ padding: "4px 16px 16px", borderTop: "1px solid rgba(0,212,170,0.12)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: textSecondary, lineHeight: "1.7", margin: 0 }}>
            {getMechanismCopy(product.category, product.description)}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(0,212,170,0.45)", letterSpacing: "0.04em", marginTop: 10, marginBottom: 0 }}>
            Part of The BioSignal Protocol™
          </p>
        </div>
      </details>

      {/* What You Should Know Before Buying */}
      <details className="pdp-accordion" style={{ background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.25)", borderLeft: "3px solid #F59E0B", borderRadius: 10 }}>
        <summary style={{ ...summaryStyle, color: "#F59E0B" }}>
          What You Should Know Before Buying
          <span className="acc-arrow" style={{ color: "#F59E0B", fontSize: 14 }}>▾</span>
        </summary>
        <div style={{ padding: "4px 16px 16px", borderTop: "1px solid rgba(245,158,11,0.12)" }}>
          <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: textSecondary, lineHeight: "1.7", margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {BEFORE_BUYING_POINTS.map((point, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#F59E0B", fontSize: 12, marginTop: 3, flexShrink: 0 }}>—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
