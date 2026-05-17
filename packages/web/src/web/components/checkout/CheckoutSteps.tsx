import type { Step } from "./types";

interface Props {
  step: Step;
  textSecondary: string;
}

const STEP_LABELS = ["PERSONAL INFO", "SHIPPING", "REVIEW", "PAYMENT"];

export function CheckoutSteps({ step, textSecondary }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {STEP_LABELS.map((label, i) => {
        const s = (i + 1) as Step;
        const active = step === s;
        const done = step > s;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEP_LABELS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "#00D4AA" : active ? "rgba(0,212,170,0.15)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${done || active ? "#00D4AA" : "rgba(255,255,255,0.1)"}`,
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12,
                color: done ? "#080C10" : active ? "#00D4AA" : textSecondary,
                transition: "all 0.3s",
              }}>
                {done ? "✓" : s}
              </div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                fontSize: 9, letterSpacing: "0.1em",
                color: active ? "#00D4AA" : textSecondary,
                whiteSpace: "nowrap",
              }}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{
                flex: 1, height: 2,
                background: step > s ? "#00D4AA" : "rgba(255,255,255,0.08)",
                margin: "0 8px", marginBottom: 20,
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
