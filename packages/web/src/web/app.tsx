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
            <AppShell />
            
            
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
