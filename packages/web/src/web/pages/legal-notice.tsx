import { useTheme } from "../context/ThemeContext";
import { PolicyLayout } from "../components/PolicyLayout";

export default function LegalNotice() {
  const { tokens } = useTheme();
  const s = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, margin: "0 0 16px" };
  const h = { fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", color: tokens.textPrimary, margin: "28px 0 10px" };
  const li = { fontFamily: "'Inter', sans-serif", fontSize: 14, color: tokens.textSecondary, lineHeight: 1.8, marginBottom: 6 };

  return (
    <PolicyLayout title="Legal Notice" updated="May 2026">
      <p style={s}>
        This Legal Notice governs the use of the Compound V website and all associated services. Please read it carefully before using our platform or purchasing any product.
      </p>

      <h3 style={h}>Company Information</h3>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Brand name: Compound V Peptides</li>
        <li style={li}>Country of operation: India</li>
        <li style={li}>Contact email: support@compoundv.in</li>
      </ul>

      <h3 style={h}>Nature of Products</h3>
      <p style={s}>
        All compounds and products sold by Compound V are classified as research chemicals intended strictly for in vitro and laboratory research use. They are <strong style={{ color: tokens.textPrimary }}>not</strong> intended for human or veterinary consumption, and are <strong style={{ color: tokens.textPrimary }}>not</strong> classified as medicinal products, food supplements, or cosmetics under any applicable regulatory framework.
      </p>

      <h3 style={h}>No Medical Advice</h3>
      <p style={s}>
        Nothing on this website constitutes medical advice, clinical guidance, or a recommendation to use any product for therapeutic purposes. Compound V makes no claims regarding the safety, efficacy, or suitability of its products for any use beyond laboratory research. Always consult a qualified medical professional for health-related decisions.
      </p>

      <h3 style={h}>Regulatory Compliance</h3>
      <p style={s}>
        It is the sole responsibility of the purchaser to ensure that the acquisition, possession, and use of any product complies with all applicable laws and regulations in their jurisdiction. Compound V does not accept liability for any unlawful use of its products.
      </p>

      <h3 style={h}>Age Restriction</h3>
      <p style={s}>
        You must be 18 years of age or older to browse this website and purchase any product. By accessing the site, you confirm that you meet this requirement.
      </p>

      <h3 style={h}>Disclaimer of Warranties</h3>
      <p style={s}>
        This website and its contents are provided on an "as is" basis without warranties of any kind, express or implied. Compound V does not warrant that the site will be error-free, uninterrupted, or free of harmful components.
      </p>

      <h3 style={h}>Limitation of Liability</h3>
      <p style={s}>
        To the maximum extent permitted by applicable law, Compound V shall not be held liable for any damages, losses, or claims arising from the use or misuse of products purchased through this website, reliance on any information provided on the site, or any direct, indirect, incidental, or consequential harm.
      </p>

      <h3 style={h}>Third-Party Links</h3>
      <p style={s}>
        Our website may contain links to third-party websites. These are provided for convenience only. Compound V does not endorse or take responsibility for the content, policies, or practices of any third-party sites.
      </p>

      <h3 style={h}>Intellectual Property</h3>
      <p style={s}>
        All content on this website — including but not limited to text, branding, imagery, and product information — is protected by applicable intellectual property laws. Unauthorised reproduction or distribution is prohibited.
      </p>

      <h3 style={h}>Governing Law</h3>
      <p style={s}>
        This Legal Notice is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of Indian courts.
      </p>

      <h3 style={h}>Contact</h3>
      <p style={s}>For legal queries or concerns:</p>
      <ul style={{ paddingLeft: 20, margin: "0 0 16px" }}>
        <li style={li}>Email: support@compoundv.in</li>
        <li style={li}>Instagram: @compound.vpeptides</li>
        <li style={li}>Telegram: t.me/compoundvpeptides</li>
      </ul>
    </PolicyLayout>
  );
}
