"use client";

import { Inter } from 'next/font/google'
import "@/app/globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardSplash } from "@/components/dashboard/dashboard-splash"
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] })

function DashboardContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const showSplash = searchParams.get('onboarding') === 'complete';

  return (
    <div className={`flex min-h-screen ${inter.className}`}>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-background">
          {showSplash && <DashboardSplash />}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
} 