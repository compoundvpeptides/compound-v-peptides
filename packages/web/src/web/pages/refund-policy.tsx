import { useTheme } from "../context/ThemeContext";
import { PolicyLayout } from "../components/PolicyLayout";

export default function RefundPolicy() {
  const { tokens } = useTheme();
  const s = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, margin: "0 0 16px" };
  const h = { fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", color: tokens.textPrimary, margin: "28px 0 10px" };
  const li = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, marginBottom: 6 };

  return (
    <PolicyLayout title="Refund & Cancellation Policy" updated="May 2026">
      <p style={s}>
        At Compound V, we maintain strict quality control and secure packaging standards for all orders. Please read our policy carefully before making a purchase.
      </p>

      <h3 style={h}>No Cancellation Policy</h3>
      <p style={s}>
        All orders placed on our website are considered final. We do not allow cancellations once an order has been successfully placed and payment confirmed.
      </p>

      <h3 style={h}>No Refund Policy</h3>
      <p style={s}>We do not offer refunds under any circumstances, including but not limited to:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {["Change of mind after placing an order", "Incorrect product selection by the customer", "Delay in delivery caused by courier services", "Incorrect address provided at checkout"].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>Damaged or Incorrect Items</h3>
      <p style={s}>
        In the event you receive a product that is damaged or incorrect, you must notify us within 48 hours of delivery by contacting our support team. Please provide:
      </p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {["Clear images of the package and product", "Your order number in the message"].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>
      <p style={s}>After verification, we may offer a replacement only. Refunds will not be issued under any circumstances.</p>

      <h3 style={h}>Research Products Disclaimer</h3>
      <p style={s}>
        All products sold by Compound V are intended strictly for research purposes only and are not for human consumption. Due to the sensitive nature of these compounds, no returns, refunds, or exchanges will be accepted once the product has been delivered, except in verified cases of damage or incorrect shipment.
      </p>

      <h3 style={h}>Right to Refuse</h3>
      <p style={s}>We reserve the right to deny any request that does not meet the above conditions or appears fraudulent or abusive.</p>

      <h3 style={h}>Contact Us</h3>
      <p style={s}>For order queries, reach out to us:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Email: support@compoundv.in</li>
        <li style={li}>Instagram: @compound.vpeptides</li>
        <li style={li}>Telegram: t.me/compoundvpeptides</li>
      </ul>
    </PolicyLayout>
  );
}
