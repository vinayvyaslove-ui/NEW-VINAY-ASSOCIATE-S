import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useRouter } from 'next/router'

export default function NewInvoice() {
  const [customer, setCustomer] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const submit = async () => {
    setMessage('Saving...')
    const invoice = {
      customer, date, amount: parseFloat(amount || '0'), gst_rate: parseFloat(gstRate || '0')
    }
    const { error } = await supabase.from('invoices').insert([{ data: invoice }])
    if (error) setMessage('Error: ' + error.message)
    else {
      setMessage('Saved')
      router.push('/invoices')
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
        <label className="block mb-2">Customer</label>
        <input className="w-full p-2 border rounded mb-3" value={customer} onChange={e=>setCustomer(e.target.value)} />
        <label className="block mb-2">Date</label>
        <input type="date" className="w-full p-2 border rounded mb-3" value={date} onChange={e=>setDate(e.target.value)} />
        <label className="block mb-2">Amount (₹)</label>
        <input className="w-full p-2 border rounded mb-3" value={amount} onChange={e=>setAmount(e.target.value)} />
        <label className="block mb-2">GST Rate (%)</label>
        <input className="w-full p-2 border rounded mb-3" value={gstRate} onChange={e=>setGstRate(e.target.value)} />
        <div className="flex space-x-2">
          <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </main>
  )
}
