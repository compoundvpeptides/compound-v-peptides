import type { CartItem } from "../../context/CartContext";
import type { PaymentStatus } from "./types";
import { UpiPayment } from "../UpiPayment";

interface BacVariant {
  label: string;
  inr: number;
}

interface Props {
  items: CartItem[];
  totalInr: number;
  addBacWater: boolean;
  bacVariant: BacVariant | null;
  status: PaymentStatus;
  errorMsg: string;
  rzLoaded: boolean;
  scriptError: string | null;
  tokens: { textPrimary: string; textSecondary: string };
  fmt: (inr: number) => string;
  onPay: () => void;
  onUtrConfirm: (utr: string) => Promise<void>;
  onClearError: () => void;
}

export function StepPayment({
  items, totalInr, addBacWater, bacVariant,
  tokens, fmt, onUtrConfirm,
}: Props) {
  const payLabel = `₹${totalInr.toLocaleString("en-IN")}`;

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: "14px", padding: "clamp(20px,4vw,32px)" }}>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: "0 0 20px" }}>PAYMENT</h2>

      {/* Order summary recap */}
      <div style={{ padding: "16px", background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.tier.label}`} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary }}>{item.product.name} ({item.tier.label}) x{item.quantity}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textPrimary }}>{fmt(item.tier.inr * item.quantity)}</span>
            </div>
          ))}
        </div>
        {addBacWater && bacVariant && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary }}>BAC Water ({bacVariant.label})</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textPrimary }}>{fmt(bacVariant.inr)}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(0,212,170,0.1)", marginTop: 2 }}>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: tokens.textPrimary }}>TOTAL</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#00D4AA" }}>{payLabel}</span>
        </div>
      </div>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary, textAlign: "center", marginTop: 0, marginBottom: 0, opacity: 0.6, lineHeight: 1.5 }}>
        FOR RESEARCH USE ONLY · 18+ ONLY<br />By proceeding you agree to our terms of service.
      </p>

      <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(0,212,170,0.15)" }} />
        <span style={{ color: "rgba(0,212,170,0.5)", fontSize: 12, whiteSpace: "nowrap" }}>PAY VIA UPI</span>
        <div style={{ flex: 1, height: 1, background: "rgba(0,212,170,0.15)" }} />
      </div>

      <UpiPayment
        totalInr={totalInr}
        onConfirm={onUtrConfirm}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
