import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { createClient } from '@/lib/supabase/server';
import type Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const supabase = await createClient();

      try {
        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if ('email' in customer && customer.email) {
          // Update user's subscription status
          const { error } = await supabase
            .from('users')
            .update({
              stripe_subscription_id: subscription.id,
              subscription_status: subscription.status,
              stripe_customer_id: subscription.customer as string,
              price_id: subscription.items.data[0].price.id,
            })
            .eq('email', customer.email);

          if (error) {
            console.error('Error updating user:', error);
            return new NextResponse('Error updating user', { status: 500 });
          }
        }
      } catch (error) {
        console.error('Error processing subscription:', error);
        return new NextResponse('Error processing subscription', { status: 500 });
      }
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
} 