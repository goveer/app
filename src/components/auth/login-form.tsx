"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

interface LoginFormProps {
  signInAction: (formData: FormData) => Promise<void>;
  message?: string;
}

export function LoginForm({ signInAction, message }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const isEmailValid = email.length > 0 && email.includes("@");

  return (
    <form className="space-y-4">
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
        formAction={signInAction}
        className={`w-full bg-[#46296B] hover:bg-[#46296B]/90 ${!isEmailValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        effect="shineHover"
        pendingText="Sending Magic Link..."
        disabled={!isEmailValid}
      >
        Send Magic Link
      </SubmitButton>

      {message && (
        <p className="text-sm text-center text-muted-foreground">
          {message}
        </p>
      )}
    </form>
  );
} 