import { cn } from "@/lib/utils";

interface OnboardingStepperProps {
  currentStep: number;
  steps: string[];
}

export function OnboardingStepper({ currentStep, steps }: OnboardingStepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-muted">
          <div 
            className="h-full bg-[#2E1065] transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > index + 1;
            const isCurrent = currentStep === index + 1;

            return (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ease-in-out",
                    "border-2",
                    isCompleted && "bg-[#2E1065] border-[#2E1065] text-white",
                    isCurrent && "border-[#2E1065] text-[#2E1065]",
                    !isCompleted && !isCurrent && "border-muted text-muted-foreground bg-background"
                  )}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span 
                  className={cn(
                    "mt-2 text-xs font-medium transition-colors duration-300 ease-in-out",
                    (isCompleted || isCurrent) ? "text-[#2E1065]" : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 