'use server'

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createTeam(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;

    const { error } = await supabase
        .from('accounts')
        .insert({
            name,
            slug,
            type: 'team',
            owner_id: user.id,
        });

    if (error) {
        if (error.code === '23505') { // Unique constraint violation
            return redirect('/teams/new?error=Team slug already exists');
        }
        return redirect('/teams/new?error=Could not create team');
    }

    return redirect(`/dashboard/${slug}`);
}

export async function updateTeam(teamId: string, formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;

    const { error } = await supabase
        .from('accounts')
        .update({
            name,
            slug,
        })
        .eq('id', teamId)
        .eq('owner_id', user.id);

    if (error) {
        return redirect(`/teams/${teamId}/edit?error=Could not update team`);
    }

    return redirect(`/dashboard/${slug}`);
}

export async function editTeamName(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const name = formData.get('name') as string;
    const teamId = formData.get('teamId') as string;

    const { error } = await supabase
        .from('accounts')
        .update({ name })
        .eq('id', teamId)
        .eq('type', 'team');

    if (error) {
        return redirect(`/teams/${teamId}/settings?error=Could not update team name`);
    }

    return redirect(`/teams/${teamId}/settings?success=Team name updated`);
}

export async function editTeamSlug(formData: FormData) {
    const supabase = await createClient();

    // SECURITY: Using getUser() instead of getSession() for secure server-side auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    const slug = formData.get('slug') as string;
    const teamId = formData.get('teamId') as string;

    const { error } = await supabase
        .from('accounts')
        .update({ slug })
        .eq('id', teamId)
        .eq('type', 'team');

    if (error) {
        if (error.code === '23505') { // Unique constraint violation
            return redirect(`/teams/${teamId}/settings?error=Team slug already exists`);
        }
        return redirect(`/teams/${teamId}/settings?error=Could not update team slug`);
    }

    return redirect(`/teams/${teamId}/settings?success=Team slug updated`);
}