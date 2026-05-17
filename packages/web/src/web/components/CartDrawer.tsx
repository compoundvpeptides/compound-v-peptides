import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart } = useCart();
  const { tokens } = useTheme();
  const [, navigate] = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  const fmt = (inr: number) => `₹${inr.toLocaleString("en-IN")}`;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  function handleCheckout() {
    setIsOpen(false);
    navigate("/checkout");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(0,0,0,0.7)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
        style={{
          background: tokens.drawerBg,
          borderLeft: `1px solid ${tokens.borderStrong}`,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${tokens.borderStrong}` }}>
          <div>
            <h2 className="text-sm tracking-[0.2em] uppercase font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
              Research Cart
            </h2>
            <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}>
              {items.length} compound{items.length !== 1 ? "s" : ""} queued
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{ border: `1px solid ${tokens.borderStrong}`, color: tokens.textSecondary, borderRadius: "8px" }}
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 opacity-50">
              <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="#00D4AA" strokeWidth="1.5">
                <path d="M10 4H4v40h40V14L34 4H10z" />
                <path d="M34 4v10h10" />
                <path d="M16 24h16M16 32h10" />
              </svg>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: tokens.textSecondary }}>
                No compounds selected
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.tier.label}`}
                className="p-4"
                style={{
                  background: tokens.drawerItemBg,
                  border: `1px solid ${tokens.borderStrong}`,
                  borderRadius: "10px",
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, fontSize: "0.85rem" }}>
                      {item.product.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}>
                      {item.tier.label} · {item.tier.qty}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.tier.label)}
                    className="text-xs transition-colors"
                    style={{ color: tokens.textSecondary }}
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.product.id, item.tier.label, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs transition-all"
                      style={{ border: "1px solid rgba(0, 212, 170, 0.2)", color: "#00D4AA", borderRadius: "6px" }}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textPrimary }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.tier.label, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs transition-all"
                      style={{ border: "1px solid rgba(0, 212, 170, 0.2)", color: "#00D4AA", borderRadius: "6px" }}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-bold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#00D4AA", fontSize: "0.8rem" }}>
                    {fmt(item.tier.inr * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: `1px solid ${tokens.borderStrong}` }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: tokens.textSecondary }}>
                Subtotal
              </span>
              <span className="text-base font-bold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                {`₹${total.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3 text-xs tracking-widest uppercase font-bold transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                  color: "#080C10",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0, 212, 170, 0.3)",
                }}
              >
                Checkout →
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 text-xs tracking-widest uppercase transition-colors"
                style={{ color: tokens.textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
              >
                Clear Cart
              </button>
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}>
              FOR RESEARCH USE ONLY · 18+ ONLY
            </p>
          </div>
        )}
      </div>
    </>
  );
}
