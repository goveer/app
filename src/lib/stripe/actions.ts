'use server';

import { stripe, PRICE_IDS, PlanId } from './config';
import { createClient } from '@/lib/supabase/server';

interface AddressDetails {
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone: string;
}

export async function createPaymentIntent(userId: string, planId: PlanId) {
  const supabase = await createClient();
  
  // Get user data
  const { data: user } = await supabase
    .from('users')
    .select('email, stripe_customer_id')
    .eq('id', userId)
    .single();

  if (!user?.email) throw new Error('User not found');

  // Get or create Stripe customer
  let customerId = user.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId,
      },
    });
    customerId = customer.id;

    // Save Stripe customer ID
    await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId);
  }

  // Create setup intent for trial period
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
    metadata: {
      userId,
      planId,
    },
  });

  return {
    clientSecret: setupIntent.client_secret,
  };
}

export async function updateUserAddress(userId: string, address: AddressDetails) {
  const supabase = await createClient();
  
  // Get user's Stripe customer ID
  const { data: user } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (!user?.stripe_customer_id) {
    throw new Error('No Stripe customer found');
  }

  // Update Stripe customer with address
  await stripe.customers.update(user.stripe_customer_id, {
    address: {
      line1: address.address.line1,
      line2: address.address.line2,
      city: address.address.city,
      state: address.address.state,
      postal_code: address.address.postal_code,
      country: address.address.country,
    },
    phone: address.phone,
  });

  // Save address to user profile
  await supabase
    .from('users')
    .update({
      billing_address: address,
    })
    .eq('id', userId);
}

export async function startSubscription(userId: string, setupIntentId: string) {
  const supabase = await createClient();
  
  // Get setup intent to get customer and metadata
  const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
  const { customer, metadata } = setupIntent;
  
  if (!customer || typeof customer !== 'string' || !metadata?.planId) {
    throw new Error('Invalid setup intent data');
  }

  // Create subscription with trial period
  const subscription = await stripe.subscriptions.create({
    customer,
    items: [{ price: PRICE_IDS[metadata.planId as PlanId] }],
    trial_period_days: 14,
    payment_settings: {
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    payment_behavior: 'default_incomplete',
    metadata: {
      userId,
    },
  });

  // Update user with subscription ID
  await supabase
    .from('users')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
    })
    .eq('id', userId);

  return subscription;
} 