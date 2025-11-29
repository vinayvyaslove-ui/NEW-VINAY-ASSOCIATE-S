import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function GstReports() {
  const [summary, setSummary] = useState<any>({ total: 0, gst: 0 })

  useEffect(() => {
    const load = async () => {
      // Fetch invoices and calculate GST summary (stub)
      const { data } = await supabase.from('invoices').select('data')
      let total = 0, gst = 0
      (data || []).forEach((r: any) => {
        const d = r.data || {}
        const amt = parseFloat(d.amount || 0)
        const rate = parseFloat(d.gst_rate || 0)
        total += amt
        gst += (amt * rate) / 100
      })
      setSummary({ total, gst })
    }
    load()
  }, [])

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">GST Summary</h2>
        <div className="space-y-2">
          <div>Total Sales: ₹{summary.total.toFixed(2)}</div>
          <div>Total GST: ₹{summary.gst.toFixed(2)}</div>
        </div>
      </div>
    </main>
  )
}
