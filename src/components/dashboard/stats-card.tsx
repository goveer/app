import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number | string
  change?: {
    value: number
    label: string
  }
  icon?: React.ReactNode
  titleColor?: string
  valueClassName?: string
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon,
  titleColor,
  valueClassName
}: StatsCardProps) {
  return (
    <div className="flex-1 px-8 first:pl-0 last:pr-0">
      <div className="flex items-center justify-between space-y-0">
        <p className={cn("text-lg font-semibold leading-7 text-[#46296B]", titleColor)}>{title}</p>
        {icon}
      </div>
      <div className="mt-3">
        <p className={cn("text-2xl font-semibold tracking-tight", valueClassName)}>{value}</p>
        {change && (
          <p className={cn("text-sm font-normal leading-6", change.value > 0 ? "text-[#00A36C]" : "text-[#FF0000]")}>
            {change.value > 0 ? "+" : ""}{change.value}% {change.label}
          </p>
        )}
      </div>
    </div>
  )
}

