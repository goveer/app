import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

interface AlertCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function AlertCard({ icon, title, description }: AlertCardProps) {
  return (
    <Alert className="border-[#E2E8F0]">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
          {icon}
          <div>
            <AlertTitle className="text-[#2E1065] font-sans text-base font-semibold leading-none">{title}</AlertTitle>
            <AlertDescription className="text-[#64748B] font-normal">{description}</AlertDescription>
          </div>
        </div>
        <Button variant="link" className="bg-[#F5F3FF] text-[#2E1065] hover:bg-[#F5F3FF]/90 px-4 py-2">
          Show me
        </Button>
      </div>
    </Alert>
  )
}

