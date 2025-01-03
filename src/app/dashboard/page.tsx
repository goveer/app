import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  // SECURITY: Using getUser() instead of getSession() for secure server-side auth
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome Back!</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Signed in as: <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-gray-600">
              Account created: {new Date(user.created_at).toLocaleDateString()}
            </p>
            {user.user_metadata && (
              <div className="text-gray-600">
                <p className="font-medium mb-2">Profile Information:</p>
                <pre className="bg-gray-50 p-3 rounded">
                  {JSON.stringify(user.user_metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
