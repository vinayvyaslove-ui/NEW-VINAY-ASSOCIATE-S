import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AccountantDashboard() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')

      if (!error) setClients(data || [])
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>

      {clients.map((c) => (
        <div key={c.id} className="border p-2 my-2">
          <Link href={`/${c.id}`}>
            <a className="text-blue-600">{c.full_name || 'Unnamed Client'}</a>
          </Link>
        </div>
      ))}
    </main>
  )
}
