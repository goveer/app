import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const origin = requestUrl.origin

  if (!token_hash || !type) {
    console.error('Missing token_hash or type in confirm request')
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Invalid confirmation link')}`)
  }

  try {
    const supabase = await createClient()
    
    // Verify the OTP and get the session
    const { data: { session }, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (error) {
      console.error('Error verifying OTP:', error)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
    }

    if (!session) {
      console.error('No session returned from verifyOtp')
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Invalid session')}`)
    }

    // For new signups, redirect to onboarding
    if (type === 'signup') {
      return NextResponse.redirect(`${origin}/onboarding`)
    }

    // For other types (like recovery, invite, etc.), redirect to dashboard
    return NextResponse.redirect(`${origin}/dashboard`)
  } catch (error) {
    console.error('Unexpected error in confirm endpoint:', error)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('An unexpected error occurred')}`)
  }
} 