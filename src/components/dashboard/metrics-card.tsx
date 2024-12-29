import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string
  subtext?: string
  icon?: React.ReactNode
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
    <Card className="flex-1 border-[1px] border-border" style={{
      background: "linear-gradient(86deg, rgba(255, 255, 255, 0.10) 37.12%, rgba(225, 29, 72, 0.05) 68.69%, rgba(40, 168, 234, 0.05) 101.78%), #FFF"
    }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-7 text-[#46296B]">{title}</h3>
          {icon}
        </div>
        <div className="mt-2">
          <p className={cn("text-2xl font-semibold tracking-tight", valueClassName)}>{value}</p>
          {subtext && (
            <p className="text-sm font-normal leading-6 text-muted-foreground">{subtext}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

