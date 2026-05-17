import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "../context/ThemeContext";
import { protocols } from "../data/protocols";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export function HomeProtocols() {
  const { tokens } = useTheme();
  return (
    <section style={{ background: tokens.bgPaper, padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
              Classified Documents
            </p>
            <h2 className="text-3xl font-bold uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}>
              Research Protocols
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {protocols.map((protocol, i) => (
            <motion.div key={protocol.id} variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Link href="/protocols">
                <div className="p-6 cursor-pointer group"
                  style={{ background: tokens.bgCard, border: `1px solid ${tokens.borderStrong}`, borderRadius: "14px", transition: "border-color 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = tokens.cardBorderHover;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0, 212, 170, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = tokens.borderStrong;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                      style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA",
                        background: "rgba(0, 212, 170, 0.08)", border: "1px solid rgba(0, 212, 170, 0.2)", borderRadius: "6px" }}>
                      {protocol.codename}
                    </span>
                    <span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
                      {protocol.classification}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="h-px w-full mb-3" style={{ background: "rgba(0, 212, 170, 0.08)" }} />
                    <svg viewBox="0 0 200 30" className="w-full h-6 opacity-20" fill="none" stroke="#00D4AA" strokeWidth="0.5">
                      <line x1="0" y1="8" x2="120" y2="8" />
                      <line x1="0" y1="16" x2="180" y2="16" />
                      <line x1="0" y1="24" x2="90" y2="24" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold uppercase mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}>
                    {protocol.name}
                  </h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                    {protocol.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {protocol.compounds.map((c) => (
                      <span key={c} className="text-[9px] tracking-wider uppercase px-2 py-0.5"
                        style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8",
                          border: "1px solid rgba(0, 212, 170, 0.15)", background: "rgba(0, 212, 170, 0.04)", borderRadius: "6px" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px]" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
                      Duration: {protocol.duration}
                    </span>
                    <span className="text-xs tracking-wider uppercase group-hover:text-[#00D4AA] transition-colors"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#94A3B8" }}>
                      View Protocol →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
