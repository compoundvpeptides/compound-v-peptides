import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const bullets = [
  {
    icon: "◈",
    title: "Bio-Identical Sequences",
    body: "Every compound is a synthetic amino acid chain that mirrors the body's own signalling molecules — not a crude stimulant or mass-market ingredient.",
  },
  {
    icon: "◈",
    title: "Receptor-Level Precision",
    body: "Peptides bind specific receptors to trigger targeted downstream cascades: GH release, tissue repair, metabolic modulation, or cognitive enhancement.",
  },
  {
    icon: "◈",
    title: ">99% Purity, Every Lot",
    body: "HPLC-verified. Third-party tested. Certificate of analysis available for every batch. No guesswork, no filler — just the active sequence.",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function PulsingHexSVG() {
  return (
    <svg
      viewBox="0 0 260 260"
      style={{ width: "100%", maxWidth: "320px", display: "block" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow ring — slow pulse */}
      <motion.circle
        cx="130"
        cy="130"
        r="110"
        stroke="rgba(0,212,170,0.08)"
        strokeWidth="1"
        animate={{ r: [108, 116, 108], opacity: [0.3, 0.06, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="130"
        cy="130"
        r="90"
        stroke="rgba(0,212,170,0.12)"
        strokeWidth="0.8"
        animate={{ r: [88, 96, 88], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Main hexagon */}
      <motion.polygon
        points="130,28 210,75 210,169 130,216 50,169 50,75"
        stroke="#00D4AA"
        strokeWidth="1.2"
        fill="rgba(0,212,170,0.04)"
        animate={{
          filter: [
            "drop-shadow(0 0 6px rgba(0,212,170,0.3))",
            "drop-shadow(0 0 20px rgba(0,212,170,0.7))",
            "drop-shadow(0 0 6px rgba(0,212,170,0.3))",
          ],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inner hexagon */}
      <motion.polygon
        points="130,60 186,92 186,156 130,188 74,156 74,92"
        stroke="rgba(0,212,170,0.35)"
        strokeWidth="0.8"
        fill="rgba(0,212,170,0.03)"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Innermost hexagon */}
      <motion.polygon
        points="130,90 158,106 158,138 130,154 102,138 102,106"
        stroke="rgba(0,212,170,0.5)"
        strokeWidth="1"
        fill="rgba(0,212,170,0.06)"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Centre dot */}
      <motion.circle
        cx="130"
        cy="122"
        r="4"
        fill="#00D4AA"
        animate={{
          r: [3, 5, 3],
          opacity: [0.7, 1, 0.7],
          filter: [
            "drop-shadow(0 0 4px rgba(0,212,170,0.6))",
            "drop-shadow(0 0 12px rgba(0,212,170,1))",
            "drop-shadow(0 0 4px rgba(0,212,170,0.6))",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 62;
        const cx = 130 + r * Math.cos(rad);
        const cy = 122 + r * Math.sin(rad);
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="rgba(0,212,170,0.6)"
            animate={{ opacity: [0.3, 0.9, 0.3], r: [2, 3, 2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
          />
        );
      })}

      {/* Connecting lines hex to centre */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 62;
        const x2 = 130 + r * Math.cos(rad);
        const y2 = 122 + r * Math.sin(rad);
        return (
          <motion.line
            key={`line-${i}`}
            x1="130"
            y1="122"
            x2={x2}
            y2={y2}
            stroke="rgba(0,212,170,0.2)"
            strokeWidth="0.5"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          />
        );
      })}

      {/* Label */}
      <text
        x="130"
        y="148"
        textAnchor="middle"
        fill="rgba(0,212,170,0.5)"
        fontSize="7"
        fontFamily="'Rajdhani', sans-serif"
        letterSpacing="2"
      >
        BIOSIGNAL PROTOCOL™
      </text>
    </svg>
  );
}

export function BioSignalExplained() {
  const { tokens } = useTheme();

  return (
    <section
      id="biosignal-protocol"
      style={{
        background: tokens.bgPaper,
        padding: "96px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${tokens.border}`,
        borderBottom: `1px solid ${tokens.border}`,
      }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5"
              style={{
                background: "rgba(0,212,170,0.07)",
                border: "1px solid rgba(0,212,170,0.25)",
                borderRadius: "50px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00D4AA",
                  boxShadow: "0 0 6px #00D4AA",
                  display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#00D4AA",
                  textTransform: "uppercase",
                }}
              >
                The BioSignal Protocol™
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-black uppercase mb-4"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                color: tokens.textPrimary,
                letterSpacing: "0.07em",
                lineHeight: 1.1,
              }}
            >
              While Supplements Guess,<br />
              <span style={{ color: "#00D4AA" }}>Peptides Signal.</span>
            </h2>

            <p
              className="mb-10"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                color: tokens.textSecondary,
                lineHeight: "1.7",
                maxWidth: "480px",
              }}
            >
              The BioSignal Protocol™ is our commitment to compounds that work at the source — not the symptom.
              Every peptide in the Compound V catalogue is a bio-identical amino acid sequence engineered to
              communicate directly with your body's receptor network. No noise. Just signal.
            </p>

            {/* Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {bullets.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "18px",
                      color: "#00D4AA",
                      marginTop: "1px",
                      lineHeight: 1,
                    }}
                  >
                    {b.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: tokens.textPrimary,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {b.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        color: tokens.textSecondary,
                        lineHeight: "1.6",
                      }}
                    >
                      {b.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: animated SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,212,170,0.06) 0%, transparent 70%)",
                borderRadius: "50%",
                padding: "40px",
                width: "100%",
                maxWidth: "380px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PulsingHexSVG />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}
