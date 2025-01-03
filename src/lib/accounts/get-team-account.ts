import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Account, TeamMember } from './types'

export async function getTeamAccount(teamSlug: string) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get team account and check membership
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select(`
      *,
      members!team_members (
        role,
        user_id
      )
    `)
    .eq('slug', teamSlug)
    .eq('type', 'team')
    .single() as { data: Account & { members: TeamMember[] }, error: any }

  if (accountError) {
    console.error('Error fetching team account:', accountError)
    throw new Error('Could not fetch team account')
  }

  if (!account) {
    redirect('/dashboard')
  }

  // Check if user is a member of this team
  const isMember = account.members.some((member: TeamMember) => member.user_id === user.id)
  if (!isMember) {
    redirect('/dashboard')
  }

  return account
} 