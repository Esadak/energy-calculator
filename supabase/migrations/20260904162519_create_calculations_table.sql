/*
# Create calculations table (single-tenant, no auth)

1. New Tables
- `calculations`
  - `id` (uuid, primary key, auto-generated)
  - `household_size` (integer, number of people in the household)
  - `country` (text, European country name)
  - `energy_source` (text, primary energy source like Electricity, Natural Gas, etc.)
  - `monthly_usage_kwh` (numeric, monthly energy consumption in kWh)
  - `monthly_cost_eur` (numeric, monthly energy cost in euros)
  - `recommendations` (jsonb, AI-generated recommendation data)
  - `potential_savings_eur` (numeric, total estimated monthly savings)
  - `created_at` (timestamptz, record creation timestamp)

2. Security
- Enable RLS on `calculations`.
- Allow anon + authenticated CRUD because the app is intentionally public (no sign-in).
- All policies use `USING (true)` / `WITH CHECK (true)` because data is shared/public.

3. Indexes
- Index on `created_at` for ordered queries (admin dashboard, export).
*/

CREATE TABLE IF NOT EXISTS calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  household_size integer NOT NULL,
  country text NOT NULL,
  energy_source text NOT NULL,
  monthly_usage_kwh numeric NOT NULL,
  monthly_cost_eur numeric NOT NULL,
  recommendations jsonb NOT NULL DEFAULT '{}'::jsonb,
  potential_savings_eur numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_calculations" ON calculations;
CREATE POLICY "anon_select_calculations" ON calculations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_calculations" ON calculations;
CREATE POLICY "anon_insert_calculations" ON calculations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_calculations" ON calculations;
CREATE POLICY "anon_update_calculations" ON calculations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_calculations" ON calculations;
CREATE POLICY "anon_delete_calculations" ON calculations FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations (created_at DESC);
