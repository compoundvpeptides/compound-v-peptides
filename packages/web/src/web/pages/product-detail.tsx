import { pixelViewContent, pixelAddToCart } from "../lib/pixel";
import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { products } from "../data/products";
import type { PricingTier, Variant, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";
import { ProductVisual } from "../components/ProductVisual";
import { PricingTiers } from "../components/PricingTiers";
import { FrequentlyBoughtTogether } from "../components/FrequentlyBoughtTogether";
import { ProductAccordions } from "../components/product/ProductAccordions";

const categoryLabels: Record<string, string> = {
  "gh-peptides":        "GH Peptides",
  "healing-recovery":   "Healing & Recovery",
  "fat-loss-metabolic": "Fat Loss & Metabolic",
  "cognitive":          "Cognitive & Nootropics",
  "anti-aging":         "Anti-Aging & Wellness",
  "hgh":                "HGH",
  "nad":                "NAD+",
  "bac-water":          "BAC Water",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { tokens } = useTheme();

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product?.variants[0] ?? null
  );
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(
    product?.variants[0]?.pricing[0] ?? null
  );
  const [added, setAdded] = useState(false);

  // Reset state + scroll to top when navigating to a different product
  useEffect(() => {
    setSelectedVariant(product?.variants[0] ?? null);
    setSelectedTier(product?.variants[0]?.pricing[0] ?? null);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  if (product) pixelViewContent(product.id, product.name, product?.variants[0]?.pricing[0]?.inr ?? 0);
  }, [id]);


  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    setSelectedTier(variant.pricing[0] ?? null);
    setAdded(false);
  };

  const handleAdd = () => {
    if (!product || !selectedTier || !selectedVariant || selectedTier.inr === 0) return;
  pixelAddToCart(product.id, product.name, selectedTier.inr);
    // Build a typed cart-compatible product — no `as any` needed
    const cartProduct: Product = {
      ...product,
      name: selectedVariant.name,
      variants: selectedVariant ? [selectedVariant] : product.variants,
    };
    addItem(cartProduct, selectedTier);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: tokens.bgDefault, color: tokens.textPrimary }}>
        <div className="text-center">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
            Compound not found
          </p>
          <Link href="/products">
            <button className="px-6 py-2 text-xs tracking-widest uppercase"
              style={{ border: "1px solid rgba(0, 212, 170, 0.4)", color: "#00D4AA",
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, borderRadius: "8px" }}>
              ← Back to Catalogue
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const hasMultipleVariants = product.variants.length > 1;
  const tierUnavailable    = selectedTier ? selectedTier.inr === 0 : false;
  const activePricing      = (selectedVariant ?? product.variants[0]).pricing;

  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      <DisclaimerBanner />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[10px] tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
          <Link href="/products" className="hover:text-[#00D4AA] transition-colors">Catalogue</Link>
          <span>/</span>
          <span style={{ color: "#00D4AA" }}>{selectedVariant ? selectedVariant.name : product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Visual */}
          <ProductVisual product={product} selectedVariant={selectedVariant} tokens={tokens} />

          {/* Right: Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {/* Category + badge */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-bold"
                style={{ background: `${product.categoryColor}18`, border: `1px solid ${product.categoryColor}40`,
                  color: product.categoryColor, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, borderRadius: "6px" }}>
                {categoryLabels[product.category]}
              </span>
              {product.badge && (
                <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-1"
                  style={{ background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.4)",
                    color: "#9D68F0", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, borderRadius: "6px" }}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black uppercase mb-2"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.08em" }}>
              {product.name}
            </h1>
            <p className="text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
              {product.descriptor}
            </p>

            <div className="h-px w-full mb-6" style={{ background: "rgba(0, 212, 170, 0.1)" }} />

            {/* Description */}
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.2em] uppercase mb-2 font-bold"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                Research Overview
              </p>
              <p className="text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.85rem" }}>
                {product.description}
              </p>
            </div>

            {/* Variant selector */}
            {hasMultipleVariants && (
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.2em] uppercase mb-3 font-bold"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                  Select Variant
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isActive = selectedVariant?.name === variant.name;
                    return (
                      <button key={variant.name} onClick={() => handleVariantChange(variant)}
                        className="px-3 py-2 text-[10px] tracking-wider uppercase font-bold transition-all duration-200"
                        style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                          background: isActive ? `${product.categoryColor}18` : "rgba(0, 212, 170, 0.04)",
                          border: isActive ? `1px solid ${product.categoryColor}80` : "1px solid rgba(0, 212, 170, 0.15)",
                          color: isActive ? product.categoryColor : "#94A3B8",
                          boxShadow: isActive ? `0 0 10px ${product.categoryColor}20` : "none",
                          borderRadius: "8px" }}>
                        {variant.name.replace(product.name, "").trim() || variant.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing tiers — hidden for inquireOnly */}
            {!product.inquireOnly && (
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.2em] uppercase mb-3 font-bold"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                  Select Quantity
                </p>
                <PricingTiers
                  activePricing={activePricing}
                  selectedTier={selectedTier}
                  onSelect={setSelectedTier}
                  tokens={tokens}
                />
              </div>
            )}

            {/* CTA — Inquire block OR add to cart */}
            {product.inquireOnly ? (
              <div className="mb-2">
                <div className="w-full py-4 mb-3 text-center rounded-[14px]"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "#f59e0b" }}>
                    Kit / On Order Only
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
                    This product is available exclusively as part of a kit. Contact us to enquire about availability and pricing.
                  </p>
                </div>
                <a href="/contact"
                  className="block w-full py-4 text-sm tracking-[0.15em] uppercase font-bold text-center transition-all duration-200"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    color: "#080C10", borderRadius: "14px",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                    textDecoration: "none",
                  }}>
                  Enquire About This Product
                </a>
              </div>
            ) : (
              <button onClick={handleAdd} disabled={!selectedTier || tierUnavailable}
                className="w-full py-4 text-sm tracking-[0.15em] uppercase font-bold transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.05em",
                  background: added ? "rgba(16, 185, 129, 0.2)"
                    : tierUnavailable ? "rgba(255,255,255,0.05)"
                    : "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                  color: added ? "#10B981" : tierUnavailable ? "#94A3B8" : "#080C10",
                  border: added ? "1px solid #10B981" : tierUnavailable ? "1px solid rgba(255,255,255,0.1)" : "none",
                  boxShadow: added || tierUnavailable ? "none" : "0 4px 20px rgba(0, 212, 170, 0.3)",
                  cursor: tierUnavailable ? "not-allowed" : "pointer", borderRadius: "14px",
                }}
                onMouseEnter={(e) => {
                  if (!added && !tierUnavailable)
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(0, 212, 170, 0.5)";
                }}
                onMouseLeave={(e) => {
                  if (!added && !tierUnavailable)
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0, 212, 170, 0.3)";
                }}>
                {added ? "✓ Added to Research Cart"
                  : tierUnavailable ? "Unavailable"
                  : `Add to Order — ${selectedTier ? `₹${selectedTier.inr.toLocaleString("en-IN")}` : ""}`}
              </button>
            )}

            <p className="text-[10px] text-center mt-3" style={{ fontFamily: "'Inter', sans-serif", color: "#94A3B8" }}>
              <a href={"https://wa.me/919310703553?text="+encodeURIComponent("Hi, I would like to request the Certificate of Analysis (COA) for "+product.name+(selectedVariant?" "+selectedVariant.name.replace(product.name,"").trim():""))} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginTop:"12px",padding:"12px",border:"1px solid #25D366",borderRadius:"10px",color:"#25D366",fontSize:"13px",fontWeight:600,letterSpacing:"0.05em",textDecoration:"none",width:"100%"}}>📋 Request Certificate of Analysis (COA)</a>
          For research use only · 18+ · Certificate of analysis included
            </p>
            <p className="text-center mt-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#475569", lineHeight: "1.4" }}>
              Product appearance, packaging, and labelling may vary from images shown. Images are for illustrative purposes only.
            </p>

            {/* Compound accordions — hidden for BAC Water */}
            {product.category !== "bac-water" && (
              <ProductAccordions product={product} textSecondary={tokens.textSecondary} />
            )}

          </motion.div>
        </div>

        {/* People Also Buy */}
        <FrequentlyBoughtTogether currentProductId={product.id} />
      </div>
    </div>
  );
}
