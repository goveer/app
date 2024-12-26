import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"
import { StepProgress } from "../ui/step-progress"

interface RoleSelectionProps {
  onNext: (role: string) => void
}

export function RoleSelection({ onNext }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = React.useState<string>("")

  const roles = [
    {
      id: "occupational-therapist",
      title: "Occupational Therapist",
    },
    {
      id: "physical-therapist",
      title: "Physical Therapist",
    },
    {
      id: "respiratory-therapist",
      title: "Respiratory Therapist",
    },
    {
      id: "medical-assistant",
      title: "Medical Assistant",
    },
    {
      id: "nurse",
      title: "Nurse",
    },
    {
      id: "social-worker",
      title: "Social Worker",
    },
    {
      id: "caregiver",
      title: "Caregiver",
    },
    {
      id: "hospice",
      title: "Hospice",
    },
    {
      id: "other",
      title: "Other",
    },
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto px-4">
      <StepProgress currentStep={1} totalSteps={4} className="mb-8" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is your primary role?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {roles.map((role) => (
              <RadioGroupItem
                key={role.id}
                value={role.id}
                id={role.id}
              >
                {role.title}
              </RadioGroupItem>
            ))}
          </RadioGroup>
          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              onClick={() => onNext(selectedRole)}
              disabled={!selectedRole}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
