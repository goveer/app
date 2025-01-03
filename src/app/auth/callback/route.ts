import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (!code) {
    console.error('No code provided in auth callback');
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Invalid authentication link')}`);
  }

  try {
    const supabase = await createClient();
    console.log('Exchanging auth code for session...');
    
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }

    if (!session) {
      console.error('No session returned from code exchange');
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Authentication failed')}`);
    }

    console.log('Session established for user:', session.user.id);

    // Check if this is a new signup (no last_sign_in_at in metadata)
    if (!session.user.last_sign_in_at) {
      console.log('New user detected, redirecting to onboarding');
      return NextResponse.redirect(`${origin}/onboarding`);
    }

    // Handle returnTo from metadata if present
    if (session.user.user_metadata?.returnTo) {
      console.log('Redirecting to:', session.user.user_metadata.returnTo);
      return NextResponse.redirect(`${origin}${session.user.user_metadata.returnTo}`);
    }

    // Default to dashboard for existing users
    return NextResponse.redirect(`${origin}/dashboard`);
  } catch (error) {
    console.error('Unexpected error in auth callback:', error);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('An unexpected error occurred')}`);
  }
}
