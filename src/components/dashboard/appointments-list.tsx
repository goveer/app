"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'

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
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold leading-7 text-[#46296B]">Upcoming Appointments</CardTitle>
        <p className="text-sm font-normal leading-6 text-muted-foreground">For {date}</p>
      </CardHeader>
      <CardContent className="grid gap-6 flex-grow">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <span className="text-sm font-medium leading-6 text-secondary-foreground">
                  {appointment.type}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium leading-6 ${appointment.isUrgent ? 'text-red-500' : ''}`}>
                    {appointment.patientName}
                  </p>
                  {appointment.isUrgent && <X className="h-4 w-4 text-red-500" />}
                </div>
                <p className="text-sm font-normal leading-6 text-muted-foreground">
                  {appointment.email}
                </p>
              </div>
            </div>
            <p className="text-sm font-normal leading-6 tabular-nums">
              {appointment.time}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

