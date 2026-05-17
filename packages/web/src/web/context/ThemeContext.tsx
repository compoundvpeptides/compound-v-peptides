import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface ThemeTokens {
  bgDefault: string;
  bgPaper: string;
  bgCard: string;
  bgImageArea: string;
  bgNavbar: string;
  textPrimary: string;
  textSecondary: string;
  textFine: string;
  border: string;
  borderStrong: string;
  navbarBorder: string;
  cardBorderHover: string;
  cardShadowHover: string;
  heroGradient: string;
  drawerBg: string;
  drawerItemBg: string;
  footerBg: string;
  scrollTrack: string;
}

const DARK: ThemeTokens = {
  bgDefault:       "#080C10",
  bgPaper:         "#0F1923",
  bgCard:          "#0F1923",
  bgImageArea:     "#0a0f1a",
  bgNavbar:        "rgba(8, 12, 16, 0.85)",
  textPrimary:     "#F8FAFC",
  textSecondary:   "#94A3B8",
  textFine:        "#475569",
  border:          "rgba(0, 212, 170, 0.08)",
  borderStrong:    "rgba(0, 212, 170, 0.1)",
  navbarBorder:    "1px solid rgba(0, 212, 170, 0.1)",
  cardBorderHover: "rgba(0, 212, 170, 0.3)",
  cardShadowHover: "0 8px 32px rgba(0, 212, 170, 0.12)",
  heroGradient:    "transparent",
  drawerBg:        "#0F1923",
  drawerItemBg:    "#131E2A",
  footerBg:        "#060A0E",
  scrollTrack:     "#080C10",
};

const LIGHT: ThemeTokens = {
  bgDefault:       "#F0F4F8",
  bgPaper:         "#FFFFFF",
  bgCard:          "#FFFFFF",
  bgImageArea:     "#F0F4F8",
  bgNavbar:        "rgba(240, 244, 248, 0.85)",
  textPrimary:     "#0F172A",
  textSecondary:   "#475569",
  textFine:        "#64748B",
  border:          "rgba(0, 212, 170, 0.15)",
  borderStrong:    "rgba(0, 0, 0, 0.08)",
  navbarBorder:    "1px solid rgba(0, 0, 0, 0.08)",
  cardBorderHover: "rgba(0, 212, 170, 0.35)",
  cardShadowHover: "0 2px 12px rgba(0, 0, 0, 0.08)",
  heroGradient:    "linear-gradient(135deg, #E8F4F8 0%, #F0F4F8 100%)",
  drawerBg:        "#FFFFFF",
  drawerItemBg:    "#F8FAFC",
  footerBg:        "#E8EDF2",
  scrollTrack:     "#E2E8F0",
};

interface ThemeContextValue {
  isDark: boolean;
  tokens: ThemeTokens;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  tokens: DARK,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("cv-theme");
      if (saved !== null) return saved === "dark";
    } catch {}
    return true; // default dark
  });

  const tokens = isDark ? DARK : LIGHT;

  useEffect(() => {
    try { localStorage.setItem("cv-theme", isDark ? "dark" : "light"); } catch {}
    // Apply to html for scrollbar theming
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.body.style.backgroundColor = tokens.bgDefault;
    document.body.style.color = tokens.textPrimary;
  }, [isDark, tokens.bgDefault, tokens.textPrimary]);

  const toggle = () => setIsDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ isDark, tokens, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
