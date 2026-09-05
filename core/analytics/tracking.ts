export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

export function trackEvent(event: AnalyticsEvent): void {
  const log = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };
  console.log('[Analytics]', JSON.stringify(log));
}

export function trackPageView(path: string): void {
  trackEvent({ event: 'page_view', properties: { path } });
}

export function trackCalculationStarted(): void {
  trackEvent({ event: 'calculation_started' });
}

export function trackCalculationCompleted(savingsEur: number): void {
  trackEvent({
    event: 'calculation_completed',
    properties: { savings_eur: savingsEur },
  });
}

export function trackAffiliateClick(linkId: string, provider: string): void {
  trackEvent({
    event: 'affiliate_click',
    properties: { link_id: linkId, provider },
  });
}
