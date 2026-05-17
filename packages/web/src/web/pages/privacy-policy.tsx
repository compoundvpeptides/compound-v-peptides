import { useTheme } from "../context/ThemeContext";
import { PolicyLayout } from "../components/PolicyLayout";

export default function PrivacyPolicy() {
  const { tokens } = useTheme();
  const s = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, margin: "0 0 16px" };
  const h = { fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", color: tokens.textPrimary, margin: "28px 0 10px" };
  const li = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, marginBottom: 6 };

  return (
    <PolicyLayout title="Privacy Policy" updated="May 2026">
      <p style={s}>
        Compound V ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard information when you visit our website or place an order.
      </p>

      <h3 style={h}>Information We Collect</h3>
      <p style={s}>We collect the following information when you interact with our site:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "Name and email address (account registration and order fulfilment)",
          "Shipping address and contact number (delivery purposes)",
          "Order and transaction history",
          "Device and browser information (analytics, security)",
          "IP address and session data",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>How We Use Your Information</h3>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "Processing and fulfilling your orders",
          "Sending order confirmation and updates",
          "Responding to customer support queries",
          "Improving our website and services",
          "Complying with applicable legal obligations",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>Data Sharing</h3>
      <p style={s}>
        We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers (shipping couriers, payment processors) solely to fulfil your order. These parties are contractually obligated to handle your data securely.
      </p>

      <h3 style={h}>Cookies</h3>
      <p style={s}>
        Our website uses cookies to enhance your browsing experience, remember preferences, and gather usage analytics. You may disable cookies in your browser settings; however, some features may not function correctly as a result.
      </p>

      <h3 style={h}>Data Retention</h3>
      <p style={s}>
        We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. You may request deletion of your account and associated data by contacting us at support@compoundv.in.
      </p>

      <h3 style={h}>Your Rights</h3>
      <p style={s}>You have the right to:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "Access the personal data we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your data (subject to legal requirements)",
          "Withdraw consent where processing is consent-based",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>Security</h3>
      <p style={s}>
        We implement industry-standard technical and organisational measures to protect your data against unauthorised access, disclosure, or loss. However, no method of transmission over the internet is 100% secure.
      </p>

      <h3 style={h}>Changes to This Policy</h3>
      <p style={s}>
        We reserve the right to update this Privacy Policy at any time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance.
      </p>

      <h3 style={h}>Contact Us</h3>
      <p style={s}>For privacy-related queries:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Email: support@compoundv.in</li>
        <li style={li}>Instagram: @compound.vpeptides</li>
        <li style={li}>Telegram: t.me/compoundvpeptides</li>
      </ul>
    </PolicyLayout>
  );
}
