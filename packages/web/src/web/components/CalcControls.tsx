import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export function StepBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
        background: active ? "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)" : "rgba(0,212,170,0.1)",
        color: active ? "#080C10" : "#00D4AA",
        border: active ? "none" : "1px solid rgba(0,212,170,0.3)",
        transition: "all 0.3s ease",
        boxShadow: active ? "0 2px 12px rgba(0,212,170,0.4)" : "none",
      }}
    >
      {n}
    </div>
  );
}

export function PillGroup({
  options,
  value,
  onChange,
  tokens,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  tokens: ReturnType<typeof useTheme>["tokens"];
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: "8px 18px",
              borderRadius: 50,
              fontSize: 13,
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: active ? "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)" : "transparent",
              color: active ? "#080C10" : tokens.textSecondary,
              border: active ? "none" : "1px solid rgba(0,212,170,0.25)",
              boxShadow: active ? "0 2px 12px rgba(0,212,170,0.35)" : "none",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function AccordionItem({
  title,
  children,
  tokens,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  tokens: ReturnType<typeof useTheme>["tokens"];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderRadius: 12,
        marginBottom: 8,
        border: `1px solid ${open ? "rgba(0,212,170,0.3)" : tokens.borderStrong}`,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: open ? "rgba(0,212,170,0.05)" : tokens.bgCard,
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.05em",
            color: open ? "#00D4AA" : tokens.textPrimary,
          }}
        >
          {title}
        </span>
        <svg
          viewBox="0 0 16 16" width="16" height="16" fill="none"
          stroke={open ? "#00D4AA" : tokens.textSecondary}
          strokeWidth="2"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "16px 20px",
                background: tokens.bgCard,
                borderTop: `1px solid ${tokens.borderStrong}`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
