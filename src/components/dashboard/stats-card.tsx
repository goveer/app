import React from 'react';
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change: {
    value: number
    label: string
  }
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change.value > 0

  return (
    <div className="flex-1 px-8 first:pl-0 last:pr-0 py-4">
      <div className="flex items-center justify-between space-y-0">
        <p className="text-[#2E1065] font-ibm-sans text-base font-semibold leading-none">{title}</p>
        {icon && <div className="text-[#2E1065]">{React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 stroke-[1.5]' })}</div>}
      </div>
      <div className="mt-3">
        <p className="text-3xl font-bold font-ibm-mono">{value}</p>
        <p className={cn(
          "text-xs font-ibm-sans text-[#64748B] font-normal",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? "+" : ""}{change.value}% {change.label}
        </p>
      </div>
    </div>
  )
}

