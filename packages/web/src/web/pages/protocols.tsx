import { motion } from "framer-motion";
import { Link } from "wouter";
import { protocols, products } from "../data/products";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";

export default function Protocols() {
  const { tokens } = useTheme();
  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      <div
        className="relative pt-28 pb-12 px-6 overflow-hidden"
        style={{ background: tokens.bgPaper, borderBottom: `1px solid ${tokens.borderStrong}` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
            Classified Documents // Level 3 Access
          </p>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}
          >
            Research Protocols
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 500, color: tokens.textSecondary }}>
            Curated compound stacks for specific research objectives. For laboratory use only.
          </p>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-8">
          {protocols.map((protocol, i) => {
            const protocolProducts = products.filter((p) =>
              protocol.compounds.some((c) => p.name.toLowerCase().includes(c.toLowerCase()))
            );

            return (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8"
                style={{
                  background: tokens.bgCard,
                  border: `1px solid ${tokens.borderStrong}`,
                  borderRadius: "14px",
                }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Dossier info */}
                  <div className="lg:w-1/2">
                    {/* File header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 700,
                          color: "#00D4AA",
                          background: "rgba(0,212,170,0.08)",
                          border: "1px solid rgba(0,212,170,0.25)",
                          borderRadius: "6px",
                        }}
                      >
                        {protocol.codename}
                      </span>
                      <span
                        className="text-[9px] tracking-widest uppercase px-2 py-1"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "rgba(255,150,150,0.8)",
                          background: "rgba(220,50,50,0.08)",
                          border: "1px solid rgba(220,50,50,0.25)",
                          borderRadius: "6px",
                        }}
                      >
                        {protocol.clearance}
                      </span>
                    </div>

                    {/* Dossier graphic lines */}
                    <div className="mb-4 opacity-20">
                      <svg viewBox="0 0 400 20" className="w-full h-4" fill="none" stroke="#00D4AA" strokeWidth="0.5">
                        <line x1="0" y1="5" x2="300" y2="5" />
                        <line x1="0" y1="12" x2="200" y2="12" />
                        <rect x="310" y="2" width="60" height="14" />
                        <text x="315" y="12" fontSize="8" fill="#00D4AA">CLASSIFIED</text>
                      </svg>
                    </div>

                    <span
                      className="text-[10px] tracking-[0.2em] uppercase mb-2 block"
                      style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}
                    >
                      {protocol.classification}
                    </span>
                    <h2
                      className="text-2xl font-black uppercase mb-3"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}
                    >
                      {protocol.name}
                    </h2>
                    <p className="text-sm mb-5 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
                      {protocol.description}
                    </p>

                    <div className="flex items-center gap-6 mb-5">
                      <div>
                        <p className="text-[9px] tracking-widest uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
                          Duration
                        </p>
                        <p className="text-xs font-bold" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
                          {protocol.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-widest uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
                          Compounds
                        </p>
                        <p className="text-xs font-bold" style={{ fontFamily: "'Inter', sans-serif", color: "#F8FAFC" }}>
                          {protocol.compounds.length} active
                        </p>
                      </div>
                    </div>

                    {/* Compound tags */}
                    <div className="flex flex-wrap gap-2">
                      {protocol.compounds.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] tracking-wider uppercase px-3 py-1"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#00D4AA",
                            border: "1px solid rgba(0,212,170,0.25)",
                            background: "rgba(0,212,170,0.05)",
                            borderRadius: "6px",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Product cards */}
                  <div className="lg:w-1/2">
                    <p
                      className="text-[9px] tracking-[0.2em] uppercase mb-4 font-bold"
                      style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}
                    >
                      Compounds in this Protocol
                    </p>
                    <div className="flex flex-col gap-3">
                      {protocol.compounds.map((compoundName) => {
                        const prod = products.find((p) =>
                          p.name.toLowerCase().includes(compoundName.toLowerCase())
                        );
                        if (!prod) return null;
                        return (
                          <Link key={compoundName} href={`/product/${prod.id}`}>
                            <div
                              className="flex items-center gap-4 p-3 cursor-pointer transition-all duration-200 group"
                              style={{
                                background: tokens.bgImageArea,
                                border: `1px solid ${tokens.borderStrong}`,
                                borderRadius: "8px",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.cardBorderHover;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.borderStrong;
                              }}
                            >
                              <div
                                className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                                style={{ border: `1px solid ${prod.categoryColor}40`, background: `${prod.categoryColor}10`, borderRadius: "6px" }}
                              >
                                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke={prod.categoryColor} strokeWidth="1.5">
                                  <circle cx="10" cy="10" r="3" />
                                  <circle cx="4" cy="6" r="2" />
                                  <circle cx="16" cy="6" r="2" />
                                  <circle cx="16" cy="14" r="2" />
                                  <circle cx="4" cy="14" r="2" />
                                  <line x1="10" y1="10" x2="4" y2="6" />
                                  <line x1="10" y1="10" x2="16" y2="6" />
                                  <line x1="10" y1="10" x2="16" y2="14" />
                                  <line x1="10" y1="10" x2="4" y2="14" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, fontSize: "0.75rem" }}>
                                  {prod.name}
                                </p>
                                <p className="text-[10px] truncate" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                                  {prod.descriptor}
                                </p>
                              </div>
                              <span
                                className="text-[10px] uppercase tracking-wider group-hover:text-[#00D4AA] transition-colors flex-shrink-0"
                                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#94A3B8" }}
                              >
                                View →
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
