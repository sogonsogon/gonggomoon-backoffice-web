import type { Company, CompanyType } from '@/features/company/types';

export const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  LARGE_ENTERPRISE: '대기업',
  MID_SIZED_ENTERPRISE: '중견기업',
  SMALL_MEDIUM_ENTERPRISE: '중소기업',
  STARTUP: '스타트업',
};

export const COMPANY_TYPE_OPTIONS: { value: CompanyType; label: string }[] = [
  { value: 'LARGE_ENTERPRISE', label: '대기업' },
  { value: 'MID_SIZED_ENTERPRISE', label: '중견기업' },
  { value: 'SMALL_MEDIUM_ENTERPRISE', label: '중소기업' },
  { value: 'STARTUP', label: '스타트업' },
];

export const INITIAL_FORM: Company = {
  companyName: '',
  companyId: 0,
  foundedYear: 0,
  industryId: 0,
  companyType: 'LARGE_ENTERPRISE',
  employeeCount: 0,
  websiteUrl: '',
  address: '',
};
