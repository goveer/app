import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MultiStepForm } from "@/components/ui/multi-step-form";

export default async function Onboarding() {
  const supabase = await createClient();

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  const handleOnboarding = async (formData: FormData) => {
    "use server";
    
    const origin = headers().get("origin");
    
    // Update user metadata with form data
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        onboardingCompleted: true,
        ...Object.fromEntries(formData)
      }
    });

    if (updateError) {
      return redirect('/onboarding?message=Failed to update profile');
    }

    return redirect('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left column */}
      <div className="flex-1 relative flex flex-col w-full lg:w-1/2">
        <div className="px-4 md:px-8 pt-8">
          <Image
            src="/images/veer-logo.svg"
            alt="Veer Logo"
            width={240}
            height={80}
            className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-auto"
            priority
          />
        </div>
        
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="w-full max-w-[600px]">
            <MultiStepForm completeAction={handleOnboarding} />
          </div>
        </div>
      </div>

      {/* Right column - hidden on mobile */}
      <div 
        className="hidden lg:flex flex-1 relative items-center justify-center"
        style={{
          backgroundImage: 'url("/images/gradient_bg.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative w-full max-w-[600px] aspect-[600/438] px-4">
          <Image
            src="/images/onboarding_img.svg"
            alt="Onboarding"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 