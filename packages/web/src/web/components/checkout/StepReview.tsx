import type { CartItem } from "../../context/CartContext";
import type { PersonalInfo, ShippingInfo } from "./types";

interface BacVariant {
  label: string;
  inr: number;
}

interface Props {
  items: CartItem[];
  personal: PersonalInfo;
  shipping: ShippingInfo;
  shippingMethod: "standard" | "porter";
  shippingFee: number;
  subtotalInr: number;
  totalInr: number;
  addBacWater: boolean;
  bacVariant: BacVariant | null;
  hasBacProduct: boolean;
  disclaimerChecked: boolean;
  tokens: { textPrimary: string; textSecondary: string; drawerBg: string; drawerItemBg: string; borderStrong: string };
  fmt: (inr: number) => string;
  onBacToggle: (v: boolean) => void;
  onDisclaimerToggle: (v: boolean) => void;
  onEditShipping: () => void;
  onUpdateQty: (productId: string, tierLabel: string, qty: number) => void;
  onRemoveItem: (productId: string, tierLabel: string) => void;
  onNext: () => void;
}

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(0,212,170,0.2)",
  borderRadius: 14,
  overflow: "hidden",
};

export function StepReview({
  items, personal, shipping, shippingMethod, shippingFee,
  subtotalInr, totalInr, addBacWater, bacVariant,
  hasBacProduct, disclaimerChecked, tokens, fmt,
  onBacToggle, onDisclaimerToggle, onEditShipping, onUpdateQty, onRemoveItem, onNext,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Order items */}
      <div style={card}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: 0 }}>ORDER SUMMARY</h2>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary }}>{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ padding: "12px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.tier.label}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: tokens.drawerItemBg, border: `1px solid ${tokens.borderStrong}`, borderRadius: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: "#00D4AA", flexShrink: 0 }}>
                {item.product.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, color: tokens.textPrimary, margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.product.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: 0 }}>{item.tier.label} · {item.tier.qty} × {item.quantity}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <button onClick={() => onUpdateQty(item.product.id, item.tier.label, item.quantity - 1)} style={{ width: 26, height: 26, border: "1px solid rgba(0,212,170,0.25)", borderRadius: 6, background: "none", color: "#00D4AA", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                <button onClick={() => onUpdateQty(item.product.id, item.tier.label, item.quantity + 1)} style={{ width: 26, height: 26, border: "1px solid rgba(0,212,170,0.25)", borderRadius: 6, background: "none", color: "#00D4AA", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#00D4AA", minWidth: 70, textAlign: "right", flexShrink: 0 }}>
                {fmt(item.tier.inr * item.quantity)}
              </span>
              <button onClick={() => onRemoveItem(item.product.id, item.tier.label)} style={{ background: "none", border: "none", color: tokens.textSecondary, cursor: "pointer", padding: 4, flexShrink: 0, opacity: 0.6 }}>
                <svg viewBox="0 0 16 16" style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BAC Water upsell */}
      {hasBacProduct && bacVariant && (
        <div style={{ ...card, padding: "20px 24px", overflow: "visible" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="checkbox" checked={addBacWater} onChange={(e) => onBacToggle(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "#00D4AA", cursor: "pointer", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: tokens.textPrimary, margin: "0 0 2px", letterSpacing: "0.06em" }}>ADD BAC WATER — {bacVariant.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: 0 }}>Required for reconstitution · {fmt(bacVariant.inr)}</p>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#00D4AA" }}>+{fmt(bacVariant.inr)}</span>
          </div>
        </div>
      )}

      {/* Shipping summary */}
      <div style={{ ...card, padding: "20px 24px", overflow: "visible" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", color: tokens.textSecondary, margin: "0 0 8px" }}>
              {shippingMethod === "porter" ? "PORTER DELIVERY (DELHI NCR)" : "STANDARD SHIPPING · ₹200"}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary, margin: "0 0 2px", fontWeight: 600 }}>{personal.firstName} {personal.lastName}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: "0 0 2px" }}>{shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ""}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: 0 }}>{shipping.city}, {shipping.state} — {shipping.pin}, {shipping.country}</p>
          </div>
          <button onClick={onEditShipping} style={{ background: "none", border: "none", color: "#00D4AA", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>EDIT</button>
        </div>
      </div>

      {/* Total */}
      <div style={{ ...card, padding: "20px 24px", overflow: "visible" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary }}>Subtotal</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary }}>{`₹${subtotalInr.toLocaleString("en-IN")}`}</span>
          </div>
          {addBacWater && bacVariant && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary }}>BAC Water</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary }}>{fmt(bacVariant.inr)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary }}>Shipping</span>
              {shippingMethod === "porter" && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#FBBF24", marginLeft: 6 }}>(Porter — fare quoted separately)</span>}
            </div>
            {shippingMethod === "porter"
              ? <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#00D4AA" }}>FREE</span>
              : <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary }}>₹200</span>
            }
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid rgba(0,212,170,0.15)" }}>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", color: tokens.textPrimary }}>TOTAL</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, color: "#00D4AA" }}>
              {`₹${totalInr.toLocaleString("en-IN")}`}
            </span>
          </div>
          {shippingMethod === "porter" && (
            <div style={{ padding: "8px 10px", background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 6, marginTop: 4 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#FBBF24", margin: 0, lineHeight: 1.5 }}>
                ⚠️ Porter delivery charges are <strong>NOT included</strong> in the above total. The Porter app will quote the fare at time of dispatch.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Research disclaimer */}
      <div style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 14, padding: "20px 24px" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
          <input type="checkbox" checked={disclaimerChecked} onChange={(e) => onDisclaimerToggle(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: "#00D4AA", cursor: "pointer", flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, lineHeight: 1.6 }}>
            I confirm these products are for <strong style={{ color: tokens.textPrimary }}>laboratory and research purposes only</strong>. I am 18+ and understand these are not for human consumption. I accept the terms of service.
          </span>
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onNext} disabled={!disclaimerChecked}
          style={{ background: disclaimerChecked ? "linear-gradient(135deg,#00D4AA,#00A882)" : "rgba(0,212,170,0.25)", color: disclaimerChecked ? "#080C10" : "rgba(8,12,16,0.4)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", borderRadius: 10, padding: "12px 32px", border: "none", cursor: disclaimerChecked ? "pointer" : "not-allowed", boxShadow: disclaimerChecked ? "0 4px 20px rgba(0,212,170,0.3)" : "none", transition: "all 0.2s" }}>
          PROCEED TO PAYMENT →
        </button>
      </div>
    </div>
  );
}
