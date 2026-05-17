import { ReactNode } from "react";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";

interface PolicyLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function PolicyLayout({ title, updated, children }: PolicyLayoutProps) {
  const { tokens } = useTheme();
  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
      {/* Header */}
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
        <div className="max-w-4xl mx-auto relative z-10">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}
          >
            Legal Document
          </p>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-3"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}
          >
            {title}
          </h1>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}
          >
            Last updated: {updated}
          </p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}
