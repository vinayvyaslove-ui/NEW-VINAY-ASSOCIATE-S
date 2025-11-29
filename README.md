# GST Accounting & Invoicing (Starter)

This repository is a Next.js + Supabase v2 starter project scaffold for:
- Client invoicing with OCR-based invoice entry (photo upload)
- Bank statement upload (PDF/CSV) for reconciliation
- Accountant access role to manage client records
- Basic GST-aware bookkeeping flows (starter, needs customization)

## Included files
- `pages/auth.tsx` — your uploaded auth page (v2-compatible). Source path: /mnt/data/auth.tsx
- `lib/supabaseClient.ts` — Supabase v2 client (env-driven)
- `pages/` — simple pages: index, invoices, accountant, api endpoints
- `components/InvoiceUploader.tsx` — client-side OCR using Tesseract.js (photo)
- `api/upload.ts` — server-side file upload handler (stub)
- `api/reconcile.ts` — reconciliation logic entrypoint (stub)
- `netlify.toml` — recommended Netlify settings

## Setup (local)
1. Copy `.env.example` to `.env.local` and fill:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, for server-only operations)
2. Install deps:
```bash
npm install
```
3. Run dev:
```bash
npm run dev
```

## Notes & next steps
- This is a scaffold — production banking integration (Plaid/Yodlee) requires provider accounts and server-side setup. This repo includes a PDF/CSV upload path to support bank statement reconciliation without linking.
- OCR (Tesseract) runs client-side for quick extraction; for higher accuracy use server-side OCR or a paid OCR API.
- Customize DB schema in Supabase (profiles, invoices, transactions) and update `api/` endpoints accordingly.



## Added Pages
- Accountant dashboard: /accountant/dashboard
- Invoice creation: /invoices/new
- GST reports: /gst/reports
- Client detail: /accountant/client/[id]
- Supabase schema file: db/supabase_schema.sql
