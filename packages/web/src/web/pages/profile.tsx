import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth, SavedAddress } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

type Tab = "details" | "addresses" | "orders" | "security";

const TABS: { id: Tab; label: string }[] = [
  { id: "details", label: "Personal Details" },
  { id: "addresses", label: "Saved Addresses" },
  { id: "orders", label: "Order History" },
  { id: "security", label: "Security" },
];

const cardStyle = (tokens: ReturnType<typeof useTheme>["tokens"]): React.CSSProperties => ({
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(0,212,170,0.2)",
  borderRadius: 14,
  padding: "32px",
});

const inp = (tokens: ReturnType<typeof useTheme>["tokens"], hasError = false): React.CSSProperties => ({
  width: "100%", padding: "10px 14px",
  background: "rgba(0,212,170,0.03)",
  border: `1px solid ${hasError ? "#EF4444" : "rgba(0,212,170,0.25)"}`,
  borderRadius: 10, color: tokens.textPrimary,
  fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
  outline: "none", boxSizing: "border-box",
});

export default function Profile() {
  const { user, addresses, orders, updateProfile, changePassword, saveAddress, deleteAddress, updateAddress, logout, isLoggedIn } = useAuth();
  const { tokens, isDark } = useTheme();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("details");

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.12em", color: tokens.textSecondary }}>
          YOU ARE NOT LOGGED IN
        </p>
        <button onClick={() => navigate("/login?redirect=/profile")}
          style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 8, padding: "10px 28px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
          LOGIN →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "0.12em", color: "#00D4AA", margin: "0 0 4px" }}>
          MY ACCOUNT
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary, margin: 0 }}>
          {user!.firstName} {user!.lastName} · {user!.email}
        </p>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 12, padding: 8, minWidth: 200, flexShrink: 0 }}>
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%", textAlign: "left", padding: "10px 16px",
                background: activeTab === tab.id ? "rgba(0,212,170,0.12)" : "none",
                border: "none", borderRadius: 8,
                color: activeTab === tab.id ? "#00D4AA" : tokens.textSecondary,
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em",
                cursor: "pointer", transition: "all 0.15s",
              }}>
              {tab.label.toUpperCase()}
            </button>
          ))}
          <div style={{ height: 1, background: "rgba(0,212,170,0.15)", margin: "8px 0" }} />
          <button onClick={() => { logout(); navigate("/"); }}
            style={{ width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", borderRadius: 8, color: "#EF4444", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
            LOGOUT
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {activeTab === "details" && <DetailsTab user={user!} updateProfile={updateProfile} tokens={tokens} isDark={isDark} />}
            {activeTab === "addresses" && <AddressesTab addresses={addresses} saveAddress={saveAddress} deleteAddress={deleteAddress} updateAddress={updateAddress} tokens={tokens} isDark={isDark} />}
            {activeTab === "orders" && <OrdersTab orders={orders} tokens={tokens} />}
            {activeTab === "security" && <SecurityTab changePassword={changePassword} tokens={tokens} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Details Tab ────────────────────────────────────────────────────────
function DetailsTab({ user, updateProfile, tokens, isDark: _isDark }: {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  updateProfile: ReturnType<typeof useAuth>["updateProfile"];
  tokens: ReturnType<typeof useTheme>["tokens"];
  isDark: boolean;
}) {
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, phone: user.phone, whatsapp: user.whatsapp, dob: user.dob });
  const [saved, setSaved] = useState(false);
  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => { updateProfile(form); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={cardStyle(tokens)}>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: "0 0 24px" }}>PERSONAL DETAILS</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <input placeholder="First Name" value={form.firstName} onChange={f("firstName")} style={inp(tokens)} />
        </div>
        <div>
          <input placeholder="Last Name" value={form.lastName} onChange={f("lastName")} style={inp(tokens)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <input value={user.email} disabled style={{ ...inp(tokens), opacity: 0.5, cursor: "not-allowed" }} />
        </div>
        <div>
          <input placeholder="Phone Number" value={form.phone} onChange={f("phone")} style={inp(tokens)} />
        </div>
        <div>
          <input placeholder="WhatsApp Number" value={form.whatsapp} onChange={f("whatsapp")} style={inp(tokens)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: tokens.textSecondary, display: "block", marginBottom: 4 }}>Date of Birth</label>
          <input type="date" value={form.dob} onChange={f("dob")} style={inp(tokens)} />
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={handleSave}
          style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 10, padding: "10px 28px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", cursor: "pointer" }}>
          SAVE CHANGES
        </button>
        {saved && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#10B981" }}>Saved!</span>}
      </div>
    </div>
  );
}

