import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

interface Props {
  token: string
}

export default async function AcceptTeamInvitation({ token }: Props) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get invitation details
  const { data: invitation, error: inviteError } = await supabase
    .from('team_invitations')
    .select('*')
    .eq('token', token)
    .single()

  if (inviteError || !invitation) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-red-600">Invalid or expired invitation</h1>
        <p className="mt-2 text-gray-600">This invitation may have expired or been revoked.</p>
      </div>
    )
  }

  // Accept invitation
  const { error: acceptError } = await supabase
    .from('team_members')
    .insert({
      team_id: invitation.team_id,
      user_id: user.id,
      role: invitation.role,
    })

  if (acceptError) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-red-600">Could not accept invitation</h1>
        <p className="mt-2 text-gray-600">An error occurred while accepting the invitation.</p>
      </div>
    )
  }

  // Delete the invitation
  await supabase
    .from('team_invitations')
    .delete()
    .eq('id', invitation.id)

  redirect(`/dashboard/${invitation.team_id}`)
}