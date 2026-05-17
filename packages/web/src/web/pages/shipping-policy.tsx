import { useTheme } from "../context/ThemeContext";
import { PolicyLayout } from "../components/PolicyLayout";

export default function ShippingPolicy() {
  const { tokens } = useTheme();
  const s = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, margin: "0 0 16px" };
  const h = { fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", color: tokens.textPrimary, margin: "28px 0 10px" };
  const li = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, marginBottom: 6 };

  return (
    <PolicyLayout title="Shipping Policy" updated="May 2026">
      <p style={s}>
        Compound V ships across India. All orders are handled with discreet, tamper-proof packaging to maintain product integrity and customer confidentiality.
      </p>

      <h3 style={h}>Shipping Charges</h3>
      <p style={s}>
        A flat shipping fee of <strong style={{ color: tokens.textPrimary }}>₹200</strong> is applied to all orders, regardless of order value or weight. This covers standard courier handling and packaging.
      </p>

      <h3 style={h}>Delhi NCR — Porter Delivery</h3>
      <p style={s}>
        Customers in Delhi NCR have the option to choose <strong style={{ color: tokens.textPrimary }}>Porter</strong> for same-day or next-day delivery. The Porter delivery fare is quoted separately at checkout and is based on your exact delivery location. There is no Compound V markup on Porter fares.
      </p>

      <h3 style={h}>Processing Time</h3>
      <p style={s}>
        Orders are typically processed within 1–2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed the next working day.
      </p>

      <h3 style={h}>Estimated Delivery Time</h3>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "Delhi NCR (Porter): Same day or next day",
          "Metro cities: 2–4 business days",
          "Tier 2 / Tier 3 cities: 4–7 business days",
          "Remote or pincode-restricted areas: 7–10 business days",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>
      <p style={s}>Delivery timelines are estimates only and may vary due to courier delays, strikes, weather, or other factors beyond our control.</p>

      <h3 style={h}>Order Tracking</h3>
      <p style={s}>
        Once your order is dispatched, a tracking ID will be shared via email or on your profile page. You can use this to monitor your shipment directly on the courier's website.
      </p>

      <h3 style={h}>Shipping Restrictions</h3>
      <p style={s}>
        We currently ship within India only. We do not offer international shipping at this time. Delivery to P.O. boxes may not be possible with all courier partners.
      </p>

      <h3 style={h}>Incorrect Address</h3>
      <p style={s}>
        Please double-check your shipping address before confirming your order. Compound V is not responsible for failed deliveries resulting from incorrect or incomplete addresses provided by the customer. Redelivery charges, if applicable, will be borne by the customer.
      </p>

      <h3 style={h}>Lost or Undelivered Shipments</h3>
      <p style={s}>
        If your shipment is marked as delivered but not received, please contact us within 48 hours with your order number and tracking ID. We will coordinate with the courier to investigate. Compound V is not liable for shipments lost due to courier negligence, but we will assist in raising a dispute.
      </p>

      <h3 style={h}>Contact Us</h3>
      <p style={s}>For shipping-related queries:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Email: support@compoundv.in</li>
        <li style={li}>Instagram: @compound.vpeptides</li>
        <li style={li}>Telegram: t.me/compoundvpeptides</li>
      </ul>
    </PolicyLayout>
  );
}
