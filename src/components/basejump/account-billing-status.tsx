import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

interface Props {
  accountId: string
}

export default async function AccountBillingStatus({ accountId }: Props) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get account's subscription status
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select(`
      *,
      billing_status:stripe_subscriptions (
        status,
        current_period_end,
        cancel_at_period_end,
        price:prices (
          product:products (
            name
          ),
          unit_amount
        )
      )
    `)
    .eq('id', accountId)
    .single()

  if (accountError) {
    return (
      <div className="p-4 rounded-md bg-red-50">
        <p className="text-red-600">Error loading billing status</p>
      </div>
    )
  }

  if (!account.billing_status) {
    return (
      <div className="p-4 rounded-md bg-yellow-50">
        <p className="text-yellow-800">No active subscription</p>
        <a 
          href={`/dashboard/${accountId}/billing/upgrade`}
          className="text-yellow-900 underline hover:no-underline mt-2 inline-block"
        >
          Upgrade now
        </a>
      </div>
    )
  }

  const { status, current_period_end, cancel_at_period_end, price } = account.billing_status

  return (
    <div className="p-4 rounded-md bg-white shadow">
      <div className="space-y-2">
        <h3 className="font-medium">Subscription Status</h3>
        <p className="text-sm text-gray-500 capitalize">{status}</p>
        
        {price && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {price.product.name} - ${(price.unit_amount / 100).toFixed(2)}/month
            </p>
          </div>
        )}

        {current_period_end && (
          <p className="text-sm text-gray-500">
            {cancel_at_period_end 
              ? `Cancels on ${new Date(current_period_end * 1000).toLocaleDateString()}`
              : `Next billing date: ${new Date(current_period_end * 1000).toLocaleDateString()}`
            }
          </p>
        )}

        <div className="mt-4">
          <a 
            href={`/dashboard/${accountId}/billing/manage`}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Manage subscription
          </a>
        </div>
      </div>
    </div>
  )
}
