import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserCog, Calendar } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    title: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard
      }
    ]
  },
  {
    title: "Schedule",
    items: [
      {
        title: "My Schedule",
        href: "/schedule",
        icon: Calendar
      }
    ]
  },
  {
    title: "Care Network",
    items: [
      {
        title: "Providers",
        href: "/providers",
        icon: UserCog
      },
      {
        title: "Clients",
        href: "/clients",
        icon: Users
      }
    ]
  }
]

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">A</span>
          <span>City East Unit</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {navigation.map((group) => (
          <div key={group.title}>
            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
              {group.title}
            </div>
            {group.items.map((item) => (
              <Button
                key={item.title}
                asChild
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

