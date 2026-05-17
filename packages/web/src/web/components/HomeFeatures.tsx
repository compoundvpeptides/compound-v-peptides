import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const FEATURES = [
  {
    title: "Research Grade Purity",
    body: "All compounds synthesised to >99% purity minimum via HPLC validation. Certificate of Analysis provided with every order.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#00D4AA" strokeWidth="1.5">
        <circle cx="24" cy="24" r="20" />
        <path d="M16 24l6 6 10-12" />
        <path d="M24 4v4M24 40v4M4 24h4M40 24h4" />
      </svg>
    ),
  },
  {
    title: "Third-Party Tested",
    body: "Independent mass spectrometry and HPLC analysis on every batch. No exceptions. Results published with each product lot.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#00D4AA" strokeWidth="1.5">
        <path d="M24 4l4 8h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z" />
        <circle cx="24" cy="24" r="18" strokeDasharray="4 2" />
      </svg>
    ),
  },
  {
    title: "Fully Labelled",
    body: "Every vial ships with a clean, professional product label clearly identifying the compound — no more guessing what's in the box.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#00D4AA" strokeWidth="1.5">
        <rect x="8" y="12" width="32" height="24" rx="2" />
        <line x1="8" y1="20" x2="40" y2="20" />
        <line x1="14" y1="27" x2="28" y2="27" />
        <line x1="14" y1="32" x2="22" y2="32" />
        <path d="M33 26l3 3-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HomeFeatures() {
  const { tokens } = useTheme();
  return (
    <section style={{ background: tokens.bgPaper, padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
              Intelligence Brief
            </p>
            <h2 className="text-3xl font-bold uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}>
              Why Compound V
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat) => (
            <motion.div key={feat.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <motion.div className="p-8 flex flex-col items-center text-center"
                style={{ background: tokens.bgCard, border: `1px solid ${tokens.borderStrong}`, borderRadius: "14px" }}
                whileHover={{ borderColor: "rgba(0, 212, 170, 0.4)" }} transition={{ duration: 0.2 }}>
                <div className="mb-5 p-3" style={{ border: "1px solid rgba(0, 212, 170, 0.2)", background: "rgba(0, 212, 170, 0.04)", borderRadius: "10px" }}>
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold uppercase mb-3"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}>
                  {feat.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                  {feat.body}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
