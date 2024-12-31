import Image from "next/image";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/ui/google-button";
import { SignUpForm } from "@/components/auth/signup-form";
import { LoopsClient } from "@/lib/loops/server";

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string; returnUrl?: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";
    
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();
    const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

    try {
      // 1. Sign up with Supabase
      const { error: supabaseError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?returnUrl=/onboarding`,
        },
      });

      if (supabaseError) {
        return redirect(`/signup?message=Could not send magic link`);
      }

      // 2. Create contact in Loops (Option 1 - create now)
      const { success: loopsSuccess } = await loops.createContact(email, {
        source: "signup_form",
        subscribed: true,
      });

      if (!loopsSuccess) {
        console.error("Failed to create Loops contact");
        // Continue anyway since user is created in Supabase
      }

      // 3. Send welcome email via Loops
      await loops.sendTransactionalEmail({
        transactionalId: "your_welcome_email_id",
        email,
        dataVariables: {
          confirmationUrl: `${origin}/auth/callback?returnUrl=/onboarding`,
        },
      });

      return redirect(`/login?message=Check email to continue sign in process`);
    } catch (error) {
      console.error("Signup error:", error);
      return redirect(`/signup?message=An error occurred during signup`);
    }
  };

  const signUpWithGoogle = async () => {
    "use server";
    
    const origin = headers().get("origin");
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback?returnUrl=${searchParams.returnUrl}`,
      },
    });

    if (error) {
      return redirect(`/signup?message=Could not authenticate with Google&returnUrl=${searchParams.returnUrl}`);
    }

    return redirect(data?.url || '/dashboard');
  };

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
                <span className="text-white [text-shadow:_0_1px_3px_#46296b52]">Ready. Set.</span>{' '}
                <span className="text-rose-600">Optimize.</span>
              </h1>
              <p className="max-w-md text-lg font-medium text-white [text-shadow:_0_1px_3px_#46296b52]">
                Veer is the first all-in-one platform that optimizes your schedules, routes, and staffing simultaneously.
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