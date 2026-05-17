import { motion } from "framer-motion";
import { Link } from "wouter";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";
import { HomeHero } from "../components/HomeHero";
import { HomeFeatures } from "../components/HomeFeatures";
import { HomeProtocols } from "../components/HomeProtocols";
import { HomeBulkSection, HomeCtaBanner } from "../components/HomeSections";
import { BioSignalProblem } from "../components/BioSignalProblem";
import { BioSignalExplained } from "../components/BioSignalExplained";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const { tokens } = useTheme();

  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      <HomeHero />
      <BioSignalProblem />
      <DisclaimerBanner />
      <BioSignalExplained />
      <HomeFeatures />

      {/* Featured Products */}
      <section style={{ background: tokens.bgDefault, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
                  Active Inventory
                </p>
                <h2 className="text-3xl font-bold uppercase"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}>
                  Featured Compounds
                </h2>
              </div>
              <Link href="/products">
                <button className="px-4 py-2 text-xs tracking-[0.15em] uppercase font-bold transition-all duration-200"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                    border: "1px solid rgba(0, 212, 170, 0.3)", color: "#00D4AA", borderRadius: "8px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0, 212, 170, 0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                  View All →
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HomeProtocols />
      <HomeBulkSection />
      <HomeCtaBanner />
    </div>
  );
}
