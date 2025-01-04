"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"

const OctagonXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 9L9 15M9 9L15 15M2.586 16.726C2.2109 16.351 2.00011 15.8424 2 15.312V8.688C2.00011 8.15761 2.2109 7.64899 2.586 7.274L7.274 2.586C7.64899 2.2109 8.15761 2.00011 8.688 2H15.312C15.8424 2.00011 16.351 2.2109 16.726 2.586L21.414 7.274C21.7891 7.64899 21.9999 8.15761 22 8.688V15.312C21.9999 15.8424 21.7891 16.351 21.414 16.726L16.726 21.414C16.351 21.7891 15.8424 21.9999 15.312 22H8.688C8.15761 21.9999 7.64899 21.7891 7.274 21.414L2.586 16.726Z" stroke="#E11D48" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

interface Appointment {
  id: string
  patientName: string
  email: string
  time: string
  type: string
  isUrgent?: boolean
}

interface AppointmentsListProps {
  appointments: Appointment[]
  date: string
}

export default function AppointmentsList({ appointments, date }: AppointmentsListProps) {
  const isCanceled = (name: string) => name === "Jackson Lee"

  return (
    <Card className="flex flex-col h-full border-[#E2E8F0]">
      <CardHeader className="pb-4">
        <CardTitle className="text-[#2E1065] font-sans text-base font-semibold leading-none mb-1">Upcoming Appointments</CardTitle>
        <p className="text-sm text-[#64748B] font-normal">For {date}</p>
      </CardHeader>
      <CardContent className="grid gap-6 flex-grow">
        {appointments.map((appointment) => {
          const canceled = isCanceled(appointment.patientName)
          return (
            <div key={appointment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  canceled ? "bg-[#FFF1F2]" : "bg-[#F1F5F9]"
                )}>
                  <span className="text-sm font-medium">
                    {appointment.type}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${canceled ? 'text-[#E11D48]' : ''}`}>
                      {appointment.patientName}
                    </p>
                    {canceled && (
                      <div className="text-[#E11D48]">
                        <X className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] font-normal">
                    {appointment.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {canceled && (
                  <OctagonXIcon />
                )}
                <p className={`tabular-nums text-sm ${canceled ? 'text-[#E11D48]' : ''}`}>
                  {appointment.time}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

