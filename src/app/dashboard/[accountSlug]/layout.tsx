import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function TeamAccountLayout({
  children,
  params: { accountSlug },
}: {
  children: React.ReactNode
  params: { accountSlug: string }
}) {
  const supabase = await createClient()
  const { data: teamAccount, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('slug', accountSlug)
    .single()

  if (error) {
    console.error('Error fetching team account:', error)
    redirect('/dashboard')
  }

  if (!teamAccount) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full">
      {children}
    </div>
  )
}