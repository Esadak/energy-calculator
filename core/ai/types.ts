import type { CalculatorFormData } from '@/features/calculator/types';

export interface GeminiRequest {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
    finishReason: string;
  }>;
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

export type { CalculatorFormData };
