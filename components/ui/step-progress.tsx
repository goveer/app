import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function StepProgress({ currentStep, totalSteps, className }: StepProgressProps) {
  return (
    <div className={cn("step-progress", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <div
              className={cn(
                "step-progress-bar",
                index <= currentStep - 1 && "step-progress-bar-active"
              )}
            />
          )}
          <div
            className={cn(
              "step-progress-dot",
              index <= currentStep - 1 && "step-progress-dot-active"
            )}
          />
        </div>
      ))}
    </div>
  )
}
