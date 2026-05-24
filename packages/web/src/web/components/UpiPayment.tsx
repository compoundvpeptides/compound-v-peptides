import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface UpiPaymentProps {
  totalInr: number;
  onConfirm: (utr: string) => void;
}

export function UpiPayment({ totalInr, onConfirm }: UpiPaymentProps) {
  const { tokens } = useTheme();
  const [utr, setUtr] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const upiId = "compoundv.peptides@okaxis";
  const upiLink = `upi://pay?pa=${upiId}&pn=Compound%20V%20Peptides&am=${totalInr}&cu=INR&tn=CompoundV%20Order`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (utr.trim().length !== 12 || isNaN(Number(utr))) {
      setError("Please enter a valid 12-digit UTR number");
      return;
    }
    setError("");
    onConfirm(utr.trim());
  };

  return (
    <div style={{
      background: tokens.surface,
      border: `1px solid ${tokens.border}`,
      borderRadius: 16,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    }}>
      <h3 style={{ color: tokens.textPrimary, fontFamily: "'Rajdhani', sans-serif", fontSize: 20, fontWeight: 700, margin: 0 }}>
        PAY VIA UPI
      </h3>

      {/* Amount */}
      <div style={{ background: tokens.background, borderRadius: 10, padding: "10px 24px", textAlign: "center" }}>
        <p style={{ color: tokens.textSecondary, fontSize: 12, margin: 0 }}>AMOUNT TO PAY</p>
        <p style={{ color: "#00D4AA", fontSize: 28, fontWeight: 700, margin: 0, fontFamily: "'Rajdhani', sans-serif" }}>
          ₹{totalInr.toLocaleString("en-IN")}
        </p>
      </div>

      {/* QR Code */}
      <img
        src={qrUrl}
        alt="UPI QR Code"
        width={220}
        height={220}
        style={{ borderRadius: 12, border: "2px solid #00D4AA" }}
      />

      {/* UPI ID */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: tokens.background, borderRadius: 8, padding: "10px 16px" }}>
        <span style={{ color: tokens.textPrimary, fontFamily: "monospace", fontSize: 15 }}>{upiId}</span>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "#00D4AA" : "transparent",
            border: "1px solid #00D4AA",
            borderRadius: 6,
            color: copied ? "#000" : "#00D4AA",
            cursor: "pointer",
            fontSize: 12,
            padding: "4px 10px",
            transition: "all 0.2s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p style={{ color: tokens.textSecondary, fontSize: 12, textAlign: "center", margin: 0 }}>
        Scan the QR code or copy the UPI ID to pay using any UPI app (GPay, PhonePe, Paytm, etc.)
      </p>

      {/* UTR Input */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ color: tokens.textPrimary, fontSize: 13, fontWeight: 600 }}>
          Enter 12-digit UTR / Transaction Reference Number
        </label>
        <input
          type="text"
          maxLength={12}
          value={utr}
          onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 123456789012"
          style={{
            background: tokens.background,
            border: `1px solid ${error ? "#ef4444" : tokens.border}`,
            borderRadius: 8,
            color: tokens.textPrimary,
            fontSize: 16,
            letterSpacing: 2,
            outline: "none",
            padding: "12px 16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        {error && <p style={{ color: "#ef4444", fontSize: 12, margin: 0 }}>{error}</p>}
        <p style={{ color: tokens.textSecondary, fontSize: 11, margin: 0 }}>
          Find your UTR in your UPI app under payment history after completing the transfer.
        </p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        style={{
          background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
          border: "none",
          borderRadius: 50,
          color: "#000",
          cursor: "pointer",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          padding: "14px 32px",
          width: "100%",
          letterSpacing: 1,
        }}
      >
        CONFIRM PAYMENT →
      </button>

      <p style={{ color: tokens.textSecondary, fontSize: 11, textAlign: "center", margin: 0 }}>
        Your order will be confirmed once we verify your UTR. We typically verify within 1-2 hours.
      </p>
    </div>
  );
}
