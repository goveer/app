import { Suspense } from "react"
import StatsCard from "@/components/dashboard/stats-card"
import StatsContainer from "@/components/dashboard/stats-container"
import AlertCard from "@/components/dashboard/alert-card"
import AppointmentsList from "@/components/dashboard/appointments-list"
import MetricsCard from "@/components/dashboard/metrics-card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Car, 
  BriefcaseMedical, 
  Route,
  CalendarX2,
  CalendarArrowUp,
  CircleDollarSign,
  CalendarCheck2
} from 'lucide-react'
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

export const metadata = {
  title: 'Dashboard',
  description: 'Manage your schedule and routes'
}

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto mr-4">
          <Button className="bg-[#46296B]">
            <Calendar className="mr-2 h-4 w-4" />
            Generate Schedule
          </Button>
        </div>
      </header>
      
      <div className="flex-1 space-y-8 px-4 sm:px-8 pt-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-[#46296B]">Welcome, Michelle!</h1>
        </div>

        <StatsContainer>
          <StatsCard
            title="Patients Scheduled"
            value={12}
            change={{ value: 16, label: "from last week" }}
            icon={<BriefcaseMedical className="h-6 w-6" />}
          />
          <StatsCard
            title="New Clients"
            value={4}
            change={{ value: 8, label: "from last week" }}
            icon={<Users className="h-6 w-6" />}
          />
          <StatsCard
            title="Total Travel Time"
            value="5h 30m"
            change={{ value: -11, label: "from last week" }}
            icon={<Route className="h-6 w-6" />}
          />
          <StatsCard
            title="Unconfirmed Appts"
            value={3}
            change={{ value: 5, label: "from last week" }}
            icon={<AlertCircle className="h-6 w-6" />}
            titleColor="text-red-500"
          />
        </StatsContainer>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <AlertCard
            icon={<CalendarX2 className="h-6 w-6" />}
            title="Clients at limit"
            description="4 clients are at their visit limit"
          />
          <AlertCard
            icon={<CalendarArrowUp className="h-6 w-6" />}
            title="Reschedule"
            description="2 clients require immediate reschedule"
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <MetricsCard
              title="Travel time savings"
              value="+15%"
              subtext="Compared to last week"
              icon={<CircleDollarSign className="h-6 w-6" />}
              valueClassName="text-green-500"
            />
            <MetricsCard
              title="Total miles"
              value="48.3"
              subtext="+18% Compared to last week"
              icon={<Car className="h-6 w-6" />}
              valueClassName="text-[#46296B]"
            />
            <MetricsCard
              title="Schedule completion"
              value="93%"
              subtext="Compared to last week"
              icon={<CalendarCheck2 className="h-6 w-6" />}
              valueClassName="text-blue-500"
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
