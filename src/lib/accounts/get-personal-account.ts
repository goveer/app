import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getPersonalAccount() {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get personal account for user
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('*')
    .eq('owner_id', user.id)
    .eq('type', 'personal')
    .single()

  if (accountError) {
    console.error('Error fetching personal account:', accountError)
    throw new Error('Could not fetch personal account')
  }

  if (!account) {
    // Create personal account if it doesn't exist
    const { data: newAccount, error: createError } = await supabase
      .from('accounts')
      .insert({
        owner_id: user.id,
        type: 'personal',
        name: `${user.email}'s Account`,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating personal account:', createError)
      throw new Error('Could not create personal account')
    }

    return newAccount
  }

  return account
} 