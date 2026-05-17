# Compound V — Audit & Optimize

## Priority Order
1. Route-based code splitting (React.lazy) — biggest JS win
2. Lazy-load Razorpay only on checkout
3. Suppress RunableBadge in prod / check dev-only tools
4. Lazy hero animations (reduce initial framer-motion cost)
5. ProductCard: loading="lazy" + aspect-ratio fix
6. Image paths audit
7. TypeScript clean build
8. BAC Water 0-price tiers UI fix

## Files to Touch
- [x] app.tsx — React.lazy all routes
- [ ] HomeHero.tsx — reduce inline animations, preload logo
- [ ] ProductCard.tsx — lazy images + crash guard
- [ ] useRazorpay.ts — already good, don't load on mount
- [ ] checkout.tsx — load Razorpay only when drawer opens
- [ ] vite.config.ts — already split
- [ ] index.html — preload logo-hero.webp
- [ ] PricingTiers.tsx — handle inr=0 gracefully

## Known Good
- No broken encoding chars
- No console.log
- No `as any` (comment only)
- Razorpay key uses VITE_RAZORPAY_KEY_ID ✓
- Images already webp ✓
- Prices all correct ✓
