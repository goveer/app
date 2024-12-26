"use client"

import React from "react"
import { SignupLayout } from "@/components/signup/signup-layout"
import { RoleSelection } from "@/components/signup/role-selection"
import { SchedulingMethod } from "@/components/signup/scheduling-method"
import { FeaturePriority } from "@/components/signup/feature-priority"
import { TeamSelection } from "@/components/signup/team-selection"

export default function SignupPage() {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    role: "",
    schedulingMethod: "",
    featurePriority: "",
    teamType: ""
  })

  const handleNext = (data: string) => {
    switch (step) {
      case 1:
        setFormData(prev => ({ ...prev, role: data }))
        break
      case 2:
        setFormData(prev => ({ ...prev, schedulingMethod: data }))
        break
      case 3:
        setFormData(prev => ({ ...prev, featurePriority: data }))
        break
      case 4:
        setFormData(prev => ({ ...prev, teamType: data }))
        // Here we would typically redirect to auth flow
        window.location.href = "/signup/auth"
        return
    }
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  return (
    <SignupLayout>
      {step === 1 && (
        <RoleSelection onNext={handleNext} />
      )}
      {step === 2 && (
        <SchedulingMethod 
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <FeaturePriority
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <TeamSelection
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </SignupLayout>
  )
}