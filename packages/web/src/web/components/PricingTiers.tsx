import type { PricingTier } from "../data/product-types";

const TIER_DISCOUNT_LABELS: Record<number, string> = { 1: "5% OFF", 2: "15% OFF" };

interface Props {
  activePricing: PricingTier[];
  selectedTier: PricingTier | null;
  onSelect: (tier: PricingTier) => void;
  tokens: {
    bgCard: string;
    bgDefault: string;
    textPrimary: string;
    borderStrong: string;
  };
}

function getStrikethroughPrice(activePricing: PricingTier[], tierIdx: number): number | null {
  const v1 = activePricing[0]?.inr ?? 0;
  if (v1 === 0) return null;
  if (tierIdx === 1) return v1 * 5;
  if (tierIdx === 2) return v1 * 10;
  return null;
}

export function PricingTiers({ activePricing, selectedTier, onSelect, tokens }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {activePricing.map((tier, tierIdx) => {
        const isActive     = selectedTier?.label === tier.label;
        const unavailable  = tier.inr === 0;
        const discountLabel = TIER_DISCOUNT_LABELS[tierIdx];
        const strikePrice  = getStrikethroughPrice(activePricing, tierIdx);
        const showStrike   = !unavailable && strikePrice !== null && strikePrice > tier.inr;

        return (
          <button key={tier.label} onClick={() => !unavailable && onSelect(tier)} disabled={unavailable}
            className="p-3 text-left transition-all duration-200"
            style={{
              background: unavailable
                ? (tokens.bgDefault === "#F0F4F8" ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.2)")
                : isActive ? "rgba(0, 212, 170, 0.1)" : tokens.bgCard,
              border: unavailable ? "1px solid rgba(255,255,255,0.05)"
                : isActive ? "1px solid rgba(0, 212, 170, 0.5)"
                : "1px solid rgba(0, 212, 170, 0.12)",
              boxShadow: isActive && !unavailable ? "0 0 12px rgba(0, 212, 170, 0.1)" : "none",
              opacity: unavailable ? 0.4 : 1,
              cursor: unavailable ? "not-allowed" : "pointer",
              borderRadius: "10px",
            }}>
            <div className="text-[10px] font-bold tracking-wider uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                color: isActive && !unavailable ? "#00D4AA" : tokens.textPrimary }}>
              {tier.label}
            </div>
            {discountLabel && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 400,
                color: isActive ? "#F59E0B" : "#94A3B8", marginTop: "1px", letterSpacing: "0.02em" }}>
                · {discountLabel}
              </div>
            )}
            <div className="mt-1">
              {unavailable ? (
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#94A3B8", fontSize: "0.78rem" }}>N/A</span>
              ) : (
                <>
                  {showStrike && (
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, color: "#475569",
                      fontSize: "0.7rem", textDecoration: "line-through", display: "block", lineHeight: 1.2 }}>
                      ₹{strikePrice!.toLocaleString("en-IN")}
                    </span>
                  )}
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#00D4AA",
                    fontSize: "0.78rem", display: "block", lineHeight: 1.3 }}>
                    ₹{tier.inr.toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
