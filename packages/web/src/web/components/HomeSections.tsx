import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTheme } from "../context/ThemeContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const BULK_ITEMS = [
  {
    title: "Bulk Orders",
    desc: "Volume pricing across all compounds. Minimum quantities negotiable. Multi-compound bundles available.",
    icon: "⬡",
  },
  {
    title: "Reseller Programme",
    desc: "Authorised distributor agreements for labs and research suppliers. COA pass-through included.",
    icon: "◈",
  },
  {
    title: "Custom Kits",
    desc: "Bespoke multi-compound research kits with tailored documentation. Contact us to spec your kit.",
    icon: "◫",
  },
];

export function HomeBulkSection() {
  const { tokens } = useTheme();
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <section className="py-20 px-6 relative overflow-hidden"
        style={{ background: tokens.bgPaper, borderTop: "1px solid rgba(245, 158, 11, 0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "#F59E0B" }}>
              Partnerships & Bulk Supply
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}>
              Work With Us
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: tokens.textSecondary, lineHeight: 1.7 }}>
              We supply research institutions, independent labs, and registered distributors at scale.
              Custom volumes, white-label documentation, and dedicated account management available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {BULK_ITEMS.map((item) => (
              <div key={item.title} className="p-6" style={{ background: "rgba(245, 158, 11, 0.04)", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: "14px" }}>
                <div className="text-2xl mb-3" style={{ color: "#F59E0B", fontFamily: "'Rajdhani', sans-serif" }}>{item.icon}</div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact">
              <button className="px-10 py-4 text-sm tracking-[0.15em] uppercase font-bold transition-all duration-200"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, background: "rgba(245, 158, 11, 0.12)",
                  color: "#F59E0B", border: "1px solid rgba(245, 158, 11, 0.45)", borderRadius: "14px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(245, 158, 11, 0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}>
                Submit Enquiry →
              </button>
            </Link>
            <p className="text-[10px] mt-4" style={{ fontFamily: "'Inter', sans-serif", color: "#475569" }}>
              Registered research entities only · Documentation required
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export function HomeCtaBanner() {
  const { tokens } = useTheme();
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <section className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: tokens.bgDefault, borderTop: "1px solid rgba(0, 212, 170, 0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
            Full Catalogue
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}>
            18 Compounds. 5 Categories.
          </h2>
          <p className="text-sm mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: tokens.textSecondary }}>
            All research-grade, third-party tested, and ready for laboratory use.
          </p>
          <Link href="/products">
            <button className="px-10 py-4 text-sm tracking-[0.15em] uppercase font-bold transition-all duration-200"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                color: "#080C10", borderRadius: "14px", boxShadow: "0 4px 20px rgba(0, 212, 170, 0.3)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(0, 212, 170, 0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0, 212, 170, 0.3)"; }}>
              Enter Catalogue →
            </button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
