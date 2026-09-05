'use client';

import { useState, useCallback } from 'react';
import type { CalculatorFormData, CalculatorResult } from '../types';

export function useCalculator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = useCallback(async (data: CalculatorFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Beräkningen misslyckades');
      }

      const res = await response.json();
      setResult(res);
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Något gick fel');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { loading, error, result, calculate, reset };
}
