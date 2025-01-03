import Stripe from 'stripe';

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_51QIde0KgBREgoBSlZ9xPSo7xkUTBCOJPuzG3FrEydXxKLR8jQUx69pulWb47pM3XfdkMYIqLVlwLdiFUU4CuNBes00ghkUIWpB';
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QIde0KgBREgoBSlBXd0ppI8iGu7aIFh9kxALs3XVwlfQVz5cDUuLmtq1nEvAOLr7hOUZbsMrXhoCEGcNyW87Z7N00hYn0AYqw';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export type PlanId = 'team_annual' | 'team_monthly' | 'individual_annual' | 'individual_monthly';

export const PRICE_IDS: Record<PlanId, string> = {
  team_annual: 'price_test_team_annual',
  team_monthly: 'price_test_team_monthly',
  individual_annual: 'price_test_individual_annual',
  individual_monthly: 'price_test_individual_monthly'
}; 