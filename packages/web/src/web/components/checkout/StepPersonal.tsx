import type { PersonalInfo } from "./types";

interface Props {
  personal: PersonalInfo;
  errors: Partial<PersonalInfo>;
  isLoggedIn: boolean;
  textPrimary: string;
  onChange: (field: keyof PersonalInfo, value: string) => void;
  onNext: () => void;
}

const inputStyle = (error?: string): React.CSSProperties => ({
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

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  color: "#94A3B8",
  marginBottom: 4,
  display: "block",
  letterSpacing: "0.04em",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 11,
  color: "#f87171",
  marginTop: 3,
};

export function StepPersonal({ personal, errors, isLoggedIn, textPrimary, onChange, onNext }: Props) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 14, padding: "28px 28px" }}>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: textPrimary, margin: "0 0 24px" }}>PERSONAL INFORMATION</h2>

      {isLoggedIn && (
        <div style={{ padding: "10px 14px", background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.18)", borderRadius: 8, marginBottom: 20 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#00D4AA", margin: 0 }}>Pre-filled from your account.</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input value={personal.firstName} onChange={(e) => onChange("firstName", e.target.value)} style={inputStyle(errors.firstName)} placeholder="First name" />
          {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input value={personal.lastName} onChange={(e) => onChange("lastName", e.target.value)} style={inputStyle(errors.lastName)} placeholder="Last name" />
          {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Email Address</label>
          <input type="email" value={personal.email} onChange={(e) => onChange("email", e.target.value)} style={inputStyle(errors.email)} placeholder="you@example.com" />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input value={personal.phone} onChange={(e) => onChange("phone", e.target.value)} style={inputStyle(errors.phone)} placeholder="+91 98765 43210" />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>
        <div>
          <label style={labelStyle}>WhatsApp Number</label>
          <input value={personal.whatsapp} onChange={(e) => onChange("whatsapp", e.target.value)} style={inputStyle()} placeholder="Same as phone?" />
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onNext} style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", borderRadius: 10, padding: "12px 32px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,212,170,0.3)" }}>
          NEXT: SHIPPING →
        </button>
      </div>
    </div>
  );
}
