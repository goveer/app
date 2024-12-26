import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'
import { addToLoops } from '../lib/loops'

export async function signInWithOtp(formData: FormData) {
  'use server'
  
  const email = formData.get('email') as string
  const supabase = await createClient()

  // First add to Loops
  const loopsResult = await addToLoops({
    email,
    mailingLists: process.env.C_LOOPS_MAILING_LIST_ID,
    userGroup: 'New User'
  })

  if (loopsResult.error) {
    return { error: loopsResult.error }
  }

  // Then handle Supabase auth
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      shouldCreateUser: true,
      data: {
        email_verified: false,
        source: 'OTP',
        loops_contact: true
      }
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signInWithGoogle() {
  'use server'
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        email_verified: 'true'
      }
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Add to Loops if we have user data
  if (data?.url) {
    try {
      const userEmail = new URL(data.url).searchParams.get('email')
      if (userEmail) {
        await addToLoops({
          email: userEmail,
          mailingLists: process.env.C_LOOPS_MAILING_LIST_ID,
          userGroup: 'New User'
        })
      }
    } catch (e) {
      console.error('Error adding Google user to Loops:', e)
    }
  }

  return { data }
}

export async function signOut() {
  'use server'

  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

// Helper function to get auth status
export async function getAuthStatus() {
  'use server'
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { user }
}
