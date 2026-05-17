import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { login } = useAuth();
  const { tokens } = useTheme();
  const [, navigate] = useLocation();

  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const redirectTo = params.get("redirect") || "/products";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (password.length < 8) e.password = "Minimum 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    const err = login(email, password);
    setLoading(false);
    if (err) { setServerError(err); return; }
    navigate(redirectTo);
  };

  const inp = (hasError: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", background: "rgba(0,212,170,0.03)",
    border: `1px solid ${hasError ? "#EF4444" : "rgba(0,212,170,0.25)"}`,
    borderRadius: 10, color: tokens.textPrimary,
    fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
    outline: "none", boxSizing: "border-box",
  });

  return (
    <div style={{ minHeight: "100vh", background: tokens.bgDefault, paddingTop: 88, paddingBottom: 60, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", maxWidth: 440, padding: "0 16px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 16, padding: "40px 36px" }}>
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4AA", marginBottom: 8 }}>
              Compound V
            </p>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.textPrimary, margin: "0 0 6px" }}>
              Welcome Back
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: tokens.textSecondary, margin: 0 }}>
              Log in to your research account
            </p>
          </div>

          {serverError && (
            <div style={{ padding: "12px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, marginBottom: 20 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#EF4444", margin: 0 }}>{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <input type="email" placeholder="Email Address" value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: "" })); }}
                  style={inp(!!errors.email)} />
                {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.email}</p>}
              </div>

              <div>
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((er) => ({ ...er, password: "" })); }}
                  style={inp(!!errors.password)} />
                {errors.password && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.password}</p>}
              </div>

              <div style={{ textAlign: "right", marginTop: -8 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#00D4AA", cursor: "pointer" }}>
                  Forgot Password?
                </span>
              </div>

              <button type="submit" disabled={loading}
                style={{
                  background: loading ? "rgba(0,212,170,0.3)" : "linear-gradient(135deg, #00D4AA 0%, #00A882 100%)",
                  color: loading ? "rgba(8,12,16,0.5)" : "#080C10",
                  border: "none", borderRadius: 10, padding: "12px",
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                  fontSize: "0.85rem", letterSpacing: "0.12em",
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%", boxShadow: "0 4px 20px rgba(0,212,170,0.3)",
                }}>
                {loading ? "Logging in…" : "LOGIN"}
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: tokens.textSecondary, textAlign: "center", margin: 0 }}>
                Don't have an account?{" "}
                <Link href="/signup" style={{ color: "#00D4AA", textDecoration: "none", fontWeight: 600 }}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
