import { useState } from "react";
import { motion } from "framer-motion";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { tokens } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: tokens.bgDefault, minHeight: "100vh", color: tokens.textPrimary }}>
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
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
            Secure Channel // Encrypted
          </p>
          <h1
            className="text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: tokens.textPrimary, letterSpacing: "0.1em" }}
          >
            Submit Enquiry
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#64748B", maxWidth: 520, lineHeight: "1.65" }}>
            Not every compound is right for every protocol. Tell us what you're working on and we'll tell you if we can help.
          </p>
        </div>
      </div>

      <DisclaimerBanner />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[9px] tracking-[0.2em] uppercase mb-6 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
              Contact Channels
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#00D4AA" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="#00D4AA" />
                    </svg>
                  ),
                  label: "Instagram",
                  value: "@compound.vpeptides",
                  href: "https://instagram.com/compound.vpeptides",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#00D4AA" strokeWidth="1.5">
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  ),
                  label: "Telegram",
                  value: "@CompoundVPeptides",
                  href: "https://t.me/compoundvpeptides",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#00D4AA" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "Email",
                  value: "research@compoundvpeptides.com",
                  href: "mailto:research@compoundvpeptides.com",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 group transition-all duration-200"
                  style={{
                    background: tokens.bgCard,
                    border: `1px solid ${tokens.borderStrong}`,
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,170,0.4)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,170,0.1)")}
                >
                  <div className="p-2" style={{ border: `1px solid ${tokens.borderStrong}`, background: "rgba(0,212,170,0.05)", borderRadius: "6px" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase mb-0.5" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                      {item.label}
                    </p>
                    <p className="text-xs group-hover:text-[#00D4AA] transition-colors" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textPrimary }}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-4" style={{ background: "rgba(0,212,170,0.04)", border: `1px solid ${tokens.borderStrong}`, borderRadius: "8px" }}>
              <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: "#00D4AA" }}>
                Response Time
              </p>
              <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                Inquiries are typically responded to within 24–48 hours. For bulk orders and institutional research partnerships, use the contact form.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {sent ? (
              <div
                className="flex flex-col items-center justify-center h-full p-8 text-center"
                style={{ background: tokens.bgCard, border: "1px solid rgba(16,185,129,0.3)", borderRadius: "14px" }}
              >
                <svg viewBox="0 0 48 48" className="w-12 h-12 mb-4" fill="none" stroke="#10B981" strokeWidth="1.5">
                  <circle cx="24" cy="24" r="20" />
                  <path d="M16 24l6 6 10-12" />
                </svg>
                <p className="text-sm font-bold uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#10B981" }}>
                  Transmission Sent
                </p>
                <p className="text-xs mt-2" style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}>
                  We'll respond within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-[9px] tracking-[0.2em] uppercase mb-2 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: "#00D4AA" }}>
                  Send Inquiry
                </p>
                {[
                  { id: "name", label: "Name / Organisation", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      className="block text-[9px] tracking-[0.15em] uppercase mb-1.5"
                      htmlFor={field.id}
                      style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      className="w-full px-4 py-3 text-xs outline-none transition-all"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: tokens.bgCard,
                        border: `1px solid ${tokens.borderStrong}`,
                        color: tokens.textPrimary,
                        borderRadius: "6px",
                      }}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0,212,170,0.5)")}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(0,212,170,0.2)")}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block text-[9px] tracking-[0.15em] uppercase mb-1.5"
                    htmlFor="subject"
                    style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-3 text-xs outline-none transition-all"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: tokens.bgCard,
                      border: `1px solid ${tokens.borderStrong}`,
                      color: tokens.textPrimary,
                      borderRadius: "6px",
                    }}
                  >
                    <option value="">Select inquiry type</option>
                    <option>Product Inquiry</option>
                    <option>Bulk / Institutional Order</option>
                    <option>Technical / Research Question</option>
                    <option>Order Status</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[9px] tracking-[0.15em] uppercase mb-1.5"
                    htmlFor="message"
                    style={{ fontFamily: "'Inter', sans-serif", color: tokens.textSecondary }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-xs outline-none transition-all resize-none"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: tokens.bgCard,
                      border: `1px solid ${tokens.borderStrong}`,
                      color: tokens.textPrimary,
                      borderRadius: "6px",
                    }}
                    onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,212,170,0.5)")}
                    onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(0,212,170,0.2)")}
                  />
                </div>
                <button
                  type="submit"
                  className="py-3 text-xs tracking-[0.15em] uppercase font-bold transition-all duration-200 hover:brightness-110"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                    color: "#080C10",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,212,170,0.3)",
                  }}
                >
                  Submit →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
