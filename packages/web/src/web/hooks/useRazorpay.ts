import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  handler?: (response: RazorpayPaymentResponse) => void;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  on(event: string, handler: (response: { error: { description: string } }) => void): void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

function isRazorpayReady(): boolean {
  return typeof window !== "undefined" && typeof window.Razorpay === "function";
}

export function useRazorpay() {
  const [loaded, setLoaded] = useState(isRazorpayReady);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Already ready — nothing to do
    if (isRazorpayReady()) {
      if (!loaded) setLoaded(true);
      return;
    }

    // Script already in DOM — wait for it
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      const onLoad = () => setLoaded(true);
      const onError = () => setScriptError(true);
      existing.addEventListener("load", onLoad);
      existing.addEventListener("error", onError);
      return () => {
        existing.removeEventListener("load", onLoad);
        existing.removeEventListener("error", onError);
      };
    }

    // Inject script
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setScriptError(true);
    document.head.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openCheckout({
    amountInr,
    description = "Research Compounds",
    prefill,
    onSuccess,
    onDismiss,
    onError,
  }: {
    amountInr: number;
    description?: string;
    prefill?: { name?: string; email?: string; contact?: string };
    onSuccess?: (paymentId: string) => void;
    onDismiss?: () => void;
    onError?: (message: string) => void;
  }): Promise<void> {
    // Re-check at call time — state may lag
    if (!isRazorpayReady()) {
      onError?.("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    const keyId = (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined)?.trim();
    if (!keyId) {
      onError?.("Payment is not configured. Please contact support.");
      return;
    }

    // Step 1: Create order server-side
    let orderId: string;
    let orderAmount: number;
    let orderCurrency: string;

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(amountInr * 100),
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        onError?.(err.error ?? "Could not create order. Please try again.");
        return;
      }

      const data = await res.json() as { order_id: string; amount: number; currency: string };
      orderId = data.order_id;
      orderAmount = data.amount;
      orderCurrency = data.currency;
    } catch {
      onError?.("Network error. Please check your connection and try again.");
      return;
    }

    // Step 2: Open Razorpay modal with order ID
    const options: RazorpayOptions = {
      key: keyId,
      amount: orderAmount,
      currency: orderCurrency,
      name: "Compound V",
      description,
      order_id: orderId,
      prefill,
      theme: { color: "#00D4AA" },
      modal: { ondismiss: onDismiss },
      handler: async (response: RazorpayPaymentResponse) => {
        // Step 3: Verify signature
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            const err = await verifyRes.json().catch(() => ({})) as { error?: string };
            onError?.(err.error ?? "Payment verification failed. Contact support.");
            return;
          }

          const verified = await verifyRes.json() as { verified: boolean; payment_id: string };
          if (verified.verified) {
            onSuccess?.(verified.payment_id);
          } else {
            onError?.("Payment could not be verified. Please contact support.");
          }
        } catch {
          onError?.("Verification failed. Contact support with payment ID: " + response.razorpay_payment_id);
        }
      },
    };

    const rz = new window.Razorpay(options);

    rz.on("payment.failed", (response: { error: { description: string } }) => {
      onError?.(response.error?.description ?? "Payment failed. Please try again.");
    });

    rz.open();
  }

  return { loaded, scriptError, openCheckout };
}
