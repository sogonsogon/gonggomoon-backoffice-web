import type { IndustryVersionStatus } from '@/features/industry/types';

export const VERSION_STATUS_LABELS: Record<IndustryVersionStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return dateStr.split('T')[0].replace(/-/g, '.');
}