// ── Addresses Tab ──────────────────────────────────────────────────────
type AddrForm = Omit<SavedAddress, "id">;
const emptyAddr: AddrForm = { line1: "", line2: "", city: "", state: "", pin: "", country: "India", instructions: "" };

function AddressDialog({ open, editId, form, setForm, onClose, onSave, tokens }: {
  open: boolean;
  editId: string | null;
  form: AddrForm;
  setForm: React.Dispatch<React.SetStateAction<AddrForm>>;
  onClose: () => void;
  onSave: () => void;
  tokens: ReturnType<typeof useTheme>["tokens"];
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
      <div style={{ position: "relative", background: "#0E1117", border: "1px solid rgba(0,212,170,0.3)", borderRadius: 14, padding: "28px 28px 24px", minWidth: 320, maxWidth: 500, width: "90vw", zIndex: 1 }}
        onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: "0.12em", fontSize: "1rem", color: tokens.textPrimary, margin: "0 0 20px" }}>
          {editId ? "EDIT ADDRESS" : "ADD ADDRESS"}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Address Line 1" value={form.line1} onChange={f("line1")} style={inp(tokens)} />
          <input placeholder="Address Line 2 (optional)" value={form.line2} onChange={f("line2")} style={inp(tokens)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input placeholder="City" value={form.city} onChange={f("city")} style={inp(tokens)} />
            <input placeholder="State" value={form.state} onChange={f("state")} style={inp(tokens)} />
            <input placeholder="PIN Code" value={form.pin} onChange={f("pin")} style={inp(tokens)} />
            <input placeholder="Country" value={form.country} onChange={f("country")} style={inp(tokens)} />
          </div>
          <textarea placeholder="Delivery Instructions (optional)" value={form.instructions} onChange={f("instructions")}
            rows={2}
            style={{ ...inp(tokens), resize: "vertical", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }} />
        </div>
        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: tokens.textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", padding: "8px 16px" }}>
            CANCEL
          </button>
          <button onClick={onSave}
            style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 8, padding: "8px 20px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", cursor: "pointer" }}>
            {editId ? "UPDATE" : "SAVE"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressesTab({ addresses, saveAddress, deleteAddress, updateAddress, tokens, isDark: _isDark }: {
  addresses: SavedAddress[];
  saveAddress: ReturnType<typeof useAuth>["saveAddress"];
  deleteAddress: ReturnType<typeof useAuth>["deleteAddress"];
  updateAddress: ReturnType<typeof useAuth>["updateAddress"];
  tokens: ReturnType<typeof useTheme>["tokens"];
  isDark: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<AddrForm>(emptyAddr);

  const openNew = () => { setEditId(null); setForm(emptyAddr); setDialogOpen(true); };
  const openEdit = (addr: SavedAddress) => {
    setEditId(addr.id);
    setForm({ line1: addr.line1, line2: addr.line2, city: addr.city, state: addr.state, pin: addr.pin, country: addr.country, instructions: addr.instructions });
    setDialogOpen(true);
  };
  const handleSave = () => {
    if (editId) updateAddress(editId, form); else saveAddress(form);
    setDialogOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: 0 }}>SAVED ADDRESSES</h2>
        <button onClick={openNew}
          style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 8, padding: "8px 18px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", cursor: "pointer" }}>
          + ADD ADDRESS
        </button>
      </div>

      {addresses.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12, padding: 40, textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary, margin: 0 }}>No addresses saved yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {addresses.map((addr) => (
            <div key={addr.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textPrimary, margin: "0 0 4px", fontWeight: 600 }}>{addr.line1}</p>
                  {addr.line2 && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: "0 0 2px" }}>{addr.line2}</p>}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: "0 0 2px" }}>{addr.city}, {addr.state} — {addr.pin}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textSecondary, margin: 0 }}>{addr.country}</p>
                  {addr.instructions && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#00D4AA", margin: "6px 0 0" }}>Note: {addr.instructions}</p>}
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEdit(addr)} style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)", color: "#00D4AA", borderRadius: 6, padding: "6px 12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", cursor: "pointer" }}>EDIT</button>
                  <button onClick={() => deleteAddress(addr.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", borderRadius: 6, padding: "6px 12px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", cursor: "pointer" }}>DELETE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressDialog open={dialogOpen} editId={editId} form={form} setForm={setForm} onClose={() => setDialogOpen(false)} onSave={handleSave} tokens={tokens} />
    </div>
  );
}

