import type { EnergyReport } from '@/features/calculator/types';

export interface ReportData {
  id: string;
  report: EnergyReport;
  current_monthly_cost: number;
  projected_monthly_cost: number;
  housing_type: string | null;
  heating_type: string | null;
  postal_code: string | null;
  created_at: string;
}
