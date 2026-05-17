import { products } from "../data/products";
import type { Product } from "../data/products";
import { getUpsells } from "../data/upsell-pairings";
import { useTheme } from "../context/ThemeContext";
import { ProductCard } from "./ProductCard";

interface Props {
  currentProductId: string;
}

export function FrequentlyBoughtTogether({ currentProductId }: Props) {
  const { tokens } = useTheme();

  const upsellIds = getUpsells(currentProductId).filter(
    (id) => id !== currentProductId
  );

  const upsellProducts = upsellIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  if (upsellProducts.length === 0) return null;

  return (
    <div style={{ marginTop: 48 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 3, height: 20, background: "#00D4AA", borderRadius: 2 }} />
        <h2 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.18em",
          color: tokens.textPrimary,
          margin: 0,
          textTransform: "uppercase",
        }}>
          Frequently Bought Together
        </h2>
      </div>

      {/* Scrollable row of ProductCards */}
      <div style={{
        display: "flex",
        gap: 16,
        overflowX: "auto",
        paddingBottom: 12,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,212,170,0.2) transparent",
        alignItems: "stretch",
      } as React.CSSProperties}>
        {upsellProducts.map((product) => (
          <div
            key={product.id}
            style={{ minWidth: 240, maxWidth: 240, flexShrink: 0 }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style>{`
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,170,0.2); border-radius: 2px; }
      `}</style>
    </div>
  );
}
