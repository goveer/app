"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, CalendarRange, Route, LineChart, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  items: {
    id: string;
    title: string;
    description: string;
    property: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    workType?: string;
  }[];
}

const steps: FormStep[] = [
  {
    id: 'work-type',
    title: 'Will you be working solo or with your team?',
    items: [
      {
        id: 'individual',
        title: 'Individual',
        description: "It's just me, myself, and I!",
        property: 'workType',
        value: 'individual'
      },
      {
        id: 'team',
        title: 'Team',
        description: 'My crew will be joining me on this adventure.',
        property: 'workType',
        value: 'team'
      }
    ]
  },
  {
    id: 'role',
    title: 'What is your primary role?',
    items: [
      {
        id: 'occupational',
        title: 'Occupational Therapist',
        description: '',
        property: 'role',
        value: 'occupational_therapist'
      },
      {
        id: 'physical',
        title: 'Physical Therapist',
        description: '',
        property: 'role',
        value: 'physical_therapist'
      },
      {
        id: 'respiratory',
        title: 'Respiratory Therapist',
        description: '',
        property: 'role',
        value: 'respiratory_therapist'
      },
      {
        id: 'medical',
        title: 'Medical Assistant',
        description: '',
        property: 'role',
        value: 'medical_assistant'
      },
      {
        id: 'nurse',
        title: 'Nurse',
        description: '',
        property: 'role',
        value: 'nurse'
      },
      {
        id: 'social',
        title: 'Social Worker',
        description: '',
        property: 'role',
        value: 'social_worker'
      },
      {
        id: 'caregiver',
        title: 'Caregiver',
        description: '',
        property: 'role',
        value: 'caregiver'
      },
      {
        id: 'hospice',
        title: 'Hospice',
        description: '',
        property: 'role',
        value: 'hospice'
      },
      {
        id: 'other',
        title: 'Other',
        description: '',
        property: 'role',
        value: 'other'
      }
    ]
  },
  {
    id: 'scheduling',
    title: 'How do you currently do your scheduling?',
    description: "We'll use this to help import your current schedule.",
    items: [
      {
        id: 'paper',
        title: 'Paper',
        description: '',
        property: 'scheduling',
        value: 'paper'
      },
      {
        id: 'spreadsheets',
        title: 'Spreadsheets',
        description: '',
        property: 'scheduling',
        value: 'spreadsheets'
      },
      {
        id: 'google',
        title: 'Google Calendar',
        description: '',
        property: 'scheduling',
        value: 'google_calendar'
      },
      {
        id: 'teams',
        title: 'Teams',
        description: '',
        property: 'scheduling',
        value: 'teams'
      },
      {
        id: 'apple',
        title: 'Apple Calendar',
        description: '',
        property: 'scheduling',
        value: 'apple_calendar'
      },
      {
        id: 'outlook',
        title: 'Outlook',
        description: '',
        property: 'scheduling',
        value: 'outlook'
      },
      {
        id: 'emr',
        title: 'EMR System',
        description: '',
        property: 'scheduling',
        value: 'emr'
      },
      {
        id: 'scheduling-center',
        title: 'Scheduling Center',
        description: '',
        property: 'scheduling',
        value: 'scheduling_center'
      },
      {
        id: 'other',
        title: 'Other',
        description: '',
        property: 'scheduling',
        value: 'other'
      }
    ]
  },
  {
    id: 'priorities',
    title: 'What can Veer help you the most with?',
    items: [
      {
        id: 'instant-schedules',
        title: 'Instant schedules',
        description: 'Help me do this with one click!',
        property: 'priority',
        value: 'scheduling',
        icon: CalendarRange
      },
      {
        id: 'optimized-routing',
        title: 'Optimized routing',
        description: 'I spend too much time on the road.',
        property: 'priority',
        value: 'routing',
        icon: Route
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'I want to see my performance over time.',
        property: 'priority',
        value: 'analytics',
        icon: LineChart
      }
    ]
  },
  {
    id: 'payment',
    title: 'Choose your subscription plan',
    description: 'Start with a 14-day free trial. No credit card required.',
    items: [
      {
        id: 'annual-team',
        title: 'Teams (Annual)',
        description: '14-day free trial, then $99/month, billed annually',
        property: 'plan',
        value: 'team_annual',
        icon: ChevronRight,
        workType: 'team'
      },
      {
        id: 'monthly-team',
        title: 'Teams (Monthly)',
        description: '14-day free trial, then $129/month',
        property: 'plan',
        value: 'team_monthly',
        icon: ChevronRight,
        workType: 'team'
      },
      {
        id: 'annual-individual',
        title: 'Single (Annual)',
        description: '14-day free trial, then $29/month, billed annually',
        property: 'plan',
        value: 'individual_annual',
        icon: ChevronRight,
        workType: 'individual'
      },
      {
        id: 'monthly-individual',
        title: 'Single (Monthly)',
        description: '14-day free trial, then $39/month',
        property: 'plan',
        value: 'individual_monthly',
        icon: ChevronRight,
        workType: 'individual'
      }
    ]
  }
];

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="grid grid-cols-5 gap-4 w-full mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 rounded-full transition-all w-full",
            index <= currentStep ? "bg-[#46296B]" : "bg-[#46296B]/20"
          )}
        />
      ))}
    </div>
  );
}

