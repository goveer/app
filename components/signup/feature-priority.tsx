import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { StepProgress } from "../ui/step-progress"
import { CalendarIcon, BarChart3Icon, ArrowRightLeft } from "lucide-react"

interface FeaturePriorityProps {
  onNext: (priority: string) => void
  onBack: () => void
}

export function FeaturePriority({ onNext, onBack }: FeaturePriorityProps) {
  const [selectedPriority, setSelectedPriority] = React.useState<string>("")

  const priorities = [
    {
      id: "instant-schedules",
      title: "Instant schedules",
      description: "Help me do this with one click!",
      icon: <CalendarIcon className="h-5 w-5" />
    },
    {
      id: "optimized-routing",
      title: "Optimized routing",
      description: "I spend too much time on the road.",
      icon: <ArrowRightLeft className="h-5 w-5" />
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "I want to see my performance over time.",
      icon: <BarChart3Icon className="h-5 w-5" />
    }
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      <StepProgress currentStep={3} totalSteps={4} className="mb-8" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What can Veer help you the most with?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedPriority}
            onValueChange={setSelectedPriority}
            className="grid gap-4"
          >
            {priorities.map((priority) => (
              <RadioGroupItem
                key={priority.id}
                value={priority.id}
                id={priority.id}
                description={priority.description}
                icon={priority.icon}
              >
                {priority.title}
              </RadioGroupItem>
            ))}
          </RadioGroup>
          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              size="lg"
              onClick={() => onNext(selectedPriority)}
              disabled={!selectedPriority}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
