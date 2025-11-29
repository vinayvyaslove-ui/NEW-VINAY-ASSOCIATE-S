import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST body should contain parsed transactions and bank statement rows.
  // Implement matching logic here: match by date+amount, fuzzy vendor, or reference.
  res.status(200).json({ ok: true, message: 'Reconciliation endpoint (stub). Implement matching logic.)' })
}
