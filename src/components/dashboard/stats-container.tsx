import { Card } from "../ui/card"

interface StatsContainerProps {
  children: React.ReactNode
}

export default function StatsContainer({ children }: StatsContainerProps) {
  return (
    <Card className="p-[18px_22px_25px_22px] border-[#E2E8F0]">
      <h2 className="text-[#2E1065] font-sans text-base font-semibold leading-none mb-[13px]">Today's Schedule Summary</h2>
      <div className="flex divide-x divide-[#E2E8F0]">
        {children}
      </div>
    </Card>
  )
}

