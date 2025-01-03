import { createPaymentIntent } from '@/lib/stripe/actions';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { OnboardingStepper } from '@/components/onboarding/onboarding-stepper';
import { PaymentForm } from '@/components/checkout/payment-form';
import { StripeProvider } from '@/components/providers/stripe-provider';
import { PlanId } from '@/lib/stripe/config';

const PLAN_DETAILS: Record<PlanId, {
  name: string;
  price: string;
  interval: string;
}> = {
  team_annual: {
    name: 'Teams (Annual)',
    price: '$99/month',
    interval: 'year'
  },
  team_monthly: {
    name: 'Teams (Monthly)',
    price: '$129/month',
    interval: 'month'
  },
  individual_annual: {
    name: 'Single (Annual)',
    price: '$29/month',
    interval: 'year'
  },
  individual_monthly: {
    name: 'Single (Monthly)',
    price: '$39/month',
    interval: 'month'
  }
};

export default async function CheckoutPage({
  searchParams
}: {
  searchParams: { plan: string }
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user?.id) {
    redirect('/login');
  }

  const planId = searchParams.plan as PlanId;
  if (!planId || !PLAN_DETAILS[planId]) {
    redirect('/onboarding');
  }

  try {
    const { clientSecret } = await createPaymentIntent(user.id, planId);
    const planDetails = PLAN_DETAILS[planId];

    if (!clientSecret) {
      throw new Error('Failed to create payment intent');
    }

    return (
      <div className="w-full max-w-2xl flex flex-col h-[600px]">
        <OnboardingStepper 
          currentStep={5} 
          steps={[
            "Create Account",
            "Verify Email",
            "Basic Info",
            "Preferences",
            "Payment"
          ]} 
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold text-[#46296B] pt-24 pb-12">
            Start Your Free Trial
            <p className="text-base font-normal text-muted-foreground mt-2">
              Try Veer free for 14 days. No credit card charges during trial.
            </p>
          </h2>

          <div className="flex-1">
            <StripeProvider clientSecret={clientSecret}>
              <PaymentForm 
                userId={user.id}
                planDetails={planDetails}
              />
            </StripeProvider>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Checkout error:', error);
    
    return (
      <div className="w-full max-w-2xl flex flex-col h-[600px]">
        <OnboardingStepper 
          currentStep={5} 
          steps={[
            "Create Account",
            "Verify Email",
            "Basic Info",
            "Preferences",
            "Payment"
          ]} 
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We couldn't set up your checkout session. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }
} 