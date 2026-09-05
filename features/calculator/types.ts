export type HousingType = 'villa' | 'apartment' | 'townhouse';

export type HeatingType = 'electricity' | 'district_heating' | 'heat_pump' | 'gas';

export interface CalculatorData {
  housingType: HousingType | null;
  size: number | null;
  heatingType: HeatingType | null;
  postalCode: string | null;
  monthlyCost: number | null;
  email?: string;
}

export interface CalculatorFormData {
  housingType: HousingType;
  size: number;
  heatingType: HeatingType;
  postalCode: string;
  monthlyCost: number;
  email?: string;
}

export interface CalculatorResult {
  id?: string;
  report: EnergyReport;
  current_monthly_cost: number;
  projected_monthly_cost: number;
}

export type RecommendationType = 'immediate_win' | 'investment' | 'subsidy';

export interface ImmediateWinRecommendation {
  type: 'immediate_win';
  title: string;
  description: string;
  savings: number;
}

export interface InvestmentRecommendation {
  type: 'investment';
  title: string;
  description: string;
  cost: number;
  roi: number;
}

export interface SubsidyRecommendation {
  type: 'subsidy';
  title: string;
  description: string;
  link: string;
}

export type Recommendation = ImmediateWinRecommendation | InvestmentRecommendation | SubsidyRecommendation;

export interface EnergyReport {
  summary: string;
  potentialSavings: number;
  recommendations: Recommendation[];
}
