import type { CompanyType } from '@/features/company/types';

export const COMPANY_TYPE_OPTIONS: { value: CompanyType; label: string; style?: string }[] = [
  {
    value: 'LARGE_ENTERPRISE',
    label: '대기업',
    style: 'bg-ds-badge-red-bg text-ds-badge-red-text',
  },
  {
    value: 'MID_SIZED_ENTERPRISE',
    label: '중견기업',
    style: 'bg-ds-badge-blue-bg text-ds-badge-blue-text',
  },
  {
    value: 'SMALL_MEDIUM_ENTERPRISE',
    label: '중소기업',
    style: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  },
  {
    value: 'STARTUP',
    label: '스타트업',
    style: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  },
];
