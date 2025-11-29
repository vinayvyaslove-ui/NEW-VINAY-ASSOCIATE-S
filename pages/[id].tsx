import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function ClientDetail() {
  const router = useRouter()
  const { id } = router.query
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
      setClient(data)
    }
    load()
  }, [id])

  if (!client) return <div className="p-8">Loading...</div>

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Client: {client.full_name || client.id}</h2>
        <p className="text-sm text-gray-600 mb-4">Email: {client.email}</p>
        <h3 className="font-semibold mb-2">Invoices</h3>
        <p className="text-sm text-gray-600">Invoice list for this client (implement pagination and filters).</p>
      </div>
    </main>
  )
}
