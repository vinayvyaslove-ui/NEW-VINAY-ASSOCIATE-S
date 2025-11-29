import dynamic from 'next/dynamic'
import Link from 'next/link'

const InvoiceUploader = dynamic(
  () => import('../components/InvoiceUploader'),
  { ssr: false }
)

export default function InvoicesPage() {
  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-semibold mb-4">Invoices</h2>

      <InvoiceUploader />

      <div className="mt-6">
        <Link href="/invoices/list">
          <a className="text-blue-600">View invoice list (stub)</a>
        </Link>
      </div>
    </main>
  )
}
