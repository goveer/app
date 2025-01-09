"use client";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { isAuthApiError } from '@supabase/supabase-js';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; returnUrl?: string };
}) {
  async function signInWithGoogle() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async function signIn(formData: FormData) {
    try {
      const email = formData.get("email") as string;
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth/confirm?type=signin`,
        },
      });

      if (error) {
        console.error('Auth error details:', { 
          name: error.name,
          message: error.message,
          status: isAuthApiError(error) ? error.status : undefined,
          code: isAuthApiError(error) ? error.code : undefined
        });

        if (isAuthApiError(error)) {
          switch (error.status) {
            case 422:
              return { error: 'Email is invalid or not allowed' };
            case 429:
              return { error: 'Too many sign in attempts. Please try again later' };
            default:
              if (error.message.toLowerCase().includes('user not found')) {
                return { 
                  error: "No account found with this email",
                  redirectTo: "/signup"
                };
              }
              return { error: error.message };
          }
        }

        // Handle custom auth errors
        switch (error.name) {
          case 'AuthRetryableFetchError':
            return { error: 'Network connection issue - please check your connection' };
          default:
            return { error: error.message || 'An unexpected error occurred during sign in' };
        }
      }

      return { 
        success: true,
        message: "Check your email for the magic link to sign in." 
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { 
        error: error?.message || "An unexpected error occurred during sign in" 
      };
    }
  }

  return (
    <div 
      className="flex min-h-screen relative"
      style={{
        backgroundImage: 'url("/images/gradient_bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto relative px-4 md:px-8">
        <div className="absolute left-8 top-8">
          <Image
            src="/images/veer-logo.svg"
            alt="Veer Logo"
            width={240}
            height={80}
            priority
          />
        </div>

        <div className="max-w-[1100px] mx-auto">
          <div className="grid w-full h-screen grid-cols-1 gap-20 md:grid-cols-2 place-content-center">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-6xl font-bold leading-tight lg:text-7xl">
                <span className="text-[#2e1065]">Ready. Set.</span>{' '}
                <span className="text-rose-600">Optimize.</span>
              </h1>
              <p className="max-w-md text-lg font-medium text-[#2e1065]">
                Veer is the first all-in-one platform that optimizes schedules, routes, and staffing simultaneously.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-[420px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[24px] text-[#46296B] leading-[1.2]">
                    Sign in
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-sky-500 hover:text-sky-700 font-semibold">
                      Sign up
                    </Link>
                  </p>

                  <GoogleButton 
                    onClick={signInWithGoogle}
                  />
                  
                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  <form action={signIn} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="me@example.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#46296B] hover:bg-[#46296B]/90 text-white py-2 px-4 rounded-md"
                    >
                      Continue
                    </button>

                    {(searchParams?.message) && (
                      <p className="text-sm text-muted-foreground">
                        {searchParams.message}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
