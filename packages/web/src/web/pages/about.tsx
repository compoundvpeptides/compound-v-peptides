import { motion } from "framer-motion";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";

export default function About() {
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
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
            Intel Briefing // Origin File
          </p>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}
          >
            About
          </h1>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Belief card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10 p-8"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)",
            border: "1px solid rgba(0,212,170,0.25)",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "120px",
              height: "120px",
              background: "radial-gradient(circle at top right, rgba(0,212,170,0.08), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            className="text-[9px] tracking-[0.25em] uppercase mb-3 font-bold"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}
          >
            Our Foundation
          </p>
          <h2
            className="text-xl md:text-2xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.07em" }}
          >
            Built on One Belief: Precision Over Volume
          </h2>
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem", maxWidth: "600px" }}
          >
            The supplement industry is built on noise — proprietary blends, underdosed actives, and marketing claims
            that survive on consumer inertia rather than peer-reviewed data. We founded Compound V because we believed
            there was a better way.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem", maxWidth: "600px" }}
          >
            Peptides are not supplements. They are targeted biological signals — amino acid sequences that communicate
            directly with your body's receptor network to initiate specific, measurable physiological responses.
            The BioSignal Protocol™ is our commitment to compounds that work at the source: precise, verified,
            and grounded in the science of cellular signalling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Mission */}
          <div
            className="p-8"
            style={{ background: tokens.bgCard, border: `1px solid ${tokens.borderStrong}`, borderRadius: "14px" }}
          >
            <p className="text-[9px] tracking-[0.2em] uppercase mb-3 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
              Mission
            </p>
            <h2 className="text-xl font-black uppercase mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary }}>
              Advancing Research
            </h2>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
              Compound V Peptides was established to provide research institutions, independent researchers, and laboratories with access to the highest quality synthetic peptides available.
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
              We operate at the intersection of cutting-edge biochemistry and rigorous quality control — ensuring every compound that leaves our supply chain meets the exacting standards demanded by serious scientific inquiry.
            </p>
          </div>

          {/* Quality */}
          <div
            className="p-8"
            style={{ background: tokens.bgCard, border: `1px solid ${tokens.borderStrong}`, borderRadius: "14px" }}
          >
            <p className="text-[9px] tracking-[0.2em] uppercase mb-3 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
              Quality Assurance
            </p>
            <h2 className="text-xl font-black uppercase mb-4" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary }}>
              Zero Compromise
            </h2>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
              Every compound undergoes independent third-party analysis via HPLC and mass spectrometry before release. Purity certificates are available for every lot number.
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
              Our manufacturing partners hold GMP certifications and operate under ISO 9001 quality management systems. We publish all test results — no exceptions.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: "18+", label: "Active Compounds" },
            { value: ">99%", label: "Min. Purity" },
            { value: "100%", label: "3P Tested" },
            { value: "5", label: "Research Categories" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 text-center"
              style={{ background: tokens.bgCard, border: `1px solid ${tokens.borderStrong}`, borderRadius: "14px" }}
            >
              <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Legal notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6"
          style={{
            background: "rgba(220,50,50,0.05)",
            border: "1px solid rgba(220,50,50,0.2)",
            borderRadius: "14px",
          }}
        >
          <p className="text-[9px] tracking-[0.2em] uppercase mb-2 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "rgba(255,150,150,0.8)" }}>
            Legal Notice
          </p>
          <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(200,150,150,0.7)", fontSize: "0.75rem" }}>
            All products sold by Compound V Peptides are intended for laboratory and research use only. They are not intended for human or veterinary administration, nor are they medicinal products. Compound V Peptides makes no claims regarding the therapeutic application of any compound. Purchase and use of our products implies acknowledgement of these terms and compliance with all applicable local regulations. You must be 18 years of age or older to purchase.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
