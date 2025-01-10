"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

interface SignUpFormProps {
  signUpAction: (formData: FormData) => Promise<{
    error?: string;
    success?: boolean;
    message?: string;
    redirectTo?: string;
  }>;
  message?: string;
}

export function SignUpForm({ signUpAction, message }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<{
    error?: string;
    message?: string;
    redirectTo?: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isValid = email.length > 0 && email.includes("@") && firstName.length > 0 && lastName.length > 0;

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      formData.append("createdAt", new Date().toISOString());
      const result = await signUpAction(formData);
      
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2e1065]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="firstName">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2e1065]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lastName">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2e1065]/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
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
          className="h-11"
        />
      </div>

      <SubmitButton
        formAction={async (prevState: any, formData: FormData) => handleSubmit(formData)}
        className={`w-full bg-[#2e1065] hover:bg-[#2e1065]/90 h-11 ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        effect="shineHover"
        pendingText="Sending Magic Link..."
        disabled={!isValid || isSubmitting}
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
    </form>
  );
} 