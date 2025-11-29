import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function GstReports() {
  const [summary, setSummary] = useState<any>({ total: 0, gst: 0 })

  useEffect(() => {
    const load = async () => {
      // Fetch invoices
      const { data, error } = await supabase
        .from('invoices')
        .select('data')

      if (error) {
        console.error(error)
        return
      }

      let total: number = 0
      let gst: number = 0

      ;(data || []).forEach((r: any) => {
        const d = r.data || {}
        const amt = parseFloat(d.amount || 0)

        total += amt
        gst += amt * 0.18 // example GST
      })

      setSummary({ total, gst })
    }

    load()
  }, [])

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">GST Report</h2>

      <div className="p-4 border rounded">
        <p>Total Amount: ₹{summary.total}</p>
        <p>GST (18%): ₹{summary.gst}</p>
      </div>
    </main>
  )
}
