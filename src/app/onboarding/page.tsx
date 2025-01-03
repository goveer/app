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
      <div className="flex-1 relative flex items-center">
        <div className="absolute left-8 top-8">
          <Image
            src="/images/veer-logo.svg"
            alt="Veer Logo"
            width={240}
            height={80}
            priority
          />
        </div>
        
        <div className="w-full max-w-2xl mx-auto">
          <MultiStepForm completeAction={handleOnboarding} />
        </div>
      </div>

      {/* Right column */}
      <div 
        className="flex-1 relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("/images/gradient_bg.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative w-[600px] h-[438px]">
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