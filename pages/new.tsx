import { useState } from 'react'
import { supabase } from '../supabaseClient'
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
      customer,
      date,
      amount: parseFloat(amount || '0'),
      gst_rate: parseFloat(gstRate || '0'),
    }

    const { error } = await supabase.from('invoices').insert([{ data: invoice }])

    if (error) setMessage('Error: ' + error.message)
    else setMessage('Invoice saved!')
  }

  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">New Invoice</h2>

      <div className="flex flex-col gap-3 max-w-lg">
        <input className="border p-2" placeholder="Customer"
          value={customer} onChange={(e) => setCustomer(e.target.value)} />

        <input className="border p-2" placeholder="Date"
          value={date} onChange={(e) => setDate(e.target.value)} />

        <input className="border p-2" placeholder="Amount"
          value={amount} onChange={(e) => setAmount(e.target.value)} />

        <input className="border p-2" placeholder="GST Rate"
          value={gstRate} onChange={(e) => setGstRate(e.target.value)} />

        <button className="bg-blue-600 text-white p-2" onClick={submit}>
          Save Invoice
        </button>

        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </main>
  )
}
