import { useEffect } from "react";

export default function OrderSuccess() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "your email";
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const box: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 8, padding: "16px 20px", marginBottom: 20,
  };
  const label: React.CSSProperties = {
    color: "#94A3B8", fontSize: 10, margin: "0 0 4px", letterSpacing: "0.12em",
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

        <div style={{ width: 72, height: 72, background: "rgba(0,212,170,0.1)", border: "2px solid rgba(0,212,170,0.5)", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#00D4AA" }}>
          &#10003;
        </div>

        <h1 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: "0.1em", color: "#F1F5F9", margin: "0 0 8px" }}>
          ORDER RECEIVED
        </h1>

        <p style={{ color: "#64748B", fontSize: 14, margin: "0 0 32px", lineHeight: 1.6 }}>
          Your payment has been submitted. We are verifying your UTR and will confirm your order within 1-2 hours.
        </p>

        <div style={{ background: "rgba(0,212,170,0.05)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 10, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <p style={label}>CONFIRMATION SENT TO</p>
          <p style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600, margin: 0 }}>{email}</p>
        </div>

        <a href="https://wa.me/919310703553" target="_blank" rel="noreferrer" style={{ display: "block", background: "#25D366", color: "#000", fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.08em", textDecoration: "none", padding: "14px 0", borderRadius: 50, marginBottom: 16 }}>WhatsApp Us</a>

        <a href="/products" style={{ display: "block", color: "rgba(0,212,170,0.6)", fontSize: 13, textDecoration: "none", letterSpacing: "0.05em" }}>Continue Shopping</a>

      </div>
    </div>
  );
}
