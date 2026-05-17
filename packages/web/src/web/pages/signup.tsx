import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function isAdult(dob: string): boolean {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  return age > 18 || (age === 18 && (m > 0 || (m === 0 && today.getDate() >= birthDate.getDate())));
}

export default function Signup() {
  const { signup } = useAuth();
  const { tokens } = useTheme();
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", whatsapp: "", dob: "",
    password: "", confirmPassword: "",
  });
  const [ageCheck, setAgeCheck] = useState(false);
  const [researchCheck, setResearchCheck] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Minimum 10 digits";
    if (form.whatsapp && form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Minimum 10 digits";
    if (!form.dob) e.dob = "Required";
    else if (!isAdult(form.dob)) e.dob = "You must be 18 years or older to purchase";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!ageCheck) e.ageCheck = "You must confirm you are 18+";
    if (!researchCheck) e.researchCheck = "You must confirm research use only";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    const err = signup({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      dob: form.dob,
      password: form.password,
    });
    setLoading(false);
    if (err) { setServerError(err); return; }
    navigate("/products");
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
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", maxWidth: 520, padding: "0 16px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 16, padding: "40px 36px" }}>
          {/* Header */}
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D4AA", marginBottom: 8 }}>
              Compound V
            </p>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.textPrimary, margin: "0 0 6px" }}>
              Create Account
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: tokens.textSecondary, margin: 0 }}>
              Research access · 18+ only
            </p>
          </div>

          {serverError && (
            <div style={{ padding: "12px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, marginBottom: 20 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#EF4444", margin: 0 }}>{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <input placeholder="First Name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} style={inp(!!errors.firstName)} />
                  {errors.firstName && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.firstName}</p>}
                </div>
                <div>
                  <input placeholder="Last Name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} style={inp(!!errors.lastName)} />
                  {errors.lastName && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => set("email", e.target.value)} style={inp(!!errors.email)} />
                {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.email}</p>}
              </div>

              <div>
                <input placeholder="Phone Number" value={form.phone} onChange={(e) => set("phone", e.target.value)} style={inp(!!errors.phone)} />
                {errors.phone && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.phone}</p>}
              </div>

              <div>
                <input placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} style={inp(!!errors.whatsapp)} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: errors.whatsapp ? "#EF4444" : tokens.textSecondary, margin: "4px 0 0 2px" }}>
                  {errors.whatsapp || "If different from phone"}
                </p>
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: tokens.textSecondary, display: "block", marginBottom: 4 }}>Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} style={inp(!!errors.dob)} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: errors.dob ? "#EF4444" : tokens.textSecondary, margin: "4px 0 0 2px" }}>
                  {errors.dob || "You must be 18+ to purchase research compounds"}
                </p>
              </div>

              <div>
                <input type="password" placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} style={inp(!!errors.password)} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: errors.password ? "#EF4444" : tokens.textSecondary, margin: "4px 0 0 2px" }}>
                  {errors.password || "Minimum 8 characters"}
                </p>
              </div>

              <div>
                <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} style={inp(!!errors.confirmPassword)} />
                {errors.confirmPassword && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.confirmPassword}</p>}
              </div>

              {/* Checkboxes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={ageCheck}
                    onChange={(e) => { setAgeCheck(e.target.checked); setErrors((er) => ({ ...er, ageCheck: "" })); }}
                    style={{ accentColor: "#00D4AA", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: errors.ageCheck ? "#EF4444" : tokens.textSecondary }}>
                    I confirm I am 18 years or older
                  </span>
                </label>
                {errors.ageCheck && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "-4px 0 0 24px" }}>{errors.ageCheck}</p>}

                <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={researchCheck}
                    onChange={(e) => { setResearchCheck(e.target.checked); setErrors((er) => ({ ...er, researchCheck: "" })); }}
                    style={{ accentColor: "#00D4AA", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: errors.researchCheck ? "#EF4444" : tokens.textSecondary }}>
                    I confirm these products are for research purposes only
                  </span>
                </label>
                {errors.researchCheck && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "-4px 0 0 24px" }}>{errors.researchCheck}</p>}
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
                {loading ? "Creating Account…" : "CREATE ACCOUNT"}
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: tokens.textSecondary, textAlign: "center", margin: 0 }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#00D4AA", textDecoration: "none", fontWeight: 600 }}>Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
