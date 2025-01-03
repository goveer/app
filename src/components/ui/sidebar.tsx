import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserCog, Calendar, ChevronRight } from 'lucide-react'
import Link from "next/link"
import { Button } from "./button"
import { createContext, useContext, ReactNode, useState } from "react"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {}
})

export function SidebarProvider({ children, defaultOpen = false }: { children: ReactNode; defaultOpen?: boolean }) {
  const [collapsed, setCollapsed] = useState(!defaultOpen)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-16 items-center border-b px-6">
      {children}
    </div>
  )
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 p-4">{children}</div>
}

export function SidebarGroup({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

export function SidebarGroupLabel({ children }: { children: ReactNode }) {
  return <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">{children}</div>
}

export function SidebarGroupContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenu({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

interface SidebarMenuItemProps {
  href: string;
  icon?: any;
  children: ReactNode;
  className?: string;
}

export function SidebarMenuItem({ href, icon: Icon, children, className }: SidebarMenuItemProps) {
  return (
    <Button asChild variant="ghost" className={cn("w-full justify-start gap-2", className)}>
      <Link href={href}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Link>
    </Button>
  )
}

export function SidebarMenuButton({ icon: Icon, children, onClick }: { icon?: any; children: ReactNode; onClick?: () => void }) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-2" onClick={onClick}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </Button>
  )
}

export function SidebarMenuSub({ children, label, icon: Icon }: { children: ReactNode; label: string; icon?: any }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <SidebarMenuSubButton onClick={() => setIsOpen(!isOpen)} icon={Icon}>
        {label}
      </SidebarMenuSubButton>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  )
}

export function SidebarMenuSubButton({ icon: Icon, children, onClick }: { icon?: any; children: ReactNode; onClick?: () => void }) {
  return (
    <Button variant="ghost" className="w-full justify-start gap-2 group" onClick={onClick}>
      {Icon && <Icon className="h-4 w-4" />}
      <span className="flex-1">{children}</span>
      <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
    </Button>
  )
}

export function SidebarMenuSubItem({ href, icon: Icon, children }: { href: string; icon?: any; children: ReactNode }) {
  return (
    <Button asChild variant="ghost" size="sm" className="w-full justify-start gap-2">
      <Link href={href}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Link>
    </Button>
  )
}

export function SidebarRail({ children }: { children: ReactNode }) {
  const { collapsed } = useContext(SidebarContext)
  return (
    <div className={cn(
      "border-r bg-muted/40 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {children}
    </div>
  )
}

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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-muted/40", className)} {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">A</span>
          <span>City East Unit</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title} href={item.href} icon={item.icon}>
                    {item.title}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </div>
  )
}

