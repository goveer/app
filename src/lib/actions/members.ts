'use server'

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function inviteMember(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const email = formData.get('email') as string;
    const teamId = formData.get('teamId') as string;
    const role = formData.get('role') as string;

    const { error } = await supabase
        .from('team_invitations')
        .insert({
            team_id: teamId,
            email,
            role,
            invited_by: user.id,
        });

    if (error) {
        return redirect(`/teams/${teamId}/members?error=Could not invite member`);
    }

    return redirect(`/teams/${teamId}/members?success=Invitation sent`);
}

export async function removeMember(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const memberId = formData.get('memberId') as string;
    const teamId = formData.get('teamId') as string;

    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId)
        .eq('team_id', teamId);

    if (error) {
        return redirect(`/teams/${teamId}/members?error=Could not remove member`);
    }

    return redirect(`/teams/${teamId}/members?success=Member removed`);
}

export async function updateMemberRole(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const memberId = formData.get('memberId') as string;
    const teamId = formData.get('teamId') as string;
    const role = formData.get('role') as string;

    const { error } = await supabase
        .from('team_members')
        .update({ role })
        .eq('id', memberId)
        .eq('team_id', teamId);

    if (error) {
        return redirect(`/teams/${teamId}/members?error=Could not update member role`);
    }

    return redirect(`/teams/${teamId}/members?success=Member role updated`);
}
