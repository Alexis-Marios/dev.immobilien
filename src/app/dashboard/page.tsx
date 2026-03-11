import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Willkommen, {user.email}</p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
            >
              Abmelden
            </button>
          </form>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-center">App wird gebaut...</p>
        </div>
      </div>
    </div>
  )
}
