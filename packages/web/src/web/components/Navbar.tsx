import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/protocols", label: "Protocols" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Enquire" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" style={{ width: 11, height: 11, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

export function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, tokens, toggle } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navBtnStyle = {
    border: isDark ? "1px solid rgba(0,212,170,0.3)" : "1px solid rgba(0,0,0,0.12)",
    background: isDark ? "rgba(0,212,170,0.05)" : "rgba(0,0,0,0.04)",
    borderRadius: "8px",
    color: tokens.textPrimary,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: tokens.bgNavbar,
        backdropFilter: "blur(12px)",
        borderBottom: tokens.navbarBorder,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.webp" alt="Compound V" className="w-14 h-14 object-contain group-hover:drop-shadow-[0_0_8px_#00D4AA] transition-all duration-300" />
          <span
            className="text-lg font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary }}
          >
            Compound V
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                color: location === link.href ? "#00D4AA" : tokens.textSecondary,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-9 h-9 transition-all duration-200"
            style={{
              border: isDark ? "1px solid rgba(0, 212, 170, 0.25)" : "1px solid rgba(0,0,0,0.12)",
              background: isDark ? "rgba(0, 212, 170, 0.05)" : "rgba(0,0,0,0.05)",
              color: isDark ? "#00D4AA" : "#F59E0B",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(0, 212, 170, 0.12)" : "rgba(245, 158, 11, 0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(0, 212, 170, 0.05)" : "rgba(0,0,0,0.05)"; }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Auth button / user menu */}
          {isLoggedIn ? (
            <div ref={userMenuRef} style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                style={{ ...navBtnStyle, gap: 6, padding: "6px 10px 6px 8px", height: 36, color: "#00D4AA" }}
              >
                <UserIcon />
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {user!.firstName.toUpperCase()}
                </span>
                <ChevronIcon open={userMenuOpen} />
              </button>

              {/* CSS-animated user dropdown */}
              <div
                style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: isDark ? "#0E1117" : "#fff",
                  border: "1px solid rgba(0,212,170,0.25)",
                  borderRadius: 10,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  minWidth: 160,
                  overflow: "hidden",
                  zIndex: 200,
                  opacity: userMenuOpen ? 1 : 0,
                  transform: userMenuOpen ? "translateY(0)" : "translateY(-6px)",
                  pointerEvents: userMenuOpen ? "auto" : "none",
                  transition: "opacity 0.15s ease, transform 0.15s ease",
                }}
              >
                {[
                  { label: "MY PROFILE", href: "/profile" },
                  { label: "MY ORDERS", href: "/profile" },
                ].map((item) => (
                  <button key={item.label}
                    onClick={() => { setUserMenuOpen(false); navigate(item.href); }}
                    style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: "none", border: "none", color: tokens.textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,212,170,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#00D4AA"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = tokens.textSecondary; }}>
                    {item.label}
                  </button>
                ))}
                <div style={{ height: 1, background: "rgba(0,212,170,0.12)" }} />
                <button
                  onClick={() => { setUserMenuOpen(false); logout(); navigate("/"); }}
                  style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: "none", border: "none", color: "#EF4444", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", cursor: "pointer" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}>
                  LOGOUT
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                border: "1px solid rgba(0,212,170,0.3)",
                color: "#00D4AA",
                background: "rgba(0,212,170,0.05)",
                borderRadius: "8px",
                textDecoration: "none",
              }}>
              <UserIcon />
              LOGIN
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200"
            style={{
              border: isDark ? "1px solid rgba(0, 212, 170, 0.3)" : "1px solid rgba(0,0,0,0.12)",
              background: isDark ? "rgba(0, 212, 170, 0.05)" : "rgba(0,0,0,0.04)",
              color: tokens.textPrimary,
              borderRadius: "8px",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#00D4AA" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {/* CSS-animated badge */}
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-full"
              style={{
                background: "#00D4AA",
                color: "#080C10",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                transform: itemCount > 0 ? "scale(1)" : "scale(0)",
                transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {itemCount}
            </span>
          </button>

          {/* Mobile menu */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-px" style={{ background: "#00D4AA" }} />
            <span className="w-5 h-px" style={{ background: "#00D4AA" }} />
            <span className="w-3 h-px" style={{ background: "#00D4AA" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — CSS animated */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          background: tokens.bgNavbar,
          borderTop: menuOpen ? tokens.navbarBorder : "none",
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.2s ease",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: location === link.href ? "#00D4AA" : tokens.textSecondary }}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth links in mobile */}
          {isLoggedIn ? (
            <>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, color: "#00D4AA" }}>
                MY ACCOUNT ({user!.firstName})
              </Link>
              <button onClick={() => { logout(); setMenuOpen(false); navigate("/"); }} className="text-left text-sm tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#EF4444", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                LOGIN
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textSecondary }}>
                SIGN UP
              </Link>
            </>
          )}

          <button onClick={() => { toggle(); setMenuOpen(false); }} className="text-left text-sm tracking-widest uppercase flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: isDark ? "#00D4AA" : "#F59E0B", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            {isDark ? <MoonIcon /> : <SunIcon />}
            {isDark ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
