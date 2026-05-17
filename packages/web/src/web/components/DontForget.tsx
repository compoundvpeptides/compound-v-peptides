/**
 * DontForget — checkout upsell strip
 * Shows above order summary. BAC Water always first, then one contextual suggestion.
 * Never shows a product already in the cart.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";
import type { Product, PricingTier } from "../data/products";
import { getUpsells } from "../data/upsell-pairings";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function MiniUpsellCard({
  product,
  tier,
  note,
  added,
  onAdd,
}: {
  product: Product;
  tier: PricingTier;
  note?: string;
  added: boolean;
  onAdd: () => void;
}) {
  const { tokens } = useTheme();
  const defaultImage = product.variants[0].image;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      background: tokens.drawerItemBg,
      border: `1px solid rgba(0,212,170,0.15)`,
      borderRadius: 10,
      flex: 1,
      minWidth: 0,
    }}>
      {/* Thumbnail */}
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        borderRadius: 8,
        background: "rgba(0,212,170,0.06)",
        border: "1px solid rgba(0,212,170,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {defaultImage ? (
          <img src={defaultImage} alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 18, color: `${product.categoryColor}80`,
          }}>
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Name + note */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 13, color: tokens.textPrimary,
          margin: "0 0 2px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {product.name}
        </p>
        {note && (
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10,
            color: "#F59E0B", margin: 0,
          }}>
            {note}
          </p>
        )}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11,
          color: "#00D4AA", margin: 0,
          fontWeight: 700,
        }}>
          ₹{tier.inr.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        style={{
          flexShrink: 0,
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 11, letterSpacing: "0.12em",
          padding: "7px 14px",
          background: added ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
          color: added ? "#10B981" : "#080C10",
          border: added ? "1px solid #10B981" : "none",
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        {added ? "✓ ADDED" : "ADD"}
      </button>
    </div>
  );
}

function BacMiniCard({
  product,
  added,
  onAdd,
}: {
  product: Product;
  added: boolean;
  onAdd: (tier: PricingTier) => void;
}) {
  const { tokens } = useTheme();
  // Default to index 0 (10ml Indian)
  const [variantIdx, setVariantIdx] = useState(0);

  const variant = product.variants[variantIdx];
  const tier = variant.pricing.find((p) => p.inr > 0)!;
  const defaultImage = product.variants[0].image;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      background: tokens.drawerItemBg,
      border: `1px solid rgba(0,212,170,0.15)`,
      borderRadius: 10,
      flex: 1,
      minWidth: 0,
    }}>
      {/* Thumbnail */}
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        borderRadius: 8,
        background: "rgba(0,212,170,0.06)",
        border: "1px solid rgba(0,212,170,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {defaultImage ? (
          <img src={defaultImage} alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 18, color: `${product.categoryColor}80`,
          }}>
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Name + variant selector + note + price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 13, color: tokens.textPrimary,
          margin: "0 0 4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {product.name}
        </p>

        {/* Variant dropdown */}
        <select
          value={variantIdx}
          onChange={(e) => setVariantIdx(Number(e.target.value))}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            padding: "2px 4px",
            borderRadius: 4,
            border: "1px solid rgba(0,212,170,0.3)",
            background: "rgba(0,212,170,0.06)",
            color: tokens.textPrimary,
            cursor: "pointer",
            marginBottom: 3,
            width: "100%",
          }}
        >
          {product.variants.map((v, i) => (
            <option key={i} value={i}>
              {v.name}
            </option>
          ))}
        </select>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10,
          color: "#F59E0B", margin: "0 0 1px",
        }}>
          Required for reconstitution
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11,
          color: "#00D4AA", margin: 0,
          fontWeight: 700,
        }}>
          ₹{tier.inr.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={() => onAdd(tier)}
        style={{
          flexShrink: 0,
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          fontSize: 11, letterSpacing: "0.12em",
          padding: "7px 14px",
          background: added ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
          color: added ? "#10B981" : "#080C10",
          border: added ? "1px solid #10B981" : "none",
          borderRadius: 8,
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        {added ? "✓ ADDED" : "ADD"}
      </button>
    </div>
  );
}

export function DontForget() {
  const { items, addItem } = useCart();
  const { tokens } = useTheme();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const cartIds = new Set(items.map((i) => i.product.id));
  const bacWater = products.find((p) => p.id === "bac-water");

  // Determine contextual suggestion from highest-value cart item
  const highestValueItem = items.reduce(
    (best, curr) => (curr.tier.inr > (best?.tier.inr ?? 0) ? curr : best),
    items[0]
  );
  const contextualIds = highestValueItem
    ? getUpsells(highestValueItem.product.id).filter(
        (id) => id !== "bac-water" && !cartIds.has(id)
      )
    : [];
  const contextualProduct = contextualIds
    .map((id) => products.find((p) => p.id === id))
    .find(Boolean) as Product | undefined;

  // Build non-BAC suggestions (max 1 contextual)
  const contextualSuggestions: { product: Product; tier: PricingTier }[] = [];
  if (contextualProduct) {
    const tier =
      contextualProduct.variants[0].pricing.find((p) => p.inr > 0) ??
      contextualProduct.variants[0].pricing[0];
    if (tier.inr > 0) contextualSuggestions.push({ product: contextualProduct, tier });
  }

  const showBac = !!(bacWater && !cartIds.has("bac-water"));
  const showContextual = contextualSuggestions.length > 0;

  if (!showBac && !showContextual) return null;

  const handleAdd = (product: Product, tier: PricingTier) => {
    addItem(product, tier);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: 24 }}
    >
      <div style={{
        background: tokens.drawerBg,
        border: `1px solid rgba(0,212,170,0.2)`,
        borderRadius: 14,
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 20px",
          borderBottom: `1px solid rgba(0,212,170,0.12)`,
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(0,212,170,0.04)",
        }}>
          <div style={{ width: 3, height: 16, background: "#F59E0B", borderRadius: 2 }} />
          <h3 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700, fontSize: 13,
            letterSpacing: "0.18em",
            color: tokens.textPrimary, margin: 0,
            textTransform: "uppercase",
          }}>
            Don't Forget
          </h3>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, color: tokens.textSecondary, marginLeft: 2,
          }}>
            — commonly needed with your order
          </span>
        </div>

        {/* Cards */}
        <div style={{
          padding: "14px 20px",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}>
          {showBac && bacWater && (
            <BacMiniCard
              product={bacWater}
              added={!!addedMap["bac-water"]}
              onAdd={(tier) => handleAdd(bacWater, tier)}
            />
          )}
          {showContextual && contextualSuggestions.map(({ product, tier }) => (
            <MiniUpsellCard
              key={product.id}
              product={product}
              tier={tier}
              added={!!addedMap[product.id]}
              onAdd={() => handleAdd(product, tier)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
