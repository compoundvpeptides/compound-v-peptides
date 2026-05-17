import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const problems = [
  {
    title: "Supplements",
    subtitle: "Protein powders, pre-workouts, mass gainers",
    points: [
      "Underdosed actives buried in proprietary blends",
      "No cellular mechanism — just calories and stimulants",
      "Marketing claims unsupported by peer-reviewed data",
    ],
  },
  {
    title: "Clinics",
    subtitle: "Hormone replacement, IV drips, wellness centres",
    points: [
      "Expensive gatekeeping with minimal personalisation",
      "One-size protocol applied to everyone",
      "Long waiting lists, recurring prescription fees",
    ],
  },
  {
    title: "Standard Peptides",
    subtitle: "Generic, unverified sources online",
    points: [
      "Unknown purity — no certificates of analysis",
      "Undisclosed synthesis routes and excipients",
      "No traceability, no lot numbers, no accountability",
    ],
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export function BioSignalProblem() {
  const { tokens } = useTheme();

  return (
    <section
      style={{
        background: tokens.bgDefault,
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,50,50,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,50,50,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: "rgba(220,80,80,0.8)" }}
          >
            The Problem
          </p>
          <h2
            className="text-3xl md:text-4xl font-black uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              color: tokens.textPrimary,
              letterSpacing: "0.08em",
            }}
          >
            The Problem With Everything<br />You've Tried
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              style={{
                background: "rgba(220,50,50,0.04)",
                border: "1px solid rgba(220,50,50,0.18)",
                borderRadius: "14px",
                padding: "28px 24px",
                position: "relative",
              }}
            >
              {/* Red ✗ badge */}
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "24px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(220,50,50,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#fff",
                  boxShadow: "0 2px 12px rgba(220,50,50,0.4)",
                }}
              >
                ✗
              </div>

              <h3
                className="text-lg font-black uppercase mb-1"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  letterSpacing: "0.06em",
                  marginTop: "8px",
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-[11px] mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(220,80,80,0.7)",
                  letterSpacing: "0.02em",
                }}
              >
                {p.subtitle}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: tokens.textSecondary,
                      lineHeight: "1.5",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: "2px",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "rgba(220,50,50,0.12)",
                        border: "1px solid rgba(220,50,50,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        color: "rgba(220,80,80,0.8)",
                      }}
                    >
                      ✗
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Teal divider + CTA text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #00D4AA, transparent)",
            }}
          />
          <p
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#00D4AA",
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            Compound V is different. Here's why.{" "}
            <span style={{ display: "inline-block", animation: "bounceDown 1.4s ease-in-out infinite" }}>↓</span>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
