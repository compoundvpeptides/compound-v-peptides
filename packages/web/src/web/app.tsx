import { Suspense, lazy, useEffect } from "react";
import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";

import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";

// All pages lazy-loaded — framer-motion stays out of the initial bundle
const Index         = lazy(() => import("./pages/index"));
const Products      = lazy(() => import("./pages/products"));
const ProductDetail = lazy(() => import("./pages/product-detail"));
const About         = lazy(() => import("./pages/about"));
const Contact       = lazy(() => import("./pages/contact"));
const Calculator    = lazy(() => import("./pages/calculator"));
const Checkout      = lazy(() => import("./pages/checkout"));
const Signup        = lazy(() => import("./pages/signup"));
const Login         = lazy(() => import("./pages/login"));
const Profile       = lazy(() => import("./pages/profile"));
const Protocols     = lazy(() => import("./pages/protocols"));

const RefundPolicy   = lazy(() => import("./pages/refund-policy"));
const PrivacyPolicy  = lazy(() => import("./pages/privacy-policy"));
const ShippingPolicy = lazy(() => import("./pages/shipping-policy"));
const TermsOfService = lazy(() => import("./pages/terms-of-service"));
const OrderSuccess = lazy(() => import('./pages/order-success'));
const LegalNotice    = lazy(() => import("./pages/legal-notice"));

// Prefetch critical routes after initial load
function usePrefetch() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Prefetch the most-visited pages after 2s idle
      import("./pages/products");
      import("./pages/product-detail");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
}

function PageFallback() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4, fontSize: 13 }}>
      Loading…
    </div>
  );
}

function AppShell() {
  usePrefetch();

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path="/"           component={Index} />
            <Route path="/products"   component={Products} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/protocols"  component={Protocols} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/about"      component={About} />
            <Route path="/contact"    component={Contact} />
            <Route path="/checkout"   component={Checkout} />
            <Route path="/signup"     component={Signup} />
            <Route path="/login"      component={Login} />
            <Route path="/profile"    component={Profile} />
            <Route path="/refund-policy"    component={RefundPolicy} />
            <Route path="/privacy-policy"   component={PrivacyPolicy} />
            <Route path="/shipping-policy"  component={ShippingPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/order-success" component={OrderSuccess} />
        <Route path="/legal-notice"     component={LegalNotice} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppShell /><a href="https://wa.me/919310703553?text=Hi%2C%20I%20have%20a%20question%20about%20Compound%20V%20Peptides" target="_blank" rel="noopener noreferrer" style={{position:"fixed",bottom:"24px",right:"24px",zIndex:9999,background:"#25D366",borderRadius:"50%",width:"56px",height:"56px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.428a.5.5 0 0 0 .619.608l5.79-1.516A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.127-1.424l-.362-.214-3.742.979.999-3.648-.235-.374A9.953 9.953 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/></svg></a>
            
            
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
