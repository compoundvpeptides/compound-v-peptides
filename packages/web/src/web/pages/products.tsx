import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { products, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { tokens } = useTheme();

  const filtered = products.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.descriptor.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      {/* Page header */}
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
            Active Inventory // {products.length} Compounds In Stock
          </p>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}
          >
            Product Catalogue
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: tokens.textSecondary }}>
            Research-grade compounds. Third-party tested. Certificate of analysis on every batch.
          </p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Calculator teaser strip */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link href="/calculator">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              padding: "14px 20px",
              borderRadius: 14,
              border: "1px solid rgba(0,212,170,0.35)",
              background: "rgba(0,212,170,0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            whileHover={{ background: "rgba(0,212,170,0.09)", borderColor: "rgba(0,212,170,0.55)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>🧪</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: tokens.textSecondary,
                }}
              >
                Not sure how to dose?{" "}
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#00D4AA",
                    letterSpacing: "0.04em",
                  }}
                >
                  Use our Peptide Calculator
                </span>
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#00D4AA",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Open Calculator →
            </span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              viewBox="0 0 16 16"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
            >
              <circle cx="6" cy="6" r="4" />
              <path d="M10 10l4 4" />
            </svg>
            <input
              type="text"
              placeholder="Search compounds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs outline-none transition-all"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: tokens.bgCard,
                border: `1px solid ${tokens.borderStrong}`,
                color: tokens.textPrimary,
                borderRadius: "10px",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 170, 0.5)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 170, 0.2)")}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-3 py-2 text-[10px] tracking-[0.1em] uppercase font-bold transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  background:
                    activeCategory === cat.id
                      ? "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)"
                      : "rgba(0, 212, 170, 0.05)",
                  color:
                    activeCategory === cat.id
                      ? "#080C10"
                      : "#94A3B8",
                  border:
                    activeCategory === cat.id
                      ? "none"
                      : "1px solid rgba(0, 212, 170, 0.15)",
                  borderRadius: "8px",
                  boxShadow: activeCategory === cat.id ? "0 4px 20px rgba(0, 212, 170, 0.3)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
            {filtered.length} compound{filtered.length !== 1 ? "s" : ""} found
          </span>
          <span className="w-8 h-px" style={{ background: "rgba(0, 212, 170, 0.2)" }} />
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20 opacity-40">
                <p className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
                  No compounds match your query
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
