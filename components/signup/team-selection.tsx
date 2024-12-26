import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { StepProgress } from "../ui/step-progress"
import { UserIcon, Users } from "lucide-react"

interface TeamSelectionProps {
  onNext: (teamType: string) => void
  onBack: () => void
}

export function TeamSelection({ onNext, onBack }: TeamSelectionProps) {
  const [selectedType, setSelectedType] = React.useState<string>("")

  const types = [
    {
      id: "individual",
      title: "Individual",
      description: "It's just me, myself, and I!",
      icon: <UserIcon className="h-5 w-5" />
    },
    {
      id: "team",
      title: "Team in the future",
      description: "My crew will be joining me on this adventure as you grow.",
      icon: <Users className="h-5 w-5" />
    }
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      <StepProgress currentStep={4} totalSteps={4} className="mb-8" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Will you be working solo or with your team?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedType}
            onValueChange={setSelectedType}
            className="grid gap-4"
          >
            {types.map((type) => (
              <RadioGroupItem
                key={type.id}
                value={type.id}
                id={type.id}
                description={type.description}
                icon={type.icon}
              >
                {type.title}
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
              onClick={() => onNext(selectedType)}
              disabled={!selectedType}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
