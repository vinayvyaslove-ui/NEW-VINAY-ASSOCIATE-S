import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AccountantDashboard() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      // Example: fetch profiles with role=client
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'client')
      if (error) {
        console.error(error)
      } else {
        setClients(data || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accountant Dashboard</h1>
        <Link href="/accountant"><a className="px-3 py-1 bg-indigo-600 text-white rounded">Accountant Home</a></Link>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Clients</h3>
          {loading ? <p>Loading...</p> : (
            <ul className="space-y-2">
              {clients.map(c => (
                <li key={c.id} className="border p-2 rounded">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{c.full_name || c.id}</div>
                      <div className="text-sm text-gray-600">{c.email}</div>
                    </div>
                    <div>
                      <Link href={`/accountant/client/${c.id}`}><a className="text-blue-600">View</a></Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/invoices/new"><a className="block px-3 py-2 bg-green-600 text-white rounded">Create Invoice</a></Link>
            <Link href="/invoices"><a className="block px-3 py-2 bg-blue-600 text-white rounded">Invoice List</a></Link>
            <Link href="/api/reconcile"><a className="block px-3 py-2 bg-yellow-500 text-white rounded">Reconcile</a></Link>
          </div>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Activity</h3>
          <p className="text-sm text-gray-600">Recent activity and reconciliation tasks will appear here (stub).</p>
        </div>
      </section>
    </main>
  )
}
