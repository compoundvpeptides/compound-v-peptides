import { useLocation } from "wouter";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  textPrimary: string;
  textSecondary: string;
}

export function GuestGateDialog({ open, onClose, textPrimary, textSecondary }: Props) {
  const [, navigate] = useLocation();

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#0E1117", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 14, color: textPrimary, maxWidth: 400, width: "100%", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}
      >
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.12em", fontSize: "1rem", color: textPrimary, margin: 0 }}>
          BEFORE YOU CHECKOUT
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: textSecondary, margin: 0, lineHeight: 1.6 }}>
          Log in or create an account to save your orders and addresses — or continue as a guest.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
          <button
            onClick={() => { onClose(); navigate("/login?redirect=/checkout"); }}
            style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", borderRadius: 8, padding: "12px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,212,170,0.3)" }}
          >
            LOGIN / CREATE ACCOUNT
          </button>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", cursor: "pointer", padding: "8px" }}
          >
            CONTINUE AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
}
