export const IS_TEST_MODE = process.env.TEST_MODE !== 'false';

export const CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://flordemojito.es',
  isTestMode: IS_TEST_MODE,
  
  // Stripe
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    testMode: IS_TEST_MODE,
  },
  
  // PayPal
  paypal: {
    env: process.env.PAYPAL_ENV || 'sandbox',
  },
  
  // DPD
  dpd: {
    mockEnabled: process.env.DPD_API_KEY === '...' || !process.env.DPD_API_KEY,
  }
};