export function MultiStepForm({ 
  completeAction 
}: { 
  completeAction: (formData: FormData) => Promise<void> 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const router = useRouter();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelection = async (item: FormStep['items'][0]) => {
    setFormData(prev => ({
      ...prev,
      [item.property]: item.value
    }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // If it's the payment step, redirect to checkout with plan
      if (item.property === 'plan') {
        router.push(`/onboarding/checkout?plan=${item.value}`);
        return;
      }
      
      // Otherwise proceed with the normal completion
      if (completeAction) {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });
        formDataObj.append(item.property, item.value);
        await completeAction(formDataObj);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col h-[600px]">
      <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
      <motion.div
        key={currentStep}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <div className="h-full flex flex-col">
          <h2 className="text-2xl font-semibold text-[#46296B] pt-24 pb-12">
            {steps[currentStep].title}
            {steps[currentStep].description && (
              <p className="text-base font-normal text-muted-foreground mt-2">
                {steps[currentStep].description}
              </p>
            )}
          </h2>
          <div className={cn(
            currentStep === 3 ? "grid grid-cols-1 gap-4" : 
            currentStep === steps.length - 1 ? "grid grid-cols-1 gap-4" :
            currentStep > 0 ? "grid grid-cols-3 gap-4" : 
            "flex flex-col gap-[16px]"
          )}>
            {steps[currentStep].items
              .filter(item => {
                // Only show plans matching the selected workType
                if (currentStep === steps.length - 1) {
                  return item.workType === formData.workType;
                }
                return true;
              })
              .map((item) => (
                <Card 
                  key={item.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all",
                    currentStep === 0 ? "hover:translate-x-4 h-[100px] hover:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.10),0px_2px_4px_-2px_rgba(0,0,0,0.10)]" : "",
                    currentStep === steps.length - 1 ? "hover:bg-[#F5F3FF] group p-6" : "",
                    formData[item.property] === item.value ? "bg-[#F5F3FF]" : "",
                    currentStep === 3 ? "hover:bg-[#F5F3FF] group" : 
                    currentStep > 0 && currentStep < steps.length - 1 ? "hover:bg-[#F5F3FF] group min-h-[80px] flex items-center justify-center" : ""
                  )}
                  onClick={() => handleSelection(item)}
                >
                  {currentStep === steps.length - 1 ? (
                    <div className="flex flex-col gap-2">
                      <h3 className={cn(
                        "text-xl font-semibold",
                        formData[item.property] === item.value ? "text-[#46296B]" : "",
                        "group-hover:text-[#46296B]"
                      )}>{item.title}</h3>
                      <p className={cn(
                        "text-base",
                        formData[item.property] === item.value ? "text-[#46296B]" : "text-muted-foreground",
                        "group-hover:text-[#46296B]"
                      )}>{item.description}</p>
                    </div>
                  ) : currentStep === 0 ? (
                    <div className="flex items-center justify-between h-full">
                      <div>
                        <h3 className={cn(
                          "text-lg font-medium mb-1",
                          formData[item.property] === item.value ? "text-[#46296B]" : ""
                        )}>{item.title}</h3>
                        <p className={cn(
                          "text-sm",
                          formData[item.property] === item.value ? "text-[#46296B]" : "text-muted-foreground"
                        )}>{item.description}</p>
                      </div>
                      <ChevronRight className={cn(
                        "h-7 w-7 transition-colors",
                        formData[item.property] === item.value ? "text-[#46296B]" : "text-muted-foreground",
                        "group-hover:text-[#46296B]"
                      )} />
                    </div>
                  ) : currentStep === 3 ? (
                    <div className="flex items-start gap-4">
                      {item.icon && (
                        <item.icon className={cn(
                          "h-6 w-6 mt-1",
                          formData[item.property] === item.value ? "text-[#46296B]" : "text-muted-foreground",
                          "group-hover:text-muted-foreground"
                        )} />
                      )}
                      <div className="flex flex-col items-start text-left">
                        <h3 className={cn(
                          "text-lg font-medium",
                          formData[item.property] === item.value ? "text-[#46296B]" : "",
                          "group-hover:text-muted-foreground"
                        )}>{item.title}</h3>
                        <p className={cn(
                          "text-sm",
                          formData[item.property] === item.value ? "text-[#46296B]" : "text-muted-foreground",
                          "group-hover:text-muted-foreground"
                        )}>{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <h3 className={cn(
                        "text-lg font-medium",
                        formData[item.property] === item.value ? "text-[#46296B]" : "",
                        "group-hover:text-[#46296B]"
                      )}>{item.title}</h3>
                    </div>
                  )}
                </Card>
              ))}
          </div>
          {currentStep > 0 && (
            <div className="mt-16">
              <Button
                variant="default"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="bg-[#46296B] hover:bg-[#46296B]/90 w-[calc(33.333%-0.5rem)]"
                icon={ArrowLeft}
                iconPlacement="left"
                effect="expandIcon"
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 