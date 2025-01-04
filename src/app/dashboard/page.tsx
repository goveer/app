import { Suspense } from "react"
import StatsCard from "@/components/dashboard/stats-card"
import StatsContainer from "@/components/dashboard/stats-container"
import AlertCard from "@/components/dashboard/alert-card"
import AppointmentsList from "@/components/dashboard/appointments-list"
import MetricsCard from "@/components/dashboard/metrics-card"
import { Button } from "@/components/ui/button"
import { Users, Clock, AlertCircle, Calendar, DollarSign, Car, CalendarCheck } from 'lucide-react'
import { 
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { CalendarX2, CalendarIcon as CalendarArrowUp } from 'lucide-react'
import { Briefcase, Map, Route, CalendarX } from 'lucide-react'

const mockAppointments = [
  {
    id: "1",
    patientName: "Olivia Martin",
    email: "olivia.martin@email.com",
    time: "8:30 AM",
    type: "CN"
  },
  {
    id: "2",
    patientName: "Jackson Lee",
    email: "jackson.lee@email.com",
    time: "8:30 AM",
    type: "CN",
    isUrgent: true
  },
  {
    id: "3",
    patientName: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    time: "8:30 AM",
    type: "CN"
  },
  {
    id: "4",
    patientName: "William Kim",
    email: "will@email.com",
    time: "8:30 AM",
    type: "CN"
  },
  {
    id: "5",
    patientName: "Sofia Davis",
    email: "sofia.davis@email.com",
    time: "8:30 AM",
    type: "CN"
  },
  {
    id: "6",
    patientName: "Sofia Davis",
    email: "sofia.davis@email.com",
    time: "8:30 AM",
    type: "CN"
  }
]

const TravelTimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M22 10H13C12.2044 10 11.4413 10.3161 10.8787 10.8787C10.3161 11.4413 10 12.2044 10 13C10 13.7956 10.3161 14.5587 10.8787 15.1213C11.4413 15.6839 12.2044 16 13 16H19C19.7956 16 20.5587 16.3161 21.1213 16.8787C21.6839 17.4413 22 18.2044 22 19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22H10M16 25V7M31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16Z" stroke="#2E1065" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#E2E8F0] px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button className="bg-[#46296B] font-ibm-sans">
            <Calendar className="mr-2 h-4 w-4" />
            Generate Schedule
          </Button>
        </div>
      </header>
      
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div>
          <h2 className="text-lg font-semibold text-[#2E1065] mb-[13px] font-ibm-sans">Today's Schedule Summary</h2>
          <h1 className="text-3xl font-bold text-[#46296B] font-ibm-sans">Welcome, Michelle!</h1>
        </div>

        <StatsContainer>
          <StatsCard
            title="Patients Scheduled"
            value={12}
            change={{ value: 16, label: "from last week" }}
            icon={<Briefcase className="h-5 w-5 stroke-[1.5]" />}
          />
          <StatsCard
            title="New Clients"
            value={4}
            change={{ value: 8, label: "from last week" }}
            icon={<Map className="h-5 w-5 stroke-[1.5]" />}
          />
          <StatsCard
            title="Total Travel Time"
            value="5h 30m"
            change={{ value: -11, label: "from last week" }}
            icon={<Route className="h-5 w-5 stroke-[1.5]" />}
          />
          <StatsCard
            title="Unconfirmed Appts"
            value={3}
            change={{ value: 5, label: "from last week" }}
            icon={<CalendarX className="h-5 w-5 stroke-[1.5]" />}
          />
        </StatsContainer>

        <div className="grid gap-4 md:grid-cols-2">
          <AlertCard
            icon={<CalendarX2 className="h-4 w-4" />}
            title="Clients at limit"
            description="4 clients are at their visit limit"
          />
          <AlertCard
            icon={<CalendarArrowUp className="h-4 w-4" />}
            title="Reschedule"
            description="2 clients require immediate reschedule"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <MetricsCard
              title="Travel time savings"
              value="+15%"
              subtext="Compared to last week"
              icon={<TravelTimeIcon />}
              valueClassName="text-[#16A34A]"
            />
            <MetricsCard
              title="Total miles"
              value="48.3"
              subtext="+18% Compared to last week"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M28.5 25.5H31.5C32.4 25.5 33 24.9 33 24V19.5C33 18.15 31.95 16.95 30.75 16.65C28.05 15.9 24 15 24 15C24 15 22.05 12.9 20.7 11.55C19.95 10.95 19.05 10.5 18 10.5H7.5C6.6 10.5 5.85 11.1 5.4 11.85L3.3 16.2C3.10137 16.7793 3 17.3876 3 18V24C3 24.9 3.6 25.5 4.5 25.5H7.5M28.5 25.5C28.5 27.1569 27.1569 28.5 25.5 28.5C23.8431 28.5 22.5 27.1569 22.5 25.5M28.5 25.5C28.5 23.8431 27.1569 22.5 25.5 22.5C23.8431 22.5 22.5 23.8431 22.5 25.5M7.5 25.5C7.5 27.1569 8.84315 28.5 10.5 28.5C12.1569 28.5 13.5 27.1569 13.5 25.5M7.5 25.5C7.5 23.8431 8.84315 22.5 10.5 22.5C12.1569 22.5 13.5 23.8431 13.5 25.5M13.5 25.5H22.5" stroke="#2E1065" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              valueClassName="text-[#2E1065]"
            />
            <MetricsCard
              title="Schedule completion"
              value="93%"
              subtext="Compared to last week"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M12 3V9M24 3V9M4.5 15H31.5M13.5 24L16.5 27L22.5 21M7.5 6H28.5C30.1569 6 31.5 7.34315 31.5 9V30C31.5 31.6569 30.1569 33 28.5 33H7.5C5.84315 33 4.5 31.6569 4.5 30V9C4.5 7.34315 5.84315 6 7.5 6Z" stroke="#2E1065" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              valueClassName="text-[#0284C7]"
            />
          </div>
          
          <Suspense fallback={<div>Loading appointments...</div>}>
            <AppointmentsList
              appointments={mockAppointments}
              date="Monday December 16th"
            />
          </Suspense>
        </div>
      </div>
    </SidebarInset>
  )
}
