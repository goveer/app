import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string
  subtext?: string
  icon: React.ReactNode
  valueClassName?: string
}

export default function MetricsCard({ 
  title, 
  value, 
  subtext, 
  icon,
  valueClassName 
}: MetricsCardProps) {
  return (
    <Card className="flex-1 rounded-[var(--radius)] border-[1px] border-[#E2E8F0] bg-[linear-gradient(86deg,rgba(255,255,255,0.10)_37.12%,rgba(225,29,72,0.05)_68.69%,rgba(40,168,234,0.05)_101.78%)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[#2E1065] font-ibm-sans text-base font-semibold leading-none">
            {title}
          </h3>
          {icon}
        </div>
        <div className="mt-2">
          <p className={cn("font-ibm-mono text-5xl font-semibold leading-none", valueClassName)}>
            {value}
          </p>
          {subtext && (
            <p className="text-sm text-[#64748B] font-ibm-sans font-normal mt-1">{subtext}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

