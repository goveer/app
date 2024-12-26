import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { StepProgress } from "../ui/step-progress"

interface SchedulingMethodProps {
  onNext: (method: string) => void
  onBack: () => void
}

export function SchedulingMethod({ onNext, onBack }: SchedulingMethodProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<string>("")

  const methods = [
    {
      id: "paper",
      title: "Paper",
      description: "Traditional paper-based scheduling system"
    },
    {
      id: "spreadsheets",
      title: "Spreadsheets",
      description: "Excel or Google Sheets based scheduling"
    },
    {
      id: "google-calendar",
      title: "Google Calendar",
      description: "Google Calendar for scheduling management"
    },
    {
      id: "teams",
      title: "Teams",
      description: "Microsoft Teams calendar and scheduling"
    },
    {
      id: "apple-calendar",
      title: "Apple Calendar",
      description: "Apple Calendar for schedule management"
    },
    {
      id: "outlook",
      title: "Outlook",
      description: "Microsoft Outlook calendar system"
    },
    {
      id: "emr-system",
      title: "EMR System",
      description: "Electronic Medical Record system scheduling"
    },
    {
      id: "scheduling-center",
      title: "Scheduling Center",
      description: "Dedicated scheduling center or software"
    },
    {
      id: "other",
      title: "Other",
      description: "Other scheduling methods"
    }
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      <StepProgress currentStep={2} totalSteps={4} className="mb-8" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How do you currently do your scheduling?</CardTitle>
          <CardDescription>We'll use this to help import your current schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {methods.map((method) => (
              <RadioGroupItem
                key={method.id}
                value={method.id}
                id={method.id}
                description={method.description}
              >
                {method.title}
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
              onClick={() => onNext(selectedMethod)}
              disabled={!selectedMethod}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
