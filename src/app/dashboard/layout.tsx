import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClientLayout } from "@/components/dashboard/dashboard-client-layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  
  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}


