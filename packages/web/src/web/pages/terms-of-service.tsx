import { useTheme } from "../context/ThemeContext";
import { PolicyLayout } from "../components/PolicyLayout";

export default function TermsOfService() {
  const { tokens } = useTheme();
  const s = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, margin: "0 0 16px" };
  const h = { fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", color: tokens.textPrimary, margin: "28px 0 10px" };
  const li = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, marginBottom: 6 };

  return (
    <PolicyLayout title="Terms of Service" updated="May 2026">
      <p style={s}>
        By accessing or using the Compound V website and purchasing our products, you agree to be bound by the following Terms of Service. If you do not agree, please do not use this site.
      </p>

      <h3 style={h}>1. Eligibility</h3>
      <p style={s}>
        You must be at least 18 years of age to use this website or purchase any products. By placing an order, you confirm that you are of legal age and that you understand and accept the research-only nature of all products sold here.
      </p>

      <h3 style={h}>2. Research Use Only</h3>
      <p style={s}>
        All products sold by Compound V are intended exclusively for in vitro and laboratory research purposes. They are not approved for human consumption, veterinary use, or as medicinal products. By purchasing, you acknowledge and agree that the products will be used solely for legitimate scientific research.
      </p>

      <h3 style={h}>3. Accuracy of Information</h3>
      <p style={s}>
        We strive to ensure all product descriptions, specifications, and pricing are accurate. However, we reserve the right to correct errors at any time. We are not liable for typographical errors or outdated information on the site.
      </p>

      <h3 style={h}>4. Ordering & Payment</h3>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.",
          "Orders are confirmed only after successful payment.",
          "We reserve the right to cancel any order at our discretion and issue a full refund in such cases.",
          "We do not accept cancelled orders from the customer's end once placed.",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>5. Shipping & Delivery</h3>
      <p style={s}>
        Shipping is subject to our Shipping Policy. Delivery timelines are estimates only. Compound V is not responsible for courier delays beyond our control.
      </p>

      <h3 style={h}>6. Intellectual Property</h3>
      <p style={s}>
        All content on this website — including text, graphics, logos, product descriptions, and imagery — is the property of Compound V and is protected under applicable intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
      </p>

      <h3 style={h}>7. Limitation of Liability</h3>
      <p style={s}>
        To the fullest extent permitted by law, Compound V shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or misuse of our products or website. Our total liability in any dispute is limited to the value of the order placed.
      </p>

      <h3 style={h}>8. Prohibited Use</h3>
      <p style={s}>You agree not to:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        {[
          "Use our products for human consumption or in a clinical setting",
          "Misrepresent your identity or purpose when placing an order",
          "Resell products without prior written authorisation",
          "Use the site for any unlawful purpose",
        ].map(i => <li key={i} style={li}>{i}</li>)}
      </ul>

      <h3 style={h}>9. Governing Law</h3>
      <p style={s}>
        These Terms are governed by the laws of India. Any disputes arising from or relating to these Terms or your use of the site shall be subject to the exclusive jurisdiction of courts located in India.
      </p>

      <h3 style={h}>10. Modifications</h3>
      <p style={s}>
        Compound V reserves the right to update these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the site constitutes acceptance of the revised Terms.
      </p>

      <h3 style={h}>Contact Us</h3>
      <p style={s}>For questions regarding these Terms:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Email: support@compoundv.in</li>
        <li style={li}>Instagram: @compound.vpeptides</li>
        <li style={li}>Telegram: t.me/compoundvpeptides</li>
      </ul>
    </PolicyLayout>
  );
}
