import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface AlertCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function AlertCard({ icon, title, description }: AlertCardProps) {
  return (
    <Alert className="border border-border bg-background">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
          {icon}
          <div>
            <AlertTitle className="text-lg font-semibold leading-7">{title}</AlertTitle>
            <AlertDescription className="text-sm font-normal leading-6">{description}</AlertDescription>
          </div>
        </div>
        <Button 
          variant="secondary" 
          className="bg-[#F5F3FF] text-[#2E1065] hover:bg-[#EDE9FE]"
        >
          <span className="text-sm font-medium leading-6">Show me</span>
        </Button>
      </div>
    </Alert>
  )
}

