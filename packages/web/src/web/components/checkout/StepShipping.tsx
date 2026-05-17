import { useEffect } from "react";
import type { ShippingInfo } from "./types";

interface SavedAddress {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  instructions: string;
}

interface Props {
  shipping: ShippingInfo;
  errors: Partial<ShippingInfo>;
  isLoggedIn: boolean;
  addresses: SavedAddress[];
  savedAddrIdx: number | null;
  shippingMethod: "standard" | "porter";
  tokens: { textPrimary: string; textSecondary: string };
  onAddressSelect: (idx: number | null) => void;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  onMethodChange: (method: "standard" | "porter") => void;
  onNext: () => void;
}

const DELHI_NCR_CITIES = ["delhi", "new delhi", "noida", "gurgaon", "gurugram", "faridabad", "ghaziabad", "greater noida"];

const inp = (error?: string): React.CSSProperties => ({
  width: "100%",
  padding: "10px 12px",
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${error ? "#f87171" : "rgba(0,212,170,0.25)"}`,
  borderRadius: 8,
  color: "#F1F5F9",
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
});

const lbl: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  color: "#94A3B8",
  marginBottom: 4,
  display: "block",
  letterSpacing: "0.04em",
};

const err: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  color: "#f87171",
  marginTop: 3,
};

export function StepShipping({
  shipping, errors, isLoggedIn, addresses, savedAddrIdx,
  shippingMethod, tokens, onAddressSelect, onChange, onMethodChange, onNext,
}: Props) {
  // ── localStorage persistence ──────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("cv_shipping", JSON.stringify(shipping));
  }, [shipping]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cv_shipping");
      if (!saved) return;
      const data: Partial<ShippingInfo> = JSON.parse(saved);
      (Object.keys(data) as (keyof ShippingInfo)[]).forEach((field) => {
        if (data[field] !== undefined && data[field] !== "") onChange(field, data[field]!);
      });
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // ──────────────────────────────────────────────────────────────────────
  const isDelhibased = DELHI_NCR_CITIES.includes(shipping.city.trim().toLowerCase());

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 14, padding: "28px 28px" }}>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: "0 0 24px" }}>SHIPPING ADDRESS</h2>

      {/* Saved addresses */}
      {isLoggedIn && addresses.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", color: tokens.textSecondary, margin: "0 0 10px" }}>SAVED ADDRESSES</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {addresses.map((addr, idx) => (
              <button key={addr.id} onClick={() => onAddressSelect(idx)}
                style={{ textAlign: "left", background: savedAddrIdx === idx ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${savedAddrIdx === idx ? "#00D4AA" : "rgba(0,212,170,0.2)"}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer", transition: "all 0.15s" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textPrimary, margin: "0 0 2px", fontWeight: 600 }}>{addr.line1}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary, margin: 0 }}>{addr.city}, {addr.state} — {addr.pin}</p>
              </button>
            ))}
            <button onClick={() => onAddressSelect(null)}
              style={{ textAlign: "left", background: savedAddrIdx === null ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${savedAddrIdx === null ? "#00D4AA" : "rgba(0,212,170,0.2)"}`, borderRadius: 8, padding: "10px 14px", cursor: "pointer" }}>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, color: "#00D4AA", margin: 0 }}>+ USE A NEW ADDRESS</p>
            </button>
          </div>
          <div style={{ height: 1, background: "rgba(0,212,170,0.1)", margin: "16px 0" }} />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Address Line 1</label>
          <input value={shipping.line1} onChange={(e) => onChange("line1", e.target.value)} style={inp(errors.line1)} placeholder="Street address" />
          {errors.line1 && <p style={err}>{errors.line1}</p>}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Address Line 2 (optional)</label>
          <input value={shipping.line2} onChange={(e) => onChange("line2", e.target.value)} style={inp()} placeholder="Apartment, suite, etc." />
        </div>
        <div>
          <label style={lbl}>City</label>
          <input value={shipping.city} onChange={(e) => onChange("city", e.target.value)} style={inp(errors.city)} placeholder="City" />
          {errors.city && <p style={err}>{errors.city}</p>}
        </div>
        <div>
          <label style={lbl}>State</label>
          <input value={shipping.state} onChange={(e) => onChange("state", e.target.value)} style={inp(errors.state)} placeholder="State" />
          {errors.state && <p style={err}>{errors.state}</p>}
        </div>
        <div>
          <label style={lbl}>PIN Code</label>
          <input value={shipping.pin} onChange={(e) => onChange("pin", e.target.value)} style={inp(errors.pin)} placeholder="110001" />
          {errors.pin && <p style={err}>{errors.pin}</p>}
        </div>
        <div>
          <label style={lbl}>Country</label>
          <input value={shipping.country} onChange={(e) => onChange("country", e.target.value)} style={inp()} placeholder="India" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Delivery Instructions (optional)</label>
          <input value={shipping.instructions} onChange={(e) => onChange("instructions", e.target.value)} style={inp()} placeholder="Leave at door, call on arrival, etc." />
        </div>
      </div>

      {/* Shipping method */}
      {shipping.city.trim().length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.15em", color: tokens.textSecondary, margin: "0 0 10px" }}>DELIVERY METHOD</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => onMethodChange("standard")}
              style={{ textAlign: "left", background: shippingMethod === "standard" ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${shippingMethod === "standard" ? "#00D4AA" : "rgba(0,212,170,0.2)"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: tokens.textPrimary, margin: "0 0 2px", letterSpacing: "0.05em" }}>Standard Shipping</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: 0 }}>Pan-India delivery · 3–5 business days</p>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#00D4AA", flexShrink: 0, marginLeft: 12 }}>₹200</span>
            </button>

            {isDelhibased && (
              <button onClick={() => onMethodChange("porter")}
                style={{ textAlign: "left", background: shippingMethod === "porter" ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${shippingMethod === "porter" ? "#00D4AA" : "rgba(0,212,170,0.2)"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: tokens.textPrimary, margin: 0, letterSpacing: "0.05em" }}>
                    Porter Delivery <span style={{ fontSize: 10, background: "rgba(0,212,170,0.15)", color: "#00D4AA", borderRadius: 4, padding: "2px 6px", marginLeft: 6, letterSpacing: "0.1em" }}>DELHI NCR</span>
                  </p>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: "#00D4AA", flexShrink: 0, marginLeft: 12 }}>FREE</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: "0 0 8px" }}>Same-day / within 24 hours via Porter</p>
                <div style={{ padding: "8px 10px", background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 6 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#FBBF24", margin: 0, lineHeight: 1.5 }}>
                    ⚠️ Porter delivery charges are <strong>NOT included</strong> in your payment. The Porter app will quote the fare separately at time of dispatch.
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onNext} style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", borderRadius: 10, padding: "12px 32px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,212,170,0.3)" }}>
          NEXT: REVIEW →
        </button>
      </div>
    </div>
  );
}
