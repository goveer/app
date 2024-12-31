import Image from "next/image";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { LoopsClient } from "@/lib/loops/server";
import { redirect } from "next/navigation";
import { MultiStepForm } from "@/components/ui/multi-step-form";

export default async function Onboarding() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const handleOnboarding = async (formData: FormData) => {
    "use server";
    
    const origin = headers().get("origin");
    const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);
    
    // Update contact with form data
    const { success } = await loops.updateContact(session.user.email!, {
      ...formData,
      onboardingCompleted: true,
    });

    if (!success) {
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