// ── Orders Tab ─────────────────────────────────────────────────────────
function OrdersTab({ orders, tokens }: { orders: ReturnType<typeof useAuth>["orders"]; tokens: ReturnType<typeof useTheme>["tokens"] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: "0 0 16px" }}>ORDER HISTORY</h2>
      {orders.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12, padding: 40, textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: tokens.textSecondary, margin: 0 }}>No orders yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {orders.map((order) => (
            <div key={order.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                style={{ width: "100%", background: "none", border: "none", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, color: "#00D4AA", letterSpacing: "0.08em" }}>{order.id}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary }}>{new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: tokens.textPrimary }}>₹{order.total.toLocaleString("en-IN")}</span>
                  <span style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10B981", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: "0.08em" }}>
                    {order.status.toUpperCase()}
                  </span>
                  <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, color: tokens.textSecondary, transform: expanded === order.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </div>
              </button>
              {expanded === order.id && (
                <div style={{ padding: "0 20px 16px", borderTop: "1px solid rgba(0,212,170,0.1)" }}>
                  <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: tokens.textPrimary }}>{item.name}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary }}> · {item.variant} × {item.qty}</span>
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#00D4AA" }}>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(0,212,170,0.1)" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: tokens.textSecondary }}>Payment ID: {order.paymentId}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Security Tab ───────────────────────────────────────────────────────
function SecurityTab({ changePassword, tokens }: {
  changePassword: ReturnType<typeof useAuth>["changePassword"];
  tokens: ReturnType<typeof useTheme>["tokens"];
}) {
  const [form, setForm] = useState({ old: "", newPass: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: "" })); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.old) errs.old = "Required";
    if (form.newPass.length < 8) errs.newPass = "Minimum 8 characters";
    if (form.newPass !== form.confirm) errs.confirm = "Passwords do not match";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const err = changePassword(form.old, form.newPass);
    if (err) { setErrors({ old: err }); return; }
    setSuccess("Password changed successfully!");
    setForm({ old: "", newPass: "", confirm: "" });
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div style={cardStyle(tokens)}>
      <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.15em", color: tokens.textPrimary, margin: "0 0 24px" }}>CHANGE PASSWORD</h2>
      {success && (
        <div style={{ padding: "12px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, marginBottom: 16 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#10B981", margin: 0 }}>{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <input type="password" placeholder="Current Password" value={form.old} onChange={f("old")} style={inp(tokens, !!errors.old)} />
            {errors.old && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.old}</p>}
          </div>
          <div>
            <input type="password" placeholder="New Password" value={form.newPass} onChange={f("newPass")} style={inp(tokens, !!errors.newPass)} />
            {errors.newPass && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.newPass}</p>}
          </div>
          <div>
            <input type="password" placeholder="Confirm New Password" value={form.confirm} onChange={f("confirm")} style={inp(tokens, !!errors.confirm)} />
            {errors.confirm && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#EF4444", margin: "4px 0 0 2px" }}>{errors.confirm}</p>}
          </div>
          <button type="submit"
            style={{ background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 10, padding: "10px 28px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", cursor: "pointer", alignSelf: "flex-start" }}>
            UPDATE PASSWORD
          </button>
        </div>
      </form>
    </div>
  );
}
