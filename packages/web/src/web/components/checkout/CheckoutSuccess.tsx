import { useEffect } from "react";
import { useLocation } from "wouter";
import { pixelPurchase } from "../../lib/pixel";
import { motion } from "framer-motion";

interface Props {
  paidId: string;
  isLoggedIn: boolean;
  drawerBg: string;
  textSecondary: string;
}

export function CheckoutSuccess({ paidId, isLoggedIn, drawerBg, textSecondary }: Props) {
  const [, navigate] = useLocation();
  useEffect(() => { pixelPurchase(paidId ?? ""); }, []);
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        style={{ maxWidth: 480, width: "100%", background: drawerBg, border: "1px solid rgba(16,185,129,0.4)", borderRadius: 16, padding: "48px 40px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "2px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>✓</div>
        <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#10B981", margin: "0 0 8px", letterSpacing: "0.05em" }}>ORDER CONFIRMED</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: textSecondary, margin: "0 0 8px" }}>Payment verified successfully.</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: textSecondary, margin: "0 0 32px", opacity: 0.7 }}>Payment ID: {paidId}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {isLoggedIn && (
            <button onClick={() => navigate("/profile")}
              style={{ background: "rgba(0,212,170,0.1)", color: "#00D4AA", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 8, padding: "12px 24px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
              VIEW MY ORDERS
            </button>
          )}
          <button onClick={() => navigate("/products")}
            style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 8, padding: "12px 24px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
            CONTINUE SHOPPING →
          </button>
          <button onClick={() => navigate("/")}
            style={{ background: "none", border: "none", color: textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", cursor: "pointer" }}>
            BACK TO HOME
          </button>
        </div>
      </motion.div>
    </div>
  );
}
