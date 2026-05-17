import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useRazorpay } from "../hooks/useRazorpay";
import { useAuth } from "../context/AuthContext";
import { DontForget } from "../components/DontForget";
import { products } from "../data/products";
import type { Step, PaymentStatus, PersonalInfo, ShippingInfo } from "../components/checkout/types";
import { CheckoutSteps } from "../components/checkout/CheckoutSteps";
import { GuestGateDialog } from "../components/checkout/GuestGateDialog";
import { CheckoutSuccess } from "../components/checkout/CheckoutSuccess";
import { StepPersonal } from "../components/checkout/StepPersonal";
import { StepShipping } from "../components/checkout/StepShipping";
import { StepReview } from "../components/checkout/StepReview";
import { StepPayment } from "../components/checkout/StepPayment";

const bacWaterProduct = products.find((p) => p.category === "bac-water");

export default function Checkout() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const { tokens, isDark } = useTheme();
  const { loaded: rzLoaded, scriptError, openCheckout } = useRazorpay();
  const { user, isLoggedIn, addresses, saveOrder } = useAuth();
  const [, navigate] = useLocation();

  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [paidId, setPaidId] = useState("");

  const [gateOpen, setGateOpen] = useState(false);
  const [gateShown, setGateShown] = useState(false);

  const [personal, setPersonal] = useState<PersonalInfo>({ firstName: "", lastName: "", email: "", phone: "", whatsapp: "" });
  const [personalErrors, setPersonalErrors] = useState<Partial<PersonalInfo>>({});

  const [shipping, setShipping] = useState<ShippingInfo>({ line1: "", line2: "", city: "", state: "", pin: "", country: "India", instructions: "" });
  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingInfo>>({});
  const [savedAddrIdx, setSavedAddrIdx] = useState<number | null>(null);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "porter">("standard");

  const [addBacWater, setAddBacWater] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  const shippingFee = shippingMethod === "porter" ? 0 : 200;
  const bacVariant = bacWaterProduct
    ? { label: bacWaterProduct.variants[0].name, inr: bacWaterProduct.variants[0].pricing[0].inr }
    : null;
  const subtotalInr = items.reduce((s, i) => s + i.tier.inr * i.quantity, 0) + (addBacWater && bacVariant ? bacVariant.inr : 0);
  const totalInr = subtotalInr + shippingFee;
  const fmt = (inr: number) => `₹${inr.toLocaleString("en-IN")}`;
  useEffect(() => { if (user) setPersonal({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, whatsapp: user.whatsapp }); }, [user]);
  useEffect(() => { if (!gateShown && !isLoggedIn && items.length > 0) { setGateOpen(true); setGateShown(true); } }, []);


  const [, setLocation] = useLocation();

  const handleUtrConfirm = async (utr: string) => {
    try {
      await fetch("/api/notify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal, shipping, items, totalInr, subtotalInr,
          shippingFee, shippingMethod, utr,
        }),
      });
    } catch (e) {
      console.error("Notification failed:", e);
    }
    clearCart();
    localStorage.removeItem("cv_shipping");
    setLocation("/order-success?email=" + encodeURIComponent(personal.email));
  };

  const validatePersonal = (): boolean => {
    const e: Partial<PersonalInfo> = {};
    if (!personal.firstName.trim()) e.firstName = "Required";
    if (!personal.lastName.trim()) e.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) e.email = "Valid email required";
    if (!/^\+?[\d\s\-]{8,15}$/.test(personal.phone)) e.phone = "Valid phone required";
    setPersonalErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateShipping = (): boolean => {
    const e: Partial<ShippingInfo> = {};
    if (!shipping.line1.trim()) e.line1 = "Required";
    if (!shipping.city.trim()) e.city = "Required";
    if (!shipping.state.trim()) e.state = "Required";
    if (!/^\d{6}$/.test(shipping.pin)) e.pin = "Valid 6-digit PIN required";
    setShippingErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    if (!rzLoaded) { setStatus("error"); setErrorMsg("Payment gateway loading. Try again."); return; }
    setStatus("processing");
    setErrorMsg("");
    await openCheckout({
      amountInr: totalInr,
      description: items.map((i) => `${i.product.name} (${i.tier.label})`).join(", "),
      prefill: { name: `${personal.firstName} ${personal.lastName}`.trim(), email: personal.email, contact: personal.phone },
      onSuccess: (paymentId) => {
        setPaidId(paymentId);
        setStatus("success");
        const orderItems = items.map((i) => ({ name: i.product.name, variant: i.tier.label, qty: i.quantity, price: i.tier.inr }));
        if (addBacWater && bacWaterProduct) orderItems.push({ name: bacWaterProduct.name, variant: bacVariant!.label, qty: 1, price: bacVariant!.inr });
        saveOrder({ items: orderItems, total: totalInr, status: "confirmed", paymentId });
        clearCart();
      },
      onDismiss: () => setStatus("idle"),
      onError: (msg) => { setStatus("error"); setErrorMsg(msg); },
    });
  };

  const handleAddrSelect = (idx: number | null) => {
    setSavedAddrIdx(idx);
    if (idx === null) { setShipping({ line1: "", line2: "", city: "", state: "", pin: "", country: "India", instructions: "" }); return; }
    const addr = addresses[idx];
    setShipping({ line1: addr.line1, line2: addr.line2, city: addr.city, state: addr.state, pin: addr.pin, country: addr.country, instructions: addr.instructions });
  };

  // Empty cart
  if (items.length === 0 && status !== "success") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <svg viewBox="0 0 48 48" style={{ width: 52, height: 52, opacity: 0.35 }} fill="none" stroke="#00D4AA" strokeWidth="1.5">
          <path d="M10 4H4v40h40V14L34 4H10z" /><path d="M34 4v10h10M16 24h16M16 32h10" />
        </svg>
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.15em", color: tokens.textSecondary }}>NO COMPOUNDS IN CART</p>
        <button onClick={() => navigate("/products")} style={{ marginTop: 8, background: "linear-gradient(135deg,#00D4AA,#00A882)", color: "#080C10", border: "none", borderRadius: 8, padding: "10px 28px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
          BROWSE CATALOGUE →
        </button>
      </div>
    );
  }

  if (status === "success") {
    return <CheckoutSuccess paidId={paidId} isLoggedIn={isLoggedIn} drawerBg={tokens.drawerBg} textSecondary={tokens.textSecondary} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>
      <GuestGateDialog open={gateOpen} onClose={() => setGateOpen(false)} textPrimary={tokens.textPrimary} textSecondary={tokens.textSecondary} />

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <button onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : navigate("/products")}
          style={{ background: "none", border: "none", color: tokens.textSecondary, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", cursor: "pointer", padding: 0, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          ← {step > 1 ? "BACK" : "BACK TO CATALOGUE"}
        </button>
        <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", letterSpacing: "0.12em", color: "#00D4AA", margin: 0 }}>CHECKOUT</h1>
      </div>

      <CheckoutSteps step={step} textSecondary={tokens.textSecondary} />

      {step === 1 && <DontForget />}

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {step === 1 && (
            <StepPersonal
              personal={personal}
              errors={personalErrors}
              isLoggedIn={isLoggedIn}
              textPrimary={tokens.textPrimary}
              onChange={(field, value) => { setPersonal((p) => ({ ...p, [field]: value })); setPersonalErrors((p) => ({ ...p, [field]: "" })); }}
              onNext={() => { if (validatePersonal()) setStep(2); }}
            />
          )}
          {step === 2 && (
            <StepShipping
              shipping={shipping}
              errors={shippingErrors}
              isLoggedIn={isLoggedIn}
              addresses={addresses}
              savedAddrIdx={savedAddrIdx}
              shippingMethod={shippingMethod}
              tokens={tokens}
              onAddressSelect={handleAddrSelect}
              onChange={(field, value) => { setShipping((p) => ({ ...p, [field]: value })); setShippingErrors((p) => ({ ...p, [field]: "" })); }}
              onMethodChange={setShippingMethod}
              onNext={() => { if (validateShipping()) setStep(3); }}
            />
          )}
          {step === 3 && (
            <StepReview
              items={items}
              personal={personal}
              shipping={shipping}
              shippingMethod={shippingMethod}
              shippingFee={shippingFee}
              subtotalInr={subtotalInr}
              totalInr={totalInr}
              addBacWater={addBacWater}
              bacVariant={bacVariant}
              hasBacProduct={!!bacWaterProduct}
              disclaimerChecked={disclaimerChecked}
              tokens={tokens}
              fmt={fmt}
              onBacToggle={setAddBacWater}
              onDisclaimerToggle={setDisclaimerChecked}
              onEditShipping={() => setStep(2)}
              onUpdateQty={updateQty}
              onRemoveItem={removeItem}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepPayment
              items={items}
              totalInr={totalInr}
              addBacWater={addBacWater}
              bacVariant={bacVariant}
              status={status}
              errorMsg={errorMsg}
              rzLoaded={rzLoaded}
              scriptError={scriptError}
              tokens={tokens}
              fmt={fmt}
              onPay={handlePay}
              onClearError={() => setStatus("idle")}
            onUtrConfirm={handleUtrConfirm}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
