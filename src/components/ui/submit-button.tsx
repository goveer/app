"use client";

import { useFormState, useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "./alert";
import { AlertTriangle } from "lucide-react";

type ButtonProps = ComponentProps<typeof Button>;

interface SubmitButtonProps extends Omit<ButtonProps, 'formAction' | 'icon' | 'iconPlacement'> {
  pendingText?: string;
  formAction: (prevState: any, formData: FormData) => Promise<any>;
  errorMessage?: string;
}

const initialState = {
  message: "",
};

export function SubmitButton({ 
  children, 
  formAction, 
  errorMessage, 
  pendingText = "Submitting...", 
  ...props 
}: SubmitButtonProps) {
  const { pending, action } = useFormStatus();
  const [state, internalFormAction] = useFormState(formAction, initialState);

  const isPending = pending && action === internalFormAction;

  const buttonProps = {
    ...props,
    type: "submit" as const,
    disabled: pending,
    formAction: internalFormAction,
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {Boolean(errorMessage || state?.message) && (
        <Alert variant="destructive" className="w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {errorMessage || state?.message}
          </AlertDescription>
        </Alert>
      )}
      <div>
        <Button {...buttonProps}>
          {isPending ? pendingText : children}
        </Button>
      </div>
    </div>
  );
}
