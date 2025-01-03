"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

interface SignUpFormProps {
  signUpAction: (formData: FormData) => Promise<{ error?: string; success?: boolean; message?: string }>;
  message?: string;
}

export function SignUpForm({ signUpAction, message }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ error?: string; message?: string }>();
  const isValid = email.length > 0 && email.includes("@");

  const handleSubmit = async (formData: FormData) => {
    const result = await signUpAction(formData);
    setStatus(result);
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
          Email
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
        className={`w-full bg-[#46296B] hover:bg-[#46296B]/90 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        effect="shineHover"
        pendingText="Sending Magic Link..."
        disabled={!isValid}
      >
        Send Magic Link
      </SubmitButton>

      {(status?.message || status?.error || message) && (
        <p className={`text-sm text-center ${status?.error ? 'text-red-500' : 'text-muted-foreground'}`}>
          {status?.error || status?.message || message}
        </p>
      )}

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-sky-500 hover:text-sky-700 font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
} 