import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import type { Product } from "../data/products";
import { useTheme } from "../context/ThemeContext";

const categoryLabels: Record<string, string> = {
  "gh-peptides":        "GH Peptides",
  "healing-recovery":   "Healing & Recovery",
  "fat-loss-metabolic": "Metabolic",
  "cognitive":          "Cognitive",
  "anti-aging":         "Anti-Aging",
  "hgh":                "HGH",
  "nad":                "NAD+",
  "bac-water":          "BAC Water",
};

// ─── BAC Water image cycling hook ─────────────────────────────────────────────
function useImageCycle(images: string[], active: boolean, intervalMs = 700) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active || images.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIdx(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, images.length, intervalMs]);

  // reset on hover end
  useEffect(() => {
    if (!active) setIdx(0);
  }, [active]);

  return images[idx] ?? images[0];
}

// ─── Image area ───────────────────────────────────────────────────────────────
function ProductImage({
  product,
  isHovered,
  tokens,
}: {
  product: Product;
  isHovered: boolean;
  tokens: ReturnType<typeof useTheme>["tokens"];
}) {
  const variantImages = product.variants
    .map((v) => v.image)
    .filter((img): img is string => Boolean(img));

  const isCycling = product.id === "bac-water" && variantImages.length > 1;
  const cycledImage = useImageCycle(variantImages, isCycling ? isHovered : false);

  const displayImage = isCycling ? cycledImage : (product.variants[0].image ?? null);

  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{
        height: "240px",
        background: tokens.bgImageArea,
        borderBottom: `1px solid ${tokens.border}`,
        borderRadius: "14px 14px 0 0",
        padding: "12px 16px",
      }}
    >
      {displayImage ? (
        <img
          key={displayImage}
          src={displayImage}
          alt={product.name}
          loading="lazy"
          width={400}
          height={600}
          className="transition-transform duration-300 group-hover:scale-105"
          style={{
            width: "auto",
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            objectPosition: "center",
            imageRendering: "auto",
            animation: isCycling && isHovered ? "fadeIn 0.3s ease" : undefined,
          }}
        />
      ) : (
        <>
          <MolecularPlaceholder color={product.categoryColor} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif", color: `${product.categoryColor}60` }}
            >
              MW: {product.molecularWeight || "—"}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Price / CTA area ─────────────────────────────────────────────────────────
function ProductCTA({
  product,
  tokens,
}: {
  product: Product;
  tokens: ReturnType<typeof useTheme>["tokens"];
}) {
  const [, navigate] = useLocation();
  const lowestPrice = Math.min(
    ...product.variants
      .map((v) => v.pricing[0]?.inr ?? 0)
      .filter((p) => p > 0)
  );
  const hasMultipleVariants = product.variants.length > 1;

  if (product.inquireOnly) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <div
            className="font-bold"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              color: "#f59e0b",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            Kit / On Order
          </div>
          <div className="text-[10px]" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}>
            Inquire for pricing
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
          className="px-3 py-2 text-[10px] tracking-[0.1em] uppercase font-bold transition-all duration-200"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "none",
            color: "#080C10",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
          }}
        >
          Inquire
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <div
          className="font-bold"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            color: "#00D4AA",
            fontSize: "0.9rem",
          }}
        >
          {hasMultipleVariants ? "from " : ""}
          ₹{lowestPrice.toLocaleString("en-IN")}
        </div>
        <div className="text-[10px]" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}>
          {hasMultipleVariants
            ? `${product.variants.length} variants`
            : product.variants[0].name}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
        className="px-3 py-2 text-[10px] tracking-[0.1em] uppercase font-bold transition-all duration-200"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
          background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
          border: "none",
          color: "#080C10",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 212, 170, 0.3)",
        }}
      >
        Select
      </button>
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export function ProductCard({ product }: { product: Product }) {
  const { tokens } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [, navigate] = useLocation();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative flex flex-col group h-full"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        cursor: "pointer",
        background: tokens.bgCard,
        border: `1px solid ${tokens.border}`,
        borderRadius: "14px",
        transition: "border-color 0.25s, box-shadow 0.25s, background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = tokens.cardBorderHover;
        el.style.boxShadow = tokens.cardShadowHover;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = tokens.border;
        el.style.boxShadow = "none";
      }}
    >
      {/* Category badge */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase font-bold z-10"
        style={{
          background: `${product.categoryColor}18`,
          border: `1px solid ${product.categoryColor}40`,
          color: product.categoryColor,
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          borderRadius: "6px",
        }}
      >
        {categoryLabels[product.category] || product.category}
      </div>

      {/* Special badge */}
      {product.badge && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase font-bold z-10"
          style={{
            background: product.badge === "POPULAR"
              ? "rgba(245,158,11,0.15)"
              : "rgba(124, 58, 237, 0.15)",
            border: `1px solid ${product.badge === "POPULAR" ? "rgba(245,158,11,0.4)" : "rgba(124, 58, 237, 0.4)"}`,
            color: product.badge === "POPULAR" ? "#f59e0b" : "#9D68F0",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            borderRadius: "6px",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <ProductImage product={product} isHovered={isHovered} tokens={tokens} />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/product/${product.id}`}>
          <h3
            className="text-sm font-bold mb-1 transition-colors"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              color: tokens.textPrimary,
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#00D4AA";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = tokens.textPrimary;
            }}
          >
            {product.name}
          </h3>
        </Link>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            color: "rgba(0,212,170,0.5)",
            letterSpacing: "0.04em",
            marginBottom: "4px",
          }}
        >
          Part of The BioSignal Protocol™
        </p>
        <p
          className="text-xs mb-3 leading-relaxed flex-1"
          style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary, fontSize: "0.72rem" }}
        >
          {product.descriptor}
        </p>

        {/* Purity */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[9px] tracking-[0.1em] uppercase px-2 py-0.5"
            style={{
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10B981",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              background: "rgba(16, 185, 129, 0.06)",
              borderRadius: "6px",
            }}
          >
            &gt;99% Purity
          </span>
        </div>

        <ProductCTA product={product} tokens={tokens} />

        {/* Fine print */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            color: tokens.textFine,
            marginTop: "10px",
            lineHeight: "1.4",
            fontWeight: 400,
          }}
        >
          Product appearance, packaging, and labelling may vary from images shown. Images are for illustrative purposes only.
        </p>
      </div>
    
      
    </motion.div>
  );
}

function MolecularPlaceholder({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className="w-28 h-24 opacity-20"
      fill="none"
      stroke={color}
      strokeWidth="0.8"
    >
      <circle cx="60" cy="50" r="6" />
      <circle cx="30" cy="30" r="4" />
      <circle cx="90" cy="30" r="4" />
      <circle cx="90" cy="70" r="4" />
      <circle cx="30" cy="70" r="4" />
      <circle cx="10" cy="50" r="3" />
      <circle cx="110" cy="50" r="3" />
      <circle cx="60" cy="15" r="3" />
      <circle cx="60" cy="85" r="3" />
      <line x1="60" y1="50" x2="30" y2="30" />
      <line x1="60" y1="50" x2="90" y2="30" />
      <line x1="60" y1="50" x2="90" y2="70" />
      <line x1="60" y1="50" x2="30" y2="70" />
      <line x1="30" y1="30" x2="10" y2="50" />
      <line x1="90" y1="30" x2="110" y2="50" />
      <line x1="30" y1="30" x2="60" y2="15" />
      <line x1="90" y1="30" x2="60" y2="15" />
      <line x1="30" y1="70" x2="60" y2="85" />
      <line x1="90" y1="70" x2="60" y2="85" />
      <line x1="10" y1="50" x2="30" y2="70" />
      <line x1="110" y1="50" x2="90" y2="70" />
    </svg>
  );
}
