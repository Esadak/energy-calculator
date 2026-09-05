/*
# Extend calculations table + create affiliate_clicks table

1. Modified Tables
- `calculations` — added columns to match the full data model:
  - `user_email` (text, nullable) — optional email of the user who created the calculation
  - `housing_type` (text, nullable) — type of housing (apartment, house, etc.)
  - `heating_type` (text, nullable) — primary heating method
  - `postal_code` (text, nullable) — postal/zip code for location-based recommendations
  - `ai_report` (text, nullable) — full AI-generated report text
  - `is_premium` (boolean, default false) — whether this is a premium report
  Pre-existing columns (household_size, country, energy_source, monthly_usage_kwh, monthly_cost_eur, recommendations, potential_savings_eur) are NOT modified — no data loss.

2. New Tables
- `affiliate_clicks`
  - `id` (uuid, primary key, auto-generated)
  - `created_at` (timestamptz, default now)
  - `category` (text, not null) — affiliate category (solar, heating, insulation, etc.)
  - `calculation_id` (uuid, nullable, FK to calculations) — optional link to the calculation that led to the click
  - `ip_address` (text, nullable) — visitor IP for fraud detection

3. Security
- Enable RLS on `affiliate_clicks`.
- Allow anon + authenticated CRUD (single-tenant, no sign-in app).
- All policies use USING(true)/WITH CHECK(true) because data is intentionally public.

4. Indexes
- Index on `calculations.created_at` already exists from prior migration.
- Index on `affiliate_clicks.created_at` for ordered queries.
- Index on `affiliate_clicks.calculation_id` for join queries.
*/

-- Add new columns to calculations (all nullable to preserve existing rows)
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS user_email text;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS housing_type text;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS heating_type text;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS postal_code text;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS ai_report text;
ALTER TABLE calculations ADD COLUMN IF NOT EXISTS is_premium boolean NOT NULL DEFAULT false;

-- Create affiliate_clicks table
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  category text NOT NULL,
  calculation_id uuid REFERENCES calculations(id) ON DELETE SET NULL,
  ip_address text
);

ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_affiliate_clicks" ON affiliate_clicks;
CREATE POLICY "anon_select_affiliate_clicks" ON affiliate_clicks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_affiliate_clicks" ON affiliate_clicks;
CREATE POLICY "anon_insert_affiliate_clicks" ON affiliate_clicks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_affiliate_clicks" ON affiliate_clicks;
CREATE POLICY "anon_update_affiliate_clicks" ON affiliate_clicks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_affiliate_clicks" ON affiliate_clicks;
CREATE POLICY "anon_delete_affiliate_clicks" ON affiliate_clicks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_created_at ON affiliate_clicks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_calculation_id ON affiliate_clicks (calculation_id);
