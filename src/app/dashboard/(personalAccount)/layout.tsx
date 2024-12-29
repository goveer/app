import { getPersonalAccount } from "@/lib/accounts/get-personal-account"
import { redirect } from "next/navigation"

export default async function PersonalAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: personalAccount, error } = await getPersonalAccount()

  if (error || !personalAccount) {
    redirect('/login')
  }

  return (
    <div className="w-full">
      {children}
    </div>
  )
}