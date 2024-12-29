import { Card } from "@/components/ui/card"

interface StatsContainerProps {
  children: React.ReactNode
}

export default function StatsContainer({ children }: StatsContainerProps) {
  return (
    <Card>
      <div className="flex divide-x px-8 py-6">
        {children}
      </div>
    </Card>
  )
}

