import { motion } from "framer-motion";
import { Link } from "wouter";
import { HexBackgroundSVG } from "./HexBackground";

// Reduced animation set — no continuous rotateY or filter animations on initial load
// Only entrance animations + subtle float on logo

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Grid overlay — pure CSS, no JS */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <HexBackgroundSVG />
      {/* Static glow orb — no animation */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: 600, height: 600,
        background: "radial-gradient(ellipse, rgba(0,212,170,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        {/* Logo — simple float, no rotateY/filter loops */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mb-8"
        >
          <motion.img
            src="/logo-hero.webp"
            alt="Compound V Peptides"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "320px",
              display: "block",
              filter: "drop-shadow(0 20px 40px rgba(0, 212, 170, 0.3))",
            }}
            width={320}
            height={320}
          />
        </motion.div>

        {/* Classification label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-px" style={{ background: "#00D4AA" }} />
          <span className="text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
            Classified Research Supply
          </span>
          <span className="w-8 h-px" style={{ background: "#00D4AA" }} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-black uppercase leading-none mb-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 7.5vw, 5.5rem)",
            color: "#F8FAFC", letterSpacing: "0.08em",
            textShadow: "0 0 60px rgba(0,212,170,0.2)",
          }}
        >
          The BioSignal Protocol™
        </motion.h1>

        {/* Pulse line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-lg h-px mb-6"
          style={{ transformOrigin: "left" }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, #00D4AA, transparent)" }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-base md:text-lg mb-4 max-w-xl"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: "#E2E8F0", letterSpacing: "0.06em" }}
        >
          While supplements guess, peptides signal.
        </motion.p>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="text-sm mb-10 max-w-lg"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, color: "#64748B", lineHeight: "1.7" }}
        >
          Every compound in the Compound V catalogue is a bio-identical amino acid sequence engineered to communicate
          directly with your body's receptor network — not a crude stimulant, not a proprietary blend. Research-grade
          purity. Third-party verified. Built on the science of cellular signalling.
        </motion.p>

        {/* Cost of inaction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.98, duration: 0.6 }}
          className="text-xs mb-8 max-w-lg"
          style={{ fontFamily: "'Inter', sans-serif", color: "#475569", lineHeight: "1.6" }}
        >
          Every week without the right protocol is another week of suboptimal recovery, slower results, and compounding cellular lag.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/products">
            <button
              className="px-8 py-3 text-sm tracking-[0.15em] uppercase font-bold transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                color: "#080C10", border: "none", borderRadius: "14px",
                boxShadow: "0 4px 20px rgba(0, 212, 170, 0.3)",
              }}
            >
              Enter Catalogue →
            </button>
          </Link>
          <Link href="/protocols">
            <button
              className="px-8 py-3 text-sm tracking-[0.15em] uppercase font-bold transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                background: "transparent", color: "#00D4AA",
                border: "1px solid rgba(0, 212, 170, 0.5)", borderRadius: "14px",
              }}
            >
              View Protocol
            </button>
          </Link>
        </motion.div>

        {/* Calculator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-4"
        >
          <Link href="/calculator">
            <button
              className="flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-bold"
              style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                background: "rgba(0,212,170,0.06)", color: "#00D4AA",
                border: "1px solid rgba(0, 212, 170, 0.3)", borderRadius: "50px",
              }}
            >
              <span style={{ fontSize: 14 }}>🧪</span>
              Try the Calculator →
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex items-center gap-8 mt-14"
        >
          {[
            { value: "18+", label: "Compounds" },
            { value: ">99%", label: "Purity" },
            { value: "3PL", label: "Tested" },
            { value: "5", label: "Categories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #00D4AA, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
