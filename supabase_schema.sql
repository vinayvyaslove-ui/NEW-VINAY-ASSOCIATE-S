-- Supabase schema for GST Accounting starter
-- Run in Supabase SQL editor or psql

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  email text,
  role text,
  created_at timestamptz default now()
);

-- Invoices: store invoice payload in JSONB
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  data jsonb,
  ocr_text text,
  created_at timestamptz default now()
);

-- Bank transactions
create table if not exists bank_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  amount numeric,
  tx_date date,
  description text,
  created_at timestamptz default now()
);

-- Reconciliation matches
create table if not exists reconciliation (
  id uuid default gen_random_uuid() primary key,
  transaction_id uuid references bank_transactions(id),
  invoice_id uuid references invoices(id),
  status text,
  created_at timestamptz default now()
);

-- Example index
create index if not exists idx_invoices_user on invoices(user_id);
