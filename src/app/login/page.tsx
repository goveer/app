"use client";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { isAuthApiError } from '@supabase/supabase-js';
import { LoginForm } from "@/components/auth/login-form";

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
          data: {
            transaction_id: 'cm5py31dj00epwg226hnkpsfi'
          }
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
        background: 'linear-gradient(129deg, rgba(244, 63, 94, 0.20) -1.17%, rgba(160, 202, 233, 0.80) 87.43%), #FFF'
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col">
        <header className="pt-8 pb-8 md:pb-12 lg:pb-16">
          <Image
            src="/images/veer-logo.svg"
            alt="Veer Logo"
            width={240}
            height={80}
            className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-auto"
            priority
          />
        </header>

        <main className="pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-[1100px] w-full mx-auto">
            <div className="grid w-full grid-cols-1 gap-8 lg:gap-20 lg:grid-cols-2 items-start">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left px-4 sm:px-6 lg:px-8">
                <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-tight">
                  <span className="text-[#2e1065] inline lg:block">Ready. Set.</span>{' '}
                  <span className="text-rose-600 inline lg:block lg:mt-2">Optimize.</span>
                </h1>
                <p className="max-w-md mx-auto lg:mx-0 text-base md:text-lg font-medium text-[#2e1065]">
                  Veer is the first all-in-one platform that optimizes schedules, routes, and staffing simultaneously.
                </p>
              </div>

              <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-[420px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-semibold text-[#2e1065] leading-[1.2]">
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

                    <LoginForm 
                      signInAction={signIn}
                      message={searchParams?.message}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
