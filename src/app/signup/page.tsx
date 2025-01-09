"use client";

import Image from "next/image";
import { SignUpForm } from "@/components/auth/signup-form";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/ui/google-button";
import { isAuthApiError } from '@supabase/supabase-js';

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string; returnUrl?: string };
}) {
  async function signUpWithGoogle() {
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

  async function signUp(formData: FormData) {
    try {
      const email = formData.get("email") as string;
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm?type=signup`,
          data: {
            first_name: firstName,
            last_name: lastName
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
              return { error: 'Too many signup attempts. Please try again later' };
            default:
              return { error: error.message };
          }
        }

        // Handle custom auth errors
        switch (error.name) {
          case 'AuthRetryableFetchError':
            return { error: 'Network connection issue - please check your connection' };
          default:
            return { error: error.message || 'An unexpected error occurred during signup' };
        }
      }

      return { 
        success: true,
        message: "Check your email for the magic link to complete your signup." 
      };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { 
        error: error?.message || "An unexpected error occurred during signup" 
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
                <CardHeader className="pb-4">
                  <CardTitle className="text-[24px] text-[#46296B] text-center leading-[1.2]">
                    Optimize your first Veer<br />schedule in seconds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <GoogleButton 
                    onClick={signUpWithGoogle}
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

                  <SignUpForm 
                    signUpAction={signUp}
                    message={searchParams?.message}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 