"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

interface LoginFormProps {
  signInAction: (formData: FormData) => Promise<{
    error?: string;
    success?: boolean;
    message?: string;
    redirectTo?: string;
  }>;
  message?: string;
}

export function LoginForm({ signInAction, message }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    error?: string;
    message?: string;
    redirectTo?: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEmailValid = email.length > 0 && email.includes("@");

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      const result = await signInAction(formData);
      
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }
      
      setStatus(result);
    } catch (error: any) {
      setStatus({
        error: error?.message || "An unexpected error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
          Enter your email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <SubmitButton
        formAction={async (prevState: any, formData: FormData) => handleSubmit(formData)}
        className={`w-full bg-[#46296B] hover:bg-[#46296B]/90 ${!isEmailValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        effect="shineHover"
        pendingText="Sending Magic Link..."
        disabled={!isEmailValid || isSubmitting}
      >
        Send Magic Link
      </SubmitButton>

      {(status?.message || status?.error || message) && (
        <p 
          className={`text-sm text-center ${
            status?.error ? 'text-red-500' : 'text-emerald-600'
          }`}
        >
          {status?.error || status?.message || message}
        </p>
      )}

      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/signup" className="text-sky-500 hover:text-sky-700 font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
} 