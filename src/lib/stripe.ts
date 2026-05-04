import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ STRIPE_SECRET_KEY is missing. Stripe functionality will be disabled.');
}

// We use a dummy key during build/dev if the real one is missing to avoid crashing
const keyToUse = stripeSecretKey || 'sk_test_placeholder_for_build';

export const stripe = new Stripe(keyToUse, {
  apiVersion: '2024-12-18.acacia' as any,
});

export default stripe;
