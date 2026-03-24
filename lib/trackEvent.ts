declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

interface TrackEventParams {
  event: string;
  category?: string;
  label?: string;
  [key: string]: unknown;
}

export function trackEvent({ event, category, label, ...rest }: TrackEventParams): void {
  if (typeof window === 'undefined') return;
  console.log('Tracking event:', { event, category, label, ...rest });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_category: category,
    event_label: label,
    ...rest,
  });
}

