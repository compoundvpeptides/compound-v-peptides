import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { SyringeIcon04, SyringeIcon1ml } from "../components/SyringeIcons";
import { HorizontalSyringeRuler } from "../components/SyringeRuler";
import { StepBadge, PillGroup, AccordionItem } from "../components/CalcControls";
import { useCalculator } from "../hooks/useCalculator";

const VIAL_OPTIONS  = ["10mg", "20mg", "30mg", "50mg", "100mg", "Other"];
const WATER_OPTIONS = ["1ml", "2ml", "3ml", "5ml", "Other"];
const DOSE_OPTIONS  = ["50mcg", "100mcg", "200mcg", "250mcg", "500mcg", "Other"];

export default function Calculator() {
  const { tokens } = useTheme();
  const {
    syringe, setSyringe,
    vialSel, setVialSel, vialCustom, setVialCustom,
    waterSel, setWaterSel, waterCustom, setWaterCustom,
    doseSel, setDoseSel, doseCustom, setDoseCustom,
    syringeMl, syringeUnitsMax,
    vialMg, bacWaterMl, desiredMcg,
    concentrationPerMl, volumeNeededMl,
    resultUnits, allFilled, overCapacity,
    reset,
  } = useCalculator();

  const inputStyle = {
    padding: "10px 14px", borderRadius: 10, fontSize: 13,
    fontFamily: "'Inter', sans-serif",
    background: tokens.bgCard, border: "1px solid rgba(0,212,170,0.3)",
    color: tokens.textPrimary, outline: "none", width: "100%",
    maxWidth: 200, marginTop: 12, transition: "border-color 0.2s",
  };

  const divider = (
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,170,0.2), transparent)", marginBottom: 36 }} />
  );

  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: 360 }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 700, height: 400, top: "50%", left: "50%", x: "-50%", y: "-50%",
            background: "radial-gradient(ellipse, rgba(0,212,170,0.12) 0%, transparent 70%)", borderRadius: "50%" }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#00D4AA", marginBottom: 16 }}>
            Research Tool // Compound V
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.textPrimary, lineHeight: 1.1, marginBottom: 20 }}>
            Peptide Reconstitution{" "}<span style={{ color: "#00D4AA" }}>Calculator</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: tokens.textSecondary, maxWidth: 520, marginBottom: 32, lineHeight: 1.6 }}>
            Enter your vial and syringe details to get your exact dose in seconds.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: "🧪", label: "Accurate to the unit" },
              { icon: "⚡", label: "Instant results" },
              { icon: "🔬", label: "Research use only" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                borderRadius: 50, background: "rgba(0,212,170,0.07)", border: "1px solid rgba(0,212,170,0.2)" }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, letterSpacing: "0.04em" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculator card */}
      <section style={{ padding: "0 16px 80px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          style={{ width: "100%", maxWidth: 680, background: tokens.bgCard, borderRadius: 24,
            padding: "clamp(24px, 5vw, 48px)", border: "1px solid rgba(0,212,170,0.25)",
            boxShadow: "0 0 40px rgba(0,212,170,0.08), 0 8px 40px rgba(0,0,0,0.3)" }}>

          {/* Step 1 — Syringe */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <StepBadge n={1} active={!!syringe} />
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: tokens.textPrimary, letterSpacing: "0.05em", margin: 0 }}>
                What syringe are you using?
              </p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {(["0.4ml", "1ml"] as const).map((opt) => {
                const selected = syringe === opt;
                return (
                  <button key={opt} onClick={() => setSyringe(opt)}
                    style={{ flex: "1 1 140px", maxWidth: 180, padding: "20px 16px", borderRadius: 16,
                      border: selected ? "2px solid #00D4AA" : `2px solid ${tokens.borderStrong}`,
                      background: selected ? "rgba(0,212,170,0.08)" : tokens.bgDefault,
                      cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      transition: "all 0.2s ease", boxShadow: selected ? "0 0 20px rgba(0,212,170,0.2)" : "none" }}>
                    {opt === "0.4ml" ? <SyringeIcon04 selected={selected} /> : <SyringeIcon1ml selected={selected} />}
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14,
                      color: selected ? "#00D4AA" : tokens.textSecondary, letterSpacing: "0.08em" }}>{opt}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary, opacity: 0.7 }}>
                      {opt === "0.4ml" ? "40 units" : "100 units"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {divider}

          {/* Step 2 — Vial */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <StepBadge n={2} active={!!vialSel && (vialSel !== "Other" || !!vialCustom)} />
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: tokens.textPrimary, letterSpacing: "0.05em", margin: 0 }}>
                How many mg is in your peptide vial?
              </p>
            </div>
            <PillGroup options={VIAL_OPTIONS} value={vialSel} onChange={setVialSel} tokens={tokens} />
            <AnimatePresence>
              {vialSel === "Other" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <input type="number" placeholder="Enter mg amount" value={vialCustom}
                    onChange={(e) => setVialCustom(e.target.value)} style={inputStyle} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {divider}

          {/* Step 3 — BAC Water */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <StepBadge n={3} active={!!waterSel && (waterSel !== "Other" || !!waterCustom)} />
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: tokens.textPrimary, letterSpacing: "0.05em", margin: 0 }}>
                How much bacteriostatic water are you adding?
              </p>
            </div>
            <PillGroup options={WATER_OPTIONS} value={waterSel} onChange={setWaterSel} tokens={tokens} />
            <AnimatePresence>
              {waterSel === "Other" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <input type="number" placeholder="Enter ml amount" value={waterCustom}
                    onChange={(e) => setWaterCustom(e.target.value)} style={inputStyle} />
                </motion.div>
              )}
            </AnimatePresence>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary, opacity: 0.6, marginTop: 10, letterSpacing: "0.04em" }}>
              Use sterile bacteriostatic water only
            </p>
          </div>

          {divider}

          {/* Step 4 — Dose */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <StepBadge n={4} active={!!doseSel && (doseSel !== "Other" || !!doseCustom)} />
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: tokens.textPrimary, letterSpacing: "0.05em", margin: 0 }}>
                What dose do you want per injection?
              </p>
            </div>
            <PillGroup options={DOSE_OPTIONS} value={doseSel} onChange={setDoseSel} tokens={tokens} />
            <AnimatePresence>
              {doseSel === "Other" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <input type="number" placeholder="Enter mcg amount" value={doseCustom}
                    onChange={(e) => setDoseCustom(e.target.value)} style={inputStyle} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Live Syringe Visualiser */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
          style={{ width: "100%", maxWidth: 680, marginTop: 24, borderRadius: 16, padding: "28px 28px 24px",
            background: tokens.bgCard,
            border: allFilled ? overCapacity ? "1px solid rgba(239,68,68,0.45)" : "1px solid rgba(0,212,170,0.35)" : `1px solid ${tokens.borderStrong}`,
            boxShadow: allFilled ? overCapacity ? "0 0 32px rgba(239,68,68,0.08)" : "0 0 40px rgba(0,212,170,0.1)" : "none",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}>

          {/* Result headline */}
          <div style={{ marginBottom: 24 }}>
            {!allFilled ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.45 }}>
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M10 6v5M10 13v.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, margin: 0 }}>
                  Complete all fields above to see your result
                </p>
              </div>
            ) : overCapacity ? (
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", borderRadius: 12,
                  background: "rgba(239,68,68,0.09)", border: "1px solid rgba(239,68,68,0.3)", marginBottom: 10 }}>
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, color: "#EF4444", margin: "0 0 3px" }}>
                      Dose exceeds syringe capacity.
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary, margin: 0 }}>
                      Switch to a 1ml syringe or reduce your dose.
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary, opacity: 0.5, margin: 0 }}>
                  Required: {(Math.round(resultUnits * 10) / 10)} units · Syringe max: {syringeUnitsMax} units
                </p>
              </div>
            ) : (
              <motion.div key={`${resultUnits}-${syringeUnitsMax}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#00D4AA", margin: "0 0 8px", opacity: 0.8 }}>
                  Your Dose
                </p>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)",
                  color: tokens.textPrimary, margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "0.04em" }}>
                  To have a dose of{" "}
                  <span style={{ color: "#00D4AA", textShadow: "0 0 18px rgba(0,212,170,0.5)" }}>{desiredMcg} mcg</span>
                  {" → "}pull the syringe to{" "}
                  <span style={{ color: "#00D4AA", textShadow: "0 0 18px rgba(0,212,170,0.5)" }}>
                    {Number.isInteger(resultUnits) ? resultUnits : resultUnits.toFixed(1)}
                  </span>{" "}units
                </p>
              </motion.div>
            )}
          </div>

          {/* Horizontal Syringe Ruler */}
          <div style={{ padding: "20px 0 28px", position: "relative" }}>
            <HorizontalSyringeRuler units={allFilled ? resultUnits : null} syringeMax={syringeUnitsMax} active={!!syringe} />
          </div>

          {/* Summary strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0",
            borderTop: `1px solid ${tokens.borderStrong}`, paddingTop: 16, marginTop: 4 }}>
            {allFilled ? (
              [
                { label: "Vial",          value: `${vialMg}mg` },
                { label: "BAC Water",     value: `${bacWaterMl}ml` },
                { label: "Concentration", value: `${Math.round(concentrationPerMl)} mcg/ml` },
                { label: "Volume",        value: `${volumeNeededMl.toFixed(3)} ml` },
              ].map((item, i, arr) => (
                <span key={item.label} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, display: "flex", alignItems: "center" }}>
                  <span style={{ opacity: 0.45 }}>{item.label}: </span>
                  <span style={{ color: tokens.textPrimary, fontWeight: 600, marginLeft: 4 }}>{item.value}</span>
                  {i < arr.length - 1 && <span style={{ margin: "0 14px", opacity: 0.2 }}>|</span>}
                </span>
              ))
            ) : (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, opacity: 0.35 }}>
                Vial: — &nbsp;|&nbsp; BAC Water: — &nbsp;|&nbsp; Concentration: — &nbsp;|&nbsp; Volume: —
              </span>
            )}
          </div>

          {/* Reset */}
          {allFilled && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={reset}
                style={{ padding: "7px 18px", borderRadius: 10, fontSize: 11, fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "transparent", color: tokens.textSecondary,
                  border: `1px solid ${tokens.borderStrong}`, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,212,170,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#00D4AA";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = tokens.borderStrong;
                  (e.currentTarget as HTMLButtonElement).style.color = tokens.textSecondary;
                }}>
                Reset Calculator
              </button>
            </div>
          )}
        </motion.div>

        {/* Reconstitution Guide */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 680, marginTop: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, flex: 1, background: "rgba(0,212,170,0.2)" }} />
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#00D4AA", margin: 0 }}>Reconstitution Guide</p>
            <div style={{ height: 1, flex: 1, background: "rgba(0,212,170,0.2)" }} />
          </div>

          <AccordionItem title="01 — Prepare your environment" tokens={tokens} defaultOpen>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Work in a clean, sterile environment. Wear nitrile gloves and wipe down your workspace with 70% isopropyl alcohol.
              Ensure all vials, syringes, and caps are sterile before use.
            </p>
          </AccordionItem>
          <AccordionItem title="02 — Bring to room temperature" tokens={tokens}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Remove the peptide vial from the fridge and allow it to equilibrate to room temperature for 15–20 minutes before
              adding water. This reduces thermal shock and aids even dissolution.
            </p>
          </AccordionItem>
          <AccordionItem title="03 — Add BAC water slowly" tokens={tokens}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Draw the bacteriostatic water into a syringe. Insert needle through the rubber stopper and tilt the vial at 45°.
              Slowly inject the water down the side wall of the vial — never directly onto the lyophilised powder. Gently swirl
              (never shake) until fully dissolved.
            </p>
          </AccordionItem>
          <AccordionItem title="04 — Storage" tokens={tokens}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, margin: 0 }}>
              Store reconstituted peptides at <strong style={{ color: tokens.textPrimary }}>+4°C</strong> (refrigerator) for short-term use (up to 4 weeks).
              For long-term storage, freeze at <strong style={{ color: tokens.textPrimary }}>−20°C</strong>. Avoid repeated freeze-thaw cycles.
              Always keep away from light.
            </p>
          </AccordionItem>
        </motion.div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary,
          opacity: 0.45, textAlign: "center", marginTop: 48, maxWidth: 500, lineHeight: 1.7 }}>
          This calculator is for research purposes only. Always verify calculations independently. Not medical advice.
        </p>
      </section>
    </div>
  );
}
