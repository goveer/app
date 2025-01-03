'use client';

import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateUserAddress } from '@/lib/stripe/actions';
import { Card } from '@/components/ui/card';

interface PaymentFormProps {
  userId: string;
  planDetails: {
    name: string;
    price: string;
    interval: string;
  };
}

interface AddressDetails {
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone: string;
}

export function PaymentForm({ userId, planDetails }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const addressElement = elements.getElement('address');
      if (!addressElement) {
        throw new Error('Address element not found');
      }

      const { complete, value: addressDetails } = await addressElement.getValue();
      if (!complete) {
        throw new Error('Please fill in all required address fields');
      }

      // Confirm payment setup for future use (trial period)
      const { error: setupError } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/onboarding/complete`,
        },
      });

      if (setupError) {
        throw setupError;
      }

      // Save the address to the user profile
      await updateUserAddress(userId, addressDetails as AddressDetails);
      
      // Redirect to success page
      window.location.href = '/onboarding/complete?status=success';
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Plan Summary */}
      <Card className="p-6 bg-[#F5F3FF] border-[#46296B]/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#46296B]">{planDetails.name}</h3>
          <span className="text-[#46296B]">{planDetails.price}</span>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• 14-day free trial</p>
          <p>• First payment on {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          <p>• Cancel anytime during trial</p>
        </div>
      </Card>

      {/* Payment Method */}
      <div className="rounded-xl border border-border/50 bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Payment Method
        </h3>
        <PaymentElement 
          className="[&_*]:font-sans"
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {/* Billing Address */}
      <div className="rounded-xl border border-border/50 bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Billing Address
        </h3>
        <AddressElement 
          options={{
            mode: 'billing',
            fields: {
              phone: 'always',
            },
            validation: {
              phone: {
                required: 'always',
              },
            },
          }}
          className="[&_*]:font-sans"
        />
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#46296B] hover:bg-[#46296B]/90 text-white"
        size="lg"
        disabled={!stripe || isLoading}
      >
        {isLoading ? 'Processing...' : 'Start Free Trial'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By starting your trial, you agree to our Terms of Service and Privacy Policy.
        Your card will not be charged during the trial period.
      </p>
    </form>
  );
} 