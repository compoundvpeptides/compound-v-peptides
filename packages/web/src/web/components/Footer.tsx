import { Link } from "wouter";
import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { tokens } = useTheme();

  return (
    <footer
      style={{
        background: tokens.footerBg,
        borderTop: `1px solid ${tokens.borderStrong}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.webp" alt="Compound V" className="w-8 h-8 object-contain" />
              <span
                className="font-bold tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary }}
              >
                Compound V
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif", maxWidth: 280 }}>
              Research-grade peptides engineered for science. All compounds are synthesised under controlled laboratory conditions and are intended solely for in vitro and laboratory research.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/compound.vpeptides"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#00D4AA]"
                style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                @compound.vpeptides
              </a>
              <a
                href="https://t.me/compoundvpeptides"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors hover:text-[#00D4AA]"
                style={{ color: tokens.textSecondary, fontFamily: "'Inter', sans-serif" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
                Telegram
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-4 font-bold"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}
            >
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/protocols", label: "Protocols" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase transition-colors hover:text-[#00D4AA]"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: tokens.textSecondary }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-4 font-bold"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}
            >
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/shipping-policy", label: "Shipping Policy" },
                { href: "/refund-policy", label: "Refund Policy" },
                { href: "/legal-notice", label: "Legal Notice" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase transition-colors hover:text-[#00D4AA]"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: tokens.textSecondary }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${tokens.border}` }}
        >
          <p className="text-[10px] text-center md:text-left" style={{ color: tokens.textFine, fontFamily: "'Inter', sans-serif" }}>
            © 2025 Compound V Peptides. All rights reserved. | Sole Proprietor: Yasmay Soni
          </p>
          <p className="text-[10px] text-center" style={{ color: tokens.textFine, fontFamily: "'Inter', sans-serif", maxWidth: 500 }}>
            All products are for laboratory research purposes only. Not for human or veterinary use. Not a medicinal product. Must be 18+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
