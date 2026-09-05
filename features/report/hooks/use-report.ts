'use client';

import { useState, useCallback } from 'react';
import type { ReportData } from '../types';

export function useReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  const fetchReport = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/save-calculation?id=${id}`);
      if (!response.ok) throw new Error('Rapporten hittades inte');
      const data = await response.json();
      setReport(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ladda rapporten');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, report, fetchReport };
}
