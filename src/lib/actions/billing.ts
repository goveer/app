'use server'

import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

export async function createCheckoutSession(formData: FormData) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const priceId = formData.get('priceId') as string
  const accountId = formData.get('accountId') as string

  // Get account to verify ownership
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', accountId)
    .eq('owner_id', user.id)
    .single()

  if (accountError || !account) {
    redirect('/dashboard?error=Invalid account')
  }

  // Create or get Stripe customer
  let customerId = account.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        accountId: account.id
      }
    })
    customerId = customer.id

    // Save customer ID
    await supabase
      .from('accounts')
      .update({ stripe_customer_id: customerId })
      .eq('id', account.id)
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${account.id}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${account.id}/billing?canceled=true`,
    metadata: {
      accountId: account.id
    }
  })

  if (!session.url) {
    redirect(`/dashboard/${account.id}/billing?error=Could not create checkout session`)
  }

  redirect(session.url)
}

export async function createPortalSession(formData: FormData) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const accountId = formData.get('accountId') as string

  // Get account to verify ownership and get customer ID
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', accountId)
    .eq('owner_id', user.id)
    .single()

  if (accountError || !account || !account.stripe_customer_id) {
    redirect('/dashboard?error=Invalid account or no subscription')
  }

  // Create portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: account.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${account.id}/billing`,
  })

  redirect(session.url)
}