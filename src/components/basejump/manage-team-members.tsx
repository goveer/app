import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

interface Props {
  teamId: string
}

export default async function ManageTeamMembers({ teamId }: Props) {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get team members
  const { data: members, error: membersError } = await supabase
    .from('team_members')
    .select(`
      *,
      user:users (
        email,
        user_metadata
      )
    `)
    .eq('team_id', teamId)

  if (membersError) {
    return (
      <div className="p-4">
        <p className="text-red-600">Error loading team members</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Team Members</h2>
      
      <div className="divide-y">
        {members.map((member) => (
          <div key={member.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{member.user.email}</p>
              <p className="text-sm text-gray-500 capitalize">{member.role}</p>
            </div>
            
            {member.user_id !== user.id && (
              <form>
                <input type="hidden" name="memberId" value={member.id} />
                <input type="hidden" name="teamId" value={teamId} />
                <button
                  type="submit"
                  formAction={async (formData: FormData) => {
                    "use server"
                    const supabase = await createClient()
                    await supabase
                      .from('team_members')
                      .delete()
                      .eq('id', formData.get('memberId'))
                    redirect(`/teams/${formData.get('teamId')}/members`)
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